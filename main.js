const body = document.querySelector("body");
const start = document.querySelector(".start");
const startButtonEasy = document.querySelector("#easy");
const startButtonHard = document.querySelector("#hard");
const game = document.querySelector(".game");
const boxContainer = document.querySelector(".box-container");
const gameOverHeading = document.querySelector(".game-over-heading");
const heading = document.querySelector(".game-header__heading");
const text = document.querySelector(".game-header__text");

let array = [1, 2, 3, 4, 5, 6];
let easyArray = array.slice(0, 4);
let sallysInputs = [];
let userInputs = [];
let level = 0;
let mode = "";

//generates a "flash" on the chosen box
const generateFlash = (num) => {
  document.getElementById(`${num}`).classList.add("flash");

  setTimeout(()=>{
    document.getElementById(`${num}`).classList.remove("flash");
  }, 200)
};

//generates new sally input
const sallySays = (boxNum) => {
  if (boxNum > 4) {
    mode = "hard";
  } else {
    mode = "easy";
  }
  const sallysNewInput = Math.ceil(Math.random() * boxNum);
  sallysInputs.push(sallysNewInput);
  generateFlash(sallysNewInput);
  level++;
  text.innerHTML = `Level: ${level}`;
};

// compares users input with sallys input (at same index?)
// if all correct and array lengths are the same, call sallySays() and reset user array to an empty array, if incorrect - game over
const checkUserInput = (mode) => {
  let index = (userInputs.length-1);

  if (userInputs[index] != sallysInputs[index]){
    gameOver();
   
  } else if (userInputs[index] === sallysInputs[index] && userInputs.length === sallysInputs.length) {
    userInputs = [];
    setTimeout(()=>{
      if (mode === "easy") {
        sallySays(4);
      } else {
        sallySays(6);
      }
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
  document.querySelectorAll(".box-container__box").forEach(box=>{
    box.classList.add("game-over");
  })

  //call start screen or restart screen
  setTimeout(() => {
    start.style.display = "flex";
    game.style.display = "none";
  }, 3000);
};


const detectUserInput = (input, mode) => {
  userInputs.push(input);
  generateFlash(input);
  checkUserInput(mode);
};

const renderBoxes = (array) =>{
  boxContainer.innerHTML += array.map(num=>{
    let color = "";
    
    switch(num) {
      case 1:
        color = "purple";
        break;
      case 2:
        color = "yellow";
        break;
      case 3:
        color = "blue";
        break;
      case 4:
        color = "pink";
        break;
      case 5:
        color = "orange";
        break;
      case 6:
        color = "lime";
        break;
      default:
        // code block
    }

    return `<div class="box-container__box ${color}"  id="${num}"></div>`

  }).join("\n");

  document.querySelectorAll(".box-container__box").forEach(box => {
    box.addEventListener("click", event => {
      const userNewInput = Number(event.target.id);
      if (document.querySelector(".lime")){
        detectUserInput(userNewInput, "hard");
      } else {
        detectUserInput(userNewInput, "easy");
      }
    });
  });
}

const startGame = (mode) =>{
  //reset
  start.style.display = "none";
  game.style.display = "block";
  gameOverHeading.style.display = "none";

  heading.classList.remove("game-over");
  game.classList.remove("game-over");
  document.querySelectorAll(".box-container__box").forEach(box=>{
    box.classList.remove("game-over");
  })

  //dynamically render boxes CHANGE MODES AFTER GAME OVER
  if (!document.querySelector(".box-container__box")){
    if (mode === "easy") {
      renderBoxes(easyArray);
    } else {
      renderBoxes(array);
    }
  } else if (document.querySelector(".box-container__box")) {
    if (mode === "easy" && document.querySelector(".lime")) {
      document.querySelector(".lime").style.display = "none";
      document.querySelector(".orange").style.display = "none";
    } else if (mode === "hard" && !document.querySelector(".lime")) {
      renderBoxes(array.slice(4, 6));
    }
  }

  setTimeout(() => {
    if (mode === "easy") {
      sallySays(4);
    } else {
      sallySays(6);
    }
  }, 800);
};

//Easy mode
startButtonEasy.addEventListener("click", ()=>{
  startGame("easy");
});

//Hard mode
startButtonHard.addEventListener("click", ()=>{
  startGame("hard");
});