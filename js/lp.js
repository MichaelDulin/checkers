'use strict';
console.log('hello world');
// const CONTINUE_BUTTON_ID = 'continue-button';

// function init() {
//   const continueButton = document.getElementById(CONTINUE_BUTTON_ID);

//   continueButton.addEventListener('click', continueGame);

//   const gameData = JSON.parse(localStorage.getItem('checkers-game'));
//   if (gameData !== null) {
//     continueButton.disabled = false;
//   }
// }

// function continueGame() {
//   const gameData = JSON.parse(localStorage.getItem('checkers-game'));
//   if (gameData !== null) {
//     // Redirect to game.html with game data
//     const url = 'game.html?' + encodeURIComponent(JSON.stringify(gameData));
//     window.location.href = url;
//   }
//   else {
//     alert('No saved game data found.');
//   }
// }

function startNewGame(event) {
  event.preventDefault(); // prevent the form from submitting normally

  // Get references to the player 1 and player 2 forms
  const player1Form = document.getElementById('player1-form');
  const player2Form = document.getElementById('player2-form');

  // Handle form submission for player 1
  player1Form.addEventListener('submit', function (event) {
    event.preventDefault();
    const playerName = document.getElementById('player1-name').value;
    const playerColor = document.getElementById('player1-color').value;
    console.log(`Player 1 Name: ${playerName}, Checker Color: ${playerColor}`);
    savePlayerDataToLocalStorage('player1', playerName, playerColor);
  });

  // Handle form submission for player 2
  player2Form.addEventListener('submit', function (event) {
    event.preventDefault();
    const playerName = document.getElementById('player2-name').value;
    const playerColor = document.getElementById('player2-color').value;
    console.log(`Player 2 Name: ${playerName}, Checker Color: ${playerColor}`);
    savePlayerDataToLocalStorage('player2', playerName, playerColor);
  });

  // Save game data to local storage
  function savePlayerDataToLocalStorage(playerKey, playerName, playerColor) {
    const playerData = {
      name: playerName,
      color: playerColor
    };
    localStorage.setItem(playerKey, JSON.stringify(playerData));
  }
  // Redirect to game.html
  window.location.href = 'game.html';
}

startNewGame();