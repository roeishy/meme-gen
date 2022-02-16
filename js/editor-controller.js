'use strict'

var gCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gMousePos;


function initCanvas() {
    var meme = getMeme();
    createCanvas();
    drawImgFromlocal(meme.selectedImgId)
    for (var i = 0; i < meme.lines.length; i++) {
        drawText(meme.lines[i])
        var width = gCtx.measureText(meme.lines[i].txt).width;
        setLineWidth(width, i);
    }
    addListeners()
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

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    gMousePos = pos;
    const meme = getMeme();
    for (var i = 0; i < meme.lines.length; i++) {
        if (isTxtClicked(pos, meme.lines[i])) {
            selectLine(i);
            document.getElementById('txt-input').value = meme.lines[i].txt
            setLineDrag(true);
        }
    }
    document.getElementById('meme-canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
    var line = getLine()
    if (line.drag) {
        var curMousePos = getEvPos(ev)
        var posDelta = {
            x: curMousePos.x - gMousePos.x,
            y: curMousePos.y - gMousePos.y
        }
        gMousePos = curMousePos;
        setLinePos(posDelta);
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        initCanvas()
    }
}

function onUp() {
    setLineDrag(false);
    document.getElementById('meme-canvas').style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}