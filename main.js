const body = document.querySelector("body");
const start = document.querySelector(".start");
const startButtonEasy = document.querySelector("#easy");
const startButtonHard = document.querySelector("#hard");
const buttonMessage = document.querySelector(".start__hover-text");
const game = document.querySelector(".game");
const boxContainer = document.querySelector(".box-container");
const gameOverHeading = document.querySelector(".game-over-heading");
const heading = document.querySelector(".game-header__heading");
const text = document.querySelector(".game-header__text");
const message = document.querySelector(".game-header__message");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");

let messages = ["", "", "good job!", "nice", "ooh someone's a pro!", "is this distracting?", "damn daniel", "impressive", "getting harder now ain't it?", "ooft", "HOW ARE YOU STILL GOING", "i'm bored now", "bye"];

let hardMessages = ["", "", "BET YOU DIDN'T SEE THAT COMING", "ooft", "this MUST be distracting", "is this distracting?", "I feel like this is distracting", "should I stop?", "HOW ARE YOU STILL GOING", "are you cheating?", "ugh", "bye"];

let array = [1, 2, 3, 4, 5, 6];
let easyArray = array.slice(0, 4);
let shuffled = [];
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

//generates a new sally input
const sallySays = (boxNum) => {
  const sallysNewInput = Math.ceil(Math.random() * boxNum);
  sallysInputs.push(sallysNewInput);
  generateFlash(sallysNewInput);
  level++;
  text.innerHTML = `Level: ${level}`;

  if (boxNum > 4 && level > 1) {
    message.innerHTML = `${hardMessages[level]}`;
  } else if (boxNum <= 4 && level > 2){
    message.innerHTML = `${messages[level]}`;
  }
};

//shuffle array 
const shuffleBoxes = () =>{
  shuffled = array.sort(()=>Math.random() - 0.5);
  boxContainer.innerHTML = "";
  renderBoxes(shuffled);
}

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
        shuffleBoxes();
        setTimeout(() => {
          sallySays(6);
        }, 800);
      }
    }, 800)
  }
};

const gameOver = () => {
  //reset
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

  //call start screen
  setTimeout(() => {
    start.style.display = "flex";
    game.style.display = "none";
    boxContainer.classList.remove("hard", "easy");
  }, 3000);
};


const detectUserInput = (input, mode) => {
  userInputs.push(input);
  generateFlash(input);
  checkUserInput(mode);
};

function renderBoxes(array) {
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
        color = "lime";
        break;
      case 6:
        color = "orange";
        break;
      default:
        color = "pink";
    }

    return `<div class="box-container__box ${color}"  id="${num}"></div>`

  }).join("\n");

  document.querySelectorAll(".box-container__box").forEach(box => {
    box.addEventListener("click", event => {
      const userNewInput = Number(event.target.id);
      if (array === easyArray){
        detectUserInput(userNewInput, "easy");
      } else {
        detectUserInput(userNewInput, "hard");
      }
    });
  });

  if (array === easyArray) {
    boxContainer.classList.add("easy");
  } else if (array === array || array === shuffled) {
    boxContainer.classList.add("hard");
  }
}

const startGame = (mode) =>{
  //reset
  message.innerHTML = "";
  boxContainer.innerHTML = "";
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
    
    if (mode === "easy") {
      boxContainer.classList.add("easy");

    } if (mode ==="easy" && box5) {
      box5.style.display = "none";
      box6.style.display = "none";
      boxContainer.classList.add("easy");

    } if (mode === "hard") {
      boxContainer.classList.add("hard");

    } if (mode ==="hard" && !box5) {
      renderBoxes(array.slice(4, 6));
      boxContainer.classList.add("hard");
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

//Easy button effects
startButtonEasy.addEventListener("mouseover", ()=>{
  buttonMessage.innerHTML = "you're better than that";
});
startButtonEasy.addEventListener("mouseout", ()=>{
  buttonMessage.innerHTML = "";
});

//Hard button effects
startButtonHard.addEventListener("mouseover", ()=>{
  buttonMessage.innerHTML = "ooh feeling confident are we?";
});
startButtonHard.addEventListener("mouseout", ()=>{
  buttonMessage.innerHTML = "";
});


//Easy mode
startButtonEasy.addEventListener("click", ()=>{
  startGame("easy");
});

//Hard mode
startButtonHard.addEventListener("click", ()=>{
  startGame("hard");
});