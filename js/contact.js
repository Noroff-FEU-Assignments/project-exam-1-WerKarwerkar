function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (name.length < 5) {
        alert("Name should be more than 5 characters long");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Invalid email address");
        return;
    }

    if (subject.length < 15) {
        alert("Subject should be more than 15 characters long");
        return;
    }

    if (message.length < 25) {
        alert("Message content should be more than 25 characters long");
        return;
    }

    alert("Form submitted successfully!");
}

function isValidEmail(email) {
    return email.includes('@');
}