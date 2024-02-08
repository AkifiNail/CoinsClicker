let coins = document.querySelector(".coins");
let coinsCount = document.querySelector(".coinscount");
let bonus = document.querySelectorAll(".bonus");
let currentCount = 100;
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
let upgrades = document.querySelectorAll(".upgrade-item");

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
  let displayCost;

  if (currentCount >= 1000000) {
    displayCost = (currentCount / 1000000).toFixed(2) + " Millions";
  }
  if (displayCost) {
    coinsCount.textContent = displayCost;
  } else {
    coinsCount.textContent = currentCount.toLocaleString("fr-FR");
  }
  updateButtonColors();
});

function addBonusCoins() {
  currentCount += secMultiplicateur;
  let displayCost;

  if (currentCount >= 1000000) {
    displayCost = (currentCount / 1000000).toFixed(2) + " Millions";
  }
  if (displayCost) {
    coinsCount.textContent = displayCost;
  } else {
    coinsCount.textContent = currentCount.toLocaleString("fr-FR");
  }

  updateButtonColors();
  updateBonusColors();
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

function updateBonusColors() {
  document.querySelectorAll(".title-button__p").forEach((element) => {
    const button = element.parentElement;
    const prix = parseInt(button.dataset.prix);
    if (prix <= currentCount) {
      element.classList.add("green");
    } else {
      element.classList.remove("green");
    }
  });
}
updateBonusColors();

function addBonus(e) {
  if (checkPrice(e.target.dataset.prix)) {
    let newCost = 0;
    let displayCost = 0;
    let prix = parseInt(e.target.dataset.prix);
    let bonusAdd = parseInt(e.target.dataset.bonus);
    let quantite = parseInt(e.target.dataset.much);
    currentCount -= prix; // enlever le coins
    secMultiplicateur += bonusAdd; // appliquer le bonus
    if (prix >= 1000000) {
      newCost = Math.floor((prix * 1.4) / 100000) * 100000;
      displayCost = newCost / 1000000 + " Millions"; // Correction ici pour afficher "millions"
    } else if (prix >= 100000) {
      newCost = Math.floor((prix * 1.4) / 10000) * 10000;
    } else if (prix >= 10000) {
      newCost = Math.floor((prix * 1.4) / 100) * 100;
    } else {
      newCost = Math.round(prix * 1.4);
    }

    if (quantite >= 5) {
      newBonus = Math.round(bonusAdd * 1.3);
    } else {
      newBonus = Math.round(bonusAdd * 1);
    }
    let newCount = parseInt(e.target.dataset.much) + 1;
    e.target.dataset.much = newCount;
    if (displayCost) {
      e.target.querySelector(".bonus-cost").textContent =
        displayCost.toLocaleString("fr-FR");
    } else {
      e.target.querySelector(".bonus-cost").textContent =
        newCost.toLocaleString("fr-FR");
    }
    e.target.querySelector(".end-button").textContent =
      newCount.toLocaleString("fr-FR");
    e.target.dataset.prix = newCost;
    e.target.dataset.bonus = newBonus;
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
    if (prix >= 1000) {
      newCost = Math.floor((parseInt(e.target.dataset.prix) * 1.8) / 100) * 100; // declaration de la variable newCost qui contient le nouveau prix
    } else if (prix >= 10000) {
      newCost =
        Math.floor((parseInt(e.target.dataset.prix) * 1.8) / 1000) * 1000;
    } else {
      newCost = Math.round(parseInt(e.target.dataset.prix) * 1.8); // declaration de la variable newCost qui contient le nouveau prix
    }
    let newCount = parseInt(e.target.dataset.much) + 1;
    e.target.dataset.much = newCount;
    e.target.querySelector(".clickbonus").textContent = newCost;
    e.target.querySelector(".end-button").textContent = newCount;
    e.target.firstElementChild.textContent = newCost; // remplace le contenu textuel du premiere enfant
    e.target.dataset.prix = newCost;
    coinsCount.textContent = currentCount;
  }
}

function upgrade(e) {
  if (checkPrice(e.target.dataset.prix)) {
    let upgradePrice = parseInt(e.target.dataset.prix);
    currentCount -= upgradePrice; //retire les coins
    let cible = document.getElementById(e.target.dataset.cible); // recupere l'élément ciblé
    cible.dataset.bonus = Math.round(parseInt(cible.dataset.bonus) * 2);
    e.target.removeEventListener("click", upgrade);
    cible.classList.add("green-effect");
    console.log(cible);
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

for (let i = 0; i < upgrades.length; i++) {
  upgrades[i].addEventListener("click", upgrade);
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
