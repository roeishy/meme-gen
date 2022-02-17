'use strict'

var gFilterBy = ''

function init() {
    renderGallery()
}

function renderGallery() {
    document.querySelector('.memes-gallery').classList.add("hide")
    document.querySelector('.editor').classList.add("hide")
    document.querySelector('.gallery').classList.remove("hide")
    document.querySelector('#memes-gallery-btn').classList.remove("active")
    document.querySelector('#gallery-btn').classList.add("active")
    const imgs = getImgs(gFilterBy);
    var strHTML = imgs.map(img =>
        `<div class="card"><img class="img${img.id}" src="${img.url}" onclick="onImg(${img.id})" /></div>`
    )
    document.querySelector('.grid-container').innerHTML = strHTML.join('');
}

function filter(val) {
    gFilterBy = val;
    renderGallery();
}

function onImg(id) {
    setImg(id);
    document.querySelector('.gallery').classList.toggle("hide")
    document.querySelector('.editor').classList.toggle("hide")
    initCanvas(true);
}

function renderMemesGallery() {
    document.querySelector('.gallery').classList.add("hide")
    document.querySelector('.editor').classList.add("hide")
    document.querySelector('.memes-gallery').classList.remove("hide")
    document.querySelector('#gallery-btn').classList.remove("active")
    document.querySelector('#memes-gallery-btn').classList.add("active")
    const savedMemes = getSavedMemes();
    var strHTML = savedMemes.map(savedMeme =>
        `<div class="card"><img src="${savedMeme.url}"/></div>`
    )
    document.querySelector('#memes-gallery').innerHTML = strHTML.join('');
}


function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    console.log(mainMenu);
    mainMenu.classList.toggle('open');
}