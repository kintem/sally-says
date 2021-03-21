// 1. sally picks random Number
// 2. number is added to Array
// 3. corresponding box flashes
// 4. add event listeners to all boxes
// 5. detect user input
// 6. add user input to user array
// 7. check user input === sallys input at same index - if true go to 8, if false change heading to game over and add specific styling to page
// 8. if userinput.length === sallys input.length -  1. increment level 2. eassign user array to empty array??? 3. sally generates new input (call number function again)

const boxes = document.querySelectorAll(".box-container__box");
const redBox = document.getElementById("1");
const blueBox = document.getElementById("2");
const yellowBox = document.getElementById("3");
const greenBox = document.getElementById("4");

let sallysInput = [];
let userInput = [];
let level = 0;

const generateFlash = (num) => {
  document.getElementById(num).classList.add = "flash";

  setTimeout(()=>{
    document.getElementById(num).classList.remove = "flash";
  }, 2000)
};

const sallySays = () => {
  const sallysNewInput = Math.round(Math.random()*4);
  sallysInput.push(sallysNewInput);
  generateFlash(sallysNewInput);
};

boxes.forEach(box => {
  box.addEventListener("click", event => {
    const userNewInput = event.target.id
    userInput.push(userNewInput);
    generateFlash(userNewInput);
  })
});