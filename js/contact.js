function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    clearErrorMessages();

    if (name.length < 5) {
        showError("name", "Name should be more than 5 characters long");
        return;
    }

    if (!isValidEmail(email)) {
        showError("email", "Invalid email address");
        return;
    }

    if (subject.length < 15) {
        showError("subject", "Subject should be more than 15 characters long");
        return;
    }

    if (message.length < 25) {
        showError("message", "Message content should be more than 25 characters long");
        return;
    }

    alert("Form submitted successfully!");
}

function isValidEmail(email) {
    return email.includes('@');
}

function showError(fieldId, errorMessage) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.textContent = errorMessage;
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(message => message.textContent = "");
}