'use strict'

var gFilterBy = ''

function init() {
    renderGallery()
}

function renderGallery() {
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
    initCanvas();
}


function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    console.log(mainMenu);
    mainMenu.classList.toggle('open');
}