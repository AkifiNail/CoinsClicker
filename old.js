let coins = document.querySelector(".coins");
let coinsCount = document.querySelector(".coinscount");
let bonus = document.querySelector(".bonus");
let currentCount = 0;
let bonus1 = 50;
let error = document.querySelector(".error1");
let bonusCostElement = document.getElementById("bonusCost");
let perSec = document.getElementById("perSec");
let coinperSec = 0;
let hand = document.querySelector(".hand");
let handbonus = document.getElementById("handbonus");
let handBonusCost = 20;
let handBonusActive = false;

coins.addEventListener("click", function () {
  if (handBonusActive) {
    currentCount += 2;
  } else {
    currentCount += 1;
  }
  coinsCount.textContent = currentCount;
});

hand.addEventListener("click", function () {
  if (currentCount >= handBonusCost) {
    currentCount -= handBonusCost;
    handBonusActive = true;
  }
});

bonus.addEventListener("click", function () {
  if (currentCount >= bonus1) {
    setInterval(addBonus, 1000);
    currentCount -= bonus1;
    bonus1 = Math.round(bonus1 * 1.4);
    coinperSec += 2;
    updateBonusCost();
    coinPerSec();
    error.classList.remove("error");
  } else {
    error.classList.add("error");
  }
});

function addBonus() {
  currentCount += 2;
  coinsCount.textContent = currentCount;
}

function updatePrice() {
  currentCount = Math.round(currentCount * 1.4);
  coinsCount.textContent = currentCount;
}

function updateBonusCost() {
  bonusCostElement.textContent = bonus1;
}

function coinPerSec() {
  perSec.textContent = coinperSec;
}
