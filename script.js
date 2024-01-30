let coins = document.querySelector(".coins");
let coinsCount = document.querySelector(".coinscount");
let bonus = document.querySelectorAll(".bonus");
let currentCount = 0;
let error = document.querySelector(".error1");
let perSec = document.getElementById("perSec");
let coinperSec = 0;
let secMultiplicateur = 0;
let clicks = document.querySelectorAll(".click");
let clicksMultiplicateur = 1;
let buttonColors = document.querySelector(".title-button__p");
let buyCount = document.querySelectorAll(".end-button");
let countBuy = 0;

coins.addEventListener("click", function () {
  currentCount += clicksMultiplicateur;
  coinsCount.textContent = currentCount;
  updateButtonColors();
});

function addBonusCoins() {
  currentCount += secMultiplicateur;
  coinsCount.textContent = currentCount;
  updateButtonColors();
}

function updateButtonColors() {
  document.querySelectorAll(".title-button__p").forEach((element) => {
    const button = element.parentElement.parentElement;
    const prix = parseInt(button.dataset.prix);
    if (prix <= currentCount) {
      element.classList.add("green");
    } else {
      element.classList.remove("green");
    }
  });
}
updateButtonColors();

function countbuy() {}

function addBonus(e) {
  if (checkPrice(e.target.dataset.prix)) {
    currentCount -= e.target.dataset.prix; // enlever le coins
    secMultiplicateur += parseInt(e.target.dataset.bonus); // appliquer le bonus
    let newCost = Math.round(parseInt(e.target.dataset.prix) * 1.4); // declaration de la variable newCost qui contient le nouveau prix
    let newCount = parseInt(e.target.dataset.much) + 1;
    e.target.dataset.much = newCount;
    e.target.querySelector(".bonus-cost").textContent = newCost; // remplace le contenu textuel du premiere enfant
    e.target.querySelector(".end-button").textContent = newCount;
    e.target.dataset.prix = newCost;
    coinsCount.textContent = currentCount; //set le nouveau prix
    perSec.textContent = secMultiplicateur;
  }
}

function clickBonus(e) {
  if (checkPrice(e.target.dataset.prix)) {
    currentCount -= e.target.dataset.prix; // enlever le coins
    clicksMultiplicateur += parseInt(e.target.dataset.bonus); // appliquer le bonus
    let newCost = Math.round(parseInt(e.target.dataset.prix) * 1.8); // declaration de la variable newCost qui contient le nouveau prix
    let newCount = parseInt(e.target.dataset.much) + 1;
    console.log(newCount);
    e.target.dataset.much = newCount;
    e.target.querySelector(".clickbonus").textContent = newCost;
    e.target.querySelector(".end-button").textContent = newCount;
    e.target.firstElementChild.textContent = newCost; // remplace le contenu textuel du premiere enfant
    e.target.dataset.prix = newCost;
    coinsCount.textContent = currentCount;
  }
}

function checkPrice(price) {
  if (price <= currentCount) {
    return true;
  }
  return false;
}

for (let i = 0; i < bonus.length; i++) {
  bonus[i].addEventListener("click", addBonus);
}

for (let i = 0; i < clicks.length; i++) {
  clicks[i].addEventListener("click", clickBonus);
}

setInterval(addBonusCoins, 1000);
