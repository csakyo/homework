'use strict';

// loading img 
const wrapper = document.getElementById('wrapper');
const loadImg = document.createElement('img');
const showLoadImg = () => {
    loadImg.src = "loading-circle.gif";
    wrapper.appendChild(loadImg);
} 

async function callApi() {
    showLoadImg();
    try {
        const res = await fetch('https://jsondata.okiba.me/v1/json/dFQLo210903231659');
        const json = await res.json();
        return json.data;
    }
    catch(error) {
        wrapper.textContent = "データが取得できませんでした";
        console.error(error);
    }
    finally{
        loadImg.remove()
    }}

    async function init(){
        const result = await callApi();
        createList(result);
    }
    init();

function createList(data){
    const length = data.length;
    const ul = document.getElementById('target');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < length; i++){
    const {to, img, alt, text} = data[i];
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
