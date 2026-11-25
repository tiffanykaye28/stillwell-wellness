
document.addEventListener("DOMContentLoaded", async () => {
    const supabase = window.supabaseClient;

    const recommendationGrid = document.getElementById("recommendationGrid");
    const recommendationNotice = document.getElementById("recommendationNotice");
    const activityHistory = document.getElementById("activityHistory");

    const recommendations = [
        {
            id: "breathing",
            title: "Guided Breathing Exercise",
            category: "Relaxation",
            icon: "🌿",
            duration: "5 minutes",
            description: "Practice slow, controlled breathing to help you pause, relax, and focus on the present moment.",
            moods: ["anxious", "stressed", "sad", "angry"],
            assessments: ["stress", "anxiety"],
            reasons: ["academic", "school", "work", "personal", "family"],
            why: "A short breathing exercise may help when you are experiencing stress or anxious feelings."
        },
        {
            id: "journaling",
            title: "Mindful Journaling",
            category: "Self-care",
            icon: "📖",
            duration: "10 minutes",
            description: "Write down your thoughts, feelings, or experiences. There is no right or wrong way to express yourself.",
            moods: ["sad", "anxious", "angry", "neutral"],
            assessments: ["emotional", "esteem"],
            reasons: ["personal", "family", "relationship"],
            why: "Writing about your experiences can help you reflect on your thoughts and emotions."
        },
        {
            id: "study-break",
            title: "Take a Study Break",
            category: "Study and Balance",
            icon: "☕",
            duration: "10–15 minutes",
            description: "Step away from your study area, stretch, drink water, or enjoy a short break before returning to your tasks.",
            moods: ["stressed", "tired", "anxious"],
            assessments: ["stress", "burnout"],
            reasons: ["academic", "school", "work"],
            why: "Your recent records suggest that school or work-related pressure may be affecting your well-being."
        },
        {
            id: "sleep-routine",
            title: "Build a Healthy Sleep Routine",
            category: "Healthy Habits",
            icon: "🌙",
            duration: "15 minutes",
            description: "Prepare for rest by reducing screen time, keeping a consistent bedtime, and creating a comfortable sleeping environment.",
            moods: ["tired", "sad", "stressed"],
            assessments: ["sleep", "burnout"],
            reasons: ["academic", "school", "work"],
            why: "A consistent sleep routine can support your daily energy and overall well-being."
        },
        {
            id: "walk",
            title: "Gentle Outdoor Walk",
            category: "Physical Wellness",
            icon: "🌳",
            duration: "10–20 minutes",
            description: "Take a comfortable walk, notice your surroundings, and allow yourself time away from your usual routine.",
            moods: ["sad", "stressed", "angry", "tired"],
            assessments: ["stress", "burnout", "emotional"],
            reasons: ["academic", "personal", "family"],
            why: "A little movement and a change of environment may help you refresh your mind."
        },
        {
            id: "social-connection",
            title: "Connect with Someone You Trust",
            category: "Social Wellness",
            icon: "💜",
            duration: "10 minutes",
            description: "Reach out to a trusted friend, family member, classmate, or another person you feel comfortable talking to.",
            moods: ["sad", "anxious", "lonely"],
            assessments: ["social", "emotional"],
            reasons: ["family", "relationship", "personal"],
            why: "Connecting with someone you trust may help you feel supported and less alone."
        },
        {
            id: "self-kindness",
            title: "Practice Self-Kindness",
            category: "Self-care",
            icon: "🌸",
            duration: "5 minutes",
            description: "Take a moment to recognize your efforts. Remind yourself that learning and growing take time.",
            moods: ["sad", "anxious", "angry"],
            assessments: ["esteem", "emotional"],
            reasons: ["personal", "academic", "relationship"],
            why: "A self-kindness activity may be useful when you are being hard on yourself."
        },
        {
            id: "gratitude",
            title: "Three Things to Appreciate",
            category: "Positive Reflection",
            icon: "✨",
            duration: "5 minutes",
            description: "Write down three small things you appreciate today, even if they seem simple.",
            moods: ["neutral", "sad", "tired"],
            assessments: ["emotional", "esteem"],
            reasons: ["personal", "family"],
            why: "Positive reflection can encourage you to notice meaningful moments in your day."
        }
    ];

    let currentUser = null;
    let currentRecommendations = [];

    // Check Supabase connection
    if (!supabase) {
        showError("Supabase connection was not found. Please check your js/supabase.js file.");
        return;
    }

    // Check logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        window.location.href = "index.html";
        return;
    }

    currentUser = user;

    // Initial page setup
    document.getElementById("profileInitial").textContent =
        (user.email || "S").charAt(0).toUpperCase();

    document.getElementById("todayDate").textContent =
        new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

    // Sidebar toggle
    document.getElementById("sidebarToggle").addEventListener("click", () => {
        document.getElementById("dashboardContainer").classList.toggle("collapsed");
    });

    // Logout
    document.getElementById("logoutButton").addEventListener("click", async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert("Unable to log out. Please try again.");
            return;
        }

        window.location.href = "index.html";
    });

    // Refresh recommendations
    document.getElementById("refreshButton").addEventListener("click", loadRecommendations);

    // Normalize text for matching
    function normalize(value) {
        return String(value || "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]/g, "");
    }

    // Convert database values into searchable text
    function getSearchText(value) {
        if (Array.isArray(value)) {
            return value.map(item => normalize(item)).join(" ");
        }

        return normalize(value);
    }

    // Match moods with recommendation rules
    function matchesMood(mood, allowedMoods) {
        const value = normalize(mood);

        return allowedMoods.some(item => value.includes(item));
    }

    // Match assessment type
    function matchesAssessment(type, allowedTypes) {
        const value = normalize(type);

        return allowedTypes.some(item => value.includes(item));
    }

    // Match reasons
    function matchesReason(reasons, allowedReasons) {
        const value = getSearchText(reasons);

        return allowedReasons.some(item => value.includes(item));
    }

    function showError(message) {
        recommendationNotice.textContent = message;
        recommendationNotice.className = "notice error";
    }

    // Load mood and assessment records
    async function loadRecommendations() {
        recommendationNotice.textContent = "Loading your wellness recommendations...";
        recommendationNotice.className = "notice";

        recommendationGrid.innerHTML = "";

        const [moodResponse, assessmentResponse] = await Promise.all([
            supabase
                .from("mood_logs")
                .select("mood, reason_categories, created_at")
                .eq("user_id", currentUser.id)
                .order("created_at", { ascending: false })
                .limit(10),

            supabase
                .from("assessment_results")
                .select("assessment_type, score, result, created_at")
                .eq("user_id", currentUser.id)
                .order("created_at", { ascending: false })
                .limit(10)
        ]);

        if (moodResponse.error) {
            showError("Unable to load Mood Tracker records: " + moodResponse.error.message);
            return;
        }

        if (assessmentResponse.error) {
            showError("Unable to load Self-Assessment records: " + assessmentResponse.error.message);
            return;
        }

        const moods = moodResponse.data || [];
        const assessments = assessmentResponse.data || [];

        displayLatestMood(moods);
        displayLatestAssessment(assessments);

        currentRecommendations = getPersonalizedRecommendations(moods, assessments);

        document.getElementById("recommendationCount").textContent =
            currentRecommendations.length;

        if (moods.length === 0 && assessments.length === 0) {
            recommendationNotice.textContent =
                "You do not have Mood Tracker or Self-Assessment records yet. These are starter suggestions, not personalized recommendations. Complete either feature to receive suggestions based on your records.";
        } else {
            recommendationNotice.textContent =
                "Your recommendations are matched using your recent mood check-ins and self-assessment results.";
        }

        renderRecommendations(currentRecommendations);
        await loadActivityHistory();
        
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // Display latest mood
    function displayLatestMood(moods) {
        const moodElement = document.getElementById("latestMood");
        const dateElement = document.getElementById("moodDate");

        if (!moods.length) {
            moodElement.textContent = "No records yet";
            dateElement.textContent = "Complete a mood check-in";
            return;
        }

        moodElement.textContent = moods[0].mood || "Not specified";
        dateElement.textContent = formatDate(moods[0].created_at);
    }

    // Display latest assessment
    function displayLatestAssessment(assessments) {
        const assessmentElement = document.getElementById("latestAssessment");
        const dateElement = document.getElementById("assessmentDate");

        if (!assessments.length) {
            assessmentElement.textContent = "No records yet";
            dateElement.textContent = "Complete a self-assessment";
            return;
        }

        assessmentElement.textContent =
            formatAssessmentName(assessments[0].assessment_type);

        dateElement.textContent = formatDate(assessments[0].created_at);
    }

    function formatAssessmentName(type) {
        if (!type) return "Assessment";

        return String(type)
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }

    function formatDate(date) {
        if (!date) return "Date unavailable";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    // Build personalized recommendations
    function getPersonalizedRecommendations(moods, assessments) {
        const latestMood = moods[0];
        const latestAssessment = assessments[0];

        const matched = recommendations.map(item => {
            let score = 0;
            let reasons = [];

            // Recent mood matching
            if (latestMood && matchesMood(latestMood.mood, item.moods)) {
                score += 3;
                reasons.push("Your recent mood check-in");
            }

            // Recent assessment matching
            if (
                latestAssessment &&
                matchesAssessment(latestAssessment.assessment_type, item.assessments)
            ) {
                score += 3;
                reasons.push("Your latest self-assessment");
            }

            // Mood reason matching
            if (
                latestMood &&
                matchesReason(latestMood.reason_categories, item.reasons)
            ) {
                score += 1;
                reasons.push("The reasons you selected in your Mood Tracker");
            }

            return {
                ...item,
                score,
                reasons
            };
        });

        const personalized = matched
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);

        // Show general suggestions if there are no matching records
        if (personalized.length === 0) {
            return recommendations.slice(0, 4).map(item => ({
                ...item,
                score: 0,
                reasons: []
            }));
        }

        return personalized;
    }

    // Render recommendation cards
    function renderRecommendations(items) {
        recommendationGrid.innerHTML = "";

        if (!items.length) {
            recommendationGrid.innerHTML =
                '<p class="muted">No recommendations are available right now.</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement("article");
            card.className = "recommendation-card";

            const whyText = item.reasons.length
                ? item.reasons.join(", ") + "."
                : "A general wellness activity you may choose to try.";

            card.innerHTML = `
                <div class="card-top">
                    <div class="activity-icon">${item.icon}</div>
                    <span class="activity-category">${item.category}</span>
                </div>

                <h3>${item.title}</h3>

                <p class="description">${item.description}</p>

                <div class="why-box">
                    <strong>WHY THIS APPEARS</strong>
                    <p>${item.why}</p>
                    <p class="match-reason">Matched with: ${whyText}</p>
                </div>

                <div class="card-meta">
                    <span><i data-lucide="clock"></i> ${item.duration}</span>
                    <span><i data-lucide="heart"></i> Wellness activity</span>
                </div>

                <div class="card-actions">
                    <button class="complete-button" type="button"
                        data-id="${item.id}">
                        Mark as Completed
                    </button>

                    <button class="feedback-button" type="button"
                        data-id="${item.id}">
                        Feedback
                    </button>
                </div>
            `;

            recommendationGrid.appendChild(card);
        });

        // Attach button events
        recommendationGrid.querySelectorAll(".complete-button").forEach(button => {
            button.addEventListener("click", () => {
                markCompleted(button.dataset.id, button);
            });
        });

        recommendationGrid.querySelectorAll(".feedback-button").forEach(button => {
            button.addEventListener("click", () => {
                submitFeedback(button.dataset.id);
            });
        });

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // Save completed activity
    async function markCompleted(id, button) {
        button.disabled = true;
        button.textContent = "Saving...";

        const { error } = await supabase
            .from("recommendation_activity")
            .upsert({
                user_id: currentUser.id,
                recommendation_id: id,
                completed: true,
                updated_at: new Date().toISOString()
            }, {
                onConflict: "user_id,recommendation_id"
            });

        if (error) {
            button.disabled = false;
            button.textContent = "Mark as Completed";
            alert("Unable to save activity: " + error.message);
            return;
        }

        button.textContent = "Completed ✓";
        await loadActivityHistory();
    }

    // Save helpful / not helpful feedback
    async function submitFeedback(id) {
        const answer = prompt(
            "Was this recommendation helpful?\n\nType YES or NO:"
        );

        if (answer === null) return;

        const value = normalize(answer);

        if (value !== "yes" && value !== "no") {
            alert("Please type YES or NO.");
            return;
        }

        const { error } = await supabase
            .from("recommendation_activity")
            .upsert({
                user_id: currentUser.id,
                recommendation_id: id,
                helpful: value === "yes",
                updated_at: new Date().toISOString()
            }, {
                onConflict: "user_id,recommendation_id"
            });

        if (error) {
            alert("Unable to save feedback: " + error.message);
            return;
        }

        alert("Thank you for your feedback!");
        await loadActivityHistory();
    }

    // Load activity history
    async function loadActivityHistory() {
        const { data, error } = await supabase
            .from("recommendation_activity")
            .select("recommendation_id, completed, helpful, updated_at")
            .eq("user_id", currentUser.id)
            .order("updated_at", { ascending: false });

        if (error) {
            activityHistory.innerHTML =
                '<p class="muted">Unable to load activity history.</p>';
            return;
        }

        if (!data || data.length === 0) {
            activityHistory.innerHTML =
                '<p class="muted">You have not recorded any recommendation activities yet.</p>';
            return;
        }

        activityHistory.innerHTML = "";

        data.forEach(activity => {
            const item = recommendations.find(
                recommendation => recommendation.id === activity.recommendation_id
            );

            const title = item ? item.title : activity.recommendation_id;

            let status = "Not completed";
            let statusClass = "not-completed";

            if (activity.completed) {
                status = "Completed";
                statusClass = "";
            }

            let feedback = "";

            if (activity.helpful === true) {
                feedback = " • Helpful";
            } else if (activity.helpful === false) {
                feedback = " • Not helpful";
            }

            const historyItem = document.createElement("div");
            historyItem.className = "history-item";

            historyItem.innerHTML = `
                <div class="history-info">
                    <div class="activity-icon">🌷</div>
                    <div>
                        <h4>${title}</h4>
                        <p>${formatDate(activity.updated_at)}${feedback}</p>
                    </div>
                </div>

                <span class="history-status ${statusClass}">
                    ${status}
                </span>
            `;

            activityHistory.appendChild(historyItem);
        });
    }

    // Start the page
    await loadRecommendations();
});
