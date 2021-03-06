'use strict'

const gImgs = [
    { id: 1, url: 'images/square-meme-images/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'images/square-meme-images/2.jpg', keywords: ['animal'] },
    { id: 3, url: 'images/square-meme-images/3.jpg', keywords: ['animal'] },
    { id: 4, url: 'images/square-meme-images/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'images/square-meme-images/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'images/square-meme-images/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'images/square-meme-images/7.jpg', keywords: ['funny'] },
    { id: 8, url: 'images/square-meme-images/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'images/square-meme-images/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'images/square-meme-images/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'images/square-meme-images/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'images/square-meme-images/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'images/square-meme-images/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'images/square-meme-images/14.jpg', keywords: ['movies'] },
    { id: 15, url: 'images/square-meme-images/15.jpg', keywords: ['movies'] },
    { id: 16, url: 'images/square-meme-images/16.jpg', keywords: ['movies'] },
    { id: 17, url: 'images/square-meme-images/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'images/square-meme-images/18.jpg', keywords: ['movies'] },
];

const STORAGE_KEY = 'savedMemes';
var gSavedMemes = [];


//some default meme values
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            drag: false,
            txt: 'Enter Text',
            size: 50,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'impact',
            x: 200,
            y: 50
        },
        {
            drag: false,
            txt: 'Enter Text',
            size: 50,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'impact',
            x: 200,
            y: 350
        }
    ]
}

saveToStorage('defaultLines', gMeme.lines);//save the default to storage
gSavedMemes = loadFromStorage(STORAGE_KEY);//gets the saved memes from storage
if (gSavedMemes === null) {
    gSavedMemes = []
}

//set gMeme.lines to defualt
function defaultLines() {
    gMeme.lines = loadFromStorage('defaultLines');
}

//add new line to the center 
function addLine() {
    var newLine = {
        drag: false,
        txt: 'Enter Text',
        size: 50,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'impact',
        x: 200,
        y: 200
    }
    gMeme.lines.push(newLine);
}

//delete line from gMeme
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

//gets string to fillter the imgs by, returns the imgs
function getImgs(key) {
    if (key === '') {
        return gImgs;
    }
    var imgs = gImgs.filter(img => img.keywords.some(keyWord => keyWord.includes(key)));
    return imgs;
}

function setImg(id) {
    gMeme.selectedImgId = id;
}

function selectLine(num) {
    gMeme.selectedLineIdx = num;
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getMeme() {
    return gMeme;
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setLineWidth(width, idx) {
    gMeme.lines[idx].width = width
}

//chack if the line was clicked, each align needs a diffrent statement
function isTxtClicked(pos, line) {
    if (line.align === 'center') {
        return ((pos.x <= line.x + line.width / 2 && pos.x >= line.x - line.width / 2) && pos.y >= line.y - line.size && pos.y <= line.y);
    }
    if (line.align === 'left') {
        return (pos.x >= line.x && pos.x <= line.x + line.width && pos.y >= line.y - line.size && pos.y <= line.y);
    }
    return (pos.x <= line.x && pos.x >= line.x - line.width && pos.y >= line.y - line.size && pos.y <= line.y);
}

function setLineDrag(bool) {
    gMeme.lines[gMeme.selectedLineIdx].drag = bool;
}

function setLinePos(posDelta) {
    gMeme.lines[gMeme.selectedLineIdx].x += posDelta.x;
    gMeme.lines[gMeme.selectedLineIdx].y += posDelta.y;
}

function setLineSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size = size;
}

function setLineAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function setLineFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setLineStroke(stroke) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = stroke;
}

function saveMeme(meme) {
    gSavedMemes.push(meme);
    saveToStorage(STORAGE_KEY, gSavedMemes);
}

function getSavedMemes() {
    return gSavedMemes;
}