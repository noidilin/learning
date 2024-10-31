import "./sass/style.scss";

const img01 = document.getElementById("img01");
const img02 = document.getElementById("img02");
const refreshNum = document.getElementById("refreshNum");

function setImage() {
  const randomNum01 = Math.trunc(Math.random() * 6) + 1;
  const randomNum02 = Math.trunc(Math.random() * 6) + 1;

  img01.src = `./src/asset/dice${randomNum01}.png`;
  img02.src = `./src/asset/dice${randomNum02}.png`;

  if (randomNum01 > randomNum02) return "Player 1 Win!";
  else if (randomNum02 > randomNum01) return "Player 2 Win!";
  else return "Draw!";
}

refreshNum.addEventListener("click", function () {
  this.textContent = setImage();
});
