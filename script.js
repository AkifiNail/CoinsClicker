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
let clear = document.querySelector(".clear");
let clearBoutton = document.querySelector(".modal-clear");
let endmodale = document.querySelector(".modal-end");

clearBoutton.addEventListener("click", function () {
  let modalClear = document.querySelector(".modal-none");
  modalClear.classList.add("modal");
  modalClear.classList.remove("modal-none");
});

endmodale.addEventListener("click", function () {
  let modalClear = document.querySelector(".modal");
  modalClear.classList.remove("modal");
  modalClear.classList.add("modal-none");
});

coins.addEventListener("click", function () {
  currentCount += clicksMultiplicateur;
  coinsCount.textContent = currentCount;
  updateButtonColors();
});

function addBonusCoins() {
  currentCount += secMultiplicateur;
  coinsCount.textContent = currentCount.toLocaleString("fr-FR");
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
    let newCost = 0;
    let prix = parseInt(e.target.dataset.prix);
    currentCount -= prix; // enlever le coins
    secMultiplicateur += parseInt(e.target.dataset.bonus); // appliquer le bonus
    if (prix >= 10000) {
      newCost = Math.floor((prix * 1.4) / 100) * 100; // declaration de la variable newCost qui contient le nouveau prix
    } else {
      newCost = Math.round(prix * 1.4); // declaration de la variable newCost qui contient le nouveau prix
    } // declaration de la variable newCost qui contient le nouveau prix
    let newCount = parseInt(e.target.dataset.much) + 1;
    e.target.dataset.much = newCount;
    e.target.querySelector(".bonus-cost").textContent =
      newCost.toLocaleString("fr-FR"); // remplace le contenu textuel du premiere enfant
    e.target.querySelector(".end-button").textContent =
      newCount.toLocaleString("fr-FR");
    e.target.dataset.prix = newCost;
    coinsCount.textContent = currentCount; //set le nouveau prix
    perSec.textContent = secMultiplicateur;
  }
}

function clickBonus(e) {
  if (checkPrice(e.target.dataset.prix)) {
    let newCost = 0;
    let prix = parseInt(e.target.dataset.prix);
    currentCount -= prix; // enlever le coins
    clicksMultiplicateur += parseInt(e.target.dataset.bonus); // appliquer le bonus
    if (prix >= 10000) {
      newCost = Math.floor((parseInt(e.target.dataset.prix) * 1.8) / 100) * 100; // declaration de la variable newCost qui contient le nouveau prix
    } else {
      newCost = Math.round(parseInt(e.target.dataset.prix) * 1.8); // declaration de la variable newCost qui contient le nouveau prix
    }
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

clear.addEventListener("click", function () {
  ResetGameData();
});

function saveGameData() {
  const gameData = {
    currentCount: currentCount,
    secMultiplicateur: secMultiplicateur,
    clicksMultiplicateur: clicksMultiplicateur,
    bonus: [],
    clicks: [],
    // buyCount: [],

    // Ajoutez d'autres données du jeu au besoin
  };
  for (let x of bonus) {
    gameData.bonus.push(x.dataset.prix);
    gameData.bonus.push(x.dataset.much);
  }

  for (let y of clicks) {
    gameData.clicks.push(y.dataset.prix);
    gameData.clicks.push(y.dataset.much);
  }

  // for (let k of buyCount) {
  //   gameData.buyCount.push(k.dataset.much);
  // }

  localStorage.setItem("gameData", JSON.stringify(gameData));
}

function loadGameData() {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  if (gameData) {
    currentCount = gameData.currentCount;
    secMultiplicateur = gameData.secMultiplicateur;
    clicksMultiplicateur = gameData.clicksMultiplicateur;
    bonusSave = gameData.bonus;
    clicksSave = gameData.clicks;
    // buyCountSave = gameData.buyCount;

    // Récupérez d'autres données sauvegardées au besoin

    // Assurez-vous de mettre à jour l'interface utilisateur avec les valeurs chargées
    coinsCount.textContent = currentCount;
    perSec.textContent = secMultiplicateur;

    for (let i = 0; i < bonusSave.length; i += 2) {
      let prix = bonusSave[i];
      let much = bonusSave[i + 1];
      let btn = bonus[i / 2];
      btn.dataset.prix = prix;
      btn.dataset.much = much;
      btn.querySelector(".bonus-cost").textContent = prix;
      btn.querySelector(".end-button").textContent = much;
    }

    for (let i = 0; i < clicksSave.length; i += 2) {
      let prix = clicksSave[i];
      let much = clicksSave[i + 1];
      let btn = clicks[i / 2];
      btn.dataset.prix = prix;
      btn.dataset.much = much;
      btn.querySelector(".clickbonus").textContent = prix;
      btn.querySelector(".end-button").textContent = much;
    }

    // Mettre à jour d'autres éléments d'interface utilisateur selon les besoins
  }
}

// Assurez-vous d'appeler loadGameData lorsque la page charge
document.addEventListener("DOMContentLoaded", loadGameData);

window.addEventListener("beforeunload", saveGameData);

function ResetGameData() {
  localStorage.clear();
  window.removeEventListener("beforeunload", saveGameData);
  window.location = window.location;
}

setInterval(addBonusCoins, 1000);
