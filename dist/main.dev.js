"use strict";

var body = document.querySelector("body");
var start = document.querySelector(".start");
var startButtonEasy = document.querySelector("#easy");
var startButtonHard = document.querySelector("#hard");
var game = document.querySelector(".game");
var boxContainer = document.querySelector(".box-container");
var gameOverHeading = document.querySelector(".game-over-heading");
var heading = document.querySelector(".game-header__heading");
var text = document.querySelector(".game-header__text");
var array = [1, 2, 3, 4];
var sallysInputs = [];
var userInputs = [];
var level = 0; //generates a "flash" on the chosen box

var generateFlash = function generateFlash(num) {
  document.getElementById("".concat(num)).classList.add("flash");
  setTimeout(function () {
    document.getElementById("".concat(num)).classList.remove("flash");
  }, 200);
}; //generates new sally input


var sallySays = function sallySays() {
  var sallysNewInput = Math.ceil(Math.random() * 4);
  sallysInputs.push(sallysNewInput);
  generateFlash(sallysNewInput);
  level++;
  text.innerHTML = "Level: ".concat(level);
}; // compares users input with sallys input (at same index?)
// if all correct and array lengths are the same, call sallySays() and reset user array to an empty array, if incorrect - game over


var checkUserInput = function checkUserInput() {
  var index = userInputs.length - 1;

  if (userInputs[index] != sallysInputs[index]) {
    gameOver();
    console.log(userInputs);
    console.log(sallysInputs);
  } else if (userInputs[index] === sallysInputs[index] && userInputs.length === sallysInputs.length) {
    userInputs = [];
    setTimeout(function () {
      sallySays();
    }, 800);
  }
};

var gameOver = function gameOver() {
  level = 0;
  userInputs = [];
  sallysInputs = []; //styling

  gameOverHeading.style.display = "block";
  heading.classList.add("game-over");
  game.classList.add("game-over");
  document.querySelectorAll(".box-container__box").forEach(function (box) {
    box.classList.add("game-over");
  }); //call start screen or restart screen

  setTimeout(function () {
    start.style.display = "flex";
    game.style.display = "none";
  }, 3000);
};

var detectUserInput = function detectUserInput(input) {
  userInputs.push(input);
  generateFlash(input);
  checkUserInput(input);
};

var renderBoxes = function renderBoxes() {
  boxContainer.innerHTML += array.map(function (num) {
    var color = "";

    switch (num) {
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

      default: // code block

    }

    return "<div class=\"box-container__box ".concat(color, "\"  id=\"").concat(num, "\"></div>");
  }).join("\n");
  document.querySelectorAll(".box-container__box").forEach(function (box) {
    box.addEventListener("click", function (event) {
      var userNewInput = Number(event.target.id);
      detectUserInput(userNewInput);
    });
  });
};

var startEasyGame = function startEasyGame() {
  //reset
  start.style.display = "none";
  game.style.display = "block";
  gameOverHeading.style.display = "none";
  heading.classList.remove("game-over");
  game.classList.remove("game-over");
  document.querySelectorAll(".box-container__box").forEach(function (box) {
    box.classList.remove("game-over");
  }); //dynamically render boxes

  if (!document.querySelector(".box-container__box")) {
    renderBoxes();
  }

  setTimeout(function () {
    sallySays();
  }, 800);
}; // const startHardGame = () =>{
//   //reset
//   start.style.display = "none";
//   game.style.display = "block";
//   gameOverHeading.style.display = "none";
//   heading.classList.remove("game-over");
//   game.classList.remove("game-over");
//   boxes.forEach(box=>{
//     box.classList.remove("game-over");
//   })
//   //dynamically render boxes
//   renderBoxes();
//   setTimeout(() => {
//     sallySays();
//   }, 800);
// };
//Easy mode


startButtonEasy.addEventListener("click", function () {
  startEasyGame();
}); //Hard mode

startButtonHard.addEventListener("click", function () {
  startHardGame();
});