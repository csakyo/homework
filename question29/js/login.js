import { validateInputValue, resetValidation, validationForTargetForm } from "./modules/validations";
import { togglePassword } from "./modules/togglePassword";
import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const userInfoInputArea = document.querySelector(".js-name_mail");
const passwordInputArea = document.querySelector(".js-password");
const form = document.getElementById('js-form');
const passwordToggleButton = document.getElementById('js-toggle-password-button');


if(localStorage.getItem('token')) {
  window.location.href = "./index.html";
}

const checkAllValidity = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = !isValid;
}

userInfoInputArea.addEventListener('blur', (e) => { 
  validateInputValue(e);
  toggleDisabledOfSubmitButton(checkAllValidity());
 });

passwordInputArea.addEventListener('blur', (e) => {
  if (e.relatedTarget !== passwordToggleButton) {
    validateInputValue(e);
  }
   toggleDisabledOfSubmitButton(checkAllValidity());
});

passwordToggleButton.addEventListener('click', togglePassword); 
passwordToggleButton.addEventListener('click', resetValidation);
passwordToggleButton.addEventListener('blur', (e) => {
  validationForTargetForm(e);
  toggleDisabledOfSubmitButton(checkAllValidity());
});


const checkData = ({ name_mail, password }) => {
  const registeredUserData = JSON.parse(localStorage.getItem('userData'));
  return ((name_mail === registeredUserData.email || name_mail === registeredUserData.name) && (password === registeredUserData.password));
}


const userDataVerification = () => {
  const userData = Object.fromEntries([...new FormData(form)]);
  return new Promise((resolve,reject) => {
    if (checkData(userData)){
      resolve({ token: chance.guid(), ok: true, code: 200 });
    } else {
      reject({ ok: false, code: 401 }); 
    }
  })
}

const loginVerification = async() => {
  try {
    return await userDataVerification();
  }
  catch (e) {
    console.error(e);
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
