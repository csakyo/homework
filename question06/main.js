'use strict';

const contentsList = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
                      {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}]

const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(contentsList);
    }, 3000)
})

promise.then((contentsList) => {
    const length = contentsList.length;
    const ul = document.getElementById('target');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < length; i++){
    const {to, img, alt, text} = contentsList[i];
    const li_tag = document.createElement('li');
    const a_tag = document.createElement('a');
    a_tag.href = to;
    a_tag.innerHTML = text;
    const img_tag = document.createElement('img');
    img_tag.src = img;
    img_tag.alt = alt;
    fragment.appendChild(li_tag).appendChild(a_tag).appendChild(img_tag);
    }
    ul.appendChild(fragment);
})