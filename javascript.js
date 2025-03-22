// Name validation
const nameInput = document.getElementById("name");
const nameMessage = document.getElementById("name-message");

nameInput.addEventListener("focus", () => nameMessage.style.display = "block");
nameInput.addEventListener("blur", () => nameMessage.style.display = "none");

// Email input
const emailInput = document.getElementById("email");
const emailMessage = document.getElementById("email-message");

emailInput.addEventListener("focus", () => emailMessage.style.display = "block");
emailInput.addEventListener("blur", () => emailMessage.style.display = "none");

// Password validation
const passwordInput = document.getElementById("password");
const passwordMessageItems = document.getElementsByClassName("password-message-item");
const passwordMessage = document.getElementById("password-message");

passwordInput.addEventListener("focus", () => passwordMessage.style.display = "block");
passwordInput.addEventListener("blur", () => passwordMessage.style.display = "none");

passwordInput.addEventListener("keyup", () => {
    const rules = [
        { regex: /[a-z]/, index: 0 }, // Lowercase
        { regex: /[A-Z]/, index: 1 }, // Uppercase
        { regex: /[0-9]/, index: 2 }, // Number
        { regex: /[@$!%*?&_#]/, index: 3 }, // Special Character
        { regex: /.{8,}/, index: 4 } // Minimum Length
    ];

    rules.forEach(rule => {
        if (passwordInput.value.match(rule.regex)) {
            passwordMessageItems[rule.index].classList.add("valid");
            passwordMessageItems[rule.index].classList.remove("invalid");
        } else {
            passwordMessageItems[rule.index].classList.add("invalid");
            passwordMessageItems[rule.index].classList.remove("valid");
        }
    });
});

// Confirm password validation
const confirmPasswordInput = document.getElementById("confirmPassword");
const errorElement = document.getElementById("passwordError");

confirmPasswordInput.addEventListener("input", validateForm);

function validateForm() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (!confirmPassword) {
        errorElement.textContent = "";
        return;
    }

    const conditions = [
        { test: password.length >= 8, message: "Password must be at least 8 characters long." },
        { test: /[A-Z]/.test(password), message: "Password must have at least one uppercase letter." },
        { test: /[a-z]/.test(password), message: "Password must have at least one lowercase letter." },
        { test: /[0-9]/.test(password), message: "Password must have at least one number." },
        { test: /[@$!%*?&_#]/.test(password), message: "Password must have at least one special character (@$!%*?&_#)." },
        { test: password === confirmPassword, message: "Passwords do not match." }
    ];

    const failedCondition = conditions.find(condition => !condition.test);

    if (failedCondition) {
        errorElement.textContent = failedCondition.message;
        errorElement.classList.add("error");
        errorElement.classList.remove("success");
    } else {
        errorElement.textContent = "✔ Passwords match!";
        errorElement.classList.add("success");
        errorElement.classList.remove("error");
    }
}
// Password toggle functionality
function togglePasswordVisibility(id, toggleId) {
    const passwordField = document.getElementById(id);
    const toggleButton = document.getElementById(toggleId);

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.innerHTML = "&#128065;"; // Open eye icon
    } else {
        passwordField.type = "password";
        toggleButton.innerHTML = "&#128064;"; // Closed eye icon
    }
}

// Attach event listeners for password visibility toggle
document.getElementById("togglePassword").addEventListener("click", function () {
    togglePasswordVisibility("password", "togglePassword");
});
document.getElementById("toggleConfirmPassword").addEventListener("click", function () {
    togglePasswordVisibility("confirmPassword", "toggleConfirmPassword");
});
