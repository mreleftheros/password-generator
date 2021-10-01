
const init = () => {
  // variables
  const copyBtn = document.getElementById("copyBtn");
  const passwordForm = document.getElementById("passwordForm");
  const textarea = copyBtn.previousElementSibling;
  textarea.value = "";
  const params = [
    {name: "upper", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"},
    {name: "lower", value: "abcdefghijklmnopqrstuvwxyz"},
    {name: "numbers", value: "0123456789"},
    {name: "symbols", value: "!@#$%^&*()_+="}
  ];

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

  // helper function that returns the value of random index of a string
  const getRandomValue = str => {
    return str[Math.floor(Math.random() * str.length)];
  };

  const generatePassword = (passwordLen, fields) => {
    let password = "";
    let fieldsLen = fields.length;

    switch (fieldsLen) {
      case 0:
        return;
        break;
      case 1:
        let str = params.filter(param => param.name === fields[0])[0].value;
        for (let i = 0; i < passwordLen; i++) {
          password += getRandomValue(str);
        }
    }

    console.log(password, password.length);
  };

  // submits password form and calls generatePassword with given value fields
  const submitPasswordForm = e => {
    e.preventDefault();

    let passwordLength = 30;
    let fields = [
      {name: "upper", value: e.target.upperCaseLetters.checked},
      {name: "lower", value: e.target.lowerCaseLetters.checked},
      {name: "numbers", value: e.target.numbers.checked},
      {name: "symbols", value: e.target.symbols.checked}
    ];

    fields = fields
      .filter(field => field.value)
      .map(field => field.name);

    e.target.reset();

    return generatePassword(passwordLength, fields);
  };
  
  // event listeners
  copyBtn.addEventListener("click", copyPassword);
  passwordForm.addEventListener("submit", submitPasswordForm);
};

document.addEventListener("DOMContentLoaded", init);