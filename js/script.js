const screen = document.querySelector('.screen-center');
screen.addEventListener('click', sketch);
const slider = document.querySelector('.slider');
slider.addEventListener('mouseup', changeGrid);
const sizeText = document.querySelector('.footer-center-text');
const colorPicker = document.querySelector('#color-button');
const clearButton = document.querySelector('#clear-btn');
clearButton.addEventListener('click', clear);
const eraserButton = document.querySelector('#eraser-btn');
eraserButton.addEventListener('click', erase);
const colorButton = document.querySelector('#color-btn');
colorButton.addEventListener('click', colorBtn);
const rainbowButton = document.querySelector('#rainbow-btn');
rainbowButton.addEventListener('click', rainbow);
const lightenButton = document.querySelector('#lighten-btn');
lightenButton.addEventListener('click', lighten);
const darkenButton = document.querySelector('#darken-btn');
darkenButton.addEventListener('click', darken);

const defaultSize = 16;
let newSize = 0;
let tempSize = 0;
let sketchClick = false;
let colorMode = false;
let darkenMode = false;
let lightenMode = false;
let rainbowMode = false;
let eraserMode = false;
let rainbowHue = 0;
let rainbowCounter = 0;
let lightness = 50;

function sketch(){
    const grid = document.querySelectorAll('.grid-item');

    if(sketchClick === false) sketchClick = true;
    else sketchClick = false;
    
    grid.forEach( item => item.addEventListener('mouseenter', function () {
        if(sketchClick === true && colorMode === true && eraserMode === false && lightenMode === false){
            this.style.backgroundColor = colorPicker.value;
        }else if(sketchClick === true && rainbowMode === true && eraserMode === false){
            this.style.backgroundColor = `hsl(${rainbowHue}, 100%,50%)`;
            rainbowCounter++;
            rainbowHue += 30;
            if(rainbowCounter===11){
                rainbowCounter=0;
                rainbowHue=0;
            }
        }else if(sketchClick === true && lightenMode === true && eraserMode === false){
            console.log("INSIDE LIGHTEN");
            let rgb = this.style.backgroundColor;                   
            let hex = rgbToHex(rgb);           
            let newColor = LightenDarkenColor(hex, 10);
            this.style.backgroundColor = newColor;
        }
    }))

}

function rgbToHex(rgb){
    let array = (rgb.substr(3));
    array = (array.replace(/[()]/g, '')).split(",");

    let r = parseInt(array[0], 16);
    let g = parseInt(array[1], 16);
    let b = parseInt(array[2], 16);

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function LightenDarkenColor(col, amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

function rainbow(){
    colorMode = false;
    eraserMode = false;
    rainbowMode = true;
    lightenMode = false;
    darkenMode = false;
    buttonActive();
}

function lighten(){
    colorMode = false;
    eraserMode = false;
    rainbowMode = false;
    lightenMode = true;
    darkenMode = false;
    buttonActive();
}

function darken(){
    colorMode = false;
    eraserMode = false;
    rainbowMode = false;
    lightenMode = false;
    darkenMode = true;
    buttonActive();
}

function colorBtn(){
    colorMode = true;
    eraserMode = false;
    rainbowMode = false;
    lightenMode = false;
    darkenMode = false;
    buttonActive();
}

function erase(){
    eraserMode = true;
    colorMode = false;
    rainbowMode = false;
    lightenMode = false;
    darkenMode = false;
    buttonActive();

    const grid = document.querySelectorAll('.grid-item');
    grid.forEach( item => item.addEventListener('mouseenter', function () {
        if(eraserMode === true){
            this.style.backgroundColor = 'white';
        }
    }))

}

function buttonActive(){
    if(colorMode === true){
        eraserButton.style.backgroundColor = '#ccccc1';
        colorButton.style.backgroundColor = 'white';
        lightenButton.style.backgroundColor = '#ccccc1';
        darkenButton.style.backgroundColor = '#ccccc1';
        rainbowButton.style.backgroundColor = '#ccccc1';
    }else if(eraserMode === true){
        eraserButton.style.backgroundColor = 'white';
        colorButton.style.backgroundColor = '#ccccc1';
        lightenButton.style.backgroundColor = '#ccccc1';
        darkenButton.style.backgroundColor = '#ccccc1';
        rainbowButton.style.backgroundColor = '#ccccc1';
    }else if(rainbowMode === true){
        eraserButton.style.backgroundColor = '#ccccc1';
        colorButton.style.backgroundColor = '#ccccc1';
        lightenButton.style.backgroundColor = '#ccccc1';
        darkenButton.style.backgroundColor = '#ccccc1';
        rainbowButton.style.backgroundColor = 'white';
    }else if(lightenMode === true){
        eraserButton.style.backgroundColor = '#ccccc1';
        colorButton.style.backgroundColor = '#ccccc1';
        lightenButton.style.backgroundColor = 'white';
        darkenButton.style.backgroundColor = '#ccccc1';
        rainbowButton.style.backgroundColor = '#ccccc1';
    }else if(darkenMode === true){
        eraserButton.style.backgroundColor = '#ccccc1';
        colorButton.style.backgroundColor = '#ccccc1';
        lightenButton.style.backgroundColor = '#ccccc1';
        darkenButton.style.backgroundColor = 'white';
        rainbowButton.style.backgroundColor = '#ccccc1';
    }
}

function clear(){
    const grid = document.querySelectorAll('.grid-item');

    grid.forEach(function(item){
        item.style.backgroundColor = 'white';
    })
}

function createGrid(size){
    console.log("New size: " + size + " Previous size: "+tempSize)
    if(newSize !== 0 && newSize === tempSize){
        return;
    }else{
        screen.innerHTML = '';
        tempSize = newSize;

        screen.style.setProperty('--grid-rows', size);
        screen.style.setProperty('--grid-cols', size);
        for(let i=0; i<size*size;i++){
        let gridItem = document.createElement('div');
        screen.appendChild(gridItem).className = "grid-item";
        }
    }
    
}

function changeGrid(){
    newSize = slider.value;
    createGrid(newSize);
    sizeText.textContent = `${newSize} x ${newSize} pixels wide`
}

createGrid(defaultSize);