import { validateInputValue } from "./modules/validations";

const submitButton = document.getElementById('js-submit-button');
const passwordInputArea = document.querySelector(".js-password");
const confirmPasswordInputArea = document.querySelector(".js-confirm-password");


const checkAllValidity = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length && passwordInputArea.value === confirmPasswordInputArea.value;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = !isValid;
}

const showErrorMessageInputValuesMismatch = () => confirmPasswordInputArea.nextElementSibling.textContent = passwordInputArea.value !== confirmPasswordInputArea.value ? "入力されたパスワードが一致しませんでした" : "";

for (const input of [passwordInputArea, confirmPasswordInputArea]) {
  input.addEventListener("blur", (e) => {
    validateInputValue(e);
    
    if (passwordInputArea.value && confirmPasswordInputArea.value) {
      showErrorMessageInputValuesMismatch(); 
    }
    
    toggleDisabledOfSubmitButton(checkAllValidity());
  });
}


const init = () => {
  console.log('未実装です');
}

submitButton.addEventListener('click',init);
