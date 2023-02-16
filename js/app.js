'use strict';

let p1Chips = 12;
let p2Chips = 12;

//Done: Create virtual layout of board (playable vs unplayble spaces
function renderBoard() {
  //Done: Assign class name 'playable' to all playable spaces
  function calcPlayableSpaces() {
    for (let colRef = 1; colRef < 9; colRef++) {
      if (colRef % 2 === 0) { //Select even rows
        for (let rowRef = 2; rowRef < 9; rowRef += 2) {
          let cur = document.getElementById(`r${rowRef}c${colRef}`);
          cur.className = 'playable';
          cur.setAttribute('content', 'empty');
        }
      }
      else if (colRef % 2 !== 0) { //Select odd rows
        for (let rowRef = 1; rowRef < 9; rowRef += 2) {
          let cur = document.getElementById(`r${rowRef}c${colRef}`);
          cur.className = 'playable';
          cur.setAttribute('content', 'empty');
        }
      }
    }
  }
  function renderPlayers() {
    //TODO: render player 1 chips
    let colRef = 1; // <-- reference to column
    let rowRef = 1; // <-- reference to row
    while (colRef < 9) { //<-- execute all code while column is less than max columns (8)
      for (colRef; colRef < 4; colRef++) { //<-- Iterate through col 1-3 for p1 pieces
        if (colRef % 2 === 1) {
          for (rowRef = 1; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p1Chip');
          }
        } else {
          for (rowRef = 2; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p1Chip');
          }
        }
      }
      colRef = 6;
      for (colRef; colRef < 9; colRef++) { //<-- Iterate through col 1-3 for p1 pieces
        if (colRef % 2 === 1) {
          for (rowRef = 1; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p2Chip');
          }
        } else {
          for (rowRef = 2; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p2Chip');
          }
        }
      }
    }
  }
  function timer() {
    let sec = 0;
    let min = 0;
    let timer = setInterval(function () {
      let currentTime = document.getElementById('timer');
      if (sec < 100000) {
        sec++;
      }
      if (sec < 10) {
        currentTime.innerHTML = `${min}:0${sec}`;
      } else {
        currentTime.innerHTML = `${min}:${sec}`;
      }
      console.log(timer);

      if (sec === 59) {
        min++;
        sec = 0;
        currentTime = `${min}:${sec}`;
        // document.getElementById('timer').innerHTML = `${min}:${sec}`;
      }
    }, 1000);
  }
  function assignPlayerValues() {
    let p1Data = JSON.parse(localStorage.getItem('player1'));
    let p2Data = JSON.parse(localStorage.getItem('player2'));
    let p1DataName = p1Data.name;
    let p1DataColor = p1Data.color;
    let p2DataName = p2Data.name;
    let p2DataColor = p2Data.color;
    document.getElementById('player1Name').textContent = p1DataName;
    document.querySelectorAll('p1Chip').style.backgroundcolor = p1DataColor;
    document.getElementById('player2Name').textContent = p2DataName;
    document.querySelectorAll('p2Chip').style.backgroundcolor = p2DataColor;
  }
  // Done: Calculate empty playable spaces
  // DONE: implement player 1 and 2 chip placement initial board setup
  timer();
  calcPlayableSpaces();
  renderPlayers();
  // assignPlayerValues();
}

renderBoard();






// let allP1Chips = document.querySelectorAll('[content="p1Chip"]');
// let allP2Chips = document.querySelectorAll('[content="p2Chip"]');
// console.log(allP1Chips);
// let myBoard = document.getElementById('section');
// let allP2Chips = document.querySelectorAll('[content="p2Chip"]');
// console.log(allP1Chips);
// console.log(allP2Chips);
// let myBoard = document.querySelector('');
// console.log(myBoard);
// let playable = myBoard.querySelectorAll('playable');
// let playerTwoPieces = playable.getAttribute('p2Chip');
// let playerOnePieces = document.getAttribute('p1Chip');
// console.log(playerOnePieces);
// let myContainer = document.getElementsByClassName('gameContainer');
// console.log(p1);
// p1.getAttribute('content');
// console.log(p1.getAttribute('content'));
//Moving pieces after click


// let p1 = document.getElementById('board');

function playerMove(event) {
  console.log(event.target.id);
}

player1turn();
function player1turn() { //<------------TEST
  let allP1Chips = document.querySelectorAll('[content="p1Chip"]');
  for (let i = 0; i < allP1Chips.length; i++) {
    //console.log(allP1Chips[i]);
    let curIndex = allP1Chips[i];
    // console.log(curIndex);
    curIndex.addEventListener('click', playerMove); //<---- player1click
  }
}
// console.log(event);

player2turn();
function player2turn() { //<------------TEST
  let allP2Chips = document.querySelectorAll('[content="p2Chip"]');
  for (let i = 0; i < allP2Chips.length; i++) {
    //console.log(allP2Chips[i]);
    let curIndex = allP2Chips[i];
    // console.log(curIndex);
    curIndex.addEventListener('click', playerMove); //<---- player2click
  }
}
// console.log(event);


// p1.addEventListener('click', playerMove);
// TODO: implement move function

// TODO: implement a jump (opponent )
