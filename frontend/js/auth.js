import CONFIG from "./config.js";
import { login } from "./api.js";

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", doLogin);

async function doLogin() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const error = document.getElementById("loginError");

    error.style.display = "none";

    if (!username || !password) {
        error.textContent = "Please enter Username and Password.";
        error.style.display = "block";
        return;
    }

    try {

        const user = await login(username, password);

        if (!user || user.length === 0) {
            error.textContent = "Invalid Username or Password.";
            error.style.display = "block";
            return;
        }

        sessionStorage.setItem(
            "gims_session",
            JSON.stringify(user[0])
        );

        window.location.href = CONFIG.LOGIN_REDIRECT;

    } catch (err) {

        console.error(err);

        error.textContent = err.message;
        error.style.display = "block";
    }
}