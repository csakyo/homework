'use strict';

import { validateInputValue } from "./validations";
import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const userInfoInputArea = document.getElementById('mail');
const mailInputArea = document.getElementById('mail');
const pageType = 'forgotPassword';

  
userInfoInputArea.addEventListener('blur', (e) => { validateInputValue(e, pageType) });

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
