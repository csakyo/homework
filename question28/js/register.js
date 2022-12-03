import { validateInputValue } from "./modules/validations";

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
    toggleDisabledOfSubmitButton(checkAllValidity() && checkbox.checked);
  };
};

const observer = new IntersectionObserver(checkWhenIntersect, options);
observer.observe(modalContainer.lastElementChild);


const checkAllValidity = () => {
  return document.getElementsByTagName("input").length === document.getElementsByClassName("valid").length;
}

const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = !isValid;
}

for (const input of [nameInputArea, mailInputArea, passwordInputArea]) {
  input.addEventListener("blur", (e) => {
    validateInputValue(e);
    toggleDisabledOfSubmitButton(checkAllValidity() && checkbox.checked);
  });
}

checkbox.addEventListener("change", () => {
  toggleDisabledOfSubmitButton(checkAllValidity() && checkbox.checked);
});

submitButton.addEventListener('click',() => {
  const userData = Object.fromEntries([...new FormData(form)]);
  localStorage.setItem('userData', JSON.stringify(userData)); 
  window.location.href = './register-done.html';
})
