const board = document.querySelector(".board");
const blockHeight = 30;
const blockwidth = 30;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let IntervalId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

// for (let i = 0; i < rows * cols; i++) {
//   const block = document.createElement("div");
//   block.classList.add("block");
//   board.appendChild(block);
// }
const blocks = [];
const snake = [
  { x: 1, y: 3 },
  { x: 1, y: 4 },
  { x: 1, y: 5 },
];
// const direction = "left";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    block.innerText = `${row}-${col}`;
    block.style.fontSize = "11px";
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  let head = null;
  blocks[`${food.x}-${food.y}`].classList.add("food");
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    alert("Game Finished");
    clearInterval(IntervalId);
  }
  snake.forEach((seg) => blocks[`${seg.x}-${seg.y}`].classList.remove("fill"));
  snake.unshift(head);
  snake.pop();
  snake.forEach((seg) => blocks[`${seg.x}-${seg.y}`].classList.add("fill"));
}

IntervalId = setInterval(() => {
  render();
}, 500);

addEventListener("keydown", (even) => {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  }
  if (event.key == "ArrowDown") {
    direction = "down";
  }
});
