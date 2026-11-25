
// ==========================================
// STILLWELL - COURSE LIBRARY
// ==========================================

// Supabase client
const supabaseClient = window.supabaseClient;

// Current user and data
let currentUser = null;
let courses = [];
let lessons = [];
let completedLessons = [];

// Selected items
let selectedCourse = null;
let selectedLesson = null;
let selectedCategory = "all";

// HTML elements
const totalCourses = document.getElementById("totalCourses");
const searchCourse = document.getElementById("searchCourse");
const categoryFilter = document.getElementById("categoryFilter");

const categoryList = document.getElementById("categoryList");
const courseList = document.getElementById("courseList");

const lessonSection = document.getElementById("lessonSection");
const selectedCourseTitle = document.getElementById("selectedCourseTitle");
const selectedCourseDescription = document.getElementById("selectedCourseDescription");

const lessonList = document.getElementById("lessonList");
const lessonNumber = document.getElementById("lessonNumber");
const lessonTitle = document.getElementById("lessonTitle");
const lessonBody = document.getElementById("lessonBody");

const activityContainer = document.getElementById("activityContainer");
const activityContent = document.getElementById("activityContent");

const completeLessonBtn = document.getElementById("completeLessonBtn");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

const emptyState = document.getElementById("emptyState");


// ==========================================
// SHUFFLE COURSES
// ==========================================

function shuffleCourses(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

    }

    return shuffled;
}


// ==========================================
// INITIALIZE COURSE LIBRARY
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {

    if (!supabaseClient) {
        alert("Supabase connection was not found. Please check js/supabase.js.");
        return;
    }

    await checkUser();

});


// ==========================================
// CHECK LOGGED-IN USER
// ==========================================

async function checkUser() {

    try {

        const { data, error } = await supabaseClient.auth.getSession();

        if (error) throw error;

        if (!data.session) {
            window.location.href = "index.html";
            return;
        }

        currentUser = data.session.user;

        await loadCourses();

    } catch (error) {

        console.error("Session error:", error);
        alert("Unable to verify your account.");

    }

}


// ==========================================
// LOAD COURSES FROM SUPABASE
// ==========================================

async function loadCourses() {

    try {

        courseList.innerHTML = "<p>Loading courses...</p>";

        const { data, error } = await supabaseClient
            .from("resources")
            .select("id, course_number, title, description, category")
            .eq("resource_type", "course")
            .order("course_number", { ascending: true });

        if (error) throw error;

        // Randomize the course order once when loading
        courses = shuffleCourses(data || []);

        totalCourses.textContent = courses.length;

        await loadCompletedLessons();

        displayCategories();
        displayCourses();

    } catch (error) {

        console.error("Course loading error:", error);

        courseList.innerHTML =
            "<p>Unable to load courses. Please check your Supabase table columns and connection.</p>";

    }

}


// ==========================================
// LOAD USER'S COMPLETED LESSONS
// ==========================================

async function loadCompletedLessons() {

    try {

        const { data, error } = await supabaseClient
            .from("course_progress")
            .select("lesson_id, is_completed")
            .eq("user_id", currentUser.id)
            .eq("is_completed", true);

        if (error) throw error;

        completedLessons = data || [];

    } catch (error) {

        console.error("Progress loading error:", error);

    }

}


// ==========================================
// DISPLAY CATEGORIES
// ==========================================

function displayCategories() {

    const categories = [
        ...new Set(
            courses
                .map(course => course.category)
                .filter(category => category)
        )
    ].sort();

    categoryList.innerHTML = "";

    // Keep category cards available for compatibility,
    // even if the categoryList container is hidden.
    categories.forEach(category => {

        const card = document.createElement("div");

        card.className =
            "category-card" +
            (selectedCategory === category ? " active" : "");

        const heading = document.createElement("h3");
        heading.textContent = category;

        card.appendChild(heading);

        card.addEventListener("click", () => {

            selectedCategory = category;
            categoryFilter.value = category;

            displayCategories();
            displayCourses();

        });

        categoryList.appendChild(card);

    });

    // Populate category dropdown
    categoryFilter.innerHTML =
        '<option value="all">All Categories</option>';

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });

    categoryFilter.value = selectedCategory;

}


// ==========================================
// DISPLAY COURSES
// ==========================================

function displayCourses() {

    courseList.innerHTML = "";

    const searchValue = searchCourse.value.toLowerCase().trim();

    // Filter the already randomized courses
    const filteredCourses = courses.filter(course => {

        const matchesSearch =
            (course.title || "").toLowerCase().includes(searchValue) ||
            (course.description || "").toLowerCase().includes(searchValue) ||
            (course.category || "").toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            course.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    if (filteredCourses.length === 0) {

        emptyState.hidden = false;
        return;

    }

    emptyState.hidden = true;

    // Display courses in their randomized order
    filteredCourses.forEach(course => {

        const card = document.createElement("div");
        card.className = "course-card";

        const category = document.createElement("span");
        category.className = "course-category";
        category.textContent = course.category || "General";

        const title = document.createElement("h3");
        title.textContent = course.title;

        const description = document.createElement("p");
        description.textContent =
            course.description || "Explore this mental wellness course.";

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "View Course";

        button.addEventListener("click", () => {
            openCourse(course);
        });

        card.appendChild(category);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(button);

        courseList.appendChild(card);

    });

}


// ==========================================
// OPEN SELECTED COURSE
// ==========================================

async function openCourse(course) {

    try {

        selectedCourse = course;
        selectedLesson = null;

        lessonSection.hidden = false;
        lessonSection.scrollIntoView({ behavior: "smooth" });

        selectedCourseTitle.textContent = course.title;

        selectedCourseDescription.textContent =
            course.description || "";

        lessonList.innerHTML = "<p>Loading lessons...</p>";

        lessonBody.innerHTML =
            "<p>Select a lesson to begin.</p>";

        lessonNumber.textContent = "";
        lessonTitle.textContent = "Select a Lesson";

        activityContainer.hidden = true;
        activityContent.textContent = "";

        completeLessonBtn.disabled = true;
        completeLessonBtn.textContent = "Select a Lesson";

        const { data, error } = await supabaseClient
            .from("course_lessons")
            .select("id, lesson_number, title, lesson_content, activity")
            .eq("resource_id", course.id)
            .order("lesson_number", { ascending: true });

        if (error) throw error;

        lessons = data || [];

        displayLessons();
        updateProgress();

    } catch (error) {

        console.error("Lesson loading error:", error);

        lessonList.innerHTML =
            "<p>Unable to load lessons.</p>";

    }

}


// ==========================================
// DISPLAY LESSON LIST
// ==========================================

function displayLessons() {

    lessonList.innerHTML = "";

    if (lessons.length === 0) {

        lessonList.innerHTML =
            "<p>No lessons available for this course.</p>";

        return;

    }

    lessons.forEach(lesson => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "lesson-item";

        const isCompleted = completedLessons.some(
            item => item.lesson_id === lesson.id
        );

        if (isCompleted) {
            button.classList.add("completed");
        }

        if (selectedLesson && selectedLesson.id === lesson.id) {
            button.classList.add("active");
        }

        button.textContent =
            `Lesson ${lesson.lesson_number}: ${lesson.title}`;

        button.addEventListener("click", () => {

            openLesson(lesson);

        });

        lessonList.appendChild(button);

    });

}


// ==========================================
// OPEN SELECTED LESSON
// ==========================================

function openLesson(lesson) {

    selectedLesson = lesson;

    lessonNumber.textContent =
        `LESSON ${lesson.lesson_number}`;

    lessonTitle.textContent = lesson.title;

    lessonBody.textContent =
        lesson.lesson_content || "No lesson content available.";

    if (lesson.activity) {

        activityContainer.hidden = false;

        activityContent.textContent = lesson.activity;

    } else {

        activityContainer.hidden = true;

        activityContent.textContent = "";

    }

    const isCompleted = completedLessons.some(
        item => item.lesson_id === lesson.id
    );

    if (isCompleted) {

        completeLessonBtn.textContent = "Lesson Completed ✓";
        completeLessonBtn.disabled = true;

    } else {

        completeLessonBtn.textContent = "Mark Lesson as Completed";
        completeLessonBtn.disabled = false;

    }

    displayLessons();

}


// ==========================================
// MARK LESSON AS COMPLETED
// ==========================================

async function completeLesson() {

    if (!selectedLesson || !currentUser) {
        return;
    }

    completeLessonBtn.disabled = true;
    completeLessonBtn.textContent = "Saving...";

    try {

        const { error } = await supabaseClient
            .from("course_progress")
            .upsert(
                {
                    user_id: currentUser.id,
                    lesson_id: selectedLesson.id,
                    is_completed: true,
                    completed_at: new Date().toISOString()
                },
                {
                    onConflict: "user_id,lesson_id"
                }
            );

        if (error) throw error;

        const alreadyCompleted = completedLessons.some(
            item => item.lesson_id === selectedLesson.id
        );

        if (!alreadyCompleted) {

            completedLessons.push({
                lesson_id: selectedLesson.id,
                is_completed: true
            });

        }

        completeLessonBtn.textContent = "Lesson Completed ✓";

        displayLessons();
        updateProgress();

    } catch (error) {

        console.error("Saving progress error:", error);

        alert("Unable to save lesson progress. Please try again.");

        completeLessonBtn.disabled = false;
        completeLessonBtn.textContent = "Mark Lesson as Completed";

    }

}


// ==========================================
// UPDATE COURSE PROGRESS
// ==========================================

function updateProgress() {

    const total = lessons.length;

    const completed = lessons.filter(lesson =>
        completedLessons.some(
            item => item.lesson_id === lesson.id
        )
    ).length;

    const percentage = total > 0
        ? Math.round((completed / total) * 100)
        : 0;

    progressText.textContent =
        `${completed} of ${total} lessons completed`;

    progressBar.style.width = `${percentage}%`;

}


// ==========================================
// SEARCH COURSES
// ==========================================

searchCourse.addEventListener("input", () => {

    displayCourses();

});


// ==========================================
// FILTER COURSES BY CATEGORY
// ==========================================

categoryFilter.addEventListener("change", () => {

    selectedCategory = categoryFilter.value;

    displayCategories();
    displayCourses();

});



document.getElementById("backToCourses").addEventListener("click", () => {

    lessonSection.hidden = true;

    selectedCourse = null;
    selectedLesson = null;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



completeLessonBtn.addEventListener("click", completeLesson);
