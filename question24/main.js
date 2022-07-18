'use strict';

const textLinkToTerms = document.getElementById('js-terms-textlink');
const modal = document.getElementById('js-modal');
const modalClose = document.getElementById('js-close');
const mask = document.getElementById('js-mask');
const checkbox = document.getElementById('js-checkbox');
const submitButton = document.getElementById('js-submit-button');
const target = document.querySelector(".last_content");


textLinkToTerms.addEventListener('click',()=>{
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
});
modalClose.addEventListener('click',()=>{
    modal.classList.add('hidden');
    mask.classList.add('hidden');
});
mask.addEventListener('click',()=>{
    modalClose.click();
});

const options = {
  root: document.getElementById('js-modal'),
  threshold: 1
};

const checkWhenIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      checkbox.checked = true;
      checkbox.disabled = false;
    }
}

const observer = new IntersectionObserver(checkWhenIntersect, options);
observer.observe(target);

submitButton.addEventListener('click',function(e){
  checkbox.checked ? window.location.href = './register-done.html' : e.preventDefault();
})

