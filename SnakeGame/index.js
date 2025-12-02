const board = document.querySelector(".board");
const blockHeight = 30;
const blockwidth = 30;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockHeight);

for (let i = 0; i < rows * cols; i++) {
  const block = document.createElement("div");
  block.classList.add("block");
  board.appendChild(block);
}
