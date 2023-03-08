const validationInfo = {
  name_mail: {
      validation: (value) => value,
      errorMessage: '※入力必須項目です',
  },
  name: {
    maxNameLength: 16,
    minNameLength: 1,
    validation: (value) => value.length > validationInfo.name.minNameLength && value.length < validationInfo.name.maxNameLength,
    errorMessage: '※ユーザー名は1文字以上15文字以下にしてください。',
  },
  email: {
    //Reference: https://1-notes.com/javascript-determine-if-it-is-an-email-address/ 
    validation : (value) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
    errorMessage: '※メールアドレスの形式になっていません。' 
  },
  password: {
    validation : (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test(value),
    errorMessage: '※8文字以上の大小の英数字を交ぜたものにしてください。'  
  },
  confirm_password: {
    validation: (value) => value,
    errorMessage: '※入力必須項目です',
  }
}

export const setValidationEvents = (isValid, targetForm) =>
  isValid ? validEvent(targetForm) : invalidEvent(targetForm);

export const validEvent = (targetForm) => {
  targetForm.classList.add("valid");
  targetForm.classList.remove("invalid");
  targetForm.nextElementSibling.textContent = "";
};

export const invalidEvent = (targetForm) => {
  targetForm.classList.add("invalid");
  targetForm.classList.remove("valid");

  if (targetForm.value.trim() === "") {
    targetForm.nextElementSibling.textContent = "※入力必須項目です";
    return; 
  }

  targetForm.nextElementSibling.textContent = validationInfo[targetForm.name].errorMessage;
};

export const validateInputValue = (e) => {
  const targetForm = e.target;
  const value = targetForm.value.trim();
  const result = validationInfo[targetForm.name].validation(value);
  setValidationEvents(result,targetForm);
} 

export const validateInputValueForButton = (targetForm) => {
  const value = targetForm.value.trim();
  const result = validationInfo[targetForm.name].validation(value);
  setValidationEvents(result,targetForm);
} 

export const validationForTargetForm = (e) => {
  if (e.relatedTarget === e.target.parentNode.querySelector('input')) return;
  validateInputValueForButton(e.target.parentNode.querySelector('[data-input="password"]')); 
}

export const resetValidation = (e) => {
  const errorMessage = e.target.parentNode.querySelector('[data-error="error"]');
  const inputOfPassword = e.target.parentNode.querySelector('[data-input="password"]');
  errorMessage.textContent = ""; 
  inputOfPassword.classList.remove("invalid");
  inputOfPassword.classList.remove("valid");
  inputOfPassword.classList.remove("invalid_mismatch");
}
