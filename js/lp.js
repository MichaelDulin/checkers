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

// lp.js

function startNewGame() {
  // Get references to the player 1 and player 2 forms
  const player1Form = document.getElementById('player1-form');
  const player2Form = document.getElementById('player2-form');
  const startButton = document.getElementById('start-game');

  let player1Data = {};
  let player2Data = {};

  // Handle form submission for player 1 and player 2
  function submitForms(event) {
    event.preventDefault();

    // Handle form submission for player 1
    const playerName1 = document.getElementById('player1-name').value;
    const playerColor1 = document.getElementById('player1-color').value;
    console.log(`Player 1 Name: ${playerName1}, Checker Color: ${playerColor1}`);
    player1Data = {name: playerName1, color: playerColor1};
    savePlayerDataToLocalStorage('player1', playerName1, playerColor1);

    // Handle form submission for player 2
    const playerName2 = document.getElementById('player2-name').value;
    const playerColor2 = document.getElementById('player2-color').value;
    console.log(`Player 2 Name: ${playerName2}, Checker Color: ${playerColor2}`);
    player2Data = {name: playerName2, color: playerColor2};
    savePlayerDataToLocalStorage('player2', playerName2, playerColor2);
    if (playerColor1 === playerColor2) {
      alert('Please choose a different color for Player 2.');
      return;
    }
    // Enable "Start Game" button
    startButton.disabled = false;
  }

  player1Form.addEventListener('submit', submitForms);
  player2Form.addEventListener('submit', submitForms);

  // Save game data to local storage
  function savePlayerDataToLocalStorage(playerKey, playerName, playerColor) {
    const playerData = { name: playerName, color: playerColor };
    localStorage.setItem(playerKey, JSON.stringify(playerData));
  }

  // Redirect to game.html
  startButton.addEventListener('click', function() {
    localStorage.setItem('player1', JSON.stringify(player1Data));
    localStorage.setItem('player2', JSON.stringify(player2Data));
    window.location.href = 'game.html';
  });
}


startNewGame();
