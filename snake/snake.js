window.addEventListener("load", () => {
  const playBoard = document.querySelector(".play-board");
  const scoreElement = document.querySelector(".score");
  const highScoreElement = document.querySelector(".high-score");
  const topBtn = document.querySelector("#topArrow");
  const buttomBtn = document.querySelector("#buttomArrow");
  const leftBtn = document.querySelector("#leftArrow");
  const rightBtn = document.querySelector("#rightArrow");

  let gameOver = false;
  let foodX, foodY;
  let snakeX = 5,
    snakeY = 5;
  let velocityX = 0,
    velocityY = 0;
  let snakeBody = [];
  let setIntervalId;
  let score = 0;

  // Getting high score from the local storage
  let highScore = localStorage.getItem("high-score") || 0;
  highScoreElement.innerText = `High Score: ${highScore}`;

  const updateFoodPosition = () => {
    // Passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
  };

  const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
  };

  const control = (e) => {
    // Changing velocity value based on key press
    if (e.keyCode === 38 && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.keyCode === 40 && velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.keyCode === 37 && velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.keyCode === 39 && velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
    }
  };
  document.addEventListener("keyup", control);

  topBtn.addEventListener("click", () => {
    if (velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
    }
    return;
  });
  buttomBtn.addEventListener("click", () => {
    if (velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    }
    return;
  });
  leftBtn.addEventListener("click", () => {
    if (velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
    }
    return;
  });
  rightBtn.addEventListener("click", () => {
    if (velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
    }
    return;
  });

  const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#d41616}</style><path d="M224 112c-8.8 0-16-7.2-16-16V80c0-44.2 35.8-80 80-80h16c8.8 0 16 7.2 16 16V32c0 44.2-35.8 80-80 80H224zM0 288c0-76.3 35.7-160 112-160c27.3 0 59.7 10.3 82.7 19.3c18.8 7.3 39.9 7.3 58.7 0c22.9-8.9 55.4-19.3 82.7-19.3c76.3 0 112 83.7 112 160c0 128-80 224-160 224c-16.5 0-38.1-6.6-51.5-11.3c-8.1-2.8-16.9-2.8-25 0c-13.4 4.7-35 11.3-51.5 11.3C80 512 0 416 0 288z"/></svg></div>`;

    // Checking if the snake hit the food
    if (snakeX === foodX && snakeY === foodY) {
      updateFoodPosition();
      snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
      score++; // increment score by 1
      highScore = score >= highScore ? score : highScore;
      localStorage.setItem("high-score", highScore);
      scoreElement.innerText = `Score: ${score}`;
      highScoreElement.innerText = `High Score: ${highScore}`;
    }
    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Checking if the snake's head is out of wall, if so setting gameOver to true
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      return (gameOver = true);
    }

    for (let i = 0; i < snakeBody.length; i++) {
      // Adding a div for each part of the snake's body
      html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
      // Checking if the snake head hit the body, if so set gameOver to true
      if (
        i !== 0 &&
        snakeBody[0][1] === snakeBody[i][1] &&
        snakeBody[0][0] === snakeBody[i][0]
      ) {
        gameOver = true;
      }
    }
    playBoard.innerHTML = html;
  };

  updateFoodPosition();
  setIntervalId = setInterval(initGame, 110);
  document.addEventListener("keyup", control);
});
