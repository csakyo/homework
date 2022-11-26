import { validateInputValue } from "./modules/validations";
import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const mailInputArea = document.getElementById('mail');


const checkAllValidity = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = isValid ? false : true;
}

mailInputArea.addEventListener('blur', (e) => {
  validateInputValue(e);
  toggleDisabledOfSubmitButton(checkAllValidity());
});

const init = () => {
  const inputMailData = mailInputArea.value;
  const registeredUserData = JSON.parse(localStorage.getItem('userData'));
  const tokenForPasswordReset = chance.apple_token();
  const passwordResetPageUrl = "./register/password.html";

  if (registeredUserData === null) {
    window.location.href = './notautherize.html';
    return; 
  }
  if (registeredUserData.user_email === inputMailData) {
    window.location.href = `${passwordResetPageUrl}?token=${tokenForPasswordReset}`;
    return; 
  }
  window.location.href = './notautherize.html';
}

submitButton.addEventListener('click',init);
