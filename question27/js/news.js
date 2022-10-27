'use strict';

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const newsWrapper = document.getElementById('js-newsWrapper');
const tabsGroup = document.getElementById('js-tabs');
const logoutButtonArea = document.getElementById('js-logout-button-area');
const contentsWrapper = createElementWithClassName("div", "contentsWrapper");
contentsWrapper.id = "js-contentsWrapper";

if(!localStorage.getItem('token')) {
  window.location.href = "./login.html"
}

//Get json data
async function callApi() {
  try {
    const res = await fetch('https://myjson.dit.upm.es/api/bins/5oo3');
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

function renderNewsUiElement(newsData) {
  tabsGroup.appendChild(getTabListsFragment(newsData));
  newsWrapper.appendChild(renderContents(newsData));
  renderLogoutBtn();
  logoutButtonEvent();
}

const renderLogoutBtn = () => {
  const logoutButton = createElementWithClassName('button', 'logoutButton'); 
  logoutButton.id = 'js-logout-btn';
  logoutButton.textContent = 'Logout';
  logoutButtonArea.appendChild(logoutButton);
}

const logoutButtonEvent = () => {
  const logoutButton = document.getElementById('js-logout-btn');
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = './index.html';
  });
}

//get Tab Elements 
const getTabListsFragment = (newsData) => {
  const fragmentTablists = document.createDocumentFragment();
  for (let i = 0; i < newsData.length; i++) {
    const tabList = createElementWithClassName("li", "tabList");
    tabList.textContent = newsData[i].category;
    tabList.dataset.index = i;
    newsData[i].initialDisplay && tabList.classList.add("is-active-tab");
    fragmentTablists.appendChild(tabList);
  }
  return fragmentTablists;
};

//Render Content Element
const renderContents = (newsData) => {
  const fragmentContents = document.createDocumentFragment();
  for (let i = 0; i < newsData.length; i++) {
    const contentsContainer = createElementWithClassName("div", "contentsContainer");
    const tabContents = createElementWithClassName("div", "tabContents");
    const tabContentsUl = createElementWithClassName("ul", "tabContentsUl");
    newsData[i].initialDisplay && contentsContainer.classList.add("is-active-content");

    fragmentContents.appendChild(contentsContainer).appendChild(tabContents).appendChild(tabContentsUl).appendChild(createTitles(newsData[i]));
    tabContents.appendChild(createImgElements(newsData[i]));
  }
  contentsWrapper.appendChild(fragmentContents);
  return contentsWrapper;
}

//get titles data
const createTitles = ({ articles }) => {
  const fragmentTitles = document.createDocumentFragment();
  for (let i = 0; i < articles.length; i++) {
    const articleTitle = articles[i].title;
    const titleList = document.createElement('li');
    const articleLink = document.createElement('a');
    articleLink.href = "#";
    articleLink.textContent = articleTitle;

    // Display new icon
    const elapsedTime = getElapsedDays(articles[i].date);
    const newArrivalPeriod = 3;
    if (elapsedTime <= newArrivalPeriod) {
      const newIcon = createElementWithClassName("span", "new_icon"); 
      newIcon.textContent = 'new';
      articleLink.appendChild(newIcon);      
    }

    //add comment icon and number
    const commentsLength = articles[i].comments.length; 
    if (commentsLength > 0) {
      articleLink.appendChild(createCommentIcon(articles[i]));
    }
    
    fragmentTitles.appendChild(titleList).appendChild(articleLink);
  }
  return fragmentTitles;
}

//Get img data 
const createImgElements = (newsData) => {
  const imgWrapper = createElementWithClassName("div", "imgWrapper");
  const imgTag = document.createElement('img');
  imgTag.src = newsData.img;
  imgWrapper.appendChild(imgTag);
  return imgWrapper;
}

// Display comment icons and numbers
const createCommentIcon = (articlesData) => {
  const commentLength = articlesData.comments.length;
  const commentIcon = createElementWithClassName("span", "comment_icon");
  const commentNum = createElementWithClassName("span", "comment_icon_num");
  const commentIconImg = createElementWithClassName("img", "comment_icon_img");
  commentNum.textContent = commentLength;
  commentIconImg.src = './img/comment_icon.png';
  commentIcon.appendChild(commentIconImg);
  commentIcon.appendChild(commentNum);
  return commentIcon; 
}

// Get the number of days elapsed
const getElapsedDays = (postDateData) => {
const postedDate = new Date(postDateData);
const today = new Date();
const millisecondsPerDay = 24*60*60*1000;
const elapsedDays = (today - postedDate) / millisecondsPerDay;
return Math.floor(elapsedDays);
}

//Tab switching function
tabsGroup.addEventListener("click", (e) => {
  const activeTab = document.getElementsByClassName("is-active-tab")[0];
  const activeContent = document.getElementsByClassName('is-active-content')[0];

  activeTab.classList.remove("is-active-tab");
  e.target.classList.add("is-active-tab");
  activeContent.classList.remove('is-active-content'); 
  const contents = document.getElementsByClassName('contentsContainer');
  contents[e.target.dataset.index].classList.add('is-active-content'); 
});
