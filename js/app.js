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
            // event listener for p1Chip
          }
        } else {
          for (rowRef = 2; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p1Chip');
            // event listener for p1Chip
          }
        }
      }
      colRef = 6;
      for (colRef; colRef < 9; colRef++) { //<-- Iterate through col 1-3 for p1 pieces
        if (colRef % 2 === 1) {
          for (rowRef = 1; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p2Chip');
            // event listener for p2Chip
          }
        } else {
          for (rowRef = 2; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p2Chip');
            // event listener for p2Chip
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
  //TODO: fix assignment of values to players
  function assignPlayerValues() {
    let p1Data = JSON.parse(localStorage.getItem('player1'));
    let p1DataName = p1Data.name;
    //let p1DataColor = p1Data.color;
    document.getElementById('player1Name').textContent = p1DataName;
    //document.querySelectorAll('[content="p1Chip"]').style.backgroundColor = p1DataColor;

    let p2Data = JSON.parse(localStorage.getItem('player2'));
    let p2DataName = p2Data.name;
    //let p2DataColor = p2Data.color;
    document.getElementById('player2Name').textContent = p2DataName;
    //document.querySelectorAll('[content="p2Chip"]').style.backgroundColor = p2DataColor;
  }


  timer();
  calcPlayableSpaces();
  renderPlayers();
  //assignPlayerValues();
  //runGame();

}

renderBoard();


player2turn();
function player2turn(){ //<------------TEST
  let allP2Chips = document.querySelectorAll('[content="p2Chip"]');
  for (let i = 0; i < allP2Chips.length; i++) {
    //console.log(allP2Chips[i]);
    let curIndex = allP2Chips[i];
    console.log(curIndex);
    curIndex.addEventListener('click', playerMove); //<---- player2Move
  }
}

//TODO: implement move function
function runGame(){
  let turnCounter = 1;
  while (p1Chips !== 0 && p2Chips !== 0){// <-while both players have at least 1 chip left (break out on end of game)
    if (turnCounter % 2 === 1){//         <-- is odd (player 1 turn)
      player1Turn();
      // add indicator for player 1 turn (name highlight or banner)
      // enable p1Chip click event


    } else{//                             <-- is even (player 2 turn)
      player2turn();
      // add indicator for player 2 turn (name highlight or banner)
      // enable p2Chip click event
    }
    turnCounter++;
  }
  // handle end of game
}
/*

//TODO: implement a jump (opponent kill)

//TODO: handle king event
function player2Turn(){
  let allP1Chips = document.querySelectorAll('[content="p1Chip"]');
}
*/





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
  console.log(event);
}

//allP1Chips.addEventListener('click', playerMove);





















/*
EVENT LISTENER:
While {
1. eventlistener1 = first click of chip (pick up chip -> check for availablity (highlight avialability))
2. eventlistenr2 = second click of chip (place chip IF space available)

3. Enable eventListener1 for p1Chips
  - enable clickablity of p1Chips
  - check for availabilty and highlight
4. disable eventlistener 1 -> enable eventlistener2
  - disable p1Chips -> enable 'avaiable space'                    <----- standard content=empty is playable space without chip -> need to change to content=canMove
  - click event listener for content = available
  -disable eventlistener2
5. repeat step 3 -> enable p2Chip (instead of p1Chips)
6. continue until no chips left
}
handle game end();

  */

