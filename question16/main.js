'use strict';

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const newsWrapper = document.getElementById('js-newsWrapper');
const tabsGroup = document.getElementById('js-tabs');
const contentsWrapper = createElementWithClassName("div", "contentsWrapper");
contentsWrapper.id = "js-contentsWrapper";


//Get json data
async function callApi() {
  try {
    const res = await fetch('https://myjson.dit.upm.es/api/bins/an1r');
    if (!res.ok) {
      throw new Error(`サーバーリクエストに失敗しました: ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  }
  catch(error) {
    console.error(error);
  }
  finally {
    console.log('CONPLETE!');
  }
}

async function init() {
  const newsData = await callApi();
  if (newsData){
    renderNewsUiElement(newsData);
    } else {
    newsWrapper.textContent = "データの表示に失敗しました";
    console.error('データの表示に失敗しました'); 
  }
}
init();

function renderNewsUiElement(data) {
  tabsGroup.appendChild(createTabs(data));
  newsWrapper.appendChild(createContents(data));
}

//Render Tab Element
const createTabs = (data) => {
  const fragmentTablists = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    const tabList = createElementWithClassName("li", "tabList");
    tabList.textContent = data[i].category;
    i === 0 && tabList.classList.add("is-active");
    fragmentTablists.appendChild(tabList);
  }
  return fragmentTablists;
};

//Render Content Element
const createContents = (data) => {
  const fragmentContents = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    const {articles} = data[i];
    const contentsContainer = createElementWithClassName("div", "contentsContainer");
    const tabContents = createElementWithClassName("div", "tabContents");
    const tabContentsUl = createElementWithClassName("ul", "tabContentsUl");
    i === 0 && contentsContainer.classList.add("is-show");

    for (let j = 0; j < articles.length; j++){
      const articleTitle = data[i].articles[j].title;
      const titleList = document.createElement('li');
      const articleLink = document.createElement('a');
      articleLink.href = "#";
      articleLink.innerHTML = articleTitle;
      fragmentContents.appendChild(contentsContainer).appendChild(tabContents).appendChild(tabContentsUl).appendChild(titleList).appendChild(articleLink);
    }
    tabContents.appendChild(createImgElements(data[i]));
  }
  contentsWrapper.appendChild(fragmentContents);
  return contentsWrapper;
}

//get img data 
const createImgElements = (data) => {
  const imgWrapper = createElementWithClassName("div", "imgWrapper");
  const imgTag = document.createElement('img');
  imgTag.src = data.img;
  imgWrapper.appendChild(imgTag);
  return imgWrapper;
}

//Tab switching function
tabsGroup.addEventListener("click", (e) => {
  const activeElement = document.getElementsByClassName("is-active")[0];
  const showElement = document.getElementsByClassName('is-show')[0];

  activeElement.classList.remove("is-active");
  e.target.classList.add("is-active");
  const tabList = document.getElementsByClassName('tabList');
  const index = Array.prototype.indexOf.call(tabList,e.target);
  showElement.classList.remove('is-show'); 
  const contents = document.getElementsByClassName('contentsContainer');
  contents[index].classList.add('is-show'); 
});
