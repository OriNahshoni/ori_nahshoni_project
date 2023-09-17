window.addEventListener("load", () => {
  let currentPlayer;
  let gameOver = false;

  const numRows = 6;
  const numCols = 7;
  RCounter = 0;
  YCounter = 0;
  let scoreDiv = document.querySelector("#scores");
  if (scoreDiv) {
    scoreDiv.innerHTML = `<span style="color: red;">Red</span>  : ${RCounter}  -  <span style="color: yellow;">Yellow</span>  : ${YCounter}`;
  }
  const initGame = () => {
    currentPlayer = "red"; // Red starts
    gameOver = false;
    const gameDiv = document.getElementById("gameDiv");
    gameDiv.innerHTML = ""; // Clear the game board

    // Create the Connect 4 grid
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "empty");
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", handleClick);
        gameDiv.appendChild(cell);
      }
    }
  };

  const checkWin = (row, col) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [-1, 1],
    ];

    const player = currentPlayer;

    for (const [dx, dy] of directions) {
      let count = 1;
      let newRow, newCol;

      // Check in both directions
      for (let dir = -1; dir <= 1; dir += 2) {
        newRow = row + dir * dx;
        newCol = col + dir * dy;

        while (
          newRow >= 0 &&
          newRow < numRows &&
          newCol >= 0 &&
          newCol < numCols &&
          document
            .querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`)
            .classList.contains(player)
        ) {
          count++;
          newRow += dir * dx;
          newCol += dir * dy;
        }
      }

      if (count >= 4) {
        return true;
      }
    }

    return false;
  };

  const handleClick = (e) => {
    if (gameOver) {
      return;
    }

    const cell = e.target;
    const col = parseInt(cell.dataset.col);
    let row = numRows - 1; // Start from the bottom row

    while (row >= 0) {
      const currentCell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      if (currentCell.classList.contains("empty")) {
        currentCell.classList.remove("empty");
        currentCell.classList.add(currentPlayer);
        if (checkWin(row, col)) {
          setTimeout(() => {
            alert(`${currentPlayer.toUpperCase()} wins! 🏆`);
            if (currentPlayer == "red") {
              RCounter++;
            } else if (currentPlayer == "yellow") {
              YCounter++;
            }

            if (scoreDiv) {
              scoreDiv.innerHTML = `<span style="color: red;">Red</span>  : ${RCounter}  -  <span style="color: yellow;">Yellow</span>  : ${YCounter}`;
            }
          }, 500);

          gameOver = true;
        } else {
          currentPlayer = currentPlayer === "red" ? "yellow" : "red"; // Switch players
        }
        break;
      }
      row--;
    }
  };

  initGame();
  document.getElementById("playAgainBtn").addEventListener("click", () => {
    initGame();
  });
});
