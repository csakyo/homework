'use strict';

const textLinkToTerms = document.getElementById('js-terms-textlink');
const modal = document.getElementById('js-modal');
const modalClose = document.getElementById('js-close');
const mask = document.getElementById('js-mask');
const checkbox = document.getElementById('js-checkbox');
const submitButton = document.getElementById('js-submit-button');
const modalContainer = document.getElementById("js-modal-container");
const name = document.getElementById('name');
const mail = document.getElementById('mail');
const password = document.getElementById('password');


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
      switchSubmitButton(); 
    }
}

const observer = new IntersectionObserver(checkWhenIntersect, options);
observer.observe(modalContainer.lastElementChild);



const validationInfo = {
  name: {
    status: false,
    maxNameLength: 16,
    minNameLength: 1,
    errorMessage: '※ユーザー名は1文字以上15文字以下にしてください。',
  },
  mail: {
    status: false,
    errorMessage: 'メールアドレスの形式になっていません。' 
  },
  password: {
    status: false,
    errorMessage: '8文字以上の大小の英数字を交ぜたものにしてください。'  
  }
}

const checkValidation = (result, targetForm) => {
  if (!result) {
    targetForm.classList.add('invalid');
    targetForm.classList.remove('valid');
    targetForm.nextElementSibling.textContent = validationInfo[targetForm.id].errorMessage;
    validationInfo[targetForm.id].status = false; 
  } else {
    targetForm.classList.add('valid');
    targetForm.classList.remove('invalid');
    targetForm.nextElementSibling.textContent = ''; 
    validationInfo[targetForm.id].status = true;
  }
}

const checkNameLength = (e) => {
  const nameValue = name.value.trim(); 
  const result = nameValue.length > validationInfo.name.minNameLength && nameValue.length < validationInfo.name.maxNameLength ;
  checkValidation(result,e.target);
  switchSubmitButton();
  CheckEmptyCharacter(e.target); 
}

const checkEmail = (e) => {
  const mailValue = mail.value.trim();
  const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const result = check.test(mailValue);
  checkValidation(result,e.target);
  switchSubmitButton();
  CheckEmptyCharacter(e.target); 
}

const checkPassword = (e) => {
  const checkPasswordCondition = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9]{8,}/;
  const result = checkPasswordCondition.test(password.value);
  checkValidation(result,e.target);
  switchSubmitButton();
  CheckEmptyCharacter(e.target); 
}

const switchSubmitButton = () => {
  if(validationInfo.name.status === true && validationInfo.mail.status === true && validationInfo.password.status === true && checkbox.checked) {
    submitButton.disabled = false; 
  } else {
    submitButton.disabled = true;  
  }
} 

const CheckEmptyCharacter = (targetForm) => {
  if( !targetForm.value || !targetForm.value.match(/\S/g) ) {
    targetForm.nextElementSibling.textContent = '入力してください';
  }
}


name.addEventListener('blur', checkNameLength);
mail.addEventListener('blur', checkEmail);
password.addEventListener('blur', checkPassword);
checkbox.addEventListener('input', switchSubmitButton);


submitButton.addEventListener('click',() => {
  window.location.href = './register-done.html';
})
