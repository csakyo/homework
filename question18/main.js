'use strict';
const imgListsWrapper = document.getElementById('js-imgListsWrapper');
const imgLists = document.getElementById('js-imgLists');

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

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
  const imgData = await callApi();
  if (imgData){
    renderImgUiElement(imgData);
    } else {
    imgListsWrapper.textContent = "データの表示に失敗しました";
    console.error('データの表示に失敗しました'); 
  }
}
init();


const renderImgUiElement = (imgData) => {
  renderNextBtn(imgData);
  renderPrevBtn(imgData);
  renderPageNumElement(imgData);
  renderPagenation(imgData);
  clickedPagenation(imgData);
  autoImgSwitch(imgData);
  imgLists.appendChild(getImgListsFragment(imgData));
}

const renderPageNumElement = (imgData) => {
  const numberOfPage = createElementWithClassName("p", "pageNumber");
  imgListsWrapper.appendChild(numberOfPage);
  numberOfPage.id = "js-number";
  numberOfPage.textContent = `1 / ${imgData.length}`;  
}


const getImgListsFragment = (imgData) => {
  const fragmentImglists = document.createDocumentFragment();
  for (let i = 0; i < imgData.length; i++) {
    const imgList = createElementWithClassName("li", "imgList");
    const img = createElementWithClassName("img", `img_0${[i + 1]}`);
    imgList.dataset.index = i;
    img.src = imgData[i].img;
    img.alt = imgData[i].description;
    i === 0 && imgList.classList.add("is-show");
    fragmentImglists.appendChild(imgList).appendChild(img);
  }
  return fragmentImglists;
};


let imgNum = 0;
const imgList = document.getElementsByClassName("imgList");

const renderPrevBtn = (imgData) => {
  const prevBtn = createElementWithClassName("button", "prev");
  prevBtn.id = 'js-prevbtn';
  prevBtn.textContent = '◀︎';
  imgListsWrapper.appendChild(prevBtn);
  prevBtn.disabled = true;

  prevBtn.addEventListener("click", function() {
    imgNum -= 1;
    document.querySelector(".is-show").classList.remove('is-show'); 
    imgList[imgNum].classList.add('is-show');
    switchPagenation(imgNum);
    switchDisableForBtn(imgData); 
    setNumberOfPage(imgData);
  });
}

const renderNextBtn = (imgData) => {
  const nxtBtn = createElementWithClassName("button", "next");
  nxtBtn.id = 'js-nextbtn';
  nxtBtn.textContent = '▶︎';
  imgListsWrapper.appendChild(nxtBtn);

  nxtBtn.addEventListener("click", function() {
    imgNum += 1;
    document.querySelector(".is-show").classList.remove('is-show'); 
    imgList[imgNum].classList.add('is-show');
    switchPagenation(imgNum);
    switchDisableForBtn(imgData);
    setNumberOfPage(imgData);
  });
}

const setNumberOfPage = (imgData) => {
  document.getElementById("js-number").textContent = `${imgNum + 1} / ${imgData.length}`;
}

const switchDisableForBtn = (imgData) => {
  const prevBtnElement = document.getElementById("js-prevbtn");
  const nxtBtnElement = document.getElementById("js-nextbtn");
  const lengthImg = imgData.length;

  prevBtnElement.disabled = imgNum === 0;
  nxtBtnElement.disabled = imgNum === lengthImg - 1;
};


const autoImgSwitch = (imgData) => setInterval(() => {
  imgNum++;
  if (imgNum === imgData.length) {
    imgNum = 0;
  }
  document.querySelector(".is-show").classList.remove('is-show'); 
  imgList[imgNum].classList.add('is-show');
  switchPagenation(imgNum);
  switchDisableForBtn(imgData);
  setNumberOfPage(imgData); 
}, 3000)


const renderPagenation = (imgData) => {
  const pagenation = createElementWithClassName("ul", "pagenation");
  pagenation.id = 'pagenation';
  const pagenationsFragment = document.createDocumentFragment();
  for (let i = 0; i < imgData.length; i++){
    const pagenations = createElementWithClassName("li", "pagenations");
    const pagenationItems = createElementWithClassName("span", "pagenation-item");
    pagenationItems.dataset.index = i;
    i === 0 && pagenationItems.classList.add("is-active");
    pagenationsFragment.appendChild(pagenations).append(pagenationItems);
  }
  imgListsWrapper.appendChild(pagenation).appendChild(pagenationsFragment);
}

const pagenationItems = document.getElementsByClassName("pagenation-item");
const switchPagenation = (imgNum) => {
  document.querySelector(".is-active").classList.remove('is-active'); 
  pagenationItems[imgNum].classList.add('is-active');
}

const clickedPagenation = (imgData) => {
  for (const pagenationItem of pagenationItems) {
    pagenationItem.addEventListener("click", function () {
      const arrayPagenationItems = Array.from(pagenationItems);
      imgNum = arrayPagenationItems.indexOf(this);


      document.querySelector('.is-active').classList.remove('is-active');
      arrayPagenationItems[imgNum].classList.add('is-active');

      document.querySelector(".is-show").classList.remove('is-show');
      imgList[imgNum].classList.add('is-show');
      switchDisableForBtn(imgData);
      setNumberOfPage(imgData);
    })
  } 
}
