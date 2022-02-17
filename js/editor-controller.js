'use strict'

var gCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gMousePos;


function initCanvas(bool = false) {
    //return to default
    if (bool) {
        defaultLines()
        document.getElementById('txt-input').value = 'Enter Text'
        document.getElementById('fonts').value = 'impact'
        document.getElementById('text-color').value = '#FFFFFF'
        document.getElementById('stroke-color').value = '#000'
    }
    var meme = getMeme();
    createCanvas();
    drawImg(meme.selectedImgId)
    for (var i = 0; i < meme.lines.length; i++) {//draw all of the lines
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

//draw the selected img on the canvas
function drawImg(id) {
    var elImg = document.querySelector(`.img${id}`);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

//gets string andupdates the model cur line, clear the canvas and rendering
function onTxtInput(txt) {
    setLineTxt(txt);
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    initCanvas()
}

//gets line obj and draw text by its keys
function drawText(line) {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
}

// function onSwitch() {
//     var meme = getMeme();
//     var numOfLines = meme.lines.length
//     var curLineIdx = meme.selectedLineIdx
//     var nextLineIdx = curLineIdx === numOfLines - 1 ? 0 : +1;
//     selectLine(nextLineIdx);
//     document.getElementById('txt-input').value = meme.lines[nextLineIdx].txt
// }


function addListeners() {
    addMouseListeners()
    addTouchListeners()
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

//draw rect around the selected line
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

//on mouse down ev, chacks if the mouse pos is in the text area
function onDown(ev) {
    const pos = getEvPos(ev)
    gMousePos = pos;
    const meme = getMeme();
    for (var i = 0; i < meme.lines.length; i++) {
        if (isTxtClicked(pos, meme.lines[i])) {
            selectLine(i);
            //update the editor values
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

//on mouse move ev, renders the line in its new pos
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

//on mouse up ev, stops the drop&drag
function onUp() {
    setLineDrag(false);
    document.getElementById('meme-canvas').style.cursor = 'grab'
}

//get an ev and returns its pos
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

//increase and decrease the font size
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

//share the img on face book
function onShareImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");//create img url
    function onSuccess(uploadedImgUrl) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess);
}

//uploads the img to an upload server
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

function downloadImg() {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    download(imgContent);
}

//creates a download link, clicking it and removing it
function download(url) {
    const a = document.createElement('a')
    a.href = url
    a.download = 'meme.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

//uploads meme to the meme gallery
function uploadImg() {
    var savedMeme = {
        url: gCanvas.toDataURL('image/jpeg'),
        meme: getMeme()
    }
    saveMeme(savedMeme);
}