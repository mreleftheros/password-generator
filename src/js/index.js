
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

  // helper function that returns random number starting from 1 and max of len
  const getRandomNumber = len => {
    return Math.floor(Math.random() * (len - 1)) + 1;
  };

  // helper function that returns a random index from max len
  const getRandomIndex = len => {
    return Math.floor(Math.random() * len);
  };

  const generatePassword = (passwordLen, fields) => {
    let password = [];
    let fieldsLen = fields.length;

    switch (fieldsLen) {
      case 0:
        return;
        break;
      case 1:
        let str = params.filter(param => param.name === fields[0])[0].value;

        for (let i = 0; i < passwordLen; i++) {
          password.push(getRandomValue(str));
        }
        break;
      case 2:
        let remainder = passwordLen;
        fields.forEach((field, i, arr) => {
          let str = params.filter(param => param.name === field)[0].value;
          let len;
          if (i === arr.length - 1) { // last
            len = remainder;
          } else {
            len = getRandomNumber(remainder);
            remainder = passwordLen - len;
          }

          for (let i = 0; i < len; i++) {
            password.push(getRandomValue(str));
          }
        })
      case 3:
      case 4:
    }

    console.log(password.join(""), password.length);
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