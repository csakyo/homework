'use strict';

import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const userInfoInputArea = document.getElementById('name_mail');
const passwordInputArea = document.getElementById('password');
const form = document.getElementById('form');

if(localStorage.hasOwnProperty('token')) {
  window.location.href = './newsComponents/index.html'
}

const isValidStatus = {
  name_mail: false,
  password: false,
}

const validationInfo = {
  name_mail: {
    validation: (value) => value
  },
  password: {
    validation : (value) => /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9]{8,}/.test(value),
    errorMessage: '※8文字以上の大小の英数字を交ぜたものにしてください。'  
  }
}

const setValidationEvents = (isValid, targetForm) => {
  if (isValid) {
    targetForm.classList.add('valid');
    targetForm.classList.remove('invalid');
    targetForm.nextElementSibling.textContent = ''; 
    isValidStatus[targetForm.id] = true;
  } else {
    targetForm.classList.add('invalid');
    targetForm.classList.remove('valid');
    targetForm.nextElementSibling.textContent = validationInfo[targetForm.id].errorMessage;
    isValidStatus[targetForm.id] = false; 
  }
}

const validateInputValue = (e) => {
  const targetForm = e.target;
  const value = targetForm.value.trim();
  const result = validationInfo[targetForm.id].validation(value);
  setValidationEvents(result,targetForm);
  renderRequiredFieldMessages(targetForm);  
  switchSubmitButton(checkAllValidity());
} 

const checkAllValidity = () => {
  return Object.values(isValidStatus).every((result) => result );
}

const switchSubmitButton = (isValid) => {
  submitButton.disabled = isValid ? false : true;
} 

const renderRequiredFieldMessages = (targetForm) => {
  if (targetForm.value.trim() === "") {
    targetForm.nextElementSibling.textContent = "※入力必須項目です";
  }
};

userInfoInputArea.addEventListener('blur', validateInputValue);
passwordInputArea.addEventListener('blur', validateInputValue);


const checkData = (inputData) => {
  const userData = {
    name: "tanaka",
    email: "tanaka@gmail.com",
    pass: "N302aoe3"
  }; 
  return ((inputData.name_mail === userData.name || inputData.name_mail === userData.email) && (inputData.user_password === userData.pass)) ? true : false;
}


const tokenVerification = () => {
  const userData = Object.fromEntries([...new FormData(form).entries()]);
  return new Promise((resolve,reject) => {
    if (checkData(userData)){
      resolve({ token: chance.apple_token(), ok: true, code: 200 });
    } else {
      reject({ ok: false, code: 401 }); 
    }
  })
}

const loginVerification = async() => {
  try {
    const token = await tokenVerification();
    localStorage.setItem("token", JSON.stringify(token));
    return true;
  }
  catch {
    return false;
  }
}

const init = async () => {
  const verificationResult = await loginVerification();
  verificationResult ? window.location.href = './newsComponents/index.html' : window.location.href = './loginFailure.html'
}

submitButton.addEventListener('click',init);
