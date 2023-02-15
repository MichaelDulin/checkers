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
          document.getElementById(`r${rowRef}c${colRef}`).className = 'playable';
        }
      }
      else if (colRef % 2 !== 0) { //Select odd rows
        for (let rowRef = 1; rowRef < 9; rowRef += 2) {
          document.getElementById(`r${rowRef}c${colRef}`).className = 'playable';
        }
      }
    }
  }
  //Done: Calculate empty playable spaces
  function calcEmptySpaces() {
    let colEmpty = 4;
    let colRow = 2;
    for (colEmpty; colEmpty < 6; colEmpty++) {
      if (colEmpty === 4) {
        for (colRow; colRow < 9; colRow += 2) {
          document.getElementById(`r${colRow}c${colEmpty}`).className = 'empty';
        }
      } else {
        for (colRow = 1; colRow < 8; colRow += 2) {
          document.getElementById(`r${colRow}c${colEmpty}`).className = 'empty';
        }
      }
    }
  }

  //TODO: implement player 1 and 2 chip placement initial board setup

  calcPlayableSpaces();
  calcEmptySpaces();
}

renderBoard();

