let price = 3.26;
// price = 19.5;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

// cid = [
//   ["PENNY", 0.5],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0],
// ];

const cash = document.getElementById("cash");
const changeDueDisplay = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

const formatResults = (status, change) => {
  changeDueDisplay.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    (money) =>
      (changeDueDisplay.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
  return;
};

const checkCashRegister = () => {
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }

  if (Number(cash.value) === price) {
    changeDueDisplay.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    cash.value = "";
    return;
  }

  let changeDue = Number(cash.value) - price;
  let reverseCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: "OPEN", change: [] };
  let totalCID = parseFloat(
    cid
      .map((total) => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );

  // console.log(`totalCID: ${totalCID} changeDue: ${changeDue}`);

  if (totalCID < changeDue) {
    return (changeDueDisplay.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`);
  }

  if (totalCID === changeDue) {
    formatResults("CLOSED", cid);
    return;
  }

  for (let i = 0; i <= reverseCid.length; i++) {
    if (changeDue > denominations[i] && changeDue > 0) {
      let count = 0;
      let total = reverseCid[i][1];
      while (total > 0 && changeDue >= denominations[i]) {
        total -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        count++;
      }
      result.change.push([reverseCid[i][0], count * denominations[i]]);
    }
  }

  if (changeDue > 0) {
    return (changeDueDisplay.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`);
  }

  formatResults(result.status, result.change);
  updateUI(result.change);
};

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

const updateUI = (change) => {
  const currencyNameMap = {
    PENNY: "Pennies",
    NICKEL: "Nickles",
    DIME: "Dime",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };

  if (change) {
    change.forEach((changeArr) => {
      const targetArr = cid.find((cidArr) => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  cash.value = "";
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer</strong></p>
  ${cid
    .map((money) => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
    .join("")}`;
};

purchaseBtn.addEventListener("click", checkResults);

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkResults();
  }
});

updateUI();
