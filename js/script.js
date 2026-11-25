
// ===============================
// SHOW / HIDE PASSWORD
// ===============================

document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", function () {

        const targetId = this.getAttribute("data-target");
        const input = document.getElementById(targetId);

        if (!input) return;

        if (input.type === "password") {
            input.type = "text";
            this.querySelector("span").textContent = "🙈";
        } else {
            input.type = "password";
            this.querySelector("span").textContent = "👁";
        }

    });

});


// ===============================
// REGISTRATION WITH SUPABASE
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordError = document.getElementById("passwordError");

    const submitButton = registerForm.querySelector('button[type="submit"]');

    const successModal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    const successButton = document.getElementById("successButton");

    function showRegistrationError(message) {
        passwordError.textContent = message;
        passwordError.classList.add("show");
    }

    function showSuccess(message) {

        if (successModal && successMessage && successButton) {

            successMessage.textContent = message;
            successButton.textContent = "Back to Login";

            successModal.classList.add("show");

            successButton.onclick = function () {
                window.location.href = "index.html";
            };

        } else {
            showRegistrationError(message);
        }

    }

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const passwordWrapper = password.closest(".password-wrapper");
        const confirmWrapper = confirmPassword.closest(".password-wrapper");

        passwordWrapper.classList.remove("error");
        confirmWrapper.classList.remove("error");
        passwordError.classList.remove("show");

        // CHECK PASSWORD LENGTH

        if (password.value.length < 8) {

            showRegistrationError(
                "Password must be at least 8 characters."
            );

            passwordWrapper.classList.add("error");
            return;

        }

        // CHECK PASSWORD MATCH

        if (password.value !== confirmPassword.value) {

            showRegistrationError(
                "Passwords do not match. Please try again."
            );

            passwordWrapper.classList.add("error");
            confirmWrapper.classList.add("error");
            return;

        }

        // CHECK SUPABASE CONNECTION

        if (!window.supabaseClient) {

            showRegistrationError(
                "Unable to connect to the database. Please try again."
            );

            return;

        }

        try {

            submitButton.disabled = true;
            submitButton.textContent = "Creating Account...";

            const { data, error } =
                await window.supabaseClient.auth.signUp({

                    email: email.value.trim().toLowerCase(),
                    password: password.value,

                    options: {
                        data: {
                            full_name: fullname.value.trim()
                        }
                    }

                });

            if (error) {
                throw error;
            }

            // CHECK POSSIBLE EXISTING EMAIL

            if (
                data.user &&
                data.user.identities &&
                data.user.identities.length === 0
            ) {

                showRegistrationError(
                    "This email address may already be registered. Please try logging in."
                );

                return;

            }

            // EMAIL VERIFICATION REQUIRED

            if (!data.session) {

                registerForm.reset();

                showSuccess(
                    "Your account registration was received! Please check your email and click the verification link before logging in."
                );

                return;

            }

            // ACCOUNT CREATED

            registerForm.reset();

            showSuccess(
                "Your StillWell account has been created successfully. You can now log in."
            );

        } catch (error) {

            console.error("Registration error:", error);

            const message = (error.message || "").toLowerCase();

            if (
                message.includes("rate limit") ||
                message.includes("too many requests")
            ) {

                showRegistrationError(
                    "Verification email temporarily unavailable. Please try again later."
                );

            } else if (
                message.includes("already registered") ||
                message.includes("already exists")
            ) {

                showRegistrationError(
                    "This email address is already registered. Please log in instead."
                );

            } else {

                showRegistrationError(
                    "Registration could not be completed. Please try again later."
                );

            }

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Create Account →";

        }

    });


    // CLEAR REGISTRATION ERRORS WHILE TYPING

    [password, confirmPassword, email].forEach(input => {

        input.addEventListener("input", function () {

            passwordError.classList.remove("show");

            passwordWrapperClear();
        });

    });

    function passwordWrapperClear() {

        password.closest(".password-wrapper")
            .classList.remove("error");

        confirmPassword.closest(".password-wrapper")
            .classList.remove("error");

    }

}


// ===============================
// LOGIN WITH SUPABASE
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    const loginEmail = document.getElementById("email");
    const loginPassword = document.getElementById("password");
    const loginError = document.getElementById("loginError");

    const loginButton = loginForm.querySelector('button[type="submit"]');

    function showLoginError(message) {

        loginError.textContent = message;
        loginError.classList.add("show");

    }

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        loginError.textContent = "";
        loginError.classList.remove("show");

        // CHECK EMPTY EMAIL

        if (!loginEmail.value.trim()) {

            showLoginError(
                "Please enter your email address."
            );

            loginEmail.focus();
            return;

        }

        // CHECK EMPTY PASSWORD

        if (!loginPassword.value) {

            showLoginError(
                "Please enter your password."
            );

            loginPassword.focus();
            return;

        }

        // CHECK SUPABASE CONNECTION

        if (!window.supabaseClient) {

            showLoginError(
                "Unable to connect to the database. Please try again."
            );

            return;

        }

        try {

            loginButton.disabled = true;
            loginButton.textContent = "Logging in...";

            // AUTHENTICATE USER

            const { data, error } =
                await window.supabaseClient.auth.signInWithPassword({

                    email: loginEmail.value.trim().toLowerCase(),
                    password: loginPassword.value

                });

            if (error) {

                const message = (error.message || "").toLowerCase();

                // CHECK EMAIL VERIFICATION

                if (
                    message.includes("email not confirmed") ||
                    error.code === "email_not_confirmed"
                ) {

                    throw new Error(
                        "Your email is not verified yet. Please check your inbox and verify your email first."
                    );

                }

                // INVALID EMAIL OR PASSWORD

                if (
                    message.includes("invalid login credentials") ||
                    error.code === "invalid_credentials"
                ) {

                    throw new Error(
                        "Invalid email or password. Please check your login details."
                    );

                }

                throw new Error(
                    "Login failed. Please try again later."
                );

            }

            // SUCCESSFUL LOGIN

            if (data.session) {

                window.location.href = "dashboard.html";

            }

        } catch (error) {

            console.error("Login error:", error);

            showLoginError(error.message);

        } finally {

            loginButton.disabled = false;
            loginButton.innerHTML = 'Log in <span>→</span>';

        }

    });


    // CLEAR LOGIN ERRORS WHILE TYPING

    [loginEmail, loginPassword].forEach(input => {

        input.addEventListener("input", function () {

            loginError.textContent = "";
            loginError.classList.remove("show");

        });

    });

}


// =====================================
// STUDENT DASHBOARD - SUPABASE SESSION
// =====================================

const welcomeName = document.getElementById("welcomeName");

if (welcomeName) {

    async function loadStudentDashboard() {

        try {

            // Check active login session
            const { data: sessionData, error: sessionError } =
                await window.supabaseClient.auth.getSession();

            if (sessionError) throw sessionError;

            const session = sessionData.session;

            // If not logged in, return to login page
            if (!session) {
                window.location.href = "index.html";
                return;
            }

            // Get student's profile from Supabase
            const { data: profile, error: profileError } =
                await window.supabaseClient
                    .from("profiles")
                    .select("full_name, role")
                    .eq("id", session.user.id)
                    .single();

            if (profileError) throw profileError;

            // Only students can use the student dashboard
            if (profile.role !== "student") {
                alert("This page is for student accounts only.");
                await window.supabaseClient.auth.signOut();
                window.location.href = "index.html";
                return;
            }

            // Display actual student name
            const name = profile.full_name || "Student";

            welcomeName.textContent = name;

            const studentName = document.getElementById("studentName");

            if (studentName) {
                studentName.textContent = name;
            }

        } catch (error) {

            console.error("Dashboard error:", error);

                alert("Dashboard error: " + error.message);
            await window.supabaseClient.auth.signOut();

            window.location.href = "index.html";
        }
    }

    loadStudentDashboard();
}

