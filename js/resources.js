
// ==========================================
// STILLWELL - MENTAL HEALTH RESOURCES
// SUPABASE CONNECTED JAVASCRIPT
// ==========================================

// ==========================================
// 1. RESOURCE DATABASE
// ==========================================

const resources = [
    {
        id: 1,
        type: "articles",
        icon: "book-open",
        title: "Understanding Your Mental Health",
        description: "Learn what mental health means and why it is important in everyday life.",
        label: "Article",
        duration: "5 min read",
        content: `
            <h3>What is Mental Health?</h3>
            <p>Mental health refers to our emotional, psychological, and social well-being. It affects how we think, feel, act, handle stress, and interact with other people.</p>
            <h3>Why is Mental Health Important?</h3>
            <p>Taking care of your mental health can help you manage challenges, build healthy relationships, make decisions, and maintain a balanced lifestyle.</p>
            <h3>Ways to Take Care of Your Mental Health</h3>
            <ul>
                <li>Get enough sleep and rest.</li>
                <li>Stay connected with people you trust.</li>
                <li>Make time for activities you enjoy.</li>
                <li>Express your feelings in healthy ways.</li>
                <li>Ask for support when you need it.</li>
            </ul>
        `
    },
    {
        id: 2,
        type: "articles",
        icon: "heart",
        title: "Managing Academic Stress",
        description: "Discover healthy ways to handle school pressure, deadlines, and academic responsibilities.",
        label: "Article",
        duration: "6 min read",
        content: `
            <h3>Understanding Academic Stress</h3>
            <p>Academic stress can happen when students feel overwhelmed by assignments, examinations, deadlines, and expectations.</p>
            <h3>Healthy Ways to Manage Stress</h3>
            <ul>
                <li>Break large tasks into smaller activities.</li>
                <li>Create a realistic study schedule.</li>
                <li>Take short breaks between study sessions.</li>
                <li>Avoid comparing your progress with others.</li>
                <li>Talk to someone you trust when things feel overwhelming.</li>
            </ul>
            <p>Remember: Taking a break is not a waste of time. Rest is part of being productive.</p>
        `
    },
    {
        id: 3,
        type: "videos",
        icon: "play-circle",
        title: "Mental Health Awareness",
        description: "A video resource about mental health awareness and self-care.",
        label: "Video",
        duration: "Video",
        videoUrl: "https://www.youtube-nocookie.com/embed/y6x4huL6xAw",
        content: `
            <h3>Mental Health Awareness</h3>
            <p>Watch this educational video about mental health awareness and simple self-care practices.</p>
            <p><strong>Source:</strong> External video resource.</p>
        `
    },
    {
        id: 4,
        type: "videos",
        icon: "play-circle",
        title: "Understanding Mental Health",
        description: "Learn more about emotions and the importance of taking care of your mental health.",
        label: "Video",
        duration: "Video",
        videoUrl: "https://www.youtube-nocookie.com/embed/ExEXOfe81Nc",
        content: `
            <h3>Understanding Mental Health</h3>
            <p>This video introduces mental health and the importance of recognizing and understanding emotions.</p>
            <p><strong>Source:</strong> External video resource.</p>
        `
    },
    {
        id: 5,
        type: "infographics",
        icon: "image",
        title: "5 Signs You May Be Experiencing Stress",
        description: "Learn about common physical, emotional, and behavioral signs of stress.",
        label: "Infographic",
        duration: "2 min view",
        content: `
            <h3>Common Signs of Stress</h3>
            <ol>
                <li><strong>Physical:</strong> Headaches, muscle tension, or tiredness.</li>
                <li><strong>Emotional:</strong> Feeling worried, frustrated, or overwhelmed.</li>
                <li><strong>Thinking:</strong> Difficulty concentrating or making decisions.</li>
                <li><strong>Behavior:</strong> Changes in sleeping or eating habits.</li>
                <li><strong>Social:</strong> Avoiding people or activities you usually enjoy.</li>
            </ol>
            <p>These signs can have different causes. They do not automatically mean someone has a mental health condition.</p>
        `
    },
    {
        id: 6,
        type: "infographics",
        icon: "image",
        title: "A Healthy Daily Self-Care Routine",
        description: "Simple self-care habits that students can include in their daily routine.",
        label: "Infographic",
        duration: "2 min view",
        content: `
            <h3>Your Daily Self-Care Checklist</h3>
            <ul>
                <li>Drink enough water.</li>
                <li>Eat regular and balanced meals.</li>
                <li>Get enough sleep.</li>
                <li>Move your body when possible.</li>
                <li>Take breaks from screens and schoolwork.</li>
                <li>Spend time with supportive people.</li>
                <li>Make time for something you enjoy.</li>
            </ul>
            <p>Self-care does not need to be complicated. Small, consistent habits can make a difference.</p>
        `
    },
    {
        id: 7,
        type: "exercises",
        icon: "wind",
        title: "Deep Breathing Exercise",
        description: "Practice a simple breathing activity to help you pause and relax.",
        label: "Exercise",
        duration: "3 min activity",
        content: `
            <h3>Deep Breathing Exercise</h3>
            <p>Find a comfortable position. Relax your shoulders and breathe gently.</p>
            <ol>
                <li>Inhale slowly through your nose for 4 seconds.</li>
                <li>Pause briefly if comfortable.</li>
                <li>Exhale gently for 6 seconds.</li>
                <li>Repeat for a few rounds.</li>
            </ol>
            <p>Do not force your breathing. Return to your normal breathing if you feel uncomfortable or dizzy.</p>
        `
    },
    {
        id: 8,
        type: "exercises",
        icon: "brain",
        title: "5-4-3-2-1 Grounding Exercise",
        description: "Use your senses to reconnect with your surroundings when you feel overwhelmed.",
        label: "Exercise",
        duration: "5 min activity",
        content: `
            <h3>Try the 5-4-3-2-1 Method</h3>
            <p>Pause and gently notice your surroundings.</p>
            <ol>
                <li><strong>5</strong> things you can see.</li>
                <li><strong>4</strong> things you can feel.</li>
                <li><strong>3</strong> things you can hear.</li>
                <li><strong>2</strong> things you can smell.</li>
                <li><strong>1</strong> thing you can taste.</li>
            </ol>
            <p>Take your time. You can skip any step that does not feel comfortable.</p>
        `
    },
    {
        id: 9,
        type: "guides",
        icon: "file-text",
        title: "Student Self-Care Guide",
        description: "A simple guide to building healthy habits while managing school responsibilities.",
        label: "Guide",
        duration: "Reading guide",
        content: `
            <h3>Student Self-Care Guide</h3>
            <h4>1. Manage Your Time</h4>
            <p>Use a planner or checklist to organize school activities and personal responsibilities.</p>
            <h4>2. Make Time for Rest</h4>
            <p>Include breaks in your schedule and maintain a consistent sleep routine when possible.</p>
            <h4>3. Stay Connected</h4>
            <p>Reach out to friends, family, teachers, or other trusted people.</p>
            <h4>4. Recognize Your Limits</h4>
            <p>It is okay to ask for help and adjust your plans when you need to.</p>
            <p><strong>Reminder:</strong> You do not have to handle everything alone.</p>
        `
    },
    {
        id: 10,
        type: "guides",
        icon: "file-text",
        title: "WHO Stress Management Guide",
        description: "A free illustrated World Health Organization guide with practical stress-management techniques.",
        label: "PDF Guide",
        duration: "PDF download",
        pdfUrl: "https://cdn.who.int/media/docs/default-source/mental-health/july-2020.pdf",
        content: `
            <h3>Doing What Matters in Times of Stress</h3>
            <p>This illustrated guide from the World Health Organization provides practical skills to help people cope with stress and adversity.</p>
            <p>It includes techniques such as grounding, managing difficult thoughts, making room for emotions, and acting on personal values.</p>
            <p><strong>Source:</strong> World Health Organization (WHO), 2020.</p>
        `
    }
];


// ==========================================
// 2. GET HTML ELEMENTS
// ==========================================

const resourceGrid = document.getElementById("resourceGrid");
const resourceSearch = document.getElementById("resourceSearch");
const resourceFilter = document.getElementById("resourceFilter");
const resourceEmptyState = document.getElementById("resourceEmptyState");

if (!resourceGrid || !resourceSearch || !resourceFilter || !resourceEmptyState) {
    console.error("StillWell: Required resource page elements were not found.");
}


// ==========================================
// 3. SUPABASE USER PROGRESS
// ==========================================

const supabaseClient = window.supabaseClient;

let currentUser = null;
let savedResources = [];
let completedResources = [];
let activeView = "all";
let progressReady = false;

async function initializeUserProgress() {

    if (!supabaseClient) {
        showResourceMessage("Supabase connection is missing. Please check js/supabase.js.");
        console.error("StillWell: window.supabaseClient was not found.");
        return;
    }

    try {
        const {
            data: { user },
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError) throw authError;

        if (!user) {
            showResourceMessage("Please log in to save bookmarks and track your learning progress.");
            renderResources(resources);
            return;
        }

        currentUser = user;

        const { data, error } = await supabaseClient
            .from("resource_progress")
            .select("resource_id, is_bookmarked, is_completed")
            .eq("user_id", currentUser.id);

        if (error) throw error;

        savedResources = (data || [])
            .filter(row => row.is_bookmarked)
            .map(row => Number(row.resource_id))
            .filter(id => resources.some(resource => resource.id === id));

        completedResources = (data || [])
            .filter(row => row.is_completed)
            .map(row => Number(row.resource_id))
            .filter(id => resources.some(resource => resource.id === id));

        progressReady = true;

        removeResourceMessage();
        updateProgressSummary();
        filterResources();

        console.log("StillWell: Supabase resource progress loaded.");

    } catch (error) {
        console.error("Unable to load resource progress:", error);
        showResourceMessage("Unable to load your saved progress. Please refresh the page or check your Supabase settings.");
        renderResources(resources);
    }
}


function showResourceMessage(message) {

    let notice = document.getElementById("resourceSupabaseNotice");

    if (!notice) {
        notice = document.createElement("div");
        notice.id = "resourceSupabaseNotice";
        notice.style.cssText = "padding:12px 16px;margin:12px 0;border-radius:12px;background:#f3efff;color:#55427a;font-size:14px;";

        const content = document.querySelector(".resources-content");

        if (content) {
            content.prepend(notice);
        }
    }

    notice.textContent = message;
}


function removeResourceMessage() {
    document.getElementById("resourceSupabaseNotice")?.remove();
}


async function saveResourceProgress(resourceId) {

    if (!currentUser || !progressReady) {
        showResourceMessage("Please log in before saving your resource progress.");
        return false;
    }

    const row = {
        user_id: currentUser.id,
        resource_id: resourceId,
        is_bookmarked: savedResources.includes(resourceId),
        is_completed: completedResources.includes(resourceId),
        updated_at: new Date().toISOString()
    };

    const { error } = await supabaseClient
        .from("resource_progress")
        .upsert(row, {
            onConflict: "user_id,resource_id"
        });

    if (error) {
        console.error("Unable to save resource progress:", error);
        showResourceMessage("Your change could not be saved. Please check the resource_progress table and RLS policies.");
        return false;
    }

    removeResourceMessage();
    return true;
}


// ==========================================
// 4. CREATE LEARNING PROGRESS SECTION
// ==========================================

const progressSection = document.createElement("section");

progressSection.className = "resource-progress-section";

progressSection.innerHTML = `
    <div class="resource-progress-heading">
        <div>
            <span class="resource-section-label">YOUR LEARNING ACTIVITY</span>
            <h2>Your Resource Progress</h2>
            <p>Keep track of the resources you have explored.</p>
        </div>
    </div>

    <div class="resource-progress-cards">

        <div class="resource-progress-card">
            <div class="resource-progress-icon">
                <i data-lucide="book-open"></i>
            </div>
            <div>
                <span>Total Resources</span>
                <h3 id="totalResourcesCount">0</h3>
            </div>
        </div>

        <div class="resource-progress-card">
            <div class="resource-progress-icon">
                <i data-lucide="bookmark"></i>
            </div>
            <div>
                <span>Saved Resources</span>
                <h3 id="savedResourcesCount">0</h3>
            </div>
        </div>

        <div class="resource-progress-card">
            <div class="resource-progress-icon">
                <i data-lucide="check-circle"></i>
            </div>
            <div>
                <span>Completed</span>
                <h3 id="completedResourcesCount">0</h3>
            </div>
        </div>

    </div>

    <div class="resource-progress-bar-area">
        <div class="resource-progress-bar-heading">
            <span>Overall Learning Progress</span>
            <strong id="progressPercentage">0%</strong>
        </div>

        <div class="resource-progress-track">
            <div
                class="resource-progress-fill"
                id="progressFill">
            </div>
        </div>
    </div>
`;


// Your HTML uses class="resource-library-section".
// Find it using the class and assign the ID.

const librarySection = document.querySelector(".resource-library-section");

if (librarySection) {
    librarySection.id = "resourceLibrary";

    librarySection.parentNode.insertBefore(
        progressSection,
        librarySection
    );
} else {
    document.querySelector(".resources-content")?.prepend(progressSection);
}


// ==========================================
// 5. CREATE SAVED RESOURCES BUTTON
// ==========================================

const savedFilterButton = document.createElement("button");

savedFilterButton.type = "button";
savedFilterButton.className = "resource-saved-filter";

savedFilterButton.innerHTML = `
    <i data-lucide="bookmark"></i>
    My Saved Resources
`;

const resourceControls = document.querySelector(".resource-controls");

if (resourceControls) {
    resourceControls.appendChild(savedFilterButton);
}


// ==========================================
// 6. UPDATE PROGRESS SUMMARY
// ==========================================

function updateProgressSummary() {

    const total = resources.length;
    const saved = savedResources.length;
    const completed = completedResources.length;

    const percentage = total > 0
        ? Math.round((completed / total) * 100)
        : 0;

    const totalCount = document.getElementById("totalResourcesCount");
    const savedCount = document.getElementById("savedResourcesCount");
    const completedCount = document.getElementById("completedResourcesCount");
    const progressPercent = document.getElementById("progressPercentage");
    const progressFill = document.getElementById("progressFill");

    if (totalCount) totalCount.textContent = total;
    if (savedCount) savedCount.textContent = saved;
    if (completedCount) completedCount.textContent = completed;
    if (progressPercent) progressPercent.textContent = percentage + "%";
    if (progressFill) progressFill.style.width = percentage + "%";
}


// ==========================================
// 7. RESOURCE FILTERING
// ==========================================

function filterResources() {

    const searchText = resourceSearch.value.toLowerCase().trim();
    const selectedType = resourceFilter.value;

    let filteredResources = resources.filter(resource => {

        const searchableText = (
            resource.title + " " +
            resource.description + " " +
            resource.label
        ).toLowerCase();

        const matchesSearch = searchableText.includes(searchText);

        const matchesType =
            selectedType === "all" ||
            resource.type === selectedType;

        return matchesSearch && matchesType;
    });

    if (activeView === "saved") {
        filteredResources = filteredResources.filter(resource =>
            savedResources.includes(resource.id)
        );
    }

    renderResources(filteredResources);
}


// ==========================================
// 8. RENDER RESOURCE CARDS
// ==========================================

function renderResources(resourceList) {

    resourceGrid.innerHTML = "";

    if (resourceList.length === 0) {

        resourceEmptyState.style.display = "block";

        const emptyTitle = resourceEmptyState.querySelector("h3");
        const emptyText = resourceEmptyState.querySelector("p");

        if (activeView === "saved") {

            if (emptyTitle) {
                emptyTitle.textContent = "No Saved Resources Yet";
            }

            if (emptyText) {
                emptyText.textContent = "Bookmark a resource to find it here later.";
            }

        } else {

            if (emptyTitle) {
                emptyTitle.textContent = "No Resources Found";
            }

            if (emptyText) {
                emptyText.textContent = "Try another search or category.";
            }
        }

        return;
    }

    resourceEmptyState.style.display = "none";

    resourceList.forEach(resource => {

        const isSaved = savedResources.includes(resource.id);
        const isCompleted = completedResources.includes(resource.id);

        const card = document.createElement("article");

        card.className = "resource-card";

        card.innerHTML = `
            <div class="resource-card-top">

                <div class="resource-card-icon">
                    <i data-lucide="${resource.icon}"></i>
                </div>

                <button
                    type="button"
                    class="resource-bookmark-btn ${isSaved ? "saved" : ""}"
                    data-action="bookmark"
                    data-id="${resource.id}"
                    aria-label="${isSaved ? "Remove bookmark" : "Bookmark resource"}"
                    title="${isSaved ? "Remove bookmark" : "Save resource"}">

                    <i data-lucide="bookmark"></i>
                </button>

            </div>

            <span class="resource-card-label">
                ${resource.label}
            </span>

            <h3>${resource.title}</h3>

            <p>${resource.description}</p>

            <div class="resource-card-status">
                ${
                    isCompleted
                    ? `
                        <span class="completed-label">
                            <i data-lucide="check-circle"></i>
                            Completed
                        </span>
                    `
                    : `
                        <span class="not-completed-label">
                            Not completed
                        </span>
                    `
                }
            </div>

            <div class="resource-card-footer">

                <span>${resource.duration}</span>

                <button
                    class="resource-view-btn"
                    type="button"
                    data-action="view"
                    data-id="${resource.id}">

                    View Resource
                    <i data-lucide="arrow-right"></i>
                </button>

            </div>
        `;

        resourceGrid.appendChild(card);
    });

    if (window.lucide) {
        lucide.createIcons();
    }
}


// ==========================================
// 9. BOOKMARK RESOURCE
// ==========================================

async function toggleBookmark(resourceId) {

    if (!progressReady || !currentUser) {
        showResourceMessage("Please log in to bookmark resources.");
        return;
    }

    const wasSaved = savedResources.includes(resourceId);

    if (wasSaved) {
        savedResources = savedResources.filter(id => id !== resourceId);
    } else {
        savedResources.push(resourceId);
    }

    updateProgressSummary();
    filterResources();

    const saved = await saveResourceProgress(resourceId);

    if (!saved) {

        if (wasSaved) {
            savedResources.push(resourceId);
        } else {
            savedResources = savedResources.filter(id => id !== resourceId);
        }

        updateProgressSummary();
        filterResources();
    }
}


// ==========================================
// 10. MARK RESOURCE AS COMPLETED
// ==========================================

async function toggleCompleted(resourceId) {

    if (!progressReady || !currentUser) {
        showResourceMessage("Please log in to track completed resources.");
        return;
    }

    const wasCompleted = completedResources.includes(resourceId);

    if (wasCompleted) {
        completedResources = completedResources.filter(id => id !== resourceId);
    } else {
        completedResources.push(resourceId);
    }

    updateProgressSummary();
    filterResources();

    const saved = await saveResourceProgress(resourceId);

    if (!saved) {

        if (wasCompleted) {
            completedResources.push(resourceId);
        } else {
            completedResources = completedResources.filter(id => id !== resourceId);
        }

        updateProgressSummary();
        filterResources();

    } else {
        openResource(resourceId);
    }
}


// ==========================================
// 11. CREATE RESOURCE PREVIEW MODAL
// ==========================================

const modal = document.createElement("div");

modal.className = "resource-modal";
modal.id = "resourceModal";

modal.innerHTML = `
    <div class="resource-modal-content">

        <button
            class="resource-modal-close"
            type="button"
            aria-label="Close">

            <i data-lucide="x"></i>
        </button>

        <span
            class="resource-modal-label"
            id="modalLabel">
        </span>

        <h2 id="modalTitle"></h2>

        <div
            class="resource-modal-body"
            id="modalBody">
        </div>

        <div
            class="resource-modal-actions"
            id="modalActions">
        </div>

    </div>
`;

document.body.appendChild(modal);


// ==========================================
// 12. OPEN RESOURCE
// ==========================================

function openResource(resourceId) {

    const resource = resources.find(
        item => item.id === resourceId
    );

    if (!resource) return;

    const isCompleted = completedResources.includes(resourceId);

    document.getElementById("modalLabel").textContent = resource.label;
    document.getElementById("modalTitle").textContent = resource.title;

    let extraContent = "";

    if (resource.videoUrl) {

        extraContent = `
            <div class="resource-video-frame">

                <iframe
                    src="${resource.videoUrl}"
                    title="${resource.title}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>

            </div>
        `;
    }

    if (resource.pdfUrl) {

        extraContent = `
            <a
                href="${resource.pdfUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="resource-download-btn">

                <i data-lucide="download"></i>
                Open / Download PDF

            </a>
        `;
    }

    document.getElementById("modalBody").innerHTML =
        resource.content + extraContent;

    document.getElementById("modalActions").innerHTML = `
        <button
            type="button"
            class="resource-complete-btn ${isCompleted ? "is-completed" : ""}"
            id="markCompletedBtn"
            data-id="${resource.id}">

            <i data-lucide="${isCompleted ? "check-circle" : "circle-check"}"></i>

            ${isCompleted ? "Mark as Not Completed" : "Mark as Completed"}

        </button>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (window.lucide) {
        lucide.createIcons();
    }
}


// ==========================================
// 13. CLOSE RESOURCE MODAL
// ==========================================

function closeResource() {

    modal.classList.remove("active");
    document.body.style.overflow = "";

    const iframe = modal.querySelector("iframe");

    if (iframe) {
        iframe.src = "about:blank";
    }
}


// ==========================================
// 14. MODAL CLOSE EVENTS
// ==========================================

modal.querySelector(".resource-modal-close")
    .addEventListener("click", closeResource);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeResource();
    }

});

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("active")
    ) {
        closeResource();
    }

});


// ==========================================
// 15. RESOURCE CARD CLICK EVENTS
// ==========================================

resourceGrid.addEventListener("click", event => {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const resourceId = Number(button.dataset.id);

    if (button.dataset.action === "bookmark") {
        toggleBookmark(resourceId);
    }

    if (button.dataset.action === "view") {
        openResource(resourceId);
    }

});


// ==========================================
// 16. COMPLETION BUTTON EVENT
// ==========================================

document.getElementById("modalActions")
    .addEventListener("click", event => {

        const button = event.target.closest("#markCompletedBtn");

        if (!button) return;

        const resourceId = Number(button.dataset.id);

        toggleCompleted(resourceId);

    });


// ==========================================
// 17. SAVED RESOURCES FILTER
// ==========================================

if (savedFilterButton) {

    savedFilterButton.addEventListener("click", () => {

        activeView = activeView === "saved" ? "all" : "saved";

        savedFilterButton.classList.toggle(
            "active",
            activeView === "saved"
        );

        savedFilterButton.innerHTML = activeView === "saved"
            ? `<i data-lucide="bookmark"></i> Show All Resources`
            : `<i data-lucide="bookmark"></i> My Saved Resources`;

        if (window.lucide) {
            lucide.createIcons();
        }

        filterResources();

    });

}


// ==========================================
// 18. SEARCH EVENT
// ==========================================

resourceSearch.addEventListener("input", filterResources);


// ==========================================
// 19. CATEGORY FILTER EVENT
// ==========================================

resourceFilter.addEventListener("change", filterResources);


// ==========================================
// 20. RESOURCE TYPE BUTTONS
// ==========================================

document.querySelectorAll(".resource-type-card").forEach(button => {

    button.addEventListener("click", () => {

        activeView = "all";

        if (savedFilterButton) {

            savedFilterButton.classList.remove("active");

            savedFilterButton.innerHTML = `
                <i data-lucide="bookmark"></i>
                My Saved Resources
            `;
        }

        resourceFilter.value = button.dataset.type;

        filterResources();

        document.getElementById("resourceLibrary")?.scrollIntoView({
            behavior: "smooth"
        });

        if (window.lucide) {
            lucide.createIcons();
        }

    });

});


// ==========================================
// 21. INITIALIZE PAGE
// ==========================================

updateProgressSummary();
renderResources(resources);

if (window.lucide) {
    lucide.createIcons();
}

initializeUserProgress();
