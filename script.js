// Section control

function showSection(id) {
    const sectionIds = [
        'dashboard', 'work-name', 'screenshots', 'project-links',
        'home-page', 'my-resume', 'my-photos', 'my-signature'
    ];

    sectionIds.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = (sectionId === id) ? 'block' : 'none';
        }
    });
}

// DOM elements

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginModal = document.getElementById("loginModal");
const logoutModal = document.getElementById("logoutModal");
const mainContent = document.querySelector(".main-content");
const sidebar = document.querySelector(".sidebar");

// Show login modal

loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

// Close login modal

function closeLoginModal() {
    loginModal.style.display = "none";
}

// Handle login

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const validEmail = "arnab@gmail.com";
    const validPassword = "123456";
    const message = document.getElementById("loginMessage");

    if (email === validEmail && password === validPassword) {
        message.style.color = "green";
        message.textContent = "Login successful!";
        setTimeout(() => {
            closeLoginModal();
            localStorage.setItem("isLoggedIn", "true");
            toggleLoginState(true);
        }, 800);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid email or password.";
    }
}

// Logout confirmation

logoutBtn.addEventListener("click", () => {
    logoutModal.style.display = "flex";
});

// Confirm logout

function confirmLogout(isConfirmed) {
    logoutModal.style.display = "none";
    if (isConfirmed) {
        localStorage.removeItem("isLoggedIn");
        toggleLoginState(false);
    }
}

// Toggle login/logout view

function toggleLoginState(isLoggedIn) {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginMessage = document.getElementById("loginMessage");

    const sectionIds = [
        'dashboard', 'work-name', 'screenshots', 'project-links',
        'home-page', 'my-resume', 'my-photos', 'my-signature'
    ];

    if (isLoggedIn) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        loginModal.style.display = "none";
        mainContent.style.display = "flex";
        sidebar.style.display = "block";
        showSection("dashboard");
    } else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        mainContent.style.display = "none";
        sidebar.style.display = "none";
        loginModal.style.display = "flex";

        // Hide all content sections

        sectionIds.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = "none";
        });

        // Clear login form

        if (emailInput) emailInput.value = "";
        if (passwordInput) passwordInput.value = "";
        if (loginMessage) loginMessage.textContent = "";
    }
}

// ✅ Check login state on page load

window.onload = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    toggleLoginState(isLoggedIn);
};