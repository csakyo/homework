import { validateInputValue } from "./modules/validations";

const submitButton = document.getElementById('js-submit-button');
const passwordInputArea = document.querySelector(".js-password");
const confirmPasswordInputArea = document.querySelector(".js-confirm-password");


const isValidAllInputsValue = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length && passwordInputArea.value === confirmPasswordInputArea.value;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = !isValid;
}

for (const input of [passwordInputArea, confirmPasswordInputArea]) {
  input.addEventListener("blur", (e) => {
    validateInputValue(e);

    if (isValidAllInputsValue()) {
      confirmPasswordInputArea.nextElementSibling.textContent = ""; 
    }
    
    if (passwordInputArea.value && confirmPasswordInputArea.value && passwordInputArea.value !== confirmPasswordInputArea.value) {
      confirmPasswordInputArea.nextElementSibling.textContent = "入力された値が一致してません";
    } 
    
    toggleDisabledOfSubmitButton(isValidAllInputsValue());
  });
}


const init = () => {
  console.log('未実装です');
}

submitButton.addEventListener('click',init);
