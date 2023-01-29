import { validateInputValue } from "./modules/validations";
import { togglePassword } from "./modules/togglePassword";

const submitButton = document.getElementById('js-submit-button');
const passwordInputArea = document.querySelector(".js-password");
const confirmPasswordInputArea = document.querySelector(".js-confirm-password");
const passwordToggleButtons = document.querySelectorAll('.js-toggle-password-button');

const url = new URL(window.location.href);
const params = url.searchParams;

if(params.get('token') !== localStorage.getItem('tokenForforgotPassword')) window.location.href = ('../notautherize.html');


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

passwordToggleButtons.forEach((passwordToggleButton) => {
  passwordToggleButton.addEventListener('click', (e) => togglePassword (e.target)); 
});

const init = () => {
  console.log('未実装です');
}

submitButton.addEventListener('click',init);
