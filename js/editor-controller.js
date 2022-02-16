'use strict'

var gCanvas;
var gCtx;


function initCanvas() {
    var meme = getMeme();
    createCanvas();
    drawImgFromlocal(meme.selectedImgId)
    meme.lines.forEach(line => drawText(line))
}

function createCanvas() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
}

function drawImgFromlocal(id) {
    var elImg = document.querySelector(`.img${id}`);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function onTxtInput(txt) {
    setLineTxt(txt);
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    initCanvas()
}

function drawText(line) {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = line.color;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Arial`;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
}

function onSwitch() {
    var meme = getMeme();
    var numOfLines = meme.lines.length
    var curLineIdx = meme.selectedLineIdx
    var nextLineIdx = curLineIdx === numOfLines - 1 ? 0 : +1;
    selectLine(nextLineIdx);
    document.getElementById('txt-input').value = meme.lines[nextLineIdx].txt
}