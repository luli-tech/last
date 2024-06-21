"use strict";

// Data for accounts
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

// Currencies map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// DOM elements
const insideTransaction = document.querySelector(".transaction-container");
const body = document.querySelector(".main-account");
const balanceContainer = document.querySelector(".bal");
const moneyIn = document.querySelector(".in-sum");
const moneyOut = document.querySelector(".out-sum");
const moneyInterest = document.querySelector(".interest-sum");
const user = document.querySelector(".user");
const password = document.querySelector(".password");
const enter = document.querySelector(".enter");
const welcomeMessage = document.querySelector(".welcome-message");

let currentAccount;

// Function to display movements
const displayMovement = (movements) => {
  insideTransaction.innerHTML = "";
  movements.forEach((mov, i) => {
    const transaction = `
      <div class="inside-transaction-container">
        <p class="status-of-transaction ${mov > 0 ? "green" : "red"}">${i + 1} ${mov > 0 ? "deposit" : "withdraw"}</p>
        <p class="date-of-transction">12/03/2020</p>
        <p class="transaction-amount">${Math.abs(mov)} €</p>
      </div>`;
    insideTransaction.insertAdjacentHTML("afterbegin", transaction);
  });
};

// Function to calculate and display total balance
const totalBalance = (movements) => {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  balanceContainer.textContent = `${balance} €`;
};
totalBalance(movements);

// Function to compute usernames
const computeUsernames = (accounts) => {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
computeUsernames(accounts);

// Function to calculate and display summary (money in, out, interest)
const amountReceived = (movements) => {
  const income = movements.filter((mov) => mov > 0).reduce((sum, mov) => sum + mov, 0);
  moneyIn.textContent = `${income} €`;

  const outcome = movements.filter((mov) => mov < 0).reduce((sum, mov) => sum + mov, 0);
  moneyOut.textContent = `${Math.abs(outcome)} €`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * currentAccount.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((sum, int) => sum + int, 0);
  moneyInterest.textContent = `${interest} €`;
};

// Function to handle login
const implementLogin = (accounts) => {
  currentAccount = accounts.find((acc) => user.value === acc?.username);
  if (currentAccount && Number(password.value) === currentAccount.pin) {
    amountReceived(currentAccount.movements);
    displayMovement(currentAccount.movements);
    totalBalance(currentAccount.movements);
    welcomeMessage.textContent = `Welcome Onboard, ${currentAccount.owner.split(" ")[0]}`;
    body.classList.add("dis");
  }
};

// Event listener for login button
enter.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission
  implementLogin(accounts);
  password.value = user.value = ""; // Clear input fields
});
