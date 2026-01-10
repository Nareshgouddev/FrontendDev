// const count=document.getElementById("count");

// function countIncrese(){
//     for(let i=0;i<=100;i++){
//         count++;
//     }
// }
const countElement = document.getElementById("count");

function countIncrease() {
  let current = parseInt(countElement.textContent);

  // Only run if not already at 100
  if (current >= 100) return;

  // Use setInterval for animation effect
  const interval = setInterval(() => {
    current++;
    countElement.textContent = current;

    // Visual feedback
    countElement.style.backgroundColor = `hsl(${current * 1.2}, 70%, 60%)`;
    countElement.style.transform = `scale(${1 + current / 200})`;

    if (current >= 100) {
      clearInterval(interval);
      countElement.style.backgroundColor = "#4CAF50";
      countElement.innerHTML = "100 ✓";
    }
  },); // 50ms delay between increments
}