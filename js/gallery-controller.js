'use strict'

var gFilterBy = ''

function init() {
    renderGallery()
}
//render the imgs to the dom
function renderGallery() {
    //add classes to the gallery and remove classes from the editor and meme gallery
    document.querySelector('.memes-gallery').classList.add("hide")
    document.querySelector('.editor').classList.add("hide")
    document.querySelector('.gallery').classList.remove("hide")
    document.querySelector('#memes-gallery-btn').classList.remove("active")
    document.querySelector('#gallery-btn').classList.add("active")
    //get imgs from the model by fillter
    const imgs = getImgs(gFilterBy);
    var strHTML = imgs.map(img =>
        `<div class="card"><img class="img${img.id}" src="${img.url}" onclick="onImg(${img.id})" /></div>`
    )
    document.querySelector('.grid-container').innerHTML = strHTML.join('');
}

//gets value from the search input and renders the gallery by it
function filter(val) {
    gFilterBy = val;
    renderGallery();
}

//hides the gallery and render the editor
function onImg(id) {
    setImg(id);
    document.querySelector('.gallery').classList.toggle("hide")
    document.querySelector('.editor').classList.toggle("hide")
    initCanvas(true); //sends true for default editor values
}

//hides the editor and gallery, renders the meme gallery
function renderMemesGallery() {
    document.querySelector('.gallery').classList.add("hide")
    document.querySelector('.editor').classList.add("hide")
    document.querySelector('.memes-gallery').classList.remove("hide")
    document.querySelector('#gallery-btn').classList.remove("active")
    document.querySelector('#memes-gallery-btn').classList.add("active")
    const savedMemes = getSavedMemes(); //get the saved memes from the model
    var strHTML = savedMemes.map(savedMeme =>
        `<div class="card"><img src="${savedMeme.url}"/></div>`
    )
    document.querySelector('#memes-gallery').innerHTML = strHTML.join('');
}

//opens the menu in mobile mode
function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    console.log(mainMenu);
    mainMenu.classList.toggle('open');
}