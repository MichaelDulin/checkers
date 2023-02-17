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
            cur.setAttribute('isKing', 'false');
          }
        } else {
          for (rowRef = 2; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p1Chip');
            cur.setAttribute('isKing', 'false');
          }
        }
      }
      colRef = 6;
      for (colRef; colRef < 9; colRef++) { //<-- Iterate through col 1-3 for p1 pieces
        if (colRef % 2 === 1) {
          for (rowRef = 1; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p2Chip');
            cur.setAttribute('isKing', 'false');
          }
        } else {
          for (rowRef = 2; rowRef < 9; rowRef += 2) {
            let cur = document.getElementById(`r${rowRef}c${colRef}`);
            cur.setAttribute('content', 'p2Chip');
            cur.setAttribute('isKing', 'false');
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

function runGame() {
  let turnCounter = 1;
  while (p1Chips !== 0 && p2Chips !== 0) {// <-while both players have at least 1 chip left (break out on end of game)
    if (turnCounter % 2 === 1) {//         <-- is odd (player 1 turn)
      player1turn();
    } else {
      player2turn();
    }
    turnCounter++;
  }
  // handle end of game
}

function playerMove(event) {
  let curId = event.target.id;
  let contentValue = curId.getAttribute('content');
  let text = event.target.id;
  let list = text.match(/\d+/g);
  let rowRef = list[0];
  let colRef = list[1];
  if (contentValue === 'p1Chip') {
    let playerTurn = 1;
    calcNonKingP1Spaces(playerTurn, rowRef, colRef);
    // event handler: for onclick of piece placement (if availalbe = not clicked then prompt to click correct space)
    // remove eventHandler()
    player1end();
  } else if (contentValue === 'p2Chip') {
    let playerTurn = 2;
    calcNonKingP2Spaces(playerTurn, rowRef, colRef);
    //add eventListener to handle clicked available spaces
    // event handler: for onclick of piece placement (if availalbe = not clicked then prompt to click correct space)
    // remove eventHandler()
    player2end();
  }
}
//TODO: implement a jump (opponent kill)
function secondELNonKing(curPiece, rowRef, colRef, move1, move2) {
  
}

function secondELKing(curPiece, playerTurn, rowRef, colRef, move1R, move2R, move1L, move2L) {

}

//TODO: handle king event
function calcNonKingP1Spaces(playerTurn, rowRef, colRef) {
  let curClickedPiece = document.getElementById(`r${rowRef}c${colRef}`);
  let p1PossMove1 = document.getElementById(`r${rowRef + 1}c${colRef + 1}`); // goes up and over
  let p1PossMove2 = document.getElementById(`r${rowRef - 1}c${colRef + 1}`); // goes down and over
  let p2PossMove1 = document.getElementById(`r${rowRef + 1}c${colRef - 1}`); // goes up and over
  let p2PossMove2 = document.getElementById(`r${rowRef - 1}c${colRef - 1}`); // goes down and over
  let checkCurValue = curClickedPiece.getAttribute('king');
  if (checkCurValue === 'true') {
    secondELKing(curClickedPiece, playerTurn, rowRef, colRef, p1PossMove1, p1PossMove2, p2PossMove1, p2PossMove2);
  } else {
    if (playerTurn === 1) {
      secondELNonKing(curClickedPiece, rowRef, colRef, p1PossMove1, p1PossMove2);
    } else if (playerTurn === 2) {
      secondELNonKing(curClickedPiece, rowRef, colRef, p2PossMove1, p2PossMove2);
    }
  }
}
//    --> then handle king making function
/*let emptySpace1 = possMove1.getAttribute('content');
let emptySpace2 = possMove2.getAttribute('content');
if (emptySpace1 === 'empty') {
  curClickedPiece.setAttribute('content', 'empty');
  possMove1.setAttribute('content', 'p1Chip');
  // end p1 turn
} else if (emptySpace2 === 'p2Chip') {
  let spaceAfterEnemyChip = document.getElementById(`r${rowRef + 2}c${colRef + 2}`);
  let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
  if (checkEmptySpaceAfterEnemeyJump === 'empty') {
    spaceAfterEnemyChip.setAttribute('content', 'p1Chip');
    curClickedPiece.setAttribute('content', 'empty');
    possMove1.setAttribute('content', 'empty');
    p2Chips--;
    // check if king -> make king event
    // end p1 turn
  } else {
    alert('Invalid Move: must have empty space after enemy piece');
  }
} else {
  alert('Invalid Move: space is occupied');
}
if (emptySpace2 === 'empty') {
  curClickedPiece.setAttribute('content', 'empty');
  emptySpace2.setAttribute('content', 'p1Chip');
  // end p1 turn
} else if (emptySpace2 === 'p2Chip') {
  let spaceAfterEnemyChip = document.getElementById(`r${rowRef - 2}c${colRef + 2}`);
  let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
  if (checkEmptySpaceAfterEnemeyJump === 'empty') {
    spaceAfterEnemyChip.setAttribute('content', 'p1Chip');
    curClickedPiece.setAttribute('content', 'empty');
    possMove1.setAttribute('content', 'empty');
    p2Chips--;
    // check if king -> make king event
    // end p1 turn
  } else {
    alert('Invalid Move: space is occupied');
  }
} else {
  alert('Invalid Move: space is occupied');
}
*/
function calcNonKingP2Spaces(rowRef, colRef) {
  let curClickedPiece = document.getElementById(`r${rowRef}c${colRef}`);
  let possMove1 = document.getElementById(`r${rowRef + 1}c${colRef - 1}`); // goes up and over
  let possMove2 = document.getElementById(`r${rowRef - 1}c${colRef - 1}`); // goes down and over
  // check if next move is furthest col (p1 = col 8) (p2 = col 1)
  //    --> then handle king making function
  let emptySpace1 = possMove1.getAttribute('content');
  let emptySpace2 = possMove2.getAttribute('content');
  if (emptySpace1 === 'empty') {
    curClickedPiece.setAttribute('content', 'empty');
    emptySpace1.setAttribute('content', 'p2Chip');
    // end p2 turn
  } else if (emptySpace2 === 'p1Chip') {
    let spaceAfterEnemyChip = document.getElementById(`r${rowRef + 2}c${colRef - 2}`);
    let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
    if (checkEmptySpaceAfterEnemeyJump === 'empty') {
      spaceAfterEnemyChip.setAttribute('content', 'p2Chip');
      curClickedPiece.setAttribute('content', 'empty');
      possMove1.setAttribute('content', 'empty');
      p1Chips--;
      // check if king -> make king event
      // end p2 turn
    } else {
      alert('Invalid Move: must have empty space after enemy piece');
    }
  } else {
    alert('Invalid Move: space is occupied');
  }
  if (emptySpace2 === 'empty') {
    curClickedPiece.setAttribute('content', 'empty');
    emptySpace1.setAttribute('content', 'p2Chip');
    // end p2 turn
  } else if (emptySpace2 === 'p2Chip') {
    let spaceAfterEnemyChip = document.getElementById(`r${rowRef - 2}c${colRef - 2}`);
    let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
    if (checkEmptySpaceAfterEnemeyJump === 'empty') {
      spaceAfterEnemyChip.setAttribute('content', 'p2Chip');
      curClickedPiece.setAttribute('content', 'empty');
      possMove1.setAttribute('content', 'empty');
      p1Chips--;
      // check if king -> make king event
      // end p2 turn
    } else {
      alert('Invalid Move: space is occupied');
    }
  } else {
    alert('Invalid Move: space is occupied');
  }
}

function player1turn() {
  let allP1Chips = document.querySelectorAll('[content="p1Chip"]');
  for (let i = 0; i < allP1Chips.length; i++) {
    let curIndex = allP1Chips[i];
    curIndex.addEventListener('click', playerMove);
  }
}
function player1end() {
  let allP1Chips = document.querySelectorAll('[content="p1Chip"]');
  for (let i = 0; i < allP1Chips.length; i++) {
    let curIndex = allP1Chips[i];
    curIndex.removeEventListener('click', playerMove); //remove event listener
  }
}
function player2turn() {
  let allP2Chips = document.querySelectorAll('[content="p2Chip"]');
  for (let i = 0; i < allP2Chips.length; i++) {
    let curIndex = allP2Chips[i];
    curIndex.addEventListener('click', playerMove);
  }
}
function player2end() {
  let allP2Chips = document.querySelectorAll('[content="p2Chip"]');
  for (let i = 0; i < allP2Chips.length; i++) {
    let curIndex = allP2Chips[i];
    curIndex.removeEventListener('click', playerMove); //remove event listener
  }
}
























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

