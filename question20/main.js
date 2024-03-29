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
  loadImg.id = 'js-loading';
  wrapper.appendChild(loadImg);
} 

const removeLoadImg = () => {
  document.getElementById('js-loading').remove();
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

const userDataColumn = {
  userId: "ID",
  name: "名前",
  gender: "性別",
  age: "年齢"
}

const renderTabaleElement = (userData)  => {
  const table = createElementWithClassName("table", "table");
  const tbody = createElementWithClassName("tbody", "tbody");
  const tableHeadValue = Object.values(userDataColumn);
  wrapper.appendChild(table).appendChild(getTableHeadElement(tableHeadValue));
  wrapper.appendChild(table).appendChild(tbody).appendChild(getTableRowFragment(userData));
}

const getTableHeadElement = (tableHeadValue) => {
  const thead = createElementWithClassName("thead", "thead");
  const tr = createElementWithClassName("tr", "tr");
  const fragmentThElement = document.createDocumentFragment();
  for (const value of tableHeadValue) {
    const th = createElementWithClassName("th", "th");
    th.textContent = value;
    fragmentThElement.appendChild(tr).appendChild(th);
  }
  thead.appendChild(fragmentThElement);

  return thead;
}

const getTableRowFragment = (userData) => {
  const tableRowfragment = document.createDocumentFragment();
  for (let i = 0; i < userData.length; i++) {
    const tr = createElementWithClassName("tr", "tr"); 
    tableRowfragment.appendChild(tr).appendChild(getTableDataFragment(userData[i]));
  }
  return tableRowfragment;
}

const getTableDataFragment = (userData) => {
  const tableDatafragment = document.createDocumentFragment();
  Object.keys(userDataColumn).forEach((key) => {
    const td = createElementWithClassName("td", "td");
    td.textContent = userData[key];
    tableDatafragment.appendChild(td);
  });
  return tableDatafragment;
};
