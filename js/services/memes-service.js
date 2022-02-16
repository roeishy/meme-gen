'use strict'

var gImgs = [
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

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'enter text',
            size: 20,
            align: 'left',
            color: 'red',
            x: 10,
            y: 100
        },
        {
            txt: 'enter text',
            size: 40,
            align: 'left',
            color: 'red',
            x: 10,
            y: 200
        }
    ]
}


function getImgs(key) {
    if (key === '') {
        return gImgs;
    }
    var imgs = gImgs.filter(img => img.keywords.includes(key));
    return imgs;
}

function setImg(id) {
    gMeme.selectedImgId = id;
}

function selectLine(num) {
    gMeme.selectedLineIdx = num;
    console.log('line sel:', gMeme.selectedLineIdx);
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