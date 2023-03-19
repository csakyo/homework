const imgListsWrapper = document.getElementById("js-imgListsWrapper");
const imgLists = document.getElementById("js-imgLists");

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const showLoadImg = () => {
  const loadImg = createElementWithClassName("img", "loading");
  loadImg.src = "./img/loading-circle.gif";
  loadImg.id = "loading";
  imgListsWrapper.appendChild(loadImg);
};

const removeLoadImg = () => {
  document.getElementById("loading").remove();
};

const getData = new Promise((resolve) => {
  showLoadImg();
  setTimeout(() => {
    resolve(fetch("https://mocki.io/v1/09593e78-80ba-4765-940e-3c70fb46078c"));
  }, 3000);
});

//Get json data
const callApi = async () => {
  try {
    const response = await getData;
    if (!response.ok) {
      console.error(`${response.status}:${response.statusText}`);
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  } finally {
    removeLoadImg();
  }
};

const init = async () => {
  const imgData = await callApi();
  if (imgData) {
    renderImgUiElement(imgData);
  } else {
    imgListsWrapper.textContent = "データの表示に失敗しました";
    console.error("データの表示に失敗しました");
  }
};
init();

const renderImgUiElement = (imgData) => {
  const imgDataLength = imgData.length;
  createArrowBtnsElements();
  renderPageNumElement(imgDataLength);
  renderPagenation(imgDataLength);
  clickedPagenation(imgDataLength);
  autoImgSwitch(imgDataLength);
  arrowBtnsClickEvent(imgDataLength);
  imgLists.appendChild(getFragmentImglists(imgData));
};

const renderPageNumElement = (dataLength) => {
  const numberOfPage = createElementWithClassName("p", "page_number");
  imgListsWrapper.appendChild(numberOfPage);
  numberOfPage.id = "js-number";
  numberOfPage.textContent = `1 / ${dataLength}`;
};

const getFragmentImglists = (imgData) => {
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

let slide = {currentIndex: 0}

const createArrowBtnsElements = () => {
  const btnDirections = ["next", "prev"];
  btnDirections.forEach((direction) => {
    const btn = document.createElement("button");
    btn.classList.add(`${direction}`, "js-arrowbutton");
    btn.id = direction === "prev" ? "js-prevbtn" : "js-nextbtn";
    btn.textContent = direction === "prev" ? "◀︎" : "▶︎";
    btn.value = direction;
    imgListsWrapper.appendChild(btn);
    btn.disabled = direction === "prev";
  });
};

const arrowBtnsClickEvent = (dataLength) => {
  const arrowButtons = document.querySelectorAll(".js-arrowbutton");
  arrowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.currentTarget.value === "prev" ? (slide.currentIndex -= 1) : (slide.currentIndex  += 1);
      document.querySelector(".is-show").classList.remove("is-show");
      imgLists.querySelector(`[data-index="${slide.currentIndex}"]`).classList.add("is-show");
      switchPagenation(slide.currentIndex);
      switchDisableForBtn(dataLength);
      setNumberOfPage(dataLength);
      resetAutoPlay(dataLength);
    });
  });
};

const setNumberOfPage = (imgDataLength) => {
  document.getElementById("js-number").textContent = `${slide.currentIndex + 1} / ${imgDataLength}`;
};

const switchDisableForBtn = (dataLength) => {
  const prevBtnElement = document.getElementById("js-prevbtn");
  const nxtBtnElement = document.getElementById("js-nextbtn");
  const firstNum = 0;
  const lastNum = dataLength - 1;
  prevBtnElement.disabled = slide.currentIndex === firstNum;
  nxtBtnElement.disabled = slide.currentIndex === lastNum;
};

let autoPlay;
const autoImgSwitch = (dataLength) => {
  autoPlay = setInterval(() => {
    slide.currentIndex ++;
    if (slide.currentIndex === dataLength) {
      slide.currentIndex = 0;
    }
    document.querySelector(".is-show").classList.remove("is-show");
    imgLists.querySelector(`[data-index="${slide.currentIndex}"]`).classList.add("is-show");
    switchPagenation(slide.currentIndex);
    switchDisableForBtn(dataLength);
    setNumberOfPage(dataLength);
  }, 3000);
};

const resetAutoPlay = (dataLength) => {
  clearInterval(autoPlay);
  autoImgSwitch(dataLength);
};

const renderPagenation = (dataLength) => {
  const pagenation = createElementWithClassName("ul", "pagenation");
  const pagenationsFragment = document.createDocumentFragment();
  for (let i = 0; i < dataLength; i++) {
    const pagenations = createElementWithClassName("li", "pagenations");
    const pagenationItems = createElementWithClassName("span","pagenation-item");
    pagenationItems.dataset.index = i;
    i === 0 && pagenationItems.classList.add("is-active");
    pagenationsFragment.appendChild(pagenations).appendChild(pagenationItems);
  }
  imgListsWrapper.appendChild(pagenation).appendChild(pagenationsFragment);
};

const pagenationItems = document.getElementsByClassName("pagenation-item");
const switchPagenation = (indexOfCurrentImg) => {
  document.querySelector(".is-active").classList.remove("is-active");
  pagenationItems[indexOfCurrentImg].classList.add("is-active");
};

const clickedPagenation = (dataLength) => {
  for (const pagenationItem of pagenationItems) {
    pagenationItem.addEventListener("click", function () {
      const arrayPagenationItems = Array.from(pagenationItems);
      slide.currentIndex = arrayPagenationItems.indexOf(this);

      document.querySelector(".is-active").classList.remove("is-active");
      arrayPagenationItems[slide.currentIndex].classList.add("is-active");

      document.querySelector(".is-show").classList.remove("is-show");
      imgLists.querySelector(`[data-index="${slide.currentIndex}"]`).classList.add("is-show");
      switchDisableForBtn(dataLength);
      setNumberOfPage(dataLength);
      resetAutoPlay(dataLength);
    });
  }
};
