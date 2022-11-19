const submitButton = document.getElementById('js-submit-button');

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

export const isValidStatus = {
  register: {
    name: false,
    mail: false,
    password: false,
    checkbox: false
  },
  login: {
    name_mail: false,
    password: false
  },
  forgotPassword: {
    mail: false
  }
}

export const setValidationEvents = (isValid, targetForm, pagetype) =>
  isValid ? validEvent(targetForm,pagetype) : invalidEvent(targetForm,pagetype);

export const validEvent = (targetForm,pagetype) => {
  targetForm.classList.add("valid");
  targetForm.classList.remove("invalid");
  targetForm.nextElementSibling.textContent = "";
  isValidStatus[pagetype][targetForm.id] = true;
};

export const invalidEvent = (targetForm,pagetype) => {
  console.log(pagetype);
  targetForm.classList.add("invalid");
  targetForm.classList.remove("valid");
  targetForm.nextElementSibling.textContent = validationInfo[targetForm.id].errorMessage;
  isValidStatus[pagetype][targetForm.id] = false;
};

export const renderRequiredFieldMessages = (targetForm) => {
  if (targetForm.value.trim() === "") {
    targetForm.nextElementSibling.textContent = "※入力必須項目です";
  }
};

export const validateInputValue = (e, pagetype) => {
  const targetForm = e.target;
  const value = targetForm.value.trim();
  const result = validationInfo[targetForm.id].validation(value);
  setValidationEvents(result,targetForm, pagetype);
  renderRequiredFieldMessages(targetForm);  
  toggleDisabledOfSubmitButton(checkAllValidity(pagetype));
  console.log(isValidStatus);
} 

export const toggleDisabledOfSubmitButton = (isValid) => {
  submitButton.disabled = isValid ? false : true;
}

export const checkAllValidity = (pagetype) => {
  return Object.values(isValidStatus[pagetype]).every((result) => result );
}
