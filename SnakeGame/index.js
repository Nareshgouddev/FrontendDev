const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const model = document.querySelector(".model");
const startGameButton = document.querySelector(".start-game");
const gameOverModel = document.querySelector(".game-over");
const RestartButton = document.querySelector(".btn-restart");
const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHeight = 30;
const blockwidth = 30;

const savedHighscore = localStorage.getItem("highscore") ?? "0";
let highscore = parseInt(savedHighscore, 10);
let score = 0;
let time = `00-00`;
highScoreElement.innerText = highscore;
const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let IntervalId = null;
let timerInvalidId = null;
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
let snake = [
  { x: 1, y: 3 },
  // { x: 1, y: 4 },
  // { x: 1, y: 5 },
];
// const direction = "left";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${col}`;
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
    // alert("Game Finished");
    clearInterval(IntervalId);

    model.style.display = "flex";
    startGameButton.style.display = "none";
    gameOverModel.style.display = "flex";
    return;
  }

  let growSnake = false;
  //food consume logic
  if (head.x == food.x && head.y == food.y) {
    growSnake = true;
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    score += 10;
    scoreElement.innerText = score;
    if (score > highscore) {
      highscore = score;
      try {
        localStorage.setItem("highscore", highscore.toString());
      } catch (error) {
        console.error("Failed to save high score:", error);
        // Fallback: Save to cookie or just keep in memory
      }
    }
  }

  snake.forEach((seg) => blocks[`${seg.x}-${seg.y}`].classList.remove("fill"));
  snake.unshift(head);

  if (!growSnake) {
    snake.pop();
  }
  snake.forEach((seg) => blocks[`${seg.x}-${seg.y}`].classList.add("fill"));
}

// IntervalId = setInterval(() => {
//   render();
// }, 500);

startButton.addEventListener("click", () => {
  model.style.display = "none";
  IntervalId = setInterval(() => {
    render();
  }, 300);

  timerInvalidId = setInterval(() => {
    let [min, sec] = time.split("-").map(Number);
    if (sec == 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }
    time = `${min}-${sec}`;
    timeElement.innerText = time;
  }, 1000);
});

//restart the Game
RestartButton.addEventListener("click", restartGame);
function restartGame() {
  snake.forEach((seg) => blocks[`${seg.x}-${seg.y}`].classList.remove("fill"));
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  score = 0;
  time = `00-00`;
  scoreElement.innerText = score;
  timeElement.innerText = time;
  highScoreElement.innerText = highscore;

  model.style.display = "none";
  direction = "down";
  snake = [{ x: 1, y: 3 }];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  IntervalId = setInterval(() => {
    render();
  }, 300);
}

addEventListener("keydown", (even) => {
  if (even.key == "ArrowUp") {
    direction = "up";
  } else if (even.key == "ArrowRight") {
    direction = "right";
  } else if (even.key == "ArrowLeft") {
    direction = "left";
  }
  if (even.key == "ArrowDown") {
    direction = "down";
  }
});
