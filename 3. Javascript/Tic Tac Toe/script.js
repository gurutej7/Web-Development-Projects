let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#newgame-btn");
let winMsgContainer = document.querySelector(".win-msg-container");
let winMsg = document.querySelector("#win-msg");

let startSelectionDiv = document.querySelector(".who-will-start");

let OButton = document.querySelector("#select-button-O");
let XButton = document.querySelector("#select-button-X");

// To track whose turn it is

 // true -> O  or false -> X

let turn = true ;

// Initially the boxes are disabled 
for(let box of boxes){
    box.disabled = true;
}

// O turn
OButton.addEventListener("click",()=>{
    turn = true;
    // Once the turn is decide then hide that div ( which asks about whose turn)
    startSelectionDiv.classList.add("hidden");
    enableBoxes(boxes);
});
// X turn
XButton.addEventListener("click",()=>{
    turn = false;
    startSelectionDiv.classList.add("hidden");
    enableBoxes(boxes);
});

// Create a game board using a 2D array
// The boxes acts as the 2D array representing a 3*3 grid
// The below are the indices which represents the potential positions with same values can make you a winner
// that is 3 rows , 3 columns , 2 diagonals

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


const boxOnClickFunction = (box) => {
    // While a box is clicked , we will check whose turn it is 
    // Depending on the turn value we will assign the value to that button
    if(turn){
        box.style.color="#b0413e";
        box.innerText = "O";
        turn = false;
        // Make the respective change to the turn after playing
    }
    else{
        box.style.color = "#40b03e";
        box.innerText = "X";
        turn = true;
    }
    // Once the box is played then diable it , so it wont operate on further clicks on the same box
    box.disabled = true;
    // After placing every move check for draw and winning conditions
    let draw = checkDraw(boxes);
    if(draw) showDraw();
    checkWinner();
    
};

// Activation of a box in the board when clicked
boxes.forEach((box) => {
    box.addEventListener("click" , ()=> boxOnClickFunction(box));
});


// Function to check winner
const checkWinner = () =>{
    for(let pattern of winPatterns){
        // we will check in the winning patterns which has the positions , such that if the values at those 
        // positions are same then it can make you a winner
        let pos1 = pattern[0];
        let pos2 = pattern[1];
        let pos3 = pattern[2];
        let pos1Val = boxes[pos1].innerText;
        let pos2Val = boxes[pos2].innerText;
        let pos3Val = boxes[pos3].innerText;

        
        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            // we have same values in a valid pattern then it can be a winner
            if(pos1Val === pos2Val  && pos2Val === pos3Val){
                    showWinner(pos1Val);
            }
        }
    }
};


const checkDraw = (boxes) => {
    for(let i = 0 ; i< 9 ; i++){
        if(boxes[i].innerText !== "X"  && boxes[i].innerText !== "O") 
         // We still have empty
        return false;
    }
    return true;
};

const showWinner = (winner) =>{
    // Once the checkWinner is valid then will display the winner message , with respect to the winner
    winMsg.innerText = `Congratulations ${winner} won`;
    // to display that we have to remove the class hide, from that div
    winMsgContainer.classList.remove("hide");
    disableBoxes(boxes);

};

// Similar to show winner , show Draw
const showDraw = () =>{
    winMsg.innerText = `Draw , Start again`;
    winMsgContainer.classList.remove("hide");
    disableBoxes(boxes);

};

// Function to disable all boxes whenever needed
const disableBoxes = (boxes) => {
    for(let box of boxes){
        box.disabled = true;
    }
}
// Function to enable boxes whenever needed
const enableBoxes = (boxes) => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

// Function to reset the game
const resetGame = () =>{
    // enable boxe will clear all values in the boxes
    enableBoxes(boxes);
    // after clearing the message the boxes are disabled , because they are enabled only after deciding who wants to start
    disableBoxes(boxes);
    // Hide the previous win message
    winMsgContainer.classList.add("hide");
    // Show the who wants to start , div
    startSelectionDiv.classList.remove("hidden");
}

newGameButton.addEventListener("click", resetGame);

resetButton.addEventListener("click",resetGame);
