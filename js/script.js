const screen = document.querySelector('.screen-center');
const grid = document.querySelectorAll('.grid-item');
const slider = document.querySelector('.slider');
slider.addEventListener('mouseup', changeGrid);
const sizeText = document.querySelector('.footer-center-text');
//screen wxh 500x350
const defaultSize = 16;
let newSize = 0;
let tempSize = 0;

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
    sizeText.textContent = `${newSize}x${newSize} pixels wide`
}

makeGrid(defaultSize);