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

function checkZipCode() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const constraint = new RegExp(constraints[country.value][0], "");

  if (constraint.test(zipCode.value)) {
    zipCode.setCustomValidity("");
  } else {
    zipCode.setCustomValidity(constraints[country.value][1]);
  }
}

country.addEventListener("change", () => {
  zipCode.setCustomValidity("");
  if (country.value) checkZipCode();
  if (!zipCode.validity.valid && zipCode.value) {
    zipCode.reportValidity();
  }
});

zipCode.addEventListener("input", () => {
  if (country.value) checkZipCode();
  if (!zipCode.validity.valid) {
    zipCode.reportValidity();
  }
});

confirmPassword.addEventListener("input", () => {
  confirmPassword.setCustomValidity("");
});

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
  if (country.value) checkZipCode();

  for (const field of fields) {
    if (!field.validity.valid) {
      field.reportValidity();
      return;
    }
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match");
    confirmPassword.reportValidity();
    return;
  }

  form.reset();
});
