function updateTopbarNav() {
    const nav = document.getElementById("topbar-nav");
    if (!nav) return;

    const isLoggedIn = !!localStorage.getItem("loggedInUser");
    // after login, the user will be redirected to main.html
    if (isLoggedIn) {
        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="stocks.html">Stocks</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="#" id="logout-link">Logout</a>
        `;
        // after logout, the user will be redirected to login.html
        setTimeout(() => {
            const logoutLink = document.getElementById("logout-link");
            if (logoutLink) {
                logoutLink.onclick = function(e) {
                    e.preventDefault();
                    localStorage.removeItem("loggedInUser");
                    updateTopbarNav();
                    window.location.href = "login.html";
                };
            }
        }, 0);
    } else {
        // if not logged in, show only Home and Login links
        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="login.html">Login</a>
        `;
    }
}

document.addEventListener("DOMContentLoaded", updateTopbarNav);

// registration handler
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!username || !password) {
            window.alert("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            window.alert("Passwords do not match.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some(u => u.username === username)) {
            window.alert("Username already exists.");
            return;
        }
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        window.alert("Registration successful! Please login.");
        window.location.href = "login.html";
    };
}

// login handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", username);
            window.alert("Login successful!");
            window.location.href = "index.html";
        } else {
            window.alert("Invalid username or password.");
        }
    };
}

// feedback handler
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
    feedbackForm.onsubmit = function(e) {
        e.preventDefault();
        const feedback = document.getElementById("feedback").value.trim();

        if (!feedback) {
            window.alert("Feedback cannot be empty.");
            return;
        }

        window.alert("Thank you for your feedback! We will reach out to you soon.");
        document.getElementById("feedback").value = "";
        window.location.href = "index.html";
    };
}