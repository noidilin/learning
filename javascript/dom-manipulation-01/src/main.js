import "./sass/main.scss";

// DOM Manipulation

// Selecting Element
// 1. getElementById()
// 2. getElementByClassName()
// 3. getElementsByTagName()
// 4. querySelector()
// 5. querySelectorAll()

console.log("--- Selecting Element ---");

const idName = document.getElementById("main-heading");
const className = document.getElementsByClassName("list-item");
const tagName = document.getElementsByTagName("li");
const querySelector = document.querySelector("div");
const querySelectorAll = document.querySelectorAll(".list-item");

console.log("🚀 ~ idName:", idName);
console.log("🚀 ~ className:", className);
console.log("🚀 ~ tagName:", tagName);
console.log("🚀 ~ querySelector:", querySelector);
console.log("🚀 ~ querySelectorAll:", querySelectorAll);

// Styling Elements

console.log("--- Styling Element ---");

idName.style.color = "orange";

for (let i = 0; i < querySelectorAll.length; i++) {
  querySelectorAll[i].style.fontSize = "2rem";
}

// Modifying content

console.log("--- Modifying Content ---");

const firstListItem = document.querySelector("li");
console.log("🚀 ~ firstListItem innerHTML:", firstListItem.innerHTML);
console.log("🚀 ~ firstListItem innerText:", firstListItem.innerText);
console.log("🚀 ~ firstListItem textContent:", firstListItem.textContent);

// firstListItem.innerText = "badminton";
firstListItem.innerHTML = "<strong>badminton</strong>";
// firstListItem.textContent = "badminton";

// Creating Elements

console.log("--- Creating Element ---");

const ul = document.querySelector("ul");
const li = document.createElement("li");
ul.append(li);
li.innerText = "swim";
console.log("🚀 ~ li:", li);

li.remove();
console.log("🚀 ~ li:", li);

// Setting Attribute

console.log("--- Setting Attribute ---");

idName.setAttribute("class", "list-item");
console.log("🚀 ~ idName:", idName);
console.log(idName.classList.contains("list-item"));

idName.removeAttribute("class");
console.log("🚀 ~ idName:", idName);
console.log(idName.classList.contains("list-item"));

// Event Listener
console.log("--- Event Listener ---");

const button = document.querySelector(".btn");
button.addEventListener("click", function (e) {
  console.log(e);
  alert("I also love JavaScript");
});

button.addEventListener("mouseover", function (e) {
  console.log(e);
  button.style.backgroundColor = "#555";
});

// toggle state
const btnReveal = document.querySelector(".reveal-btn");
const paragraph = document.getElementById("hidden-content");

function revealContent() {
  if (paragraph.classList.contains("hidden")) {
    paragraph.classList.remove("hidden");
  } else {
    paragraph.classList.add("hidden");
  }
}

btnReveal.addEventListener("click", revealContent);

// Event Delegation
console.log("--- Event Delegation ---");

document.querySelector("#sports").addEventListener("click", function (e) {
  console.log(e.target.id + " is clicked");

  const target = e.target;

  if (target.matches("li")) {
    target.style.backgroundColor = "lightgrey";
  }
});

const sports = document.querySelector("#sports");
const newSport = document.createElement("li");

newSport.innerText = "rugby";
newSport.setAttribute("id", "rugby");

sports.appendChild(newSport);
