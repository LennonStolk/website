let errorList = new Set();
setUpValidation();


function setUpValidation() {
    let userNameField = document.getElementById("userName");
    let emailField = document.getElementById("email");
    let passwordField = document.getElementById("password");

    userNameField.addEventListener("input", validateUserName);
    emailField.addEventListener("input", validateEmail);
    passwordField.addEventListener("input", validatePassword);
}

async function validateUserName() {
    text = this.value;
    errorList.delete("You can only use letters, numbers, - or _ in your username.");
    errorList.delete("You have to enter a username.")
    errorList.delete("This username is already taken.");

    if (text.length == 0) {
        errorList.add("You have to enter a username.");
        this.classList.add("errorFormField");
    }
    else if (checkValidCharacters(text) == false) {
        errorList.add("You can only use letters, numbers, - or _ in your username.");
        this.classList.add("errorFormField");
    }
    else if (await checkUserNameExists(text) == true) {
        errorList.add("This username is already taken.");
        this.classList.add("errorFormField");
    }
    else {
        this.classList.remove("errorFormField");
    }

    updateErrorList();
}

async function validateEmail() {
    text = this.value;
    errorList.delete("You have to enter an email adress.");
    errorList.delete("You have to enter a valid email adress.");
    errorList.delete("This email is already taken.");

    if (text.length == 0) {
        errorList.add("You have to enter an email adress.");
        this.classList.add("errorFormField");
    }
    else if (checkValidEmail(text) == false) {
        errorList.add("You have to enter a valid email adress.");
        this.classList.add("errorFormField");
    }
    else if (await checkEmailExists(text) == true) {
        errorList.add("This email is already taken.");
        this.classList.add("errorFormField");
    }
    else {
        this.classList.remove("errorFormField");
    }
    
    updateErrorList();
}

function validatePassword() {
    text = this.value;
    errorList.delete("You have to enter a password.");

    if (text.length == 0) {
        errorList.add("You have to enter a password.");
        this.classList.add("errorFormField");
    }
    else {
        this.classList.remove("errorFormField");
    }

    updateErrorList();
}

function checkValidCharacters(input) {
    let lettersRegex = /^[0-9a-zA-Z\-\_]+$/;
    if (lettersRegex.test(input)) {
        return true;
    } else {
        return false;
    }
}

function checkValidEmail(input) {
    let emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(input)) {
        return true;
    } else {
        return false;
    }
}

async function checkEmailExists(email) {
    let formData = new FormData();
    formData.append('method', 'checkEmailExists');
    formData.append('email', email);
    let response = await fetch("controllers/userController.php", {
        method: 'POST',
        body: formData
    });
    let emailExists = await response.json();
    console.log(emailExists);

    return emailExists;
}

async function checkUserNameExists(userName) {
    let formData = new FormData();
    formData.append('method', 'checkNameExists');
    formData.append('userName', userName);
    let response = await fetch("controllers/userController.php", {
        method: 'POST',
        body: formData
    });
    let userNameExists = await response.json();

    return userNameExists;
}

function updateErrorList() {
    let errorDiv = document.getElementById("errorDiv");
    let submitButton = document.getElementById("submit");

    if (errorList.size == 0) {
        errorDiv.style.opacity = "0";

        let userNameText = document.getElementById("userName").value;
        let emailText = document.getElementById("email").value;
        let passwordText = document.getElementById("password").value;

        if (userNameText != "" && emailText != "" && passwordText != "") {
            submitButton.disabled = false;
        }
    }
    else {
        errorDiv.innerHTML = "";
        for (let error of errorList) {
            errorDiv.innerHTML += `<p>${error}</p>`;
        }
        errorDiv.style.opacity = "1";
        submitButton.disabled = true;
    }
}