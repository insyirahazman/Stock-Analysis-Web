function updateTopbarNav() {
    const nav = document.getElementById("topbar-nav");
    if (!nav) return; // Prevent errors if nav is missing

    const isLoggedIn = !!localStorage.getItem("registeredUser");
    if (isLoggedIn) {
        nav.innerHTML = `
            <a href="main.html">Home</a>
            <a href="stock_details.html">Stocks</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="logout.html">Logout</a>
        `;
    } else {
        nav.innerHTML = `
            <a href="main.html">Home</a>
            <a href="login.html">Login</a>
        `;
    }
}

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", updateTopbarNav);

function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !password || !confirmPassword) {
        window.alert("All fields are required.");
        return;
    }

    if (password !== confirmPassword) {
        window.alert("Passwords do not match!");
        return;
    }

    localStorage.setItem("registeredUser", username);
    localStorage.setItem("registeredPassword", password);

    window.alert("Registration successful!");
    window.location.href = "login.html";
}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const registeredUser = localStorage.getItem("registeredUser");
    const registeredPassword = localStorage.getItem("registeredPassword");

    if (username === registeredUser && password === registeredPassword) {
        window.alert("Login successful!");
        window.location.href = "main.html";
    } else {
        window.alert("Invalid username or password!");
    }
}

function feedBack() {
    const feedback = document.getElementById("feedback").value.trim();

    if (!feedback) {
        window.alert("Feedback cannot be empty.");
        return;
    }

    console.log("Feedback submitted!");
    window.alert("Thank you for your feedback! We will reach out to you soon.");
    document.getElementById("feedback").value = ""; // Clear before redirect
    window.location.href = "main.html";
}