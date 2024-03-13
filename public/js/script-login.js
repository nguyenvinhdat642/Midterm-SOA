function validatePassword(event) {
  event.preventDefault();

  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  var passwordError = document.getElementById("password-error");

  if (password.length < 8) {
    passwordError.textContent = "Password should be at least 8 characters long.";
  } else if (password === confirmPassword) {
    passwordError.textContent = "";
  } else {
    passwordError.textContent = "Passwords do not match. Please try again.";
  }
}

