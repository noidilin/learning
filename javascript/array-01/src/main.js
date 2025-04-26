import "./sass/style.scss";

("use strict");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = ""; // reset movements

  const movements = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements-row">
        <div class="movements-type movements-type-${type}">${i + 1} ${type}</div>
        <div class="movements-date">3 days ago</div>
        <div class="movements-value">${mov}€</div>
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
  labelBalance.textContent = `${account.balance}€`;
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

  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${interest}€`;
}

function updateUI(acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
}

let currentAccount;
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
  }

  updateUI(currentAccount);
}

function loan(event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = "";
  inputLoanAmount.blur();

  if (
    amount &&
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
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

    // console.log(accounts, currentAccount);
  }
}

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
