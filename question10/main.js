'use strict';

// loading img 
const wrapper = document.getElementById('wrapper');
const loadImg = document.createElement('img');
const showLoadImg = () => {
    loadImg.src = "loading-circle.gif";
    wrapper.appendChild(loadImg);
} 

const contentsList = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
                      {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}]


const promise = new Promise((resolve) => {
    setTimeout(() =>{
      resolve(contentsList);
    }, 3000)
})

async function asyncFunc() {
    showLoadImg();
    try {
        const result = await promise;
        createList(result);
    }
    catch(error) {
        console.error(error);
    }
    finally{
        loadImg.remove()
    }
}
asyncFunc();

function createList(listElement){
    const length = listElement.length;
    const ul = document.getElementById('target');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < length; i++){
    const {to, img, alt, text} = listElement[i];
    const liTag = document.createElement('li');
    const aTag = document.createElement('a');
    aTag.href = to;
    aTag.innerHTML = text;
    const imgTag = document.createElement('img');
    imgTag.src = img;
    imgTag.alt = alt;
    fragment.appendChild(liTag).appendChild(aTag).appendChild(imgTag);
    }
    ul.appendChild(fragment);
}
