const{log}= console

const rows = 18;
const columns = 35;


const toolPower = {axe : 'wood' , shovel: 'grass', pickaxe: 'rock'}
const myElements = { grass : 30, wood: 30, rock: 30, soil: 30}

const gameContainer = document.querySelector(".game-grid"); 
const elementMenu = document.querySelector(".elementMenu"); 
const tools = document.querySelectorAll(".tool"); 

let pickedElement = null
let pickedTool = null

tools.forEach(tool => tool.addEventListener('click', e => {
    pickedTool = e.target.id
    pickedElement = null

}))

const cellClicked = e => {
    log('cell choose')
    let target = e.target
    let eClass = target.classList
    if(eClass.contains('blank-cell')) {
        if ( pickedElement && myElements[pickedElement] > 0) {
            target.className = 'cell'
            target.classList.add (pickedElement)
            myElements[pickedElement] -= 1
            const elementMenuItem = document.querySelector(`.${pickedElement}-menu`)
            log(myElements)
            log(elementMenuItem)
            elementMenuItem.innerHTML = myElements[pickedElement]
        }
    } else {
        if(pickedTool && eClass.contains(toolPower[pickedTool])) {
            let cellElement = toolPower[pickedTool]
            target.className = 'cell'
            target.classList.add ('blank-cell')
            myElements[cellElement] += 1
            const elementMenuItem = document.querySelector(`.${cellElement}-menu`)
            elementMenuItem.innerHTML = myElements[cellElement]
        }
    }
   log(e)
}
// ............................loops

for(let i = 0; i < rows; i++){
    let rowDiv = document.createElement('div');
    rowDiv.className = "row";
    for (let j = 0; j < columns; j++){
        let cell = document.createElement('div');
        cell.className = "cell";
        cell.classList.add('blank-cell')
        cell.addEventListener('click', cellClicked )
        rowDiv.appendChild(cell);
    }
    gameContainer.appendChild(rowDiv);
}


Object.keys(myElements).forEach(el => {
    let elementDiv = document.createElement('div')
    elementDiv.innerHTML = myElements[el]
    elementDiv.className = 'menu-item'
    elementDiv.classList.add(`${el}-menu`)
    elementDiv.addEventListener('click' , () => pickedElement = el)
    elementMenu.appendChild(elementDiv)
    
})

document.addEventListener('DOMContentLoaded', (event) => {
    const chest = document.querySelector('.chest');
    const elementMenu = document.querySelector('.elementMenu');

    chest.addEventListener('click', () => {
        if (elementMenu.style.display === 'none' || !elementMenu.style.display) {
            elementMenu.style.display = 'block';
        } else {
            elementMenu.style.display = 'none';
        }
    });
});


