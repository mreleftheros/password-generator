
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

  // helper function that returns random index of a string
  const getRandomValue = str => {
    return Math.floor(Math.random() * str.length);
  };

  const generatePassword = (len, fields) => {
    let password = "";
    let checkedSum = fields.reduce((acc, curr) => curr.value ? acc + 1 : acc, 0);

    switch (checkedSum) {
      case 0: // check
        return;
        break;
      case 1:

    }
  };

  // submits password form and calls generatePassword with given value fields
  const submitPasswordForm = e => {
    e.preventDefault();

    let passwordLength = 30;
    let upper = e.target.upperCaseLetters.checked;
    let lower = e.target.lowerCaseLetters.checked;
    let numbers = e.target.numbers.checked;
    let symbols = e.target.symbols.checked;

    let fields = [
      {name: "upper", value: upper},
      {name: "lower", value: lower},
      {name: "numbers", value: numbers},
      {name: "symbols", value: symbols}
    ];

    e.target.reset();

    return generatePassword(passwordLength, fields);
  };
  
  // event listeners
  copyBtn.addEventListener("click", copyPassword);
  passwordForm.addEventListener("submit", submitPasswordForm);
};

document.addEventListener("DOMContentLoaded", init);