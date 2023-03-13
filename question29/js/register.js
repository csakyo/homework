import { validateInputValue, resetValidation, validationForTargetForm } from "./modules/validations";
import { togglePassword } from "./modules/togglePassword";

export const submitButton = document.getElementById('js-submit-button');
const textLinkToTerms = document.getElementById('js-terms-textlink');
const modal = document.getElementById('js-modal');
const modalClose = document.getElementById('js-close');
const mask = document.getElementById('js-mask');
const form = document.getElementById('js-form');
const checkbox = document.getElementById('js-checkbox');
const modalContainer = document.getElementById("js-modal-container");
const nameInputArea = document.querySelector(".js-name");
const mailInputArea = document.querySelector(".js-email");
const passwordInputArea = document.querySelector(".js-password");
const passwordToggleButton = document.getElementById('js-toggle-password-button');

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
    checkbox.classList.add("valid");
    toggleDisabledOfSubmitButton(isValidAllInputsValue() && checkbox.checked);
  };
};

const observer = new IntersectionObserver(checkWhenIntersect, options);
observer.observe(modalContainer.lastElementChild);


const isValidAllInputsValue = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = !isValid;
}

for (const input of [nameInputArea, mailInputArea]) {
  input.addEventListener("blur", (e) => {
    validateInputValue(e);
    toggleDisabledOfSubmitButton(isValidAllInputsValue() && checkbox.checked);
  });
}

passwordInputArea.addEventListener("blur", (e) => {
  if (e.relatedTarget !== passwordToggleButton) {
    validateInputValue(e);
  }
  toggleDisabledOfSubmitButton(isValidAllInputsValue() && checkbox.checked); 
})

checkbox.addEventListener("change", () => {
  toggleDisabledOfSubmitButton(isValidAllInputsValue() && checkbox.checked);
});

passwordToggleButton.addEventListener('click', togglePassword); 
passwordToggleButton.addEventListener('click', resetValidation);
passwordToggleButton.addEventListener('blur', (e) => {
  validationForTargetForm(e);
  toggleDisabledOfSubmitButton(isValidAllInputsValue() && checkbox.checked); 
});

submitButton.addEventListener('click',() => {
  const registeredUserData = JSON.parse(localStorage.getItem('userData'));
  const inputUserData = Object.fromEntries([...new FormData(form)]);

  if (registeredUserData && registeredUserData.email === inputUserData.email) {
    mailInputArea.nextElementSibling.textContent = "すでに登録されているメールアドレスです";
    submitButton.disabled = true;
    return;
  }

  localStorage.setItem('userData', JSON.stringify(inputUserData)); 
  window.location.href = './register-done.html';
})
