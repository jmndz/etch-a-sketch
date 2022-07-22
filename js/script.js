const screen = document.querySelector('.screen-center');
screen.addEventListener('click', sketch);
const slider = document.querySelector('.slider');
slider.addEventListener('mouseup', changeGrid);
const sizeText = document.querySelector('.footer-center-text');
const colorPicker = document.querySelector('#color-button');
const gridChangeColor = document.querySelector('.grid-changeColor');
const clearButton = document.querySelector('#clear-btn');
clearButton.addEventListener('click', clear);

const defaultSize = 16;
let newSize = 0;
let tempSize = 0;
let sketchClick = false;

function sketch(){
    const grid = document.querySelectorAll('.grid-item');

    if(sketchClick === false) sketchClick = true;
    else sketchClick = false;
    console.log(sketchClick);
    
    grid.forEach( item => item.addEventListener('mouseenter', function () {
        if(sketchClick === true){
            gridChangeColor.style.backgroundColor = colorPicker.value;
            this.classList.add('grid-changeColor');
        }
    }))
    
}

function clear(){
    const grid = document.querySelectorAll('.grid-item');

    grid.forEach(function(item){
        item.classList.remove('grid-changeColor');
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