'use strict';

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const imgListsWrapper = document.getElementById('js-imgListsWrapper');
const imgLists = document.getElementById('js-imgLists');

const showLoadImg = () => {
  const loadImg = createElementWithClassName("img", "loading");
  loadImg.src = "./img/loading-circle.gif";
  loadImg.id = 'loading';
  imgListsWrapper.appendChild(loadImg);
} 

const removeLoadImg = () => {
  document.getElementById('loading').remove();
} 

const getData = new Promise((resolve) => {
  showLoadImg();
  setTimeout(() => {
    resolve(fetch('https://mocki.io/v1/09593e78-80ba-4765-940e-3c70fb46078c'));
  }, 3000);
})

//Get json data
async function callApi() {
  try {
    const res = await getData;
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
    removeLoadImg();
  }
}

async function init() {
  const imgData = await callApi();
  if (imgData){
    renderImgUiElement(imgData);
    } else {
    imgListsWrapper.textContent = "データの表示に失敗しました";
    console.error('データの表示に失敗しました'); 
  }
}
init();


function renderImgUiElement(imgData) {
  renderNextBtn(imgData);
  renderPrevBtn(imgData);
  renderPageNumElement(imgData);
  imgLists.appendChild(getImgListsFragment(imgData));
}

const renderPageNumElement = (imgData) => {
  const numberOfPage = createElementWithClassName("p", "pageNumber");
  imgListsWrapper.appendChild(numberOfPage);
  numberOfPage.id = "js-number";
  numberOfPage.textContent = `1 / ${imgData.length}`;  
}

//get Img Elements 
const getImgListsFragment = (imgData) => {
  const fragmentImglists = document.createDocumentFragment();
  for (let i = 0; i < imgData.length; i++) {
    const imgList = createElementWithClassName("li", "imgList");
    const img = createElementWithClassName("img", `img_0${[i + 1]}`);
    img.src = imgData[i].img;
    img.alt = imgData[i].description;
    i === 0 && imgList.classList.add("is-show");
    fragmentImglists.appendChild(imgList).appendChild(img);
  }
  return fragmentImglists;
};

let imgNum = 0;
const isShowElement = document.getElementsByClassName("is-show");
const imgList = document.getElementsByClassName("imgList");


const renderPrevBtn = (imgData) => {
  const prevBtn = createElementWithClassName("button", "prev");
  prevBtn.id = 'js-prevbtn';
  prevBtn.textContent = '◀︎';
  imgListsWrapper.appendChild(prevBtn);
  prevBtn.disabled = true;

  prevBtn.addEventListener("click", function() {
    imgNum -= 1;
    if (imgNum < 0) {
      imgNum = 0;
    }
    isShowElement[0].classList.remove('is-show'); 
    imgList[imgNum].classList.add('is-show');
    switchDisableForBtn(imgNum,imgData); 
    setNumberOfPage(imgNum,imgData); 
  });
}

const renderNextBtn = (imgData) => {
  const nxtBtn = createElementWithClassName("button", "next");
  nxtBtn.id = 'js-nextbtn';
  nxtBtn.textContent = '▶︎';
  imgListsWrapper.appendChild(nxtBtn);

  nxtBtn.addEventListener("click", function() {
    imgNum += 1;
    if (imgNum >= imgData.length) {
      imgNum = imgData.length - 1;
    }
    isShowElement[0].classList.remove('is-show'); 
    imgList[imgNum].classList.add('is-show');
    switchDisableForBtn(imgNum,imgData);
    setNumberOfPage(imgNum,imgData); 
  });
}


const setNumberOfPage = (num, imgData) => {
  document.getElementById("js-number").textContent = `${num + 1} / ${imgData.length}`;
}

const switchDisableForBtn = (num, imgData) => {
  const prevBtnElement = document.getElementById("js-prevbtn");
  const nxtBtnElement = document.getElementById("js-nextbtn");
  const lengthImg = imgData.length;

  if (num !== 0) {
    prevBtnElement.disabled = false;
  } else {
    prevBtnElement.disabled = true;
  }

  if (num !== lengthImg - 1) {
    nxtBtnElement.disabled = false;
  } else {
    nxtBtnElement.disabled = true;
  }
};
