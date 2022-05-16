import { differenceInDays } from "date-fns";

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const newsWrapper = document.getElementById("js-newsWrapper");
const tabsGroup = document.getElementById("js-tabs");
const contentsWrapper = createElementWithClassName("div", "contentsWrapper");
contentsWrapper.id = "js-contentsWrapper";

//Get json data
async function callApi() {
  try {
    const res = await fetch(
      "https://mocki.io/v1/5a30de87-dfe7-4644-a197-b832f1937adb"
    );
    if (!res.ok) {
      throw new Error(`サーバーリクエストに失敗しました: ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("CONPLETE!");
  }
}

async function init() {
  const newsData = await callApi();
  if (newsData) {
    renderNewsUiElement(newsData);
  } else {
    newsWrapper.textContent = "データの表示に失敗しました";
    console.error("データの表示に失敗しました");
  }
}
init();

function renderNewsUiElement(newsData) {
  tabsGroup.appendChild(getTabListsFragment(newsData));
  newsWrapper.appendChild(renderContents(newsData));
  clickedTabs();
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
  for (const topics of newsData) {
    const contentsContainer = createElementWithClassName(
      "div",
      "contentsContainer"
    );
    const tabContents = createElementWithClassName("div", "tabContents");
    const tabContentsUl = createElementWithClassName("ul", "tabContentsUl");
    topics.initialDisplay &&
      contentsContainer.classList.add("is-active-content");

    fragmentContents
      .appendChild(contentsContainer)
      .appendChild(tabContents)
      .appendChild(tabContentsUl)
      .appendChild(createTitles(topics));
    tabContents.appendChild(createImgElements(topics));
  }
  contentsWrapper.appendChild(fragmentContents);
  return contentsWrapper;
};

//get titles data
const createTitles = ({ articles }) => {
  const fragmentTitles = document.createDocumentFragment();
  for (const topics of articles) {
    const articleTitle = topics.title;
    const titleList = document.createElement("li");
    const articleLink = document.createElement("a");
    articleLink.href = "#";
    articleLink.textContent = articleTitle;

    // Display new icon
    const elapsedTime = getElapsedDays(topics.date);
    const newArrivalPeriod = 3;
    if (elapsedTime <= newArrivalPeriod) {
      const newIcon = createElementWithClassName("span", "new_icon");
      newIcon.textContent = "new";
      articleLink.appendChild(newIcon);
    }

    //add comment icon and number
    const commentsLength = topics.comments.length;
    if (commentsLength > 0) {
      articleLink.appendChild(createCommentIcon(topics));
    }

    fragmentTitles.appendChild(titleList).appendChild(articleLink);
  }
  return fragmentTitles;
};

//Get img data
const createImgElements = (newsData) => {
  const imgWrapper = createElementWithClassName("div", "imgWrapper");
  const imgTag = document.createElement("img");
  imgTag.src = newsData.img;
  imgWrapper.appendChild(imgTag);
  return imgWrapper;
};

// Display comment icons and numbers
const createCommentIcon = (articlesData) => {
  const commentLength = articlesData.comments.length;
  const commentIcon = createElementWithClassName("span", "comment_icon");
  const commentNum = createElementWithClassName("span", "comment_icon_num");
  const commentIconImg = createElementWithClassName("img", "comment_icon_img");
  commentNum.textContent = commentLength;
  commentIconImg.src = "./img/comment_icon.png";
  commentIcon.appendChild(commentIconImg);
  commentIcon.appendChild(commentNum);
  return commentIcon;
};

// Get the number of days elapsed
const getElapsedDays = (postDateData) => {
  const elapsedDays = differenceInDays(new Date(), new Date(postDateData));
  return elapsedDays;
};

//Tab switching function
const clickedTabs = () => {
  tabsGroup.addEventListener("click", (e) => {
    const activeTab = document.getElementsByClassName("is-active-tab")[0];
    const activeContent = document.getElementsByClassName(
      "is-active-content"
    )[0];

    activeTab.classList.remove("is-active-tab");
    e.target.classList.add("is-active-tab");
    activeContent.classList.remove("is-active-content");
    const contents = document.getElementsByClassName("contentsContainer");
    contents[e.target.dataset.index].classList.add("is-active-content");
  });
};
