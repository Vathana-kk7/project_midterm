const password = document.getElementById("password");
const username = document.getElementById("username");
const loginBtn = document.querySelector(".login-button");
const messageBox = document.getElementById("messageBox");

loginBtn.addEventListener("click", function(e) {
    e.preventDefault();
    messageBox.className = "message-box";
    messageBox.textContent = "";
    
    if (username.value === "admin" && password.value === "123") {
        messageBox.textContent = "Login success";
        messageBox.classList.add("success");
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    } else {
        messageBox.textContent = "Fail to login";
        messageBox.classList.add("error");
    }
});