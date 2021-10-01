
const init = () => {
  // variables
  const copyBtn = document.getElementById("copyBtn");
  const passwordForm = document.getElementById("passwordForm");
  const textarea = copyBtn.previousElementSibling;
  textarea.value = "";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+=";

  // adds active class and updates btn text
  const updateCopyBtn = () => {
    copyBtn.classList.add("active");
    copyBtn.textContent = "Copied!";
  };

  // copies current password and calls updateCopyBtn function
  const copyPassword = e => {
    let passwordElement = e.target.previousElementSibling;

    passwordElement.select();
    document.execCommand("copy");

    return updateCopyBtn();
  };

  // submits password form and calls generatePassword with given value fields
  const submitPasswordForm = e => {
    e.preventDefault();

    let passwordLength = 30;
    let upper = e.target.upperCaseLetters.checked;
    let lower = e.target.lowerCaseLetters.checked;
    let numbers = e.target.numbers.checked;
    let symbols = e.target.symbols.checked;

    e.target.reset();

    return generatePassword(30, upper, lower, numbers, symbols);
  };
  
  // event listeners
  copyBtn.addEventListener("click", copyPassword);
  passwordForm.addEventListener("submit", submitPasswordForm);
};

document.addEventListener("DOMContentLoaded", init);