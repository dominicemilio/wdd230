document.getElementById("confirm-password").addEventListener("focusout", function () {
  let pass1 = document.getElementById("password").value;
  let pass2 = document.getElementById("confirm-password").value;
  let message = document.getElementById("formmessage");

  if (pass1 !== pass2) {
    message.textContent = "❗ Passwords do not match!";
    message.style.display = "block";
    document.getElementById("confirm-password").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
  } else {
    message.style.display = "none";
  }
});

const range = document.getElementById("rating");
const rangevalue = document.getElementById("rangevalue");
range.addEventListener("input", function () {
  rangevalue.textContent = range.value;
});

document.addEventListener("DOMContentLoaded", function () {
  const emailField = document.getElementById("email");

  emailField.addEventListener("input", function () {
    const emailPattern = /^[a-zA-Z0-9_.\-]+@byui\.edu$/;
    if (emailPattern.test(emailField.value)) {
      emailField.style.backgroundColor = "lightgreen";
    } else {
      emailField.style.backgroundColor = "";
    }
  });
});