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

if(params.get('token') !== localStorage.getItem('tokenForPasswordReset')) window.location.href = ('../notautherize.html');


const isValidAllInputsValue = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length && passwordInputArea.value === confirmPasswordInputArea.value;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = !isValid;
}

for (const input of [passwordInputArea, confirmPasswordInputArea]) {
  input.addEventListener("blur", (e) => {
    validateInputValue(e);
    
    if (confirmPasswordInputArea.value && !(passwordInputArea.value === confirmPasswordInputArea.value)) {
        confirmPasswordInputArea.nextElementSibling.textContent = "入力された値が一致してません";
        confirmPasswordInputArea.classList.add("invalid_mismatch");
      }
      
    if (isValidAllInputsValue()) {
      confirmPasswordInputArea.nextElementSibling.textContent = "";
      confirmPasswordInputArea.classList.remove("invalid_mismatch");
    }

      toggleDisabledOfSubmitButton(isValidAllInputsValue());
    });
  }
  
  passwordToggleButtons.forEach((passwordToggleButton) => {
    passwordToggleButton.addEventListener('click', togglePassword); 
  });

const setNewPassword = (passwordValue) => {
  const registeredUserData = localStorage.getItem('userData');
  if(!registeredUserData) {
    window.location.href = "../notautherize.html";
  }
  const registeredUserJsonData = JSON.parse(registeredUserData);
  registeredUserJsonData.password = passwordValue; 
  const newUserData = JSON.stringify(registeredUserJsonData);
  localStorage.setItem('userData', newUserData);
}

const init = () => {
  const passwordValue = passwordInputArea.value;
  setNewPassword(passwordValue);
  const token = chance.guid();
  localStorage.setItem('tokenForNewPassword', token);
  localStorage.removeItem('tokenForPasswordReset');
  window.location.href = `./password-done.html?token=${token}`;
}

submitButton.addEventListener('click',init);
