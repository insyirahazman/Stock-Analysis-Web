function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Save to localStorage (temporary and insecure — demo only)
    localStorage.setItem("registeredUser", username);
    localStorage.setItem("registeredPassword", password);

    alert("Registration successful!");
    window.location.href = "login.html"; // Redirect to login page
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve from localStorage
    const registeredUser = localStorage.getItem("registeredUser");
    const registeredPassword = localStorage.getItem("registeredPassword");

    if (username === registeredUser && password === registeredPassword) {
        alert("Login successful!");
        window.location.href = "main.html"; // Redirect to welcome page
    } else {
        alert("Invalid username or password!");
    }
}