import "./sass/style.scss";

// Object from DOM
const p1 = {
  score: 0,
  button: document.getElementById("btnP1"),
  display: document.getElementById("displayP1"),
};

const p2 = {
  score: 0,
  button: document.getElementById("btnP2"),
  display: document.getElementById("displayP2"),
};

// DOM Object
const btnReset = document.getElementById("btnReset");
const btnScoreSetter = document.getElementById("playto");
let winningScore = 3;
let isGameOver = false;

// Function
function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = 0;
    p.display.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }
}

function selectScore() {
  winningScore = parseInt(this.value);
  reset();
}

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    if (player.score === winningScore) {
      isGameOver = true;

      player.display.classList.add("has-text-success");
      opponent.display.classList.add("has-text-danger");

      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

// Add Event
btnReset.addEventListener("click", reset);
btnScoreSetter.addEventListener("click", selectScore);

p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
});
p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
});
