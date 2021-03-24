const body = document.querySelector("body");
const start = document.querySelector(".start");
const startButtonEasy = document.querySelector("#easy");
const startButtonHard = document.querySelector("#hard");
const game = document.querySelector(".game");
const gameOverHeading = document.querySelector(".game-over-heading");
const heading = document.querySelector(".game-header__heading");
const text = document.querySelector(".game-header__text");
const boxes = document.querySelectorAll(".box-container__box");

let sallysInputs = [];
let userInputs = [];
let level = 0;

//generates a "flash" on the chosen box
const generateFlash = (num) => {
  document.getElementById(`${num}`).classList.add("flash");

  setTimeout(()=>{
    document.getElementById(`${num}`).classList.remove("flash");
  }, 200)
};

//adds event listeners 
const detectUserInput = () => {
  boxes.forEach(box => {
    box.addEventListener("click", event => {
      const userNewInput = Number(event.target.id);
      userInputs.push(userNewInput);
      generateFlash(userNewInput);
      checkUserInput(userNewInput);
    });
  });
};
//THIS FIXED ITTTTT
detectUserInput();

//generates new sally input
const sallySays = () => {
  const sallysNewInput = Math.ceil(Math.random()*4);
  sallysInputs.push(sallysNewInput);
  generateFlash(sallysNewInput);
  level++;
  text.innerHTML = `Level: ${level}`;
};

// compares users input with sallys input (at same index?)
// if all correct and array lengths are the same, call sallySays() and reset user array to an empty array, if incorrect - game over
const checkUserInput = () => {
  let index = (userInputs.length-1);

  if (userInputs[index] != sallysInputs[index]){
    gameOver();
    console.log(userInputs);
    console.log(sallysInputs);
  } else if (userInputs[index] === sallysInputs[index] && userInputs.length === sallysInputs.length) {
    userInputs = [];
    setTimeout(()=>{
      sallySays();
    }, 800)
  }
};

const gameOver = () => {
  level = 0;
  userInputs = [];
  sallysInputs = [];

  //styling
  gameOverHeading.style.display = "block";
  heading.classList.add("game-over");
  game.classList.add("game-over");
  boxes.forEach(box=>{
    box.classList.add("game-over");
  })

  //call start screen or restart screen
  setTimeout(() => {
    start.style.display = "flex";
    game.style.display = "none";
  }, 3000);
};

const startGame = () =>{
  start.style.display = "none";
  game.style.display = "block";
  gameOverHeading.style.display = "none";

  heading.classList.remove("game-over");
  game.classList.remove("game-over");
  boxes.forEach(box=>{
    box.classList.remove("game-over");
  })

  setTimeout(() => {
    sallySays();
  }, 800);
};

//Easy mode
startButtonEasy.addEventListener("click", ()=>{
  startGame();
});

//Hard mode
startButtonHard.addEventListener("click", ()=>{
  startGame();
});