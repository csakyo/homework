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
    resolve(fetch('https://mocki.io/v1/5381547b-04ff-4a89-b169-dd84425f5196'));
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
    renderTableElement(userData);
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

const renderTableElement = (userData)  => {
  const table = createElementWithClassName("table", "table");
  const tbody = createElementWithClassName("tbody", "tbody");
  table.id = "js-table";
  tbody.id = "js-tbody";
  const tableHeadValue = Object.values(userDataColumn);
  wrapper.appendChild(table).appendChild(getTableHeadElement(tableHeadValue));
  wrapper.appendChild(table).appendChild(tbody).appendChild(getTableRowFragment(userData));
  sortButtonClickEvent(userData);
}

const getTableHeadElement = (tableHeadValue) => {
  const thead = createElementWithClassName("thead", "thead");
  const tr = createElementWithClassName("tr", "tr");
  const fragmentThElement = document.createDocumentFragment();
  for (const value of tableHeadValue) {
    const th = createElementWithClassName("th", "th");
    th.textContent = value;
    value === 'ID' && th.appendChild(createSortButton());
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

const createSortButton = () => {
  const sortButton = createElementWithClassName("button", "sortButton");
  sortButton.dataset.status = "default";
  sortButton.id = "js-sortbtn";
  return sortButton;
}

const sortButtonClickEvent = (userData) => {
  const tbody = document.querySelector('tbody');
  const sortButton = document.getElementById('js-sortbtn');
  sortButton.addEventListener('click', (e) => {
    const nextStatus = switchSortStatus(e.target);
    sortButton.dataset.status = nextStatus;
    const sortResultRows = sortFunc(e.target,userData);
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
  }
    sortResultRows.forEach((row) => {
      tbody.appendChild(row);
    });
  });
}

const switchSortStatus = (target) => {
  switch (target.dataset.status) {
    case 'default':
      return 'asc';
    case 'asc':
      return 'desc';
    case 'desc':
      return 'default'; 
    default:
      return 'default';
  }
}

const sortFunc = (target,userData) => {
  const trElement = [...document.querySelectorAll('tbody > tr')];
  const currentStatus = target.dataset.status;
  const initialTrArray = [];
  initialTrArray.push(getTableRowFragment(userData)); 
  if (currentStatus === "default") {
      return initialTrArray;
  }
  if (currentStatus === "asc"){
      return trElement.sort((a,b) => a.children[0].textContent - b.children[0].textContent);
  } 
  if (currentStatus === "desc"){
      return trElement.sort((a,b) => b.children[0].textContent - a.children[0].textContent);
  } 
}

