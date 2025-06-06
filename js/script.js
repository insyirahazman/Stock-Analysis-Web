function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem("registeredUser", username);
    localStorage.setItem("registeredPassword", password);

    alert("Registration successful!");
    window.location.href = "login.html";
}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const registeredUser = localStorage.getItem("registeredUser");
    const registeredPassword = localStorage.getItem("registeredPassword");

    if (username === registeredUser && password === registeredPassword) {
        alert("Login successful!");
        window.location.href = "main.html";
    } else {
        alert("Invalid username or password!");
    }
}
