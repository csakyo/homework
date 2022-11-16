'use strict';

import { validationInfo } from "./validation";
import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const userInfoInputArea = document.getElementById('mail');
const mailInputArea = document.getElementById('mail');

const isValidStatus = {
  mail: false
}

const setValidationEvents = (isValid, targetForm) =>
  isValid ? validEvent(targetForm) : invalidEvent(targetForm);

const validEvent = (targetForm) => {
  targetForm.classList.add("valid");
  targetForm.classList.remove("invalid");
  targetForm.nextElementSibling.textContent = "";
  isValidStatus[targetForm.id] = true;
};

const invalidEvent = (targetForm) => {
  targetForm.classList.add("invalid");
  targetForm.classList.remove("valid");
  targetForm.nextElementSibling.textContent = validationInfo[targetForm.id].errorMessage;
  isValidStatus[targetForm.id] = false;
};

const validateInputValue = (e) => {
  const targetForm = e.target;
  const value = targetForm.value.trim();
  const result = validationInfo[targetForm.id].validation(value);
  setValidationEvents(result,targetForm);
  toggleDisabledOfSubmitButton(checkAllValidity());
} 

const checkAllValidity = () => {
  return Object.values(isValidStatus).every((result) => result );
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = isValid ? false : true;
} 

userInfoInputArea.addEventListener('blur', validateInputValue);

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
