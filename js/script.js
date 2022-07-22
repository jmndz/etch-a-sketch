const screen = document.querySelector('.screen-center');
screen.addEventListener('click', sketch);
const slider = document.querySelector('.slider');
slider.addEventListener('mouseup', changeGrid);
const sizeText = document.querySelector('.footer-center-text');
const colorPicker = document.querySelector('#color-button');
const gridChangeColor = document.querySelector('.grid-changeColor');
const clearButton = document.querySelector('#clear-btn');
clearButton.addEventListener('click', clear);
const eraserButton = document.querySelector('#eraser-btn');
eraserButton.addEventListener('click', erase);
const colorButton = document.querySelector('#color-btn');
colorButton.addEventListener('click', color);

const defaultSize = 16;
let newSize = 0;
let tempSize = 0;
let sketchClick = false;
let colorMode = true;
let darkenMode = false;
let lightenMode = false;
let rainbowMode = false;
let eraserMode = false;

function sketch(){
    const grid = document.querySelectorAll('.grid-item');

    if(sketchClick === false) sketchClick = true;
    else sketchClick = false;
    console.log(sketchClick);
    
    grid.forEach( item => item.addEventListener('mouseenter', function () {
        if(sketchClick === true && eraserMode === false){
            this.style.backgroundColor = colorPicker.value;
        }
    }))
    
}

colorPicker.onchange = function (){
    gridChangeColor.style.backgroundColor = colorPicker.value;
}

function color(){
    colorMode = true;
    eraserMode = false;
}

function erase(){
    eraserMode = true;

    const grid = document.querySelectorAll('.grid-item');
    grid.forEach( item => item.addEventListener('mouseenter', function () {
        this.style.backgroundColor = 'white';
    }))

}

function clear(){
    const grid = document.querySelectorAll('.grid-item');

    grid.forEach(function(item){
        item.style.backgroundColor = 'white';
    })
}

function makeGrid(size){
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
    makeGrid(newSize);
    sizeText.textContent = `${newSize} x ${newSize} pixels wide`
}

makeGrid(defaultSize);