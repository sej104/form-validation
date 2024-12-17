const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zipCode = document.querySelector("#zip-code");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector("form");
const fields = [email, country, zipCode, password, confirmPassword];

const resetErrors = () => {
  fields.forEach((field) => field.setCustomValidity(""));
};

fields.forEach((field) => {
  field.addEventListener("blur", () => {
    if (!field.validity.valid) {
      field.reportValidity();
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resetErrors();
  for (const field of fields) {
    if (!field.validity.valid) {
      field.reportValidity();
      return;
    }
  }

  if (password.value !== confirmPassword.value) {
    password.setCustomValidity("Passwords do not match");
    confirmPassword.setCustomValidity("Passwords do not match");
    confirmPassword.reportValidity();
    return;
  }

  form.reset();
});
