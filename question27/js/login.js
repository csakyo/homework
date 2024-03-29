'use strict';

import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const userInfoInputArea = document.getElementById('name_mail');
const passwordInputArea = document.getElementById('password');
const form = document.getElementById('form');

if(localStorage.getItem('token')) {
  window.location.href = "./index.html";
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
  targetForm.nextElementSibling.textContent =
    validationInfo[targetForm.id].errorMessage;
  isValidStatus[targetForm.id] = false;
};


const validateInputValue = (e) => {
  const targetForm = e.target;
  const value = targetForm.value.trim();
  const result = validationInfo[targetForm.id].validation(value);
  setValidationEvents(result,targetForm);
  renderRequiredFieldMessages(targetForm);  
  toggleDisabledOfSubmitButton(checkAllValidity());
} 

const checkAllValidity = () => {
  return Object.values(isValidStatus).every((result) => result );
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = isValid ? false : true;
} 

const renderRequiredFieldMessages = (targetForm) => {
  if (targetForm.value.trim() === "") {
    targetForm.nextElementSibling.textContent = "※入力必須項目です";
  }
};

userInfoInputArea.addEventListener('blur', validateInputValue);
passwordInputArea.addEventListener('blur', validateInputValue);


const checkData = ({ name_mail, user_password }) => {
  const userData = {
    name: "tanaka",
    email: "tanaka@gmail.com",
    pass: "N302aoe3"
  }; 
  return ((name_mail === userData.name || name_mail === userData.email) && (user_password === userData.pass));
}


const userDataVerification = () => {
  const userData = Object.fromEntries([...new FormData(form)]);
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
    return await userDataVerification();
  }
  catch {
    return false;
  }
}

const init = async () => {
  const verificationResult = await loginVerification();
  if (verificationResult) {
    const token = verificationResult.token;
    localStorage.setItem("token", JSON.stringify(token));
    window.location.href = "./index.html"; 
  } else {
    window.location.href = "./loginFailure.html"
  }
}

submitButton.addEventListener('click',init);
