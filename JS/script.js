    const password= document.getElementById("password");
    const username= document.getElementById("username");
    const loginBtn= document.querySelector(".login-button");

    loginBtn.addEventListener("click", function(e){
        e.preventDefault();
        if(username.value=="admin" && password.value=="123"){
            // alert("Login successful!");
            window.location.href = "dashboard.html";
        }
    });