
document.addEventListener("DOMContentLoaded", async function () {

    // PREVENT DUPLICATE CHATBOT
    if (document.getElementById("aiChatWidget")) return;

    // LOAD CHATBOT CSS
    if (!document.querySelector("#stillwell-ai-css")) {
        const css = document.createElement("link");

        css.id = "stillwell-ai-css";
        css.rel = "stylesheet";
        css.href = "css/css/ai-assistant.css";

        document.head.appendChild(css);
    }

    // LOAD REUSABLE CHATBOT HTML
    try {
        const response = await fetch("ai-assistant.html");

        if (!response.ok) {
            throw new Error("Unable to load AI Assistant component.");
        }

        const html = await response.text();

        const container = document.createElement("div");
        container.innerHTML = html;

        document.body.appendChild(container);

    } catch (error) {
        console.error("StillWell Assistant:", error);
        return;
    }

    // GET CHATBOT ELEMENTS
    const chatButton = document.getElementById("aiChatButton");
    const chatWidget = document.getElementById("aiChatWidget");
    const closeButton = document.getElementById("aiCloseButton");

    const welcomeScreen = document.getElementById("aiWelcomeScreen");
    const chatScreen = document.getElementById("aiChatScreen");

    const modeButtons = document.querySelectorAll(".ai-mode-button");
    const backButton = document.getElementById("aiBackButton");

    const modeTitle = document.getElementById("aiModeTitle");
    const chatForm = document.getElementById("aiChatForm");

    const messageInput = document.getElementById("aiMessageInput");
    const messages = document.getElementById("aiMessages");

    let currentMode = "";

    // OPEN CHAT
    chatButton.addEventListener("click", function () {
        chatWidget.hidden = false;
        chatButton.hidden = true;
    });

    // CLOSE CHAT
    closeButton.addEventListener("click", function () {
        chatWidget.hidden = true;
        chatButton.hidden = false;
    });

    // SELECT CHAT MODE
    modeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            currentMode = button.dataset.mode;

            welcomeScreen.hidden = true;
            chatScreen.hidden = false;

            messages.innerHTML = "";

            if (currentMode === "ask") {

                modeTitle.textContent = "Ask StillWell";

                showBotMessage(
                    "Hello! I'm StillWell. You can ask me about the system, its features, and how to use them."
                );

            } else {

                modeTitle.textContent = "Talk to StillWell";

                showBotMessage(
                    "Hi! I'm glad you're here. You can share what's on your mind. I'm here to listen without judgment. 💗"
                );

            }

        });

    });

    // BACK TO WELCOME SCREEN
    backButton.addEventListener("click", function () {

        chatScreen.hidden = true;
        welcomeScreen.hidden = false;

        currentMode = "";
        messages.innerHTML = "";

    });

    // DISPLAY BOT MESSAGE
    function showBotMessage(message) {

        const messageElement = document.createElement("div");

        messageElement.className = "ai-message bot";
        messageElement.textContent = message;

        messages.appendChild(messageElement);

        messages.scrollTop = messages.scrollHeight;
    }

    // DISPLAY USER MESSAGE
    function showUserMessage(message) {

        const messageElement = document.createElement("div");

        messageElement.className = "ai-message user";
        messageElement.textContent = message;

        messages.appendChild(messageElement);

        messages.scrollTop = messages.scrollHeight;
    }

    // SEND MESSAGE
    chatForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = messageInput.value.trim();

        if (!message || !currentMode) return;

        showUserMessage(message);

        messageInput.value = "";

        // TEMPORARY DEMO RESPONSE
        setTimeout(function () {

            if (currentMode === "ask") {

                showBotMessage(
                    "Thanks for your question! I'm currently in demo mode. The full StillWell system assistance will be connected soon. 💜"
                );

            } else {

                showBotMessage(
                    "Thank you for sharing that with me. Your feelings matter, and you deserve support. Would you like to tell me a little more about what's happening? 💗"
                );

            }

        }, 700);

    });

});
