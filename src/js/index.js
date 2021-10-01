
const init = () => {
  // variables
  const copyBtn = document.getElementById("copyBtn");
  copyBtn.previousElementSibling.value = "";

  // toggles active class and updates btn text
  const updateCopyBtn = () => {
    copyBtn.classList.toggle("active");

    if (copyBtn.classList.contains("active")) {
      copyBtn.textContent = "Copied!";
    } else {
      copyBtn.textContent = "Copy";
    }

    return;
  };

  // copies current password and calls updateCopyBtn function
  const copyPassword = e => {
    let passwordElement = e.target.previousElementSibling;

    passwordElement.select();
    passwordElement.execCommand("copy");

    return updateCopyBtn();
  };
  
  // event listeners
  copyBtn.addEventListener("click", copyPassword);
};

document.addEventListener("DOMContentLoaded", init);