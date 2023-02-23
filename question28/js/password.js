import { validateInputValue } from "./modules/validations";
import { togglePassword } from "./modules/togglePassword";
import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const passwordInputArea = document.querySelector('[data-input="password"]');
const confirmPasswordInputArea = document.querySelector('[data-input="confirm-password"]');
const passwordToggleButtons = document.querySelectorAll('[data-button]');

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
  passwordToggleButton.addEventListener('click', togglePassword); 
});

const setNewPassword = () => {
  const newPasswordValue = passwordInputArea.value;
  const registeredUserData = localStorage.getItem('userData'); 
  const registeredUserJsonData = JSON.parse(registeredUserData);
  registeredUserJsonData.password = newPasswordValue; 
  const newUserData = JSON.stringify(registeredUserJsonData);
  localStorage.setItem('userData', newUserData);
}

const init = () => {
  setNewPassword ();
  const takenForSetNewPassword = chance.guid();
  localStorage.setItem('takenForSetNewPassword', takenForSetNewPassword);
  localStorage.removeItem("tokenForforgotPassword");
  window.location.href = `./password-done.html?token=${takenForSetNewPassword}`;
}

submitButton.addEventListener('click',init);
