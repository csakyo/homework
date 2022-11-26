import { validateInputValue } from "./modules/validations";
import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const userInfoInputArea = document.getElementById('name_mail');
const passwordInputArea = document.getElementById('password');
const form = document.getElementById('form');


if(localStorage.getItem('token')) {
  window.location.href = "./index.html";
}

const checkAllValidity = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = isValid ? false : true;
}

userInfoInputArea.addEventListener('blur', (e) => { 
  validateInputValue(e);
  toggleDisabledOfSubmitButton(checkAllValidity());
 });

passwordInputArea.addEventListener('blur', (e) => {
   validateInputValue(e);
   toggleDisabledOfSubmitButton(checkAllValidity());
});


const checkData = ({ name_mail, user_password }) => {
  const registeredUserData = JSON.parse(localStorage.getItem('userData'));
  return ((name_mail === registeredUserData.user_email || name_mail === registeredUserData.user_name) && (user_password === registeredUserData.user_password));
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
