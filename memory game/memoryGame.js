const tilesContainer = document.querySelector(".tiles");
const colors = [
  "aqua",
  "aquamarine",
  "pink",
  "blue",
  "red",
  "gold",
  "green",
  "teal",
  "orange",
  "purple",
];
const colorPicklist = [...colors, ...colors];
const tileCount = colorPicklist.length;

// Game State
let revealdCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
let turns = 70;
let turnsLeft = document.querySelector("#turnsLeft");
turnsLeft.innerHTML = "clicks:" + turns;
window.addEventListener("load", () => {
  const buildTile = (color) => {
    const element = document.createElement("div");
    element.classList = "tile";
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
      turnsLeft.innerHTML = "clicks:" + (turns - 1);
      turns--;
      if (turns > 0) {
        const revealed = element.getAttribute("data-revealed");
        if (
          awaitingEndOfMove ||
          revealed === "true" ||
          activeTile === element
        ) {
          return;
        }

        element.style.backgroundColor = color;

        if (!activeTile) {
          activeTile = element;
          return;
        }

        const colorToMatch = activeTile.getAttribute("data-color");

        if (colorToMatch === color) {
          activeTile.setAttribute("data-revealed", "true");
          element.setAttribute("data-revealed", "true");
          awaitingEndOfMove = false;
          activeTile = null;
          revealdCount += 2;

          if (revealdCount === tileCount) {
            setTimeout(() => {
              alert("you win!🏆🏆🏆");
            }, 500);
          }
          return;
        }

        //down here
        awaitingEndOfMove = true;

        setTimeout(() => {
          element.style.backgroundColor = null;
          activeTile.style.backgroundColor = null;

          activeTile = null;
          awaitingEndOfMove = false;
        }, 1000);
      } else {
        setTimeout(() => {
          alert("you lost");
        }, 500);
        return;
      }
    });

    return element;
  };

  // Build Up Tiles
  for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorPicklist.length);
    const color = colorPicklist[randomIndex];
    const tile = buildTile(color);

    colorPicklist.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
    console.log(color);
  }
});
