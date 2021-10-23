const gridContainer = document.querySelector('.grid-container');
const paletteContainer = document.querySelector('.palette-container');
const fillButton = document.querySelector('.fill-button');
const saveButton = document.querySelector('.save-button');
const loadButton = document.querySelector('.load-button');

const paletteColors = ['#a9a3a3', 'cyan', 'yellow', '#91b90c', '#664229', 'purple', '#fdb1ff', '#FF7518', 'red', 'white', 'black'];
let paintColor = '#666666';

const paletteImages = ['../Photos/cobblestone-block.png', '../Photos/diamond-block.jpeg', '../Photos/gold-block.png', '../Photos/leaf-block.png', '../Photos/Minecraft-Dirt-Block.jpeg', '../Photos/nether-portal.png', '../Photos/pig-face.png', '../Photos/pumpkin-block.png', '../Photos/redstone-block.png', '../Photos/snow-block.png', '../Photos/wither-skelton.webp']

const allSquares = [];

function makeGrid(height, width) {
  for (let i = 0; i < height; i++) {
    const row = makeRow();
    gridContainer.appendChild(row);
    for (let j = 0; j < width; j++) {
      const square = makeSquare();
      row.appendChild(square);

      square.addEventListener('click', () => {
        square.style.backgroundColor = paintColor;
      });

      square.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        square.style.backgroundColor = '';
      });
    }
  }
}

function makeRow() {
  const row = document.createElement('div');
  row.classList.add('row');

  return row;
}

function makeSquare() {
  const square = document.createElement('div');
  square.classList.add('square');

  allSquares.push(square);

  return square;
}

function fillSquares() {
  fillButton.addEventListener('click', () => {
    allSquares.forEach(square => (square.style.backgroundColor = paintColor));
  });
}

function createColorCircleAndAppend(colorHex, colorImage) {
  const colorCircle = document.createElement('div');
  colorCircle.classList.add('circle');
  colorCircle.style.backgroundColor = colorHex;
  colorCircle.style.backgroundImage = `url(${colorImage})`;

  paletteContainer.appendChild(colorCircle);

  colorCircle.addEventListener('click', () => {
    paintColor = colorCircle.style.backgroundColor;
  });
}

function createColorPalette() {
  for (let i = 0; i < paletteColors.length; i++) {
    const colorHex = paletteColors[i];
    const colorImage = paletteImages[i];
    createColorCircleAndAppend(colorHex, colorImage);
  }
}

function dragAndDraw() {
  gridContainer.addEventListener('mousedown', () => {
    down = true;
    gridContainer.addEventListener('mouseup', () => {
      down = false;
    });
    gridContainer.addEventListener('mouseover', (e) => {
      if (e.target.className === "square" && down) {
        e.target.style.backgroundColor = paintColor;
      }
    });
  });
}

function saveBtn() {
  saveButton.addEventListener('click', () => {
    const gridArray = [];
    for (let i = 0; i < allSquares.length; i++) {
      const squareColors = allSquares[i];
      gridArray.push(squareColors.style.backgroundColor);
    }

    const gridInfo = {
      grid: gridArray,
    }

    localStorage.setItem('gridSave', JSON.stringify(gridInfo));
  });
}

function loadBtn() {
  loadButton.addEventListener('click', () => {
    const savedGridInfo = JSON.parse(localStorage.getItem('gridSave'));
    for (let i = 0; i < allSquares.length; i++) {
      allSquares[i].style.backgroundColor = savedGridInfo.grid[i];
    }
  });
}


function init() {
  makeGrid(30, 30);
  fillSquares();
  createColorPalette();
  dragAndDraw();
  saveBtn();
  loadBtn();
}

init();
