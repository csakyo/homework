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

const removeLoadImg = () => document.getElementById('js-loading').remove();

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
    wrapper.textContent = "Failed to display data.";
    console.error('Failed to display data.'); 
  }
}
init();

const userDataColumn = {
  userId: {
    value : "ID",
    hasSort : true
  },
  name: {
    value : "名前",
    hasSort : false
  },
  gender: {
    value : "性別",
    hasSort : false
  },
  age: {
    value : "年齢",
    hasSort : true
  }
}

const renderTableElement = (userData)  => {
  const table = createElementWithClassName("table", "table");
  const tbody = createElementWithClassName("tbody", "tbody");
  table.id = "js-table";
  tbody.id = "js-tbody";
  wrapper.appendChild(table).appendChild(getTableHeadElement());
  wrapper.appendChild(table).appendChild(tbody).appendChild(getTableRowFragment(userData));
  addClickEventToSortButton();
}

const getTableHeadElement = () => {
  const thead = createElementWithClassName("thead", "thead");
  const tr = createElementWithClassName("tr", "tr");
  const fragmentThElement = document.createDocumentFragment();
  const userDataColumnKeys = Object.keys(userDataColumn);

  userDataColumnKeys.forEach((key) => {
    const th = createElementWithClassName("th", "th");
    const value = userDataColumn[key].value;
    th.textContent = value; 
    userDataColumn[key].hasSort && th.appendChild(createSortButton());
    fragmentThElement.appendChild(tr).appendChild(th); 
  });

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

const addClickEventToSortButton = () => {
  const sortButtons = [...document.querySelectorAll(".sortButton")];
  const trElement = [...document.querySelectorAll("tbody > tr")];
  sortButtons.forEach((sortButton)=> {
    sortButton.addEventListener('click', (e) => {
      clickSortButton(e.target, sortButtons, trElement);
    });
  })
}

const clickSortButton = (target,sortButtons,trElement) => {
  const tbody = document.querySelector('tbody');
  resetSortbuttonStatus(sortButtons, target);
  const clickedCellIndex = target.parentElement.cellIndex;
  const nextStatus = switchSortStatus(target);
  target.dataset.status = nextStatus;
  const sortedRows = sortFunc(target,clickedCellIndex,trElement);
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  sortedRows.forEach((row) => {
    tbody.appendChild(row);
  });
}

const resetSortbuttonStatus = (sortButtons, clickedButton) => {
  sortButtons.forEach((sortButton) => {
    if (sortButton === clickedButton) return;
    sortButton.dataset.status = Sort.Default;
  });
};

const Sort = {
  Default: "default",
  Asc: "asc",
  Desc: "desc"
};

const switchSortStatus = (target) => {
  switch (target.dataset.status) {
    case Sort.Asc:
      return Sort.Desc;
    case Sort.Desc:
      return Sort.Default;
    default:
      return Sort.Asc;
  }
}

const sortFunc = (target,clickedCellIndex,defaultRows) => {
  const defaultTrElement = [...defaultRows];
  const currentStatus = target.dataset.status;
  switch (currentStatus) {
    case Sort.Asc:
      return defaultTrElement.sort((a, b) => a.children[clickedCellIndex].textContent - b.children[clickedCellIndex].textContent);
    case Sort.Desc:
      return defaultTrElement.sort((a, b) => b.children[clickedCellIndex].textContent - a.children[clickedCellIndex].textContent);
    default:
      return defaultRows;
  }
}
