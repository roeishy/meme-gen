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
    gCanvas.height = gCanvas.width;
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
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
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
    // window.addEventListener('resize', () => {
    // resizeCanvas()
    // renderCanvas()
    // })
}

function resizeCanvas() {
    // var elContainer = document.getElementById('meme-canvas')
    // // Note: changing the canvas dimension this way clears the canvas
    // gCanvas.width = elContainer.offsetWidth - 20
    // // Unless needed, better keep height fixed.
    // //   gCanvas.height = elContainer.offsetHeight
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

function drawRect() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    initCanvas()
    const line = getLine()
    gCtx.beginPath();
    if (line.align === 'center')
        gCtx.rect(line.x - (line.width / 2), line.y - line.size, line.width, line.size)
    if (line.align === 'left')
        gCtx.rect(line.x, line.y - line.size, line.width, line.size)
    if (line.align === 'right')
        gCtx.rect(line.x - line.width, line.y - line.size, line.width, line.size)
    gCtx.stroke();
}

function onDown(ev) {
    const pos = getEvPos(ev)
    gMousePos = pos;
    const meme = getMeme();
    for (var i = 0; i < meme.lines.length; i++) {
        if (isTxtClicked(pos, meme.lines[i])) {
            selectLine(i);
            document.getElementById('txt-input').value = meme.lines[i].txt
            document.getElementById('fonts').value = meme.lines[i].font
            document.getElementById('text-color').value = meme.lines[i].color
            document.getElementById('stroke-color').value = meme.lines[i].stroke
            setLineDrag(true);
        }
    }
    drawRect()
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
        drawRect()
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

function onIncDec(isInc) {
    var line = getLine()
    if (isInc && line.size + 1 < 80) {
        line.size++;
        setLineSize(line.size)
        initCanvas()
        return;
    }
    else if (!isInc && line.size - 1 > 10) {
        line.size--;
        setLineSize(line.size);
        initCanvas()
        return;
    }
}

function onAlign(alignDir) {
    setLineAlign(alignDir);
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    initCanvas();
}

function onFont(font) {
    setLineFont(font);
    initCanvas();
}

function onColor(color) {
    setLineColor(color);
    initCanvas();
}

function onStroke(stroke) {
    setLineStroke(stroke);
    initCanvas();
}

function onAddLine() {
    addLine();
    initCanvas();
}

function onDeleteLine() {
    deleteLine()
    initCanvas()
}


function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    download(imgContent);
}

function download(url) {
    const a = document.createElement('a')
    a.href = url
    a.download = 'meme.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}