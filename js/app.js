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
  //Done: Calculate empty playable spaces
  //DONE: implement player 1 and 2 chip placement initial board setup
  calcPlayableSpaces();
  renderPlayers();
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
timer();
renderBoard();

let myContainer = document.querySelector('div');
let p1 = document.getElementById('r1c1');
p1.getAttribute('content');
console.log(p1.getAttribute('content'));
//Moving pieces after click
function playerMove(event) {
  let playerclick = event
  console.log(playerclick);

  
}
playerMove();

myContainer.addEventListener('click', playerMove);
//TODO: implement move function

//TODO: implement a jump (opponent )
