import "./sass/style.scss";
// Variables

const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task");

// Event Listener for Add Button

addTask.addEventListener("click", function () {
  if (inputTask.value === "") {
    alert("Please Enter a Task");
    return;
  }

  // - Task item
  let task = document.createElement("div");
  let li = document.createElement("li"); /// task name
  let checkButton = document.createElement("button"); /// check button
  let deleteButton = document.createElement("button"); /// delete button

  task.classList.add(
    "flex",
    "justify-center",
    "w-full",
    "p-2",
    "mb-2",
    "rounded-lg",
    "shadow-md",
    "bg-stone-50",
  );
  li.classList.add("flex-grow", "p-2", "text-xl", "list-none");
  checkButton.classList.add(
    "flex-1",
    "mr-2",
    "text-lg",
    "border-2",
    "rounded-lg",
    "cursor-pointer",
    "text-emerald-600",
    "border-emerald-600",
    "bg-stone-50",
    "hover:bg-emerald-600",
    "hover:text-stone-50",
  );
  deleteButton.classList.add(
    "flex-1",
    "mr-2",
    "text-lg",
    "text-red-600",
    "border-2",
    "border-red-600",
    "rounded-lg",
    "cursor-pointer",
    "bg-stone-50",
    "hover:bg-red-600",
    "hover:text-stone-50",
  );

  li.innerText = `${inputTask.value}`;
  inputTask.value = "";
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  task.appendChild(li);
  task.appendChild(checkButton);
  task.appendChild(deleteButton);

  taskContainer.appendChild(task);

  checkButton.addEventListener("click", function () {
    checkButton.parentElement.style.textDecoration = "line-through";
  });

  deleteButton.addEventListener("click", function (e) {
    e.target.parentElement.parentElement.remove();
  });
});

/**
// Project - 4
// - Grab variables from DOM
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const displayTimer = document.getElementById("timer");

// - Declare state and counter variable
let timerStatus,
  timerInterval = null;

// - Declare variable
let seconds, minutes, hours; /// for counter
let displaySeconds, displayMinutes, displayHours; /// for display

// - clear timer
function clearTimer() {
  timerStatus = "stopped";
  window.clearInterval(timerInterval);
  startStopBtn.innerHTML = `<i id="play" class="w-12 p-3 text-3xl text-stone-800 fa-solid fa-play"></i>`;
}

// - init function for reset
function init() {
  hours = minutes = seconds = 0;
  displayTimer.innerHTML = "00:00:00";
  clearTimer();
}

// - updateTimer function
function updateTimer() {
  displaySeconds = seconds < 10 ? "0" + seconds.toString() : seconds;
  displayMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;
  displayHours = hours < 10 ? "0" + hours.toString() : hours;

  displayTimer.innerHTML = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

// - count function
function count() {
  seconds++;
  if (seconds / 60 === 1) {
    minutes++;
    seconds = 0;
  }
  if (minutes / 60 === 1) {
    hours++;
    minutes = 0;
  }
  updateTimer();
}

// - startTimer function
function startTimer() {
  if (timerStatus === "stopped") {
    timerStatus = "started";
    timerInterval = window.setInterval(count, 10);
    startStopBtn.innerHTML = `<i id="pause" class="w-12 p-3 text-3xl text-stone-800 fa-solid fa-pause"></i>`;
  } else {
    clearTimer();
  }
}

init();
startStopBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", init);
 */

/**
// Project - 3
const accordion = document.getElementsByClassName("content-container");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    // console.log("🚀 ~ children[0]:", this.children[0]);
    this.children[0].classList.toggle("text-lg");
    this.children[0].classList.toggle("after:content-['-']");
    this.children[0].classList.toggle("after:text-3xl");
    // console.log("🚀 ~ children[1]:", this.children[1]);
    this.children[1].classList.toggle("h-36");
  });
}
 */

/**
// Project - 2

// #wrapper
//  - button#btn-open
//    - p
//  - #modal-container (.w-full, .h-full)
//    - #modal
//      - p
//      - #btn-close

// Variables

let btnOpen = document.getElementById("btn-open");
let btnClose = document.getElementById("btn-close");

// feature: click outside #modal also close modal
let modalContainer = document.getElementById("modal-container");

// Event Listeners

btnOpen.addEventListener("click", function () {
  modalContainer.classList.remove("hidden");
});

btnClose.addEventListener("click", function () {
  modalContainer.classList.add("hidden");
});

// #modal-container (.w-full)
window.addEventListener("click", function (e) {
  if (e.target === modalContainer) {
    modalContainer.classList.add("hidden");
  }
});
*/

/**
// Project - 1

// #wrapper
// - #container
//    - #header
//    - #main-content
//      - #text-area
//        - #quote
//      - #person
//      - #button-area
//        - #new-quote

// quotes object
const quotes = [
  {
    quote: `"The best way to find yourself is to lose yourself in the service of others."`,
    person: ` Mahatma Gandhi`,
  },
  {
    quote: `"If you want to live a happy life, tie it to a goal, not to people or things."`,
    person: ` Albert Einstein`,
  },
  {
    quote: `"At his best, man is the noblest of all animals; separated from law and justice he is the worst."`,
    person: `Aristotle`,
  },
  {
    quote: `"Your time is limited, so dont waste it living someone else's life."`,
    person: ` Steve Jobs`,
  },
  {
    quote: `"Tell me and I forget. Teach me and I remember. Involve me and I learn."`,
    person: ` Benjamin Franklin`,
  },
  {
    quote: `"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."`,
    person: `Oprah Winfrey`,
  },
  {
    quote: `"t does not matter how slowly you go as long as you do not stop."`,
    person: `Confucius`,
  },
  {
    quote: `"Our lives begin to end the day we become silent about things that matter."`,
    person: `Martin Luther King, Jr.`,
  },
  {
    quote: `"Remember that not getting what you want is sometimes a wonderful stroke of luck."`,
    person: `Dalai Lama`,
  },
  {
    quote: `"The journey of a thousand miles begins with one step."`,
    person: `Lao Tzu`,
  },
];

let btn = document.getElementById("new-quote");
let quote = document.getElementById("quote");
let person = document.getElementById("person");

btn.addEventListener("click", function () {
  let random = Math.floor(Math.random() * quotes.length);

  quote.innerText = quotes[random].quote;
  person.innerText = quotes[random].person;
});
 */
