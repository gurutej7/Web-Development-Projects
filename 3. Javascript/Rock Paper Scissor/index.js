let userScore = 0 ;
let compScore = 0 ;

const choices = document.querySelectorAll(".choice");
// The above choices is a array
const winMsg = document.getElementById("msg");
const userScorePara = document.getElementById("user-score");
const compScorePara = document.getElementById("computer-score");

const resetButton = document.getElementById("reset-btn");


//Function to generate random computer choice
const generateCompChoice = () =>{
    let randomvalue = Math.random(); // Generates random value between 0 and 1 (exclusive)

    // The below thing can be done in many ways
    if(randomvalue > 0 && randomvalue < 0.3) return "rock";
    else if(randomvalue > 0.3 && randomvalue < 0.67) return "paper";
    else return "scissor";

    /*const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
    */
}
// Function to show Winner
const showWinner = (userWin , userChoice , compChoice) => {
    if(userWin){//true
        winMsg.innerText = `You Won , your choice: ${userChoice} and computer choice: ${compChoice}`;
        winMsg.style.backgroundColor = "green";
        userScore++;
    }
    else{
        winMsg.innerText = `Computer Won , your choice: ${userChoice} and computer choice: ${compChoice}`;
        winMsg.style.backgroundColor = "red";
        compScore++;
    }
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
}

// Function to show Draw{}

const showDraw = (userChoice,compChoice) =>{
    winMsg.innerText = `Draw , your choice: ${userChoice} and computer choice: ${compChoice}`;
    winMsg.style.backgroundColor = "rgb(121, 121, 183)";
}

// Function which plays the game
const playGame = (userChoice,compChoice) =>{
    if(userChoice === compChoice)//Draw game
        showDraw(userChoice,compChoice);
    else{
        let userWin = false;
        if(userChoice == "rock"){
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            userWin = compChoice === "scissor" ? false : true;
        }
        else{ // scissor => userChoice
            userWin = compChoice ==="rock" ? false : true;
        }

        showWinner(userWin , userChoice , compChoice );
    }

}

// To keep track on which choice is clicked
choices.forEach((choice) =>{
    choice.addEventListener("click" , ()=> {
        const userChoice = choice.getAttribute("id");
        //console.log(`choice was clicked ${userChoice}`);
        const compChoice = generateCompChoice();
        playGame(userChoice,compChoice);
    })
})

// Function to reset Game
resetButton.addEventListener("click", () =>{
    userScore = 0 ;
    compScore = 0 ;
    winMsg.innerText = `Play Your Move`;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    winMsg.style.backgroundColor = "rgb(121, 121, 183)";
})
