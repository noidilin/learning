import "./sass/style.scss";

const letters = document.querySelectorAll(".drum");

for (let index = 0; index < letters.length; index++) {
  letters[index].addEventListener("click", function () {
    const audio = new Audio("./asset/sounds/tom-1.mp3");
    audio.play();
  });
}

const letterW = document.getElementById("w");
const letterA = document.getElementById("a");
const letterS = document.getElementById("s");
const letterD = document.getElementById("d");
const letterJ = document.getElementById("j");
const letterK = document.getElementById("k");
const letterL = document.getElementById("l");
