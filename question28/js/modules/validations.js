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

  targetForm.nextElementSibling.textContent = validationInfo[targetForm.id].errorMessage;
};

export const validateInputValue = (e) => {
  const targetForm = e.target;
  const value = targetForm.value.trim();
  const result = validationInfo[targetForm.id].validation(value);
  setValidationEvents(result,targetForm);
} 
