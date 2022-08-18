'use strict';

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
  checkbox.checked = entry.isIntersecting;
  checkbox.disabled = !entry.isIntersecting;
  entry.isIntersecting && checkAllValidity();
};

const observer = new IntersectionObserver(checkWhenIntersect, options);
observer.observe(modalContainer.lastElementChild);



const isValidStatus = {
  name: false,
  mail: false,
  password: false,
}

const validationInfo = {
  name: {
    maxNameLength: 16,
    minNameLength: 1,
    validation: (value) => value.length > validationInfo.name.minNameLength && value.length < validationInfo.name.maxNameLength,
    errorMessage: '※ユーザー名は1文字以上15文字以下にしてください。',
  },
  mail: {
    //Reference: https://1-notes.com/javascript-determine-if-it-is-an-email-address/ 
    validation : (value) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
    errorMessage: '※メールアドレスの形式になっていません。' 
  },
  password: {
    validation : (value) => /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9]{8,}/.test(value),
    errorMessage: '※8文字以上の大小の英数字を交ぜたものにしてください。'  
  }
}

const checkFormValidation = (isValid, targetForm) => {
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

const checkInputValue = (e) => {
  const targetForm = e.target;
  const value = targetForm.value.trim();
  const result = validationInfo[targetForm.id].validation(value);
  checkFormValidation(result,targetForm);
  checkEmptyCharacter(targetForm);  
  checkAllValidity();
} 

const checkAllValidity = () => {
  const isValid = Object.values(isValidStatus);
  const isAllValid = isValid.every((result) => result );
  switchSubmitButton(isAllValid); 
}

const switchSubmitButton = (isValid) => {
  (isValid && checkbox.checked) ? (submitButton.disabled = false) : (submitButton.disabled = true)
} 

const checkEmptyCharacter = (targetForm) => {
  if( targetForm.value.trim() === "" ) {
    targetForm.nextElementSibling.textContent = '※入力必須項目です';
  }
}


nameInputArea.addEventListener('blur', checkInputValue);
mailInputArea.addEventListener('blur', checkInputValue);
passwordInputArea.addEventListener('blur', checkInputValue);
checkbox.addEventListener('input', checkAllValidity);


submitButton.addEventListener('click',() => {
  window.location.href = './register-done.html';
})
