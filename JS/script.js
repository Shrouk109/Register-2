document.addEventListener("DOMContentLoaded", function () {
  // signIn last
  let signInlast = document.querySelector(".go-to-signin");
  signInlast?.addEventListener("click", function () {
    setTimeout(() => {
      window.location.href = "signIn.html";
    }, 500);
  });

  // login Last
  let loginlast = document.querySelector(".go-to-signup");
  loginlast?.addEventListener("click", function () {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  });

  // all btn
  let loginBtn = document.getElementById("loginBtn");
  let signUpBtn = document.getElementById("signUp");
  let logoutBtn = document.querySelector(".btn-logout");

  // signUp inputs
  let nameRegister = document.getElementById("name-register");
  let emailRegister = document.getElementById("email-register");
  let passwordRegister = document.getElementById("password-register");

  // all regex
  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // errors signUp
  let errorName = document.querySelector(".error-name");
  let errorMail = document.querySelector(".error-email");
  let errorPassword = document.querySelector(".error-password");

  // success
  let success = document.querySelector("#success");

  // arr
  let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

  // when click on sign up button
  
  signUpBtn?.addEventListener("click", function () {
    // Collect input values
    let name = nameRegister.value.trim();
    let email = emailRegister.value.trim();
    let password = passwordRegister.value.trim();

    // Clear previous errors
    // clearErrors();

    // Validation flags
    let isValid = true;

    // Name validation
    if (!nameRegex.test(name)) {
      errorName.textContent =
        "Name must be between 3 and 30 characters and only letters and spaces.";
      errorName.classList.remove("d-none");
      nameRegister.classList.add("is-invalid");
      isValid = false;
    }

    // Email validation
    if (!emailRegex.test(email)) {
      errorMail.textContent = "Invalid email format.";
      errorMail.classList.remove("d-none");
      emailRegister.classList.add("is-invalid");
      isValid = false;
    } else if (allUsers.find((user) => user.email === email)) {
      errorMail.textContent = "This email is already registered.";
      errorMail.classList.remove("d-none");
      emailRegister.classList.add("is-invalid");
      isValid = false;
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      errorPassword.textContent =
        "Password must be 6-16 characters with valid symbols (!@#$%^&*).";
      errorPassword.classList.remove("d-none");
      passwordRegister.classList.add("is-invalid");
      isValid = false;
    }

    // If all validations pass
    if (isValid) {
      // Create user object
      let user = {
        name: name,
        email: email,
        password: password,
      };

      // Add user to the array and store in localStorage
      allUsers.push(user);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      // Clear input values and show success message
      clearInputsValues();
      success.classList.remove("d-none");

      setTimeout(() => {
        window.location.href = "signIn.html";
      }, 2000);
    }
  });

  let validationDone = false;

  function validateInput(inputElement, regex) {
    if (regex.test(inputElement.value)) {
      inputElement.classList.add("is-valid");
      inputElement.classList.remove("is-invalid");
      validationDone = true;
    } else {
      inputElement.classList.remove("is-valid");
      inputElement.classList.add("is-invalid");
      validationDone = false;
    }
  }

  nameRegister?.addEventListener("input", function () {
    validateInput(nameRegister, nameRegex);
    if (validationDone) {
      localStorage.setItem("username", nameRegister.value);
      errorName.classList.add("d-none");
    }
  });

  emailRegister?.addEventListener("input", function () {
    validateInput(emailRegister, emailRegex);
    if (validationDone) {
      errorMail.classList.add("d-none");
    }
  });

  passwordRegister?.addEventListener("input", function () {
    validateInput(passwordRegister, passwordRegex);
    if (validationDone) {
      errorPassword.classList.add("d-none");
    }
  });

  function clearInputsValues() {
    nameRegister.value = "";
    emailRegister.value = "";
    passwordRegister.value = "";
  }

  function clearErrors() {
    errorName.classList.add("d-none");
    errorMail.classList.add("d-none");
    errorPassword.classList.add("d-none");
  }

  function clearAllvalid() {
    nameRegister.classList.remove("is-valid");
    emailRegister.classList.remove("is-valid");
    passwordRegister.classList.remove("is-valid");
  }

  // -----------------------------login--------------------//

  // input login
  let emailLogin = document.getElementById("email-login");
  let passwordLogin = document.getElementById("password-login");

  // errors
  let emailLoginError = document.querySelector(".email-error-login");
  let passwordLoginError = document.querySelector(".pass-error-login");

  // done
  let doneLogin = document.querySelector(".done");

  // when click on login
  loginBtn?.addEventListener("click", function () {
    let email = emailLogin.value.trim();
    let password = passwordLogin.value.trim();

    clearErrors();

    if (!emailRegex.test(email)) {
      emailLoginError.textContent = "Invalid email format.";
      emailLoginError.classList.remove("d-none");
      emailLogin.classList.add("is-invalid");
    }

    if (!passwordRegex.test(password)) {
      passwordLoginError.textContent =
        "Password must be 6-16 characters with valid symbols (!@#$%^&*).";
      passwordLoginError.classList.remove("d-none");
      passwordLogin.classList.add("is-invalid");
    }

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      emailLogin.classList.add("is-valid");
      passwordLogin.classList.add("is-valid");

      let user = allUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        doneLogin.textContent = "Login Successful!";
        doneLogin.classList.remove("d-none");
        emailLogin.value = "";
        passwordLogin.value = "";
        emailLogin.classList.remove("is-valid");
        passwordLogin.classList.remove("is-valid");

        setTimeout(() => {
          window.location.href = "welcome.html";
        }, 2000);
      } else {
        emailLoginError.textContent = "this mail is not registered.";
        emailLoginError.classList.remove("d-none");
        emailLogin.classList.add("is-invalid");
        passwordLogin.classList.add("is-invalid");
      }
    }
  });

  // Validate input while typing
  emailLogin?.addEventListener("input", function () {
    validateField(
      emailLogin,
      emailRegex,
      emailLoginError,
      "Invalid email format."
    );
  });

  passwordLogin?.addEventListener("input", function () {
    validateField(
      passwordLogin,
      passwordRegex,
      passwordLoginError,
      "Password must be 6-16 characters with valid symbols (!@#$%^&*)."
    );
  });

  // Function to validate field
  function validateField(input, regex, errorElement, errorMessage) {
    if (regex.test(input.value.trim())) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      errorElement.classList.add("d-none");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      errorElement.textContent = errorMessage;
      errorElement.classList.remove("d-none");
    }
  }

  function clearErrors() {
    emailLoginError.classList.add("d-none");
    passwordLoginError.classList.add("d-none");
    emailLogin.classList.remove("is-invalid", "is-valid");
    passwordLogin.classList.remove("is-invalid", "is-valid");
  }

  // --------------------------welcome-----------------
  let welcome = document.querySelector(".userName-welcome");

  logoutBtn?.addEventListener("click", function () {
    let lastEmail = allUsers[allUsers.length - 1];
    allUsers.splice(allUsers.length - 1, 1);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  });

  if (window.location.pathname.includes("welcome.html")) {
    if (welcome) {
      welcome.innerHTML = localStorage.getItem("username");
    }
  }
});
