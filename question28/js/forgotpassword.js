import { validateInputValue } from "./modules/validations";
import { Chance } from "chance";
const chance = new Chance();

const submitButton = document.getElementById('js-submit-button');
const mailInputArea = document.querySelector(".js-email");


const isValidAllInputsValue = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = !isValid;
}

mailInputArea.addEventListener('blur', (e) => {
  validateInputValue(e);
  toggleDisabledOfSubmitButton(isValidAllInputsValue());
});

const checkData = (emailAddressValue) => {
  const registeredUserData = JSON.parse(localStorage.getItem('userData'));
  return emailAddressValue === registeredUserData.email;
}

const userDataVerification = () => {
  const userData = mailInputArea.value;
  return new Promise((resolve,reject) => {
    if (checkData(userData)){
      resolve({ token: chance.guid(), ok: true, code: 200 });
    } else {
      reject({ ok: false, code: 401 }); 
    }
  })
}

const checkExistenceOfUserdata = async() => {
  try {
    return await userDataVerification();
  }
  catch (e) {
    console.error(e);
  }
}

const init = async () => {
  const verificationResult = await checkExistenceOfUserdata();

  if (!verificationResult) {
    mailInputArea.nextElementSibling.textContent = "会員登録されていないか入力値が間違っています";
    submitButton.disabled = true;
    return; 
  }

  const tokenForPasswordReset = verificationResult.token;
  localStorage.setItem('tokenForforgotPassword', tokenForPasswordReset);
  window.location.href = `./register/password.html?token=${tokenForPasswordReset}`;
}

submitButton.addEventListener('click',init);
