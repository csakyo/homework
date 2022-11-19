import { isValidStatus } from "./validations";
import { validateInputValue } from "./validations";
import { checkAllValidity } from "./validations";
import { toggleDisabledOfSubmitButton } from "./validations";

const textLinkToTerms = document.getElementById('js-terms-textlink');
const modal = document.getElementById('js-modal');
const modalClose = document.getElementById('js-close');
const mask = document.getElementById('js-mask');
const form = document.getElementById('form');
const checkbox = document.getElementById('js-checkbox');
const submitButton = document.getElementById('js-submit-button');
const modalContainer = document.getElementById("js-modal-container");
const nameInputArea = document.getElementById('name');
const mailInputArea = document.getElementById('mail');
const passwordInputArea = document.getElementById('password');
const pageType = 'register';


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
    isValidStatus.register.checkbox = true;
    toggleDisabledOfSubmitButton(checkAllValidity('register') && checkbox.checked);
  };
};

const observer = new IntersectionObserver(checkWhenIntersect, options);
observer.observe(modalContainer.lastElementChild);

nameInputArea.addEventListener('blur', (e) => { validateInputValue(e, pageType) });
mailInputArea.addEventListener('blur', (e) => { validateInputValue(e, pageType) });
passwordInputArea.addEventListener('blur', (e) => { validateInputValue(e, pageType) });
checkbox.addEventListener("change", () => {
  toggleDisabledOfSubmitButton(checkAllValidity('register') && checkbox.checked);
});

submitButton.addEventListener('click',() => {
  const userData = Object.fromEntries([...new FormData(form)]);
  localStorage.setItem('userData', JSON.stringify(userData)); 
  window.location.href = './register-done.html';
})
