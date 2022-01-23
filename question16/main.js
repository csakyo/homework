'use strict';

const createElementWithClassName = (element, name) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(name);
  return createdElement;
};

const newsWrapper = document.getElementById('js-newsWrapper');
const tabsGroup = document.getElementById('js-tabs');
const contentsWrapper = document.createElement("div");
contentsWrapper.id = "js-contentsWrapper";
contentsWrapper.classList.add("contentsWrapper");


//Get json data
async function callApi() {
  try {
    const res = await fetch('https://myjson.dit.upm.es/api/bins/an1r');
    const json = await res.json();
    return json.data;
  }
  catch(error) {
    tabsGroup.textContent = "データが取得できませんでした";
    console.error(error);
  }
  finally {
    console.log('CONPLETE!');
  }
}

async function init() {
  const result = await callApi();
  if (result){
    renderElement(result);
    } else {
    tabsGroup.textContent = "データの表示に失敗しました";
    console.error('データの表示に失敗しました'); 
  }
}
init();

//Rendering tabs and contents
function renderElement(data){
    newsWrapper.appendChild(contentsWrapper);
    const length = data.length;
    const fragmentTablists = document.createDocumentFragment();
    const fragmentContents = document.createDocumentFragment();

    //Display category names in tabs
    for (let i = 0; i < length; i++){
      const {category, articles, img} = data[i];
      const tabLists = document.createElement('li');
     
      tabLists.innerHTML = category;
      tabLists.classList.add('tabList');
      fragmentTablists.appendChild(tabLists);
      
      const contentsContainer = createElementWithClassName("div", "contentsContainer");
      const tabContents = createElementWithClassName("div", "tabContents");
      const tabContentsUl = createElementWithClassName("ul", "tabContentsUl");

      //Get the title of articles
      for (let j = 0; j < articles.length; j++){
        const articleTitle = data[i].articles[j].title;
        const titleList = document.createElement('li');
        const articleLink = document.createElement('a');
        articleLink.href = "#";
        articleLink.innerHTML = articleTitle;
        fragmentContents.appendChild(contentsContainer).appendChild(tabContents).appendChild(tabContentsUl).appendChild(titleList).appendChild(articleLink);
      }

      //Display the img
      const imgWrapper = createElementWithClassName("div", "imgWrapper");
      const imgTag = document.createElement('img');
      imgTag.src = img;
      imgWrapper.appendChild(imgTag);
      tabContents.appendChild(imgWrapper);

      //Display the first content.
      if (i === 0){
        tabLists.classList.add('is-active');   
        contentsContainer.classList.add('is-show');
      }
    }
    tabsGroup.appendChild(fragmentTablists);
    contentsWrapper.appendChild(fragmentContents);
}


//Tab switching function
tabsGroup.addEventListener("click", (e) => {
  const activeElement = document.getElementsByClassName("is-active")[0];
  const showElement = document.getElementsByClassName('is-show')[0];

  if (activeElement && showElement && e.currentTarget !== e.target) {
    activeElement.classList.remove("is-active");
    e.target.classList.add("is-active");

      const tabList = document.getElementsByClassName('tabList');
      const index = Array.prototype.indexOf.call(tabList,e.target);
      showElement.classList.remove('is-show'); 
      document.getElementsByClassName('contentsContainer')[index].classList.add('is-show'); 
  }
});

