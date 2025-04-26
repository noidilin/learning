import "./sass/style.scss";

("use strict");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2024-05-17T17:01:17.194Z",
    "2024-05-18T23:36:17.929Z",
    "2024-05-19T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.getElementById("welcome");
const labelDate = document.getElementById("labelDate");
const labelBalance = document.getElementById("labelBalance");
const labelTimer = document.getElementById("timer");
const labelSumIn = document.getElementById("labelSumIn");
const labelSumOut = document.getElementById("labelSumOut");
const labelSumInterest = document.getElementById("labelSumInterest");

const containerApp = document.getElementById("app");
const containerMovements = document.getElementById("movements");

const btnLogin = document.getElementById("btnLogin");
const btnSort = document.getElementById("btnSort");
const btnTransfer = document.getElementById("btnTransfer");
const btnLoan = document.getElementById("btnLoan");
const btnClose = document.getElementById("btnClose");

const inputLoginUsername = document.getElementById("inputLoginUsername");
const inputLoginPin = document.getElementById("inputLoginPin");
const inputTransferTo = document.getElementById("inputTransferTo");
const inputTransferAmount = document.getElementById("inputTransferAmount");
const inputLoanAmount = document.getElementById("inputLoanAmount");
const inputCloseUsername = document.getElementById("inputCloseUsername");
const inputClosePin = document.getElementById("inputClosePin");

let currentAccount, timer;

function createUserName(accountArr) {
  accountArr.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
}
createUserName(accounts);

function startLogoutTimer() {
  let time = 600;

  const tick = function () {
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.classList.add("opacity-0");
      currentAccount = null;
      labelWelcome.textContent = "Log in to get started";
    }
    time--;
  };

  tick(); // immediately execute once
  timer = setInterval(tick, 1000); // execute every seconds
  return timer;
}

function formatMovementDate(date, locale) {
  const dayPassed = Math.round(
    Math.abs(new Date() - date) / 1000 / 60 / 60 / 24,
  );

  if (dayPassed === 0) return "Today";
  if (dayPassed === 1) return "Yesterday";
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  return Intl.DateTimeFormat(locale).format(date);
}

function formatCurrency(value, locale, currency) {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = ""; // reset movements

  const movements = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    const formattedMov = formatCurrency(mov, account.locale, account.currency);

    const html = `
      <div class="movements-row">
        <div class="movements-type movements-type-${type}">${i + 1} ${type}</div>
        <div class="movements-date">${displayDate}</div>
        <div class="movements-value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

let sorted = false;
function sort(event) {
  event.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
}

function calcDisplayBalance(account) {
  // update property
  account.balance = account.movements.reduce((sum, mov) => sum + mov, 0);

  // update label
  labelBalance.textContent = formatCurrency(
    account.balance,
    account.locale,
    account.currency,
  );
}

function calcDisplaySummary(account) {
  const income = account.movements
    .filter((mov) => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((sum, mov) => sum + mov, 0);

  labelSumIn.textContent = formatCurrency(
    income,
    account.locale,
    account.currency,
  );
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    account.locale,
    account.currency,
  );
  labelSumInterest.textContent = formatCurrency(
    interest,
    account.locale,
    account.currency,
  );
}

function updateUI(acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
}

function login(event) {
  event.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value,
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // clear input field
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // reveal UI
    containerApp.classList.remove("opacity-0");
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;

    // update UI
    updateUI(currentAccount);

    // create current date
    const now = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options,
    ).format(now);

    // timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
  }
}

function transfer(event) {
  event.preventDefault();
  const receivedAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value,
  );
  const amount = Number(inputTransferAmount.value);
  // console.log(receivedAcc, amount);

  // reset input fields
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();

  if (
    receivedAcc &&
    receivedAcc?.username !== currentAccount.username &&
    amount > 0 &&
    amount <= currentAccount.balance
  ) {
    currentAccount.movements.push(-amount);
    receivedAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receivedAcc.movementsDates.push(new Date().toISOString());
  }

  updateUI(currentAccount);

  // reset timer
  clearInterval(timer);
  timer = startLogoutTimer();
}

function loan(event) {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value); // Math will type coercion for us
  inputLoanAmount.value = "";
  inputLoanAmount.blur();

  if (
    amount &&
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);
  }

  // reset timer
  clearInterval(timer);
  timer = startLogoutTimer();
}

function deleteAcc(event) {
  event.preventDefault();

  const closeUser = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();

  if (
    closeUser === currentAccount.username &&
    closePin === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username,
    );
    // console.log(index);

    accounts.splice(index, 1);
    containerApp.classList.add("opacity-0");
    currentAccount = null;
  }
}

// Fake Login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.classList.remove("opacity-0");

btnLogin.addEventListener("click", login);

btnTransfer.addEventListener("click", transfer);
btnLoan.addEventListener("click", loan);
btnClose.addEventListener("click", deleteAcc);

btnSort.addEventListener("click", sort);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
