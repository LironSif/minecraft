const{log}= console;

const rows = 20;
const columns = 30;

const toolPower = {axe : 'wood' , shovel: 'grass', pickaxe: 'rock'};
const myElements = { grass : 30, wood: 30, rock: 30, soil: 30};

const gameContainer = document.querySelector(".game-grid"); 
const elementMenu = document.querySelector(".elementMenu"); 
const tools = document.querySelectorAll(".tool"); 
const startBtn = document.querySelector(".start-btn"); 
const resetBtn = document.querySelector(".game-btn"); // Added reset button selector
const gamePage = document.querySelector(".main"); 
const landingPage = document.querySelector(".landing-page"); 

let pickedElement = null;
let pickedTool = null;

startBtn.addEventListener('click', () => initGame());

resetBtn.addEventListener('click', () => resetGame()); // Added event listener for reset button

const initGame = () => {
    gamePage.style.display = 'flex';
    landingPage.style.display = 'none';
    createGrid(); // Call to create the grid when the game starts
}

const resetGame = () => {
    gameContainer.innerHTML = ''; // Clear the existing grid
    createGrid(); // Re-create the grid
}

tools.forEach(tool => tool.addEventListener('click', e => {
    pickedTool = e.target.id;
    pickedElement = null;
}));

const cellClicked = e => {
    log('cell choose');
    let target = e.target;
    let eClass = target.classList;
    if(eClass.contains('blank-cell')) {
        if (pickedElement && myElements[pickedElement] > 0) {
            target.className = 'cell';
            target.classList.add(pickedElement);
            myElements[pickedElement] -= 1;
            const elementMenuItem = document.querySelector(`.${pickedElement}-menu`);
            log(myElements);
            log(elementMenuItem);
            elementMenuItem.innerHTML = myElements[pickedElement];
        }
    } else {
        if(pickedTool && eClass.contains(toolPower[pickedTool])) {
            let cellElement = toolPower[pickedTool];
            target.className = 'cell';
            target.classList.add('blank-cell');
            myElements[cellElement] += 1;
            const elementMenuItem = document.querySelector(`.${cellElement}-menu`);
            elementMenuItem.innerHTML = myElements[cellElement];
        }
    }
   log(e);
};

Object.keys(myElements).forEach(el => {
    let elementDiv = document.createElement('div');
    elementDiv.innerHTML = myElements[el];
    elementDiv.className = 'menu-item';
    elementDiv.classList.add(`${el}-menu`);
    elementDiv.addEventListener('click', () => pickedElement = el);
    elementMenu.appendChild(elementDiv);
});

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

const gameindextype = { grass: 1, wood: 2, rock: 3, soil: 4 };


const gameArr = new Array(rows * columns).fill(0); 
gameArr.fill(1, 15 * columns, 16 * columns);
gameArr.fill(4, 16 * columns, 22 * columns);

function getCellType(value) {
    for (const [key, val] of Object.entries(gameindextype)) {
        if (val === value) {
            return key; 
        }
    }
    return 'blank-cell'; 
}

function createGrid() {
    gameContainer.innerHTML = ''; 
    for (let i = 0; i < rows; i++) {
        let rowDiv = document.createElement('div');
        rowDiv.className = "row";
        for (let j = 0; j < columns; j++) {
            let cell = document.createElement('div');
            cell.className = "cell blank-cell"; 
            const cellType = getCellType(gameArr[i * columns + j]);
            if (cellType !== 'blank-cell') {
                cell.classList.remove('blank-cell');
                cell.classList.add(cellType);
            }
            cell.addEventListener('click', cellClicked);
            rowDiv.appendChild(cell);
        }
        gameContainer.appendChild(rowDiv);
    }
}


