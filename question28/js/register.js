'use strict';
import { validationInfo } from "./validation";
import { Chance } from "chance";
const chance = new Chance();

const textLinkToTerms = document.getElementById('js-terms-textlink');
const modal = document.getElementById('js-modal');
const modalClose = document.getElementById('js-close');
const mask = document.getElementById('js-mask');
const checkbox = document.getElementById('js-checkbox');
const submitButton = document.getElementById('js-submit-button');
const modalContainer = document.getElementById("js-modal-container");
const nameInputArea = document.getElementById('name');
const mailInputArea = document.getElementById('mail');
const passwordInputArea = document.getElementById('password');


textLinkToTerms.addEventListener('click',()=>{
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
});
modalClose.addEventListener('click',()=>{
    modal.classList.add('hidden');
    mask.classList.add('hidden');
});
mask.addEventListener('click',()=>{
    modalClose.click();
});

const options = {
  root: document.getElementById('js-modal'),
  threshold: 1
};

const checkWhenIntersect = ([entry]) => {
  if (entry.isIntersecting) {
    checkbox.checked = true;
    checkbox.disabled = false;
    switchSubmitButton(checkAllValidity());
  };
};

const observer = new IntersectionObserver(checkWhenIntersect, options);
observer.observe(modalContainer.lastElementChild);

const isValidStatus = {
  name: false,
  mail: false,
  password: false,
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
  switchSubmitButton(checkAllValidity());
} 

const checkAllValidity = () => {
  return Object.values(isValidStatus).every((result) => result );
}

const switchSubmitButton = (isValid) => {
  submitButton.disabled = isValid && checkbox.checked ? false : true;
} 

const renderRequiredFieldMessages = (targetForm) => {
  if (targetForm.value.trim() === "") {
    targetForm.nextElementSibling.textContent = "※入力必須項目です";
  }
};

nameInputArea.addEventListener('blur', validateInputValue);
mailInputArea.addEventListener('blur', validateInputValue);
passwordInputArea.addEventListener('blur', validateInputValue);
checkbox.addEventListener("input", () => {
  switchSubmitButton(checkAllValidity());
});

submitButton.addEventListener('click',() => {
  const userData = Object.fromEntries([...new FormData(form)]);
  localStorage.setItem('userData', JSON.stringify(userData)); 
  window.location.href = './register-done.html';
})
