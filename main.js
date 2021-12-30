const container = document.querySelector(".container");

const ROWS = 30;
const COLS = 50;
const PIXEL = 10;

const pixels = new Map();

function initializeContainer() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let pixel = document.createElement("div");
      pixel.style.position = "absolute";
      pixel.style.border = "1px solid #aaa";
      pixel.style.left = j * PIXEL + "px";
      pixel.style.top = i * PIXEL + "px";
      pixel.style.width = PIXEL + "px";
      pixel.style.height = PIXEL + "px";
      let position = i + "_" + j;
      container.appendChild(pixel);
      pixels.set(position, pixel);
    }
  }
}

function drawSnake(snake) {
  let snakePositions = new Set();

  for (let [x, y] of snake) {
    let position = x + "_" + y;
    snakePositions.add(position);
  }

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let position = i + "_" + j;
      let pixel = pixels.get(position);
      pixel.style.background = snakePositions.has(position) ? "black" : "white";
    }
  }
}

initializeContainer();

let currentSnake = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
];

function update() {
  currentSnake.shift();
  let head = currentSnake[currentSnake.length - 1];
  currentSnake.push([head[0], head[1] + 1]);
}

function step() {
  update();
  drawSnake(currentSnake);
}
drawSnake(currentSnake);
setInterval(() => {
  step();
}, 100);
