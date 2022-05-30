'use strict';
const wrapper = document.getElementById('js-wrapper');

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const showLoadImg = () => {
  const loadImg = createElementWithClassName("img", "loading");
  loadImg.src = "./img/loading-circle.gif";
  loadImg.id = 'loading';
  wrapper.appendChild(loadImg);
} 

const removeLoadImg = () => {
  document.getElementById('loading').remove();
} 

const getData = new Promise((resolve) => {
  showLoadImg();
  setTimeout(() => {
    resolve(fetch('https://mocki.io/v1/1f12787c-e5e9-4cfa-9c1d-2331884ca8ec'));
  }, 3000);
})

//Get json data
const callApi = async() => {
  try {
    const response = await getData;
    if (!response.ok) {
      console.error(`${response.status}:${response.statusText}`);
    }
    const json = await response.json();
    return json.data;
  }
  catch(error) {
    console.error(error);
  }
  finally {
    removeLoadImg();
  }
}

const init = async() => {
  const userData = await callApi();
  if (userData){
    renderTabaleElement(userData);
    } else {
    wrapper.textContent = "データの表示に失敗しました";
    console.error('データの表示に失敗しました'); 
  }
}
init();

const userDataItems = {
  userId: "ID",
  name: "名前",
  gender: "性別",
  age: "年齢"
}

const renderTabaleElement = (userData)  => {
  const table = createElementWithClassName("table", "table");
  const tbody = createElementWithClassName("tbody", "tbody");
  const userDataKeys = Object.keys(userDataItems);
  const tableHeadValue = Object.values(userDataItems);
  wrapper.appendChild(table).appendChild(tbody).appendChild(getTableHeadElement(tableHeadValue));
  wrapper.appendChild(table).appendChild(tbody).appendChild(getTableDataElement(userData,userDataKeys));
}

const getTableHeadElement = (tableHeadValue) => {
  const tr = createElementWithClassName("tr", "tr");
  const fragmentThElement = document.createDocumentFragment();
  for (const value of tableHeadValue) {
    const th = createElementWithClassName("th", "th");
    th.textContent = value;
    fragmentThElement.appendChild(tr).appendChild(th);
  }
  return fragmentThElement;
}

const getTableDataElement = (userData, userDataKeys) => {
  const fragmentElement = document.createDocumentFragment();
  for (let i = 0; i < userData.length; i++) {
    const tr = createElementWithClassName("tr", "tr"); 
      fragmentElement.appendChild(tr).appendChild(getTableTdElement(userData[i],userDataKeys));
  }
  return fragmentElement;
}

const getTableTdElement = (userData,userDataKeys) => {
  const fragmentTdElement = document.createDocumentFragment(); 
  for (let i = 0; i < userDataKeys.length; i++) {
  const td = createElementWithClassName("td", "td");
  td.textContent = userData[userDataKeys[i]];
  fragmentTdElement.appendChild(td);
}
  return fragmentTdElement; 
}
