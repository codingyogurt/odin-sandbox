
// 0 = draw
// 1 = computer wins
// 2 = human wins
let humanWins = 0;

let compScore = 0;
let humanScore = 0;

const divResult = document.querySelector(".result");

function computerPlay(){
    return Math.floor(Math.random() * 3);
}

function whoWins(computerPlay, humanPlay){
    // 0 = Rock
    // 1 = Paper
    // 2 = Scissors

    humanWins = 1;
    
    if (computerPlay === humanPlay){
        isHumanWin = 0;
        divResult.textContent = "Draw!";
    };

    if (computerPlay === 0 && humanPlay === 2){
        divResult.textContent = "You lose! Rock beats Scissors!";
    } else if (computerPlay === 1 && humanPlay === 0){
        divResult.textContent = "You lose! Paper beats Rock!"
    } else if (computerPlay === 2 && humanPlay === 1){
        divResult.textContent = "You lose! Scissors beats Paper!"
    } else {
        humanWins = 2;
        divResult.textContent = "You win!";
    }
}

function game(){

    let humanPlay = 0;

    // 0 = Rock
    // 1 = Paper
    // 2 = Scissors
    const humanBtns = document.querySelectorAll(".btn");

    humanBtns.forEach((btn) => {
        btn.addEventListener("click", function(e){
            if(btn.classList.contains("human-rock")){
                humanPlay = 0;
            } else if(btn.classList.contains("human-paper")){
                humanPlay = 1;
            } else if(btn.classList.contains("human-scissors")){
                humanPlay = 2;
            }
            whoWins(computerPlay(),humanPlay);
            updateScore();
        })
    });

}

const computerScoreElem = document.querySelector(".computer-score");
const humanScoreElem = document.querySelector(".human-score");

function updateScore(){
    if (humanWins === 1){
        compScore++;
        console.log("human:" + compScore);
    } else if(humanWins === 2){
        humanScore++;
        console.log("human:" + humanScore);
    }


    computerScoreElem.textContent = compScore;
    humanScoreElem.textContent = humanScore;

    if (compScore === 5 || humanScore === 5){
        if (compScore > humanScore){
            divResult.textContent = "YOU LOSE THE TOURNAMENT !!! Click a hand below!";
        } else {
            divResult.textContent = "YOU WIN THE TOURNAMENT !!! Click a hand below!";
        }

        humanWins = 0;
        compScore = 0;
        humanScore = 0; 
    }



}

game();
