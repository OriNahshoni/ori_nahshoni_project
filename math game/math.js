// Function to generate a random math problem within the specified range
const generateProblem = (min, max) => {
  const operators = ["+", "-", "*", "/"];
  const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const expression = `${num1} ${operator} ${num2} =`;
  return { num1, num2, operator, expression };
};

// Function to check the user's answer
const checkAnswer = () => {
  const userAnswer = parseFloat(document.getElementById("userAnswer").value);
  if (!isNaN(userAnswer)) {
    const { num1, num2, operator } = currentProblem;
    let correctAnswer;

    if (operator === "+") {
      correctAnswer = num1 + num2;
    } else if (operator === "-") {
      correctAnswer = num1 - num2;
    } else if (operator === "*") {
      correctAnswer = num1 * num2;
    } else if (operator === "/") {
      correctAnswer = num1 / num2;
    }

    if (userAnswer === correctAnswer) {
      document.getElementById(
        "result"
      ).textContent = `Correct! The answer is ${correctAnswer}.`; // Display the correct answer
      // Save result to local storage
      const savedResults =
        JSON.parse(localStorage.getItem("savedResults")) || [];
      savedResults.push(currentProblem.expression + " " + correctAnswer); // Save problem and answer
      localStorage.setItem("savedResults", JSON.stringify(savedResults));
      displaySavedResults();
    } else {
      document.getElementById("result").textContent = "Incorrect. Try again.";
    }

    // Generate a new problem
    currentProblem = generateProblem(minNumber, maxNumber);
    document.getElementById("problem").textContent = currentProblem.expression;
    document.getElementById("userAnswer").value = "";
  } else {
    alert("Please enter a valid number.");
  }
};

// Function to clear saved results
const clearResults = () => {
  localStorage.removeItem("savedResults");
  displaySavedResults();
};

// Function to display saved results from local storage
const displaySavedResults = () => {
  const savedResults = JSON.parse(localStorage.getItem("savedResults")) || [];
  const savedResultsDiv = document.getElementById("savedResults");
  savedResultsDiv.innerHTML = "<p>Saved Results:</p>";
  for (const result of savedResults) {
    savedResultsDiv.innerHTML += `<p>${result}</p>`;
  }
};

// Function to start the game and generate the initial math problem
const startGame = () => {
  minNumber = parseInt(document.getElementById("minNumber").value);
  maxNumber = parseInt(document.getElementById("maxNumber").value);

  if (!isNaN(minNumber) && !isNaN(maxNumber) && minNumber <= maxNumber) {
    currentProblem = generateProblem(minNumber, maxNumber);
    document.getElementById("problem").textContent = currentProblem.expression;
    document.getElementById("userAnswer").style.display = "block";
    document.getElementById("checkAnswer").style.display = "block";
    document.getElementById("result").textContent = "";
    document.getElementById("problem").style.display = "block"; // Display the math problem
  } else {
    alert("Please enter valid minimum and maximum numbers.");
  }
};

// Function to initialize the game and add event listeners
const init = () => {
  // Add event listeners after the window has fully loaded
  window.addEventListener("load", () => {
    document.getElementById("startGame").addEventListener("click", startGame);
    document
      .getElementById("checkAnswer")
      .addEventListener("click", checkAnswer);
    document
      .getElementById("clearResults")
      .addEventListener("click", clearResults);
    displaySavedResults();
  });
};

// Call the init function to initialize the game
init();
