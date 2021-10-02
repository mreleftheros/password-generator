
const init = () => {
  // variables
  const copyBtn = document.getElementById("copyBtn");
  const passwordForm = document.getElementById("passwordForm");
  const textarea = copyBtn.previousElementSibling;
  textarea.value = "";
  const lengthInput = document.getElementById("length");
  lengthInput.value = 6;
  const params = [
    {name: "upper", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"},
    {name: "lower", value: "abcdefghijklmnopqrstuvwxyz"},
    {name: "numbers", value: "0123456789"},
    {name: "symbols", value: "!@#$%^&*()_+="}
  ];

  // adds active class and updates btn text
  const updateCopyBtn = (e) => {
    if (copyBtn.classList.contains("active")) {
      if (e.type === "click") return; // check
      copyBtn.textContent = "Copy";
    }
    else {
      copyBtn.textContent = "Copied";
    }

    copyBtn.classList.toggle("active");
  };

  // copies current password and calls updateCopyBtn function
  const copyPassword = e => {
    if (textarea.value === "") return; // check

    navigator.clipboard.writeText(textarea.value);

    return updateCopyBtn(e);
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

  // takes an item and an array and puts the item in random index inside array
  const setItemIntoRandomIndex = (item, arr) => {
    let len = arr.length;
    let randomindex = getRandomIndex(len);

    while (arr[randomindex]) {
      randomindex = (randomindex + 1) % len;
    }

    arr.splice(randomindex, 1, item);
  };

  const showPassword = password => {
    textarea.value = "";
    textarea.value = password;
  };

  // generates random password based on form params
  const generatePassword = (passwordLen, fields) => {
    let password = [];
    password.length = passwordLen;
    let fieldsLen = fields.length;
    let remainder;
    let len;
    let str;

    switch (fieldsLen) {
      case 0:
        return;
        break;
      case 1:
        str = params.filter(param => param.name === fields[0])[0].value;

        for (let i = 0; i < passwordLen; i++) {
          password.push(getRandomValue(str));
        }
        break;
      case 2:
        remainder = passwordLen;

        fields.forEach((field, i, arr) => {
          str = params.filter(param => param.name === field)[0].value;

          if (i === arr.length - 1) { // last
            len = remainder;
          } else {
            len = getRandomNumber(remainder);
            remainder = passwordLen - len;
          }

          for (let i = 0; i < len; i++) {
            setItemIntoRandomIndex(getRandomValue(str), password);
          }
        })
        break;
      case 3:
        remainder = passwordLen;

        fields.forEach((field, i, arr) => {
          str = params.filter(param => param.name === field)[0].value;

          if (i === arr.length -1) { // last
            len = remainder;
          } 
          else {
            do {
              len = getRandomNumber(remainder);
            } while (remainder - len < arr.length - (i + 1))
  
            remainder -= len;
          }
          
          for (let i = 0; i < len; i++) {
            setItemIntoRandomIndex(getRandomValue(str), password);
          }
        })
        break;
      case 4:
        remainder = passwordLen;

        fields.forEach((field, i, arr) => {
          str = params.filter(param => param.name === field)[0].value;

          if (i === arr.length -1) { // last
            len = remainder;
          } 
          else {
            do {
              len = getRandomNumber(remainder);
            } while (remainder - len < arr.length - (i + 1))
  
            remainder -= len;
          }
          
          for (let i = 0; i < len; i++) {
            setItemIntoRandomIndex(getRandomValue(str), password);
          }
        })
        break;
    }

    password = password.join("");

    return showPassword(password);
  };

  // submits password form and calls generatePassword with given value fields
  const submitPasswordForm = e => {
    e.preventDefault();

    if (copyBtn.classList.contains("active")) {
      updateCopyBtn(e);
    }

    let passwordLength = e.target.length.value;
    let fields = [
      {name: "upper", value: e.target.upperCaseLetters.checked},
      {name: "lower", value: e.target.lowerCaseLetters.checked},
      {name: "numbers", value: e.target.numbers.checked},
      {name: "symbols", value: e.target.symbols.checked}
    ];

    fields = fields
      .filter(field => field.value)
      .map(field => field.name);

    return generatePassword(passwordLength, fields);
  };

  // checks if length input value pass the limits and update it
  const restoreLength = e => {
    if (e.target.value > 30) {
      e.target.value = 30;
    }
    if (e.target.value < 6) {
      e.target.value = 6;
    }

    return;
  };
  
  // event listeners
  copyBtn.addEventListener("click", copyPassword);
  passwordForm.addEventListener("submit", submitPasswordForm);
  lengthInput.addEventListener("input", restoreLength);
};

document.addEventListener("DOMContentLoaded", init);