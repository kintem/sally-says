"use strict";

var body = document.querySelector("body");
var start = document.querySelector(".start");
var startButtonEasy = document.querySelector("#easy");
var startButtonHard = document.querySelector("#hard");
var game = document.querySelector(".game");
var gameOverHeading = document.querySelector(".game-over-heading");
var heading = document.querySelector(".game-header__heading");
var text = document.querySelector(".game-header__text");
var boxes = document.querySelectorAll(".box-container__box");
var sallysInputs = [];
var userInputs = [];
var level = 0; //generates a "flash" on the chosen box

var generateFlash = function generateFlash(num) {
  document.getElementById("".concat(num)).classList.add("flash");
  setTimeout(function () {
    document.getElementById("".concat(num)).classList.remove("flash");
  }, 200);
}; //adds event listeners 


var detectUserInput = function detectUserInput() {
  boxes.forEach(function (box) {
    box.addEventListener("click", function (event) {
      var userNewInput = Number(event.target.id);
      userInputs.push(userNewInput);
      generateFlash(userNewInput);
      checkUserInput(userNewInput);
    });
  });
}; //THIS FIXED ITTTTT


detectUserInput(); //generates new sally input

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
  boxes.forEach(function (box) {
    box.classList.add("game-over");
  }); //call start screen or restart screen

  setTimeout(function () {
    start.style.display = "flex";
    game.style.display = "none";
  }, 3000);
};

var startGame = function startGame() {
  start.style.display = "none";
  game.style.display = "block";
  gameOverHeading.style.display = "none";
  heading.classList.remove("game-over");
  game.classList.remove("game-over");
  boxes.forEach(function (box) {
    box.classList.remove("game-over");
  });
  setTimeout(function () {
    sallySays();
  }, 800);
}; //Easy mode


startButtonEasy.addEventListener("click", function () {
  startGame();
}); //Hard mode

startButtonHard.addEventListener("click", function () {
  startGame();
});