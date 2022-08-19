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
  submitButton.disabled = isValid && checkbox.checked ? false : true;
} 

const renderRequiredFieldMessages = (targetForm) => {
  targetForm.nextElementSibling.textContent = targetForm.value.trim() === "" ? "※入力必須項目です" : "";
};

nameInputArea.addEventListener('blur', validateInputValue);
mailInputArea.addEventListener('blur', validateInputValue);
passwordInputArea.addEventListener('blur', validateInputValue);
checkbox.addEventListener("input", {
  isValid: checkAllValidity,
  handleEvent: switchSubmitButton
});


submitButton.addEventListener('click',() => {
  window.location.href = './register-done.html';
})
