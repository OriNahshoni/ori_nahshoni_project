let whoPlayNow;
let isWon = 0;
xCounter = 0;
oCounter = 0;
let scoreDiv = document.querySelector("#scores");
if (scoreDiv) {
  scoreDiv.innerHTML = `X  : ${xCounter}  -  O  : ${oCounter}`;
}

const ifEndGame = () => {
  let whoWonTheGame;

  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  //*check vertical
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i + 3].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML != ""
    ) {
      //the first column is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //*check horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i + 1].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML != ""
    ) {
      //the first column is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //*check diagonal

  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i + 4].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML != ""
  ) {
    //the first column is equal
    whoWonTheGame = cells[i].innerHTML;
  }
  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i + 2].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML != ""
  ) {
    //the first column is equal
    whoWonTheGame = cells[i].innerHTML;
  }
  //*check if game end and someone won or tekko
  if (whoWonTheGame && isWon == 0) {
    setTimeout(() => {
      alert(`${whoWonTheGame} won the game`);
      if (whoWonTheGame == "x") {
        xCounter++;
      } else if (whoWonTheGame == "o") {
        oCounter++;
      }
      isWon = 1;
      if (scoreDiv) {
        scoreDiv.innerHTML = `X  : ${xCounter}  -  O  : ${oCounter}`;
      }
    }, 500);
  } else {
    for (let cell of cells) {
      if (!cell.innerHTML) {
        return; //stop here and continue the game
      }
    }
    if (isWon == 0) {
      setTimeout(() => {
        alert("no one won the game");
      }, 500);
    }
  }
};

const handleClickXO = (myE) => {
  if (myE.target.innerHTML || isWon === 1) {
    // The div has X or O, or the game is already won
    return; // Stop here
  }
  //the div is empty and I can put in this div x or o
  myE.target.innerHTML = whoPlayNow;
  whoPlayNow = whoPlayNow === "x" ? "o" : "x";

  ifEndGame();
};

const initPageLoad = () => {
  //set click on every cell
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  for (let myDiv of cells) {
    myDiv.addEventListener("click", handleClickXO);
  }
};

const newGame = () => {
  whoPlayNow = "x"; // x start first
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  for (let cell of cells) {
    cell.innerHTML = ""; //clear all cells
  }
  isWon = 0;
};

window.addEventListener("load", () => {
  initPageLoad();
  newGame();
  document.getElementById("playAgainBtn").addEventListener("click", () => {
    newGame();
  });
});
