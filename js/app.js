'use strict';

// let p1Chips = 12;
// let p2Chips = 12;
// let playerTurn = 1;
// let jumpedRef;

let moveToSpace1;
let moveToSpace2;


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
  // function assignPlayerValues() {
  //   let p1Data = JSON.parse(localStorage.getItem('player1'));
  //   let p1DataName = p1Data.name;
  //   //let p1DataColor = p1Data.color;
  //   document.getElementById('player1Name').textContent = p1DataName;
  //   //document.querySelectorAll('[content="p1Chip"]').style.backgroundColor = p1DataColor;
  //   let p2Data = JSON.parse(localStorage.getItem('player2'));
  //   let p2DataName = p2Data.name;
  //   //let p2DataColor = p2Data.color;
  //   document.getElementById('player2Name').textContent = p2DataName;
  //   //document.querySelectorAll('[content="p2Chip"]').style.backgroundColor = p2DataColor;
  // }


  timer();
  calcPlayableSpaces();
  renderPlayers();

  //assignPlayerValues();
  //runGame();

}

renderBoard();
player1turn();
// FIX THIS
// function runGame() {
//   let turnCounter = 1;
//   while (p1Chips !== 0 && p2Chips !== 0) {// <-while both players have at least 1 chip left (break out on end of game)
//     if (turnCounter % 2 === 1) {//         <-- is odd (player 1 turn)
//       player1turn();
//     } else {
//       player2turn();
//     }
//     turnCounter++;
//   }
//   // handle end of game
// }

// function playerMove(event) {
//   let curId = event.target.id;
//   let contentValue = curId.getAttribute('content');
//   let text = event.target.id;
//   let list = text.match(/\d+/g);
//   let rowRef = list[0];
//   let colRef = list[1];
//   if (contentValue === 'p1Chip') {
//     playerTurn = 1;
//     //calcNonKingP1Spaces(playerTurn, rowRef, colRef);
//   } else if (contentValue === 'p2Chip') {
//     playerTurn = 2;
//     //calcNonKingP2Spaces(playerTurn, rowRef, colRef);
//   }
// }

// function setSecondEventListener(move1, move2, jumpMove1, jumpMove2) {
//   // decide who is p1 or p2
//   if (playerTurn === 1) {
//     player1end();
//   }else{
//     player2end();
//   }
//   if (jumpMove1 === true || jumpMove2 === true) {

//   } else {

//   }
//   move1.addEventListener('click', secondEventClick);
//   move2.addEventListener('click', secondEventClick);
// }

// function secondEventClick(event) {  //How to get values here (for kill jump)
//   // normal move

// }

// //-------------------------PLAYER 1-----------------------------
function calcNonKingP1Spaces(rowRef, colRef) {
  let curClickedPiece = document.getElementById(`r${rowRef}c${colRef}`);
  let possMove1 = document.getElementById(`r${rowRef + 1}c${colRef + 1}`); // goes up and over
  let possMove2 = document.getElementById(`r${rowRef - 1}c${colRef + 1}`); // goes down and over
  let moveChoice1;
  let moveChoice2;
  let jumpMove1 = false;
  let jumpMove2 = false;

  let emptySpace1 = possMove1.getAttribute('content');
  let emptySpace2 = possMove2.getAttribute('content');
  if (emptySpace1 === 'empty') {
    moveChoice1 = possMove1;
    curClickedPiece.setAttribute('content', 'empty');

    possMove1.setAttribute('content', 'p1Chip');

  } else if (emptySpace2 === 'p2Chip') {
    let spaceAfterEnemeyChip = document.getElementById(`r${rowRef + 2}c${colRef + 2}`);
    let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemeyChip.getAttribute('content');
    if (checkEmptySpaceAfterEnemeyJump === 'empty') {
      moveChoice1 = spaceAfterEnemeyChip;
      jumpMove1 = true;
      jumpedRef = possMove1;
      curClickedPiece.setAttribute('content', 'empty');
//       //-------------------------EVENT HANDLER-----------------------------
      spaceAfterEnemeyChip.setAttribute('content', 'p1Chip');
      possMove1.setAttribute('content', 'empty');
      p2Chips--;
//       //-------------------------EVENT HANDLER-----------------------------

    } else {
      alert('Invalid Move: must have empty space after enemy piece');
    }
  } else {
    alert('Invalid Move: space is occupied');
  }
  if (emptySpace2 === 'empty') {
    moveChoice2 = possMove2;

//     //-------------------------EVENT HANDLER-----------------------------
//     emptySpace2.setAttribute('content', 'p1Chip');
//     //-------------------------EVENT HANDLER-----------------------------

  } else if (emptySpace2 === 'p2Chip') {
    let spaceAfterEnemyChip = document.getElementById(`r${rowRef - 2}c${colRef + 2}`);
    let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
    if (checkEmptySpaceAfterEnemeyJump === 'empty') {
      moveChoice2 = spaceAfterEnemyChip;
      jumpMove2 = true;
      jumpedRef = possMove2;

//       //-------------------------EVENT HANDLER-----------------------------
      spaceAfterEnemyChip.setAttribute('content', 'p1Chip');
      curClickedPiece.setAttribute('content', 'empty');
      possMove1.setAttribute('content', 'empty');
      p2Chips--;
//       //-------------------------EVENT HANDLER-----------------------------

    } else {
      alert('Invalid Move: space is occupied');
    }
  } else {
    alert('Invalid Move: space is occupied');
  }
  // my EL function - assign event listener
  setSecondEventListener(moveChoice1, moveChoice2, jumpMove1, jumpMove2);

}

// //-------------------------PLAYER 2-----------------------------
// function calcNonKingP2Spaces(rowRef, colRef) {
//   let curClickedPiece = document.getElementById(`r${rowRef}c${colRef}`);
//   let possMove1 = document.getElementById(`r${rowRef + 1}c${colRef - 1}`); // goes up and over
//   let possMove2 = document.getElementById(`r${rowRef - 1}c${colRef - 1}`); // goes down and over
//   let moveChoice1;
//   let moveChoice2;
//   let jumpMove1 = false;
//   let jumpMove2 = false;

//   let emptySpace1 = possMove1.getAttribute('content');
//   let emptySpace2 = possMove2.getAttribute('content');

//   if (emptySpace1 === 'empty') {
//     moveChoice1 = possMove1;

//     //-------------------------EVENT HANDLER-----------------------------
//     curClickedPiece.setAttribute('content', 'empty');
//     emptySpace1.setAttribute('content', 'p2Chip');
//     //-------------------------EVENT HANDLER-----------------------------
//   } else if (emptySpace2 === 'p1Chip') {
//     let spaceAfterEnemyChip = document.getElementById(`r${rowRef + 2}c${colRef - 2}`);
//     let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
//     if (checkEmptySpaceAfterEnemeyJump === 'empty') {
//       moveChoice1 = spaceAfterEnemyChip;
//       jumpedRef = true;

//       //-------------------------EVENT HANDLER-----------------------------
//       spaceAfterEnemyChip.setAttribute('content', 'p2Chip');
//       curClickedPiece.setAttribute('content', 'empty');
//       possMove1.setAttribute('content', 'empty');
//       p1Chips--;
//       //-------------------------EVENT HANDLER-----------------------------

//     } else {
//       alert('Invalid Move: must have empty space after enemy piece');
//     }
//   } else {
//     alert('Invalid Move: space is occupied');
//   }
//   if (emptySpace2 === 'empty') {
//     moveChoice2 = possMove2;
//     //-------------------------EVENT HANDLER----------------------------
//     curClickedPiece.setAttribute('content', 'empty');
//     emptySpace1.setAttribute('content', 'p2Chip');
//     //-------------------------EVENT HANDLER----------------------------

//   } else if (emptySpace2 === 'p2Chip') {
//     let spaceAfterEnemyChip = document.getElementById(`r${rowRef - 2}c${colRef - 2}`);
//     let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
//     if (checkEmptySpaceAfterEnemeyJump === 'empty') {
//       moveChoice2 = spaceAfterEnemyChip;
//       jumpMove2 = true;

//       //-------------------------EVENT HANDLER----------------------------
//       spaceAfterEnemyChip.setAttribute('content', 'p2Chip');
//       curClickedPiece.setAttribute('content', 'empty');
//       possMove2.setAttribute('content', 'empty');
//       p1Chips--;
//       //-------------------------EVENT HANDLER----------------------------

//     } else {
//       alert('Invalid Move: space is occupied');
//     }
//   } else {
//     alert('Invalid Move: space is occupied');
//   }
//   setSecondEventListener(moveChoice1, moveChoice2, jumpMove1, jumpMove2);
// }


function playerMove(event) {
  console.log(event);
  let text = event.target.id;
  console.log(event.target);
  let list = text.match(/\d+/g);
  let rowRef = parseInt(list[0]);
  let colRef = parseInt(list[1]);
  console.log(`r${rowRef}c${colRef}`);
  console.log(`r${rowRef + 1}c${colRef + 1}`);
  console.log(`r${rowRef - 1}c${colRef + 1}`);
  let curClickedPiece = document.getElementById(`r${rowRef}c${colRef}`);
  let possMove1 = document.getElementById(`r${rowRef + 1}c${colRef + 1}`); // goes up and over
  let possMove2 = document.getElementById(`r${rowRef - 1}c${colRef + 1}`); // goes down and over
  // let moveReset = document.getElementBy // reset piece
  console.log('possMove1 = ', possMove1, 'possMove2 = ', possMove2);
  curClickedPiece.setAttribute('content', 'empty');
  moveToSpace1 = possMove1;
  moveToSpace2 = possMove2;
  // reset = moveReset;
  player1end();
  setSecondEventListener(possMove1, possMove2);
}

function secondEventClick(event) {
  console.log('second event listener fired');
  console.log(event.target.id);
  console.log(moveToSpace1, moveToSpace2);
  if (event.target.id === moveToSpace1.id){
    moveToSpace1.setAttribute('content','p1Chip');
  } else if (event.target.id === moveToSpace2.id) {
    moveToSpace2.setAttribute('content','p1Chip');
  } //else if (event.target.id !== moveToSpace1.id || moveToSpace2.id) {
  //   reset.setAttribute('content', 'p1Chip');
  // }
  console.log(event);
  removeELTwo();
}

function removeELTwo() {
  moveToSpace1.removeEventListener('click', secondEventClick);
  moveToSpace2.removeEventListener('click', secondEventClick);
  player1turn();
}


function setSecondEventListener(move1, move2) {
  move1.addEventListener('click', secondEventClick);
  move2.addEventListener('click', secondEventClick);
  console.log('move1 and move2: ',move1, move2);
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
// function player2turn() {
//   let allP2Chips = document.querySelectorAll('[content="p2Chip"]');
//   for (let i = 0; i < allP2Chips.length; i++) {
//     let curIndex = allP2Chips[i];
//     curIndex.addEventListener('click', playerMove);
//   }
// }
// function player2end() {
//   let allP2Chips = document.querySelectorAll('[content="p2Chip"]');
//   for (let i = 0; i < allP2Chips.length; i++) {
//     let curIndex = allP2Chips[i];
//     curIndex.removeEventListener('click', playerMove); //remove event listener
//   }
// }






















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

'use strict';

// let p1Chips = 12;
// let p2Chips = 12;
// let playerTurn = 1;
// let jumpedRef;

let moveToSpace1;
let moveToSpace2;
let playerTurn = 1;


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
  // function assignPlayerValues() {
  //   let p1Data = JSON.parse(localStorage.getItem('player1'));
  //   let p1DataName = p1Data.name;
  //   //let p1DataColor = p1Data.color;
  //   document.getElementById('player1Name').textContent = p1DataName;
  //   //document.querySelectorAll('[content="p1Chip"]').style.backgroundColor = p1DataColor;
  //   let p2Data = JSON.parse(localStorage.getItem('player2'));
  //   let p2DataName = p2Data.name;
  //   //let p2DataColor = p2Data.color;
  //   document.getElementById('player2Name').textContent = p2DataName;
  //   //document.querySelectorAll('[content="p2Chip"]').style.backgroundColor = p2DataColor;
  // }


  timer();
  calcPlayableSpaces();
  renderPlayers();

  //assignPlayerValues();
  //runGame();

}

renderBoard();
player1turn();
// FIX THIS
// function runGame() {
//   let turnCounter = 1;
//   while (p1Chips !== 0 && p2Chips !== 0) {// <-while both players have at least 1 chip left (break out on end of game)
//     if (turnCounter % 2 === 1) {//         <-- is odd (player 1 turn)
//       player1turn();
//     } else {
//       player2turn();
//     }
//     turnCounter++;
//   }
//   // handle end of game
// }

// function playerMove(event) {
//   let curId = event.target.id;
//   let contentValue = curId.getAttribute('content');
//   let text = event.target.id;
//   let list = text.match(/\d+/g);
//   let rowRef = list[0];
//   let colRef = list[1];
//   if (contentValue === 'p1Chip') {
//     playerTurn = 1;
//     //calcNonKingP1Spaces(playerTurn, rowRef, colRef);
//   } else if (contentValue === 'p2Chip') {
//     playerTurn = 2;
//     //calcNonKingP2Spaces(playerTurn, rowRef, colRef);
//   }
// }

// function setSecondEventListener(move1, move2, jumpMove1, jumpMove2) {
//   // decide who is p1 or p2
//   if (playerTurn === 1) {
//     player1end();
//   }else{
//     player2end();
//   }
//   if (jumpMove1 === true || jumpMove2 === true) {

//   } else {

//   }
//   move1.addEventListener('click', secondEventClick);
//   move2.addEventListener('click', secondEventClick);
// }

// function secondEventClick(event) {  //How to get values here (for kill jump)
//   // normal move

// }

// //-------------------------PLAYER 1-----------------------------
// function calcNonKingP1Spaces(rowRef, colRef) {
//   let curClickedPiece = document.getElementById(`r${rowRef}c${colRef}`);
//   let possMove1 = document.getElementById(`r${rowRef + 1}c${colRef + 1}`); // goes up and over
//   let possMove2 = document.getElementById(`r${rowRef - 1}c${colRef + 1}`); // goes down and over
//   let moveChoice1;
//   let moveChoice2;
//   let jumpMove1 = false;
//   let jumpMove2 = false;

//   let emptySpace1 = possMove1.getAttribute('content');
//   let emptySpace2 = possMove2.getAttribute('content');
//   if (emptySpace1 === 'empty') {
//     moveChoice1 = possMove1;
//     curClickedPiece.setAttribute('content', 'empty');

//     possMove1.setAttribute('content', 'p1Chip');

//   } else if (emptySpace2 === 'p2Chip') {
//     let spaceAfterEnemeyChip = document.getElementById(`r${rowRef + 2}c${colRef + 2}`);
//     let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemeyChip.getAttribute('content');
//     if (checkEmptySpaceAfterEnemeyJump === 'empty') {
//       moveChoice1 = spaceAfterEnemeyChip;
//       jumpMove1 = true;
//       jumpedRef = possMove1;
//       curClickedPiece.setAttribute('content', 'empty');
//       //-------------------------EVENT HANDLER-----------------------------
//       spaceAfterEnemeyChip.setAttribute('content', 'p1Chip');
//       possMove1.setAttribute('content', 'empty');
//       p2Chips--;
//       //-------------------------EVENT HANDLER-----------------------------

//     } else {
//       alert('Invalid Move: must have empty space after enemy piece');
//     }
//   } else {
//     alert('Invalid Move: space is occupied');
//   }
//   if (emptySpace2 === 'empty') {
//     moveChoice2 = possMove2;

//     //-------------------------EVENT HANDLER-----------------------------
//     emptySpace2.setAttribute('content', 'p1Chip');
//     //-------------------------EVENT HANDLER-----------------------------

//   } else if (emptySpace2 === 'p2Chip') {
//     let spaceAfterEnemyChip = document.getElementById(`r${rowRef - 2}c${colRef + 2}`);
//     let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
//     if (checkEmptySpaceAfterEnemeyJump === 'empty') {
//       moveChoice2 = spaceAfterEnemyChip;
//       jumpMove2 = true;
//       jumpedRef = possMove2;

//       //-------------------------EVENT HANDLER-----------------------------
//       spaceAfterEnemyChip.setAttribute('content', 'p1Chip');
//       curClickedPiece.setAttribute('content', 'empty');
//       possMove1.setAttribute('content', 'empty');
//       p2Chips--;
//       //-------------------------EVENT HANDLER-----------------------------

//     } else {
//       alert('Invalid Move: space is occupied');
//     }
//   } else {
//     alert('Invalid Move: space is occupied');
//   }
//   // my EL function - assign event listener
//   setSecondEventListener(moveChoice1, moveChoice2, jumpMove1, jumpMove2);

// }

// //-------------------------PLAYER 2-----------------------------
// function calcNonKingP2Spaces(rowRef, colRef) {
//   let curClickedPiece = document.getElementById(`r${rowRef}c${colRef}`);
//   let possMove1 = document.getElementById(`r${rowRef + 1}c${colRef - 1}`); // goes up and over
//   let possMove2 = document.getElementById(`r${rowRef - 1}c${colRef - 1}`); // goes down and over
//   let moveChoice1;
//   let moveChoice2;
//   let jumpMove1 = false;
//   let jumpMove2 = false;

//   let emptySpace1 = possMove1.getAttribute('content');
//   let emptySpace2 = possMove2.getAttribute('content');

//   if (emptySpace1 === 'empty') {
//     moveChoice1 = possMove1;

//     //-------------------------EVENT HANDLER-----------------------------
//     curClickedPiece.setAttribute('content', 'empty');
//     emptySpace1.setAttribute('content', 'p2Chip');
//     //-------------------------EVENT HANDLER-----------------------------
//   } else if (emptySpace2 === 'p1Chip') {
//     let spaceAfterEnemyChip = document.getElementById(`r${rowRef + 2}c${colRef - 2}`);
//     let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
//     if (checkEmptySpaceAfterEnemeyJump === 'empty') {
//       moveChoice1 = spaceAfterEnemyChip;
//       jumpedRef = true;

//       //-------------------------EVENT HANDLER-----------------------------
//       spaceAfterEnemyChip.setAttribute('content', 'p2Chip');
//       curClickedPiece.setAttribute('content', 'empty');
//       possMove1.setAttribute('content', 'empty');
//       p1Chips--;
//       //-------------------------EVENT HANDLER-----------------------------

//     } else {
//       alert('Invalid Move: must have empty space after enemy piece');
//     }
//   } else {
//     alert('Invalid Move: space is occupied');
//   }
//   if (emptySpace2 === 'empty') {
//     moveChoice2 = possMove2;
//     //-------------------------EVENT HANDLER----------------------------
//     curClickedPiece.setAttribute('content', 'empty');
//     emptySpace1.setAttribute('content', 'p2Chip');
//     //-------------------------EVENT HANDLER----------------------------

//   } else if (emptySpace2 === 'p2Chip') {
//     let spaceAfterEnemyChip = document.getElementById(`r${rowRef - 2}c${colRef - 2}`);
//     let checkEmptySpaceAfterEnemeyJump = spaceAfterEnemyChip.getAttribute('content');
//     if (checkEmptySpaceAfterEnemeyJump === 'empty') {
//       moveChoice2 = spaceAfterEnemyChip;
//       jumpMove2 = true;

//       //-------------------------EVENT HANDLER----------------------------
//       spaceAfterEnemyChip.setAttribute('content', 'p2Chip');
//       curClickedPiece.setAttribute('content', 'empty');
//       possMove2.setAttribute('content', 'empty');
//       p1Chips--;
//       //-------------------------EVENT HANDLER----------------------------

//     } else {
//       alert('Invalid Move: space is occupied');
//     }
//   } else {
//     alert('Invalid Move: space is occupied');
//   }
//   setSecondEventListener(moveChoice1, moveChoice2, jumpMove1, jumpMove2);
// }


function playerMove(event) {
  let text = event.target.id;
  console.log(event.target);
  let list = text.match(/\d+/g);
  let rowRef = parseInt(list[0]);
  let colRef = parseInt(list[1]);
  let curClickedPiece = document.getElementById(`r${rowRef}c${colRef}`);
  let possMove1;
  let possMove2;
  if (playerTurn === 1) {
    possMove1 = document.getElementById(`r${rowRef + 1}c${colRef + 1}`); // goes up and over
    possMove2 = document.getElementById(`r${rowRef - 1}c${colRef + 1}`);
  } else if (playerTurn === 2) {
    possMove1 = document.getElementById(`r${rowRef + 1}c${colRef - 1}`); // goes up and over
    possMove2 = document.getElementById(`r${rowRef - 1}c${colRef - 1}`);
  }
  console.log('possMove1 = ', possMove1, 'possMove2 = ', possMove2);
  let possMove1Attr = possMove1.getAttribute('content');
  let possMove2Attr = possMove2.getAttribute('content');
  console.log(possMove1.className);
  if (possMove1Attr !== 'empty' || possMove2Attr !== 'empty'){ // change to check both values (if on border)
    alert('Cannot move there. Try again');
  } else {
    curClickedPiece.setAttribute('content', 'empty');
    moveToSpace1 = possMove1;
    moveToSpace2 = possMove2;
    if (playerTurn === 2) {
      player2end();
      setSecondEventListener(moveToSpace1, moveToSpace2);
    } else {
      player1end();
      setSecondEventListener(moveToSpace1, moveToSpace2);
    }

  }
}

function secondEventClick(event) {
  console.log('second event listener fired');
  console.log(event.target.id);
  console.log(moveToSpace1, moveToSpace2);
  if (playerTurn === 1) {
    if (event.target.id === moveToSpace1.id){
      moveToSpace1.setAttribute('content','p1Chip');
    } else if (event.target.id === moveToSpace2.id) {
      moveToSpace2.setAttribute('content','p1Chip');
    }
  } else if (playerTurn === 2) {
    if (event.target.id === moveToSpace1.id){
      moveToSpace1.setAttribute('content','p2Chip');
    } else if (event.target.id === moveToSpace2.id) {
      moveToSpace2.setAttribute('content','p2Chip');
    }
  }
  console.log(event);
  removeELTwo();
}

function removeELTwo() {
  moveToSpace1.removeEventListener('click', secondEventClick);
  moveToSpace2.removeEventListener('click', secondEventClick);
  if (playerTurn === 1) {
    player2turn();
  } else if (playerTurn === 2){
    player1turn();
  }
}


function setSecondEventListener(move1, move2) {
  move1.addEventListener('click', secondEventClick);
  move2.addEventListener('click', secondEventClick);
  console.log('move1 and move2: ',move1, move2);
}



function player1turn() {
  playerTurn = 1;
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
  playerTurn = 2;
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

