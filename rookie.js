// function updateMessagesBasedOnCount() {
//   var messages; // Variable pour stocker le tableau de messages actuel
//   var popContent = document.querySelector(".pop-content"); // Sélectionnez l'élément avec la classe 'pop-content'
//   let popBlock = document.querySelector(".pop");

//   // Définissez les différents messages pour chaque seuil
//   if (currentCount >= 15 && currentCount < 100000) {
//     messages = [
//       "Salut ! Moi c'est Rookie",
//       "Je vais t'aider à atteindre le dernier bonus !",
//     ];
//     popBlock.classList.add("animate-rookie"); // Ajoute la classe pour afficher le pop-up
//     displayMessagesTemporarily(popBlock, messages);
//   } else if (currentCount >= 100000) {
//     messages = [
//       "Wow ! Tu as vraiment beaucoup de coins !",
//       "Tu es un véritable champion !",
//     ];
//     popBlock.classList.add("animate-rookie"); // Ajoute la classe pour afficher le pop-up
//     displayMessagesTemporarily(popBlock, messages);
//   } else {
//     // Si currentCount ne correspond à aucun seuil, retournez pour ne pas changer le message
//     return;
//   }
// }

// function displayMessagesTemporarily(popBlock, messages) {
//   clearInterval(window.messageInterval); // Arrête tout intervalle précédent pour éviter les superpositions

//   let textIndex = 0; // Réinitialise l'index à 0 pour commencer au début du tableau de messages
//   let popContent = document.querySelector(".pop-content");

//   // Affiche le premier message immédiatement
//   popContent.innerText = messages[textIndex];

//   // Change les messages toutes les 2 secondes, mais seulement pour les deux premiers messages
//   window.messageInterval = setInterval(function () {
//     textIndex = (textIndex + 1) % messages.length; // Passe au message suivant
//     popContent.innerText = messages[textIndex];
//     if (textIndex === 0) {
//       // Si on a bouclé sur le premier message, arrête l'intervalle et masque le pop-up
//       clearInterval(window.messageInterval);
//       setTimeout(function () {
//         // Attend encore 2 secondes pour afficher le deuxième message puis masque
//         popBlock.classList.remove("animate-rookie");
//       }, 2000);
//     }
//   }, 2000);
// }

// .pop{
//     position: absolute;
//     /* background-color: white;
//     border: 2px solid green; */
//     padding: 1rem;
//     border-radius: 20px;
//     /* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1); */
//     display: none;
//     justify-content: center;
//     align-items: center;
//     gap: 30px;
// }

// .pop img{
//     height: 90px;
//     width: 90px;
// }

// .pop-content{
//     font-weight: 700;
//     font-family: 'Montserrat', sans-serif;
//     color: white;
//     text-align: center;
//     font-size: 1.5rem;
// }

// .animate-rookie{
//     display: flex !important;
// }
