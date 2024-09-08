const gameContainer = document.getElementById("game");
const scoreContainer = document.createElement("div");
scoreContainer.id = "score";
scoreContainer.innerText = "Score: 0";
document.body.insertBefore(scoreContainer, gameContainer);

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let secondCard = null;
let noClicking = false;
let score = 0;

function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains('flipped')) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  currentCard.classList.add('flipped');

  if (!firstCard) {
    firstCard = currentCard;
  } else {
    secondCard = currentCard;
    noClicking = true;

    if (firstCard.classList[0] === secondCard.classList[0]) {
      score += 1;
      document.getElementById("score").innerText = `Score: ${score}`;
      firstCard = null;
      secondCard = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null;
        noClicking = false;
      }, 1000);
    }
  }
}

createDivsForColors(shuffledColors);