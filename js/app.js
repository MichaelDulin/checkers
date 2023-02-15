let p1Chips = 12;
let p2Chips = 12;

//TODO: Create virtual layout of board (playable vs unplayble spaces
function renderBoard() {
  function calcPlayableSpaces() {
    for (let colRef = 1; colRef < 9; colRef++) {
      if (colRef % 2 === 0) { //Select even rows
        for (let rowRef = 2; rowRef < 9; rowRef += 2) {
          document.getElementById(`r${rowRef}c${colRef}`).className = 'playable';
        }
      }
      else if (colRef % 1 !== 0) { //Select odd rows
        for (let rowRef = 1; rowRef < 9; rowRef += 2) {
          document.getElementById(`r${rowRef}c${colRef}`).className = 'playable';
        }
      }
    }
  }
  //TODO: Calculate empty playable spaces
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
  function player1() {
    let spaces = 24;
    let refRow = 8;
    let refColumn = 3;
    for (let i = 1; i < spaces; i += 2) {
      for (let j = 1; j < refColumn; j++) { 
      let simple = document.getElementById(`r${i}c${j}`);
      console.log(`r${i}c${j}`);
      console.log(simple);
      document.getElementById(`r${i}c${j}`).classname = 'piece';
      document.getElementById(`r${i}c${j}`).textContent = 'piece';

      }
    }
  };

  function player2() {
    let spaces = 24;
    let refRow = 8;
    let refColumn = 3;
    for (let i = 0; i < spaces; i += 2) {
      for (let j = 0; j < refColumn; j++) {
      document.getElementById(`r${spaces[i]}c${refRow[j]}`).classname = 'piece';
      }
    }
  };

  calcEmptySpaces();
  calcPlayableSpaces();
  player1();
}

renderBoard();

// function renderChips() {

  
// }
