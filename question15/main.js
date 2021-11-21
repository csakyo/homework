'use strict';

const wrapper = document.getElementById('js-wrapper');
const requestBtn = document.getElementById('js-request-btn');
const requestNumber = document.getElementById('js-number');
const requestText = document.getElementById('js-text');
const modalOpen = document.getElementById('js-modal-btn');
const mask = document.getElementById('js-mask');
const modal = document.getElementById('js-modal');
const modalClose = document.getElementById('js-close');

  /* MODAL OPEN */
modalOpen.addEventListener('click',()=>{
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
});
/* MODAL close */ 
modalClose.addEventListener('click',()=>{
    modal.classList.add('hidden');
    mask.classList.add('hidden');
});

mask.addEventListener('click',()=>{
    modalClose.click();
});

const data = { "data": [
    {
      "a": "bookmark",
      "img": "img/1.png",
      "alt": "画像１",
      "text": "ブックマーク"
    },
    {
      "a": "message",
      "img": "img/2.png",
      "alt": "画像２",
      "text": "メッセージ"
    }
  ]}

async function callApi() {
    try {
        // const res = await fetch('https://jsondata.okiba.me/v1/json/dFQLo210903231659');
        const res = await data;
        // const json = await res.json();
        return res.data;
    }
    catch(error) {
        wrapper.textContent = "データが取得できませんでした";
        console.error(error);
    }
    finally{
        modalOpen.remove();
    }
}

async function init(){
    const result = await callApi();
    if (result){
        createList(result);
    } else {
        wrapper.textContent = "データの表示に失敗しました";
        console.error('データの表示に失敗しました'); 
    }
}

requestBtn.addEventListener('click',()=>{
    if (! requestNumber.value === true || ! requestText.value === true){
        alert('未入力箇所があります');
    } else {
        console.log(requestNumber.value);
        console.log(requestText.value);
        modalClose.click();
        init();
    }
});

function createList(data){
    const length = data.length;
    const ul = document.getElementById('js-target');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < length; i++){
        const {a, img, alt, text} = data[i];
        const liTag = document.createElement('li');
        const aTag = document.createElement('a');
        aTag.href = a;
        aTag.innerHTML = text;
        const imgTag = document.createElement('img');
        imgTag.src = img;
        imgTag.alt = alt;
        fragment.appendChild(liTag).appendChild(aTag).appendChild(imgTag);
    }
    ul.appendChild(fragment);
}
