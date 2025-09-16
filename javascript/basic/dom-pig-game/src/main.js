import './style.scss';

('use strict');

const dice = document.getElementById('dice');

const player01 = document.getElementById('player-1');
const player02 = document.getElementById('player-2');

const score01 = document.getElementById('score-1');
const score02 = document.getElementById('score-2');
const scoreCur01 = document.getElementById('current-1');
const scoreCur02 = document.getElementById('current-2');

const btnNew = document.getElementById('btnNew');
const btnRoll = document.getElementById('btnRoll');
const btnHold = document.getElementById('btnHold');

const scores = [0, 0];

let state, activePlayer, scoreCurrent;
function init() {
  state = true;
  scoreCurrent = 0;
  scores[0] = 0;
  scores[1] = 0;

  activePlayer = 1;
  player01.classList.remove('player-active', 'player-winner');
  player02.classList.remove('player-active', 'player-winner');
  player01.classList.add('player-active');

  dice.classList.add('hidden');
  score01.textContent = 0;
  score02.textContent = 0;
  scoreCur01.textContent = 0;
  scoreCur02.textContent = 0;
}

function switchPlayer() {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  scoreCurrent = 0;

  player01.classList.toggle('player-active');
  player02.classList.toggle('player-active');
}

function rollDice() {
  if (!state) return;

  const diceNum = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `./src/asset/dice-${diceNum}.png`;

  if (diceNum !== 1) {
    scoreCurrent += diceNum;
    // scoreCur01.textContent = scoreCurrent;
    document.getElementById(`current-${activePlayer}`).textContent =
      scoreCurrent;
  } else switchPlayer();
}

function holdScore() {
  if (!state) return;

  scores[activePlayer - 1] += scoreCurrent;
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer - 1];

  if (scores[activePlayer - 1] >= 100) {
    state = false;
    dice.classList.add('hidden');

    document
      .getElementById(`player-${activePlayer}`)
      .classList.add('player-winner');
    document
      .getElementById(`player-${activePlayer}`)
      .classList.remove('player-active');
  } else switchPlayer();
}

init();

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', init);
