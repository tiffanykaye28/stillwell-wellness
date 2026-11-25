
const assessments = [
    {
        id: "stress",
        title: "Stress",
        icon: "🌿",
        color: "purple",
        description: "Reflect on daily pressure, responsibilities, and how you manage stressful situations.",
        questions: [
            "I feel overwhelmed by the responsibilities I need to finish.",
            "I find it difficult to relax after a busy day.",
            "Small problems sometimes feel difficult to handle.",
            "I feel pressured by school or personal responsibilities.",
            "I have difficulty managing several tasks at once.",
            "I find myself worrying about things I cannot control.",
            "I feel mentally exhausted after completing my daily tasks.",
            "I give myself enough time to rest and recover."
        ]
    },
    {
        id: "anxiety",
        title: "Anxiety",
        icon: "🦋",
        color: "blue",
        description: "Reflect on worries, nervousness, and situations that make you feel uneasy.",
        questions: [
            "I worry about things that might happen in the future.",
            "I feel nervous when facing unfamiliar situations.",
            "I find it difficult to stop worrying once I start.",
            "I feel uneasy when I have many things to do.",
            "I overthink situations even after they have ended.",
            "I feel worried about what other people think of me.",
            "I have difficulty feeling calm during uncertain situations.",
            "I feel comfortable asking someone for support when I am worried."
        ]
    },
    {
        id: "emotional",
        title: "Emotional Well-being",
        icon: "💗",
        color: "pink",
        description: "Understand your emotions, feelings, and ability to express yourself.",
        questions: [
            "I can recognize and understand my emotions.",
            "I feel comfortable expressing how I truly feel.",
            "I allow myself to experience difficult emotions.",
            "I can recover emotionally after a difficult day.",
            "I feel positive about myself most of the time.",
            "I have someone I can talk to when I feel down.",
            "I make time for activities that make me happy.",
            "I treat myself with kindness during difficult moments."
        ]
    },
    {
        id: "burnout",
        title: "Academic Burnout",
        icon: "📚",
        color: "orange",
        description: "Reflect on your academic motivation, workload, and learning experiences.",
        questions: [
            "I feel exhausted because of my academic responsibilities.",
            "I sometimes lose motivation to complete schoolwork.",
            "I feel that my academic workload is difficult to manage.",
            "I struggle to concentrate on my lessons.",
            "I feel tired even before starting my school activities.",
            "I have difficulty balancing school and personal time.",
            "I sometimes feel disconnected from my studies.",
            "I make time for breaks while studying."
        ]
    },
    {
        id: "sleep",
        title: "Sleep & Rest",
        icon: "🌙",
        color: "purple",
        description: "Reflect on your sleeping habits, rest, and daily energy.",
        questions: [
            "I get enough sleep to feel rested.",
            "I have difficulty falling asleep at night.",
            "I wake up feeling tired.",
            "I maintain a regular sleeping schedule.",
            "I use my phone or other devices close to bedtime.",
            "I feel sleepy during my daily activities.",
            "I give myself enough time to rest.",
            "My sleeping habits support my daily routine."
        ]
    },
    {
        id: "social",
        title: "Social & Relationships",
        icon: "🤝",
        color: "green",
        description: "Reflect on your relationships, communication, and sense of connection.",
        questions: [
            "I feel supported by the people around me.",
            "I find it comfortable to communicate my thoughts.",
            "I feel included in my social circles.",
            "I can set healthy boundaries with other people.",
            "I have someone I can trust with personal concerns.",
            "I sometimes feel lonely even when I am around others.",
            "I feel respected in my relationships.",
            "I make time to connect with people who matter to me."
        ]
    },
    {
        id: "esteem",
        title: "Self-Esteem",
        icon: "✨",
        color: "gold",
        description: "Explore your self-confidence, self-worth, and personal growth.",
        questions: [
            "I feel confident about my abilities.",
            "I recognize my personal strengths.",
            "I accept that I make mistakes sometimes.",
            "I compare myself to other people.",
            "I feel proud of my achievements, even small ones.",
            "I believe I deserve kindness and respect.",
            "I am comfortable being myself around others.",
            "I appreciate the progress I make in life."
        ]
    }
];

const choices = [
    { label: "Never", value: 0 },
    { label: "Rarely", value: 1 },
    { label: "Sometimes", value: 2 },
    { label: "Often", value: 3 }
];

/* VARIABLES */

let currentAssessment = null;
let currentQuestion = 0;
let answers = [];

/* HTML ELEMENTS */

const categoryView = document.getElementById("categoryView");
const assessmentGrid = document.getElementById("assessmentGrid");
const questionnaireView = document.getElementById("questionnaireView");
const resultView = document.getElementById("resultView");

const questionCategory = document.getElementById("questionCategory");
const questionnaireTitle = document.getElementById("questionnaireTitle");
const questionnaireDescription = document.getElementById("questionnaireDescription");
const questionProgressText = document.getElementById("questionProgressText");
const questionProgressPercent = document.getElementById("questionProgressPercent");
const questionProgressBar = document.getElementById("questionProgressBar");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const answerMessage = document.getElementById("answerMessage");

const previousQuestion = document.getElementById("previousQuestion");
const nextQuestion = document.getElementById("nextQuestion");
const submitAssessment = document.getElementById("submitAssessment");

const resultTitle = document.getElementById("resultTitle");
const resultSummary = document.getElementById("resultSummary");
const resultScore = document.getElementById("resultScore");
const resultLevel = document.getElementById("resultLevel");
const resultRecommendation = document.getElementById("resultRecommendation");

const historyContent = document.getElementById("historyContent");

/* SUPABASE CONNECTION */

const assessmentSupabase = window.supabaseClient;
let currentUser = null;

async function initializeAssessmentPage() {
    if (!assessmentSupabase) {
        alert("Supabase connection is unavailable. Check js/supabase.js.");
        return;
    }

    const { data, error } = await assessmentSupabase.auth.getUser();

    if (error || !data.user) {
        window.location.href = "index.html";
        return;
    }

    currentUser = data.user;

    const initial = (currentUser.email || "S").charAt(0).toUpperCase();

    const avatar = document.getElementById("profileInitial");

    if (avatar) {
        avatar.textContent = initial;
    }

    const nameElement = document.getElementById("userName");

    if (nameElement) {
        nameElement.textContent =
            currentUser.user_metadata?.full_name ||
            currentUser.email ||
            "Student";
    }

    await renderHistory();
}

/* DISPLAY ASSESSMENT CARDS */

function renderAssessments() {
    if (!assessmentGrid) {
        console.error("assessmentGrid element not found.");
        return;
    }

    assessmentGrid.innerHTML = "";

    assessments.forEach((assessment) => {
        const card = document.createElement("article");

        card.className = "assessment-card";

        card.innerHTML = `
            <div class="card-top">
                <div class="card-icon icon-${assessment.color}">
                    ${assessment.icon}
                </div>

                <div class="card-copy">
                    <h3>${assessment.title}</h3>
                    <p>${assessment.description}</p>
                </div>
            </div>

            <div class="card-meta">
                <span>📝 8 questions</span>
                <span>⏱ 3–5 min</span>
            </div>

            <button class="primary-button" type="button">
                Start assessment →
            </button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            startAssessment(assessment.id);
        });

        assessmentGrid.appendChild(card);
    });
}

/* START ASSESSMENT */

function startAssessment(id) {
    currentAssessment = assessments.find(item => item.id === id);

    if (!currentAssessment) return;

    currentQuestion = 0;

    answers = new Array(
        currentAssessment.questions.length
    ).fill(null);

    categoryView.classList.add("hidden");
    resultView.classList.add("hidden");
    questionnaireView.classList.remove("hidden");

    questionnaireTitle.textContent = currentAssessment.title;
    questionnaireDescription.textContent = currentAssessment.description;
    questionCategory.textContent = currentAssessment.title;

    renderQuestion();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* DISPLAY QUESTION */

function renderQuestion() {
    const total = currentAssessment.questions.length;

    const progress = Math.round(
        ((currentQuestion + 1) / total) * 100
    );

    questionNumber.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;

    questionText.textContent =
        currentAssessment.questions[currentQuestion];

    questionProgressText.textContent =
        `Question ${currentQuestion + 1} of ${total}`;

    questionProgressPercent.textContent = `${progress}%`;
    questionProgressBar.style.width = `${progress}%`;

    answerMessage.textContent = "";
    answerOptions.innerHTML = "";

    choices.forEach(choice => {
        const label = document.createElement("label");

        label.className = "answer-option";

        if (answers[currentQuestion] === choice.value) {
            label.classList.add("selected");
        }

        label.innerHTML = `
            <input
                type="radio"
                name="assessmentAnswer"
                value="${choice.value}"
                ${answers[currentQuestion] === choice.value ? "checked" : ""}
            >
            <span>${choice.label}</span>
        `;

        const radio = label.querySelector("input");

        radio.addEventListener("change", () => {
            answers[currentQuestion] = choice.value;

            answerOptions.querySelectorAll(".answer-option")
                .forEach(option => option.classList.remove("selected"));

            label.classList.add("selected");
            answerMessage.textContent = "";
        });

        answerOptions.appendChild(label);
    });

    previousQuestion.disabled = currentQuestion === 0;

    previousQuestion.style.opacity =
        currentQuestion === 0 ? ".45" : "1";

    const lastQuestion = currentQuestion === total - 1;

    nextQuestion.classList.toggle("hidden", lastQuestion);
    submitAssessment.classList.toggle("hidden", !lastQuestion);
}

/* QUESTION NAVIGATION */

nextQuestion.addEventListener("click", () => {
    if (answers[currentQuestion] === null) {
        answerMessage.textContent =
            "Please select an answer before continuing.";
        return;
    }

    currentQuestion++;
    renderQuestion();
});

previousQuestion.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

document.getElementById("backToCategories").addEventListener("click", () => {
    if (!confirm("Leave this assessment? Your current answers will not be saved.")) {
        return;
    }

    showCategories();
});

/* SUBMIT ASSESSMENT */

submitAssessment.addEventListener("click", async () => {
    if (answers[currentQuestion] === null) {
        answerMessage.textContent =
            "Please select an answer before submitting.";
        return;
    }

    const score = answers.reduce(
        (total, value) => total + value, 0
    );

    const maxScore = currentAssessment.questions.length * 3;

    await showResult(score, maxScore);
});

/* RESULTS */

async function showResult(score, maxScore) {
    const percentage = Math.round((score / maxScore) * 100);

    let level;
    let summary;
    let recommendation;

    if (percentage <= 33) {
        level = "Lower reflection range";

        summary = "Your answers indicate fewer frequent concerns in this area at the moment. Continue practicing habits that support your well-being.";

        recommendation = "Keep making time for yourself, maintain supportive routines, and check in with your feelings regularly.";

    } else if (percentage <= 66) {
        level = "Moderate reflection range";

        summary = "Your answers suggest some experiences in this area may be worth paying attention to. Consider which situations affect you most.";

        recommendation = "Try identifying one manageable change you can make this week. Consider talking with someone you trust if you need support.";

    } else {
        level = "Higher reflection range";

        summary = "Your answers suggest this area may deserve more attention right now. Be kind to yourself and remember that asking for help is okay.";

        recommendation = "Consider reaching out to a trusted person, school counselor, or qualified health professional to talk about what you are experiencing.";
    }

    resultTitle.textContent = `${currentAssessment.title} Reflection`;
    resultSummary.textContent = summary;
    resultScore.textContent = `${score} / ${maxScore}`;
    resultLevel.textContent = level;
    resultRecommendation.textContent = recommendation;

    submitAssessment.disabled = true;
    submitAssessment.textContent = "Saving assessment...";

    try {
        const { error } = await assessmentSupabase
            .from("assessment_results")
            .insert({
                user_id: currentUser.id,
                assessment_type: currentAssessment.id,
                score: score,
                result: level
            });

        if (error) throw error;

    } catch (error) {
        console.error("Assessment save error:", error);

        answerMessage.textContent =
            "Unable to save your result. Please try again. " + error.message;

        submitAssessment.disabled = false;
        submitAssessment.textContent = "Submit assessment";

        return;
    }

    submitAssessment.disabled = false;
    submitAssessment.textContent = "Submit assessment";

    questionnaireView.classList.add("hidden");
    categoryView.classList.add("hidden");
    resultView.classList.remove("hidden");

    await renderHistory();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* RETURN TO CATEGORIES */

function showCategories() {
    currentAssessment = null;
    currentQuestion = 0;
    answers = [];

    questionnaireView.classList.add("hidden");
    resultView.classList.add("hidden");
    categoryView.classList.remove("hidden");

    renderHistory();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("finishAssessment").addEventListener("click", showCategories);

document.getElementById("retakeAssessment").addEventListener("click", () => {
    if (currentAssessment) {
        startAssessment(currentAssessment.id);
    }
});

/* ASSESSMENT HISTORY */

async function renderHistory() {
    if (!currentUser || !assessmentSupabase) return;

    historyContent.innerHTML =
        "<p>Loading your assessment history...</p>";

    try {
        const { data: history, error } = await assessmentSupabase
            .from("assessment_results")
            .select("id, assessment_type, score, result, created_at")
            .eq("user_id", currentUser.id)
            .order("created_at", { ascending: false });

        if (error) throw error;

        if (!history || history.length === 0) {
            historyContent.innerHTML = `
                <div class="empty-history">
                    <span>♡</span>
                    <strong>No assessments yet</strong>
                    <p>Your completed assessments will appear here.</p>
                </div>`;

            return;
        }

        historyContent.innerHTML = `
            <table class="history-table">
                <thead>
                    <tr>
                        <th>ASSESSMENT</th>
                        <th>DATE COMPLETED</th>
                        <th>SCORE</th>
                        <th>REFLECTION RANGE</th>
                    </tr>
                </thead>

                <tbody>
                    ${history.map(item => {
                        const assessment = assessments.find(
                            a => a.id === item.assessment_type
                        );

                        const title = assessment
                            ? assessment.title
                            : item.assessment_type;

                        return `
                            <tr>
<td>
    <span class="history-assessment-name">
        <span class="history-icon">${assessment?.icon || "📝"}</span>
        <strong>${escapeHTML(title)}</strong>
    </span>
</td>                                <td>${new Date(item.created_at).toLocaleDateString()}</td>
                                <td>${item.score} / 24</td>
                                <td>
                                    <span class="result-tag">
                                        ${escapeHTML(item.result)}
                                    </span>
                                </td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>`;

    } catch (error) {
        console.error("Assessment history error:", error);

        historyContent.innerHTML =
            "<p>Unable to load assessment history. Check your Supabase table and permissions.</p>";
    }
}

/* ESCAPE HTML */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

/* CLEAR HISTORY */

document.getElementById("clearHistory").addEventListener("click", async () => {
    if (!currentUser || !assessmentSupabase) return;

    if (!confirm("Are you sure you want to clear your assessment history?")) {
        return;
    }

    try {
        const { error } = await assessmentSupabase
            .from("assessment_results")
            .delete()
            .eq("user_id", currentUser.id);

        if (error) throw error;

        await renderHistory();

    } catch (error) {
        console.error("Clear history error:", error);

        alert("Unable to clear assessment history: " + error.message);
    }
});

/* INITIALIZE PAGE */

renderAssessments();
initializeAssessmentPage();
