import "./style.scss";

("use strict");

// reset
const btnReset = document.getElementById("btnReset");
// guess
const inputArea = document.getElementById("inputArea");
const btnConfirm = document.getElementById("btnConfirm");
// display
const bgColor = document.querySelector("body");
const numDisplay = document.getElementById("numDisplay");
const msgInfo = document.getElementById("msgInfo");
const msgScore = document.getElementById("msgScore");
const msgHighScore = document.getElementById("msgHighScore");

// Game logic
let secretNum = Math.trunc(Math.random() * 20) + 1;
let state = "on";
let score = 20;
let highScore = 0;
// numDisplay.textContent = secretNum; // temp display secret number

function init() {
  // score
  state = "on";
  score = 20;
  msgScore.textContent = score;

  // display
  msgInfo.textContent = "Start guessing...";
  bgColor.classList.remove("bg-emerald-700");
  bgColor.classList.add("bg-stone-900");
}

init();

btnReset.addEventListener("click", function () {
  init();
  numDisplay.textContent = "?";
  secretNum = Math.trunc(Math.random() * 20) + 1;
  inputArea.value = "";
});

btnConfirm.addEventListener("click", function () {
  const guess = Number(inputArea.value);
  if (!guess) {
    msgInfo.textContent = "⛔️ No number!";
  } else if (guess === secretNum) {
    state = "win";
    if (score > highScore) {
      highScore = score;
      msgHighScore.textContent = highScore;
    }

    // display
    numDisplay.textContent = secretNum;
    msgInfo.textContent = "🎉 Correct Number!";

    // color
    bgColor.classList.remove("bg-stone-900");
    bgColor.classList.add("bg-emerald-700");
  } else {
    score--;
    msgScore.textContent = score;
    msgInfo.textContent = guess > secretNum ? "📈 Too high!" : "📉 Too low!";
    if (score === 0) {
      state = "lost";
      msgInfo.textContent = "💥 You lost the game!";
    }
  }
});
