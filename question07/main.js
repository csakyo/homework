'use strict';

const contentsList = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
                      {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}]

const promise = new Promise((resolve) => {
    setTimeout(() =>{
    resolve(contentsList);
    }, 3000)
})
promise.then((contentsList) => {
    const length = contentsList.length;
    const ul = document.getElementById('target');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < length; i++){
    const {to, img, alt, text} = array[i];
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
    document.getElementById("loadImg").style.display = "none" ;
}) 
