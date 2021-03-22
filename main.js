// 1. sally picks random Number
// 2. number is added to Array
// 3. corresponding box flashes
// 4. add event listeners to all boxes
// 5. detect user input
// 6. add user input to user array
// 7. check user input === sallys input at specific index - if true go to 8, if false change heading to game over and add specific styling to page
// 8. if userinput.length === sallys input.length -  1. increment level 2. reassign user array to empty array??? 3. sally generates new input (call number function again)

const boxes = document.querySelectorAll(".box-container__box");
const heading = document.querySelector("h2");

let sallysInputs = [];
let userInputs = [];
let level = 0;

//generates a "flash" on the chosen box
const generateFlash = (num) => {
  document.getElementById(`${num}`).classList.add("flash");

  setTimeout(()=>{
    document.getElementById(`${num}`).classList.remove("flash");
  }, 500)
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

//generates new sally input & calls 
const sallySays = () => {
  const sallysNewInput = Math.ceil(Math.random()*4);
  generateFlash(sallysNewInput);
  sallysInputs.push(sallysNewInput);
  detectUserInput();
};

//compares users click with sallys input at same index?
// if all correct and array lengths are the same, call sallySays() and reset user array to an empty array, if incorrect - game over
const checkUserInput = (newInput) => {
  let index = (userInputs.length-1);

  if (userInputs[index] != sallysInputs[index]){
    console.log("game over");
    // userInput = [];
    // sallysInputs = [];
  } 
  
  if (userInputs[index] === sallysInputs[index] && userInputs.length === sallysInputs.length) {
    console.log("yay");
    userInputs = [];
    setTimeout(()=>{
      sallySays();
    }, 1000)
  }

  console.log(`sallys array: ${sallysInputs}`);
  console.log(`users array: ${userInputs}`);
  };

//turn into function called startGame();
document.body.addEventListener("keydown", ()=>{
    sallySays();
  });