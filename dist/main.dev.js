"use strict";

// 1. sally picks random Number
// 2. number is added to Array
// 3. corresponding box flashes
// 4. add event listeners to all boxes
// 5. detect user input
// 6. add user input to user array
// 7. check user input === sallys input at specific index - if true go to 8, if false change heading to game over and add specific styling to page
// 8. if userinput.length === sallys input.length -  1. increment level 2. reassign user array to empty array??? 3. sally generates new input (call number function again)
var body = document.querySelector("body");
var start = document.querySelector(".start");
var game = document.querySelector(".game");
var startButton = document.querySelector(".start__button");
var boxes = document.querySelectorAll(".box-container__box");
var heading = document.querySelector(".game-header__heading");
var text = document.querySelector(".game-header__text");
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
  level++;
  text.innerHTML = "Level: ".concat(level);
  generateFlash(sallysNewInput);
}; // compares users input with sallys input (at same index?)
// if all correct and array lengths are the same, call sallySays() and reset user array to an empty array, if incorrect - game over


var checkUserInput = function checkUserInput() {
  var index = userInputs.length - 1;

  if (userInputs[index] != sallysInputs[index]) {
    console.log("game over");
    gameOver();
  } else if (userInputs[index] === sallysInputs[index] && userInputs.length === sallysInputs.length) {
    console.log("yay");
    userInputs = [];
    setTimeout(function () {
      sallySays();
    }, 800);
  }
};

var gameOver = function gameOver() {
  userInput = [];
  sallysInputs = [];
  level = 0; //change page styling

  body.style.backgroundColor = "red";
  boxes.forEach(function (box) {
    box.style.backgroundColor = "black";
  });
};

var startGame = function startGame() {
  start.style.display = "none";
  game.style.display = "contents";
  body.style.backgroundColor = "black";
  heading.style.color = "white";
  text.style.color = "white";
  setTimeout(function () {
    sallySays();
  }, 800);
};

startButton.addEventListener("click", function () {
  startGame();
}); // document.body.addEventListener("keydown", ()=>{
//     sallySays();
// });