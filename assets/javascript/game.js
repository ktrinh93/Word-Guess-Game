// array to store pre-defined answers
var answers = ["phone", "tablet", "laptop", "headphones", "watch", "calculator", "usb"];

// variables to store user's key presses
var userInput;
// guess history (wrong or right)
var userGuesses = [];

// variables to link to HTML
var instructions = document.getElementById("instructions");
var message = document.getElementById("message");
var incorrectGuesses = document.getElementById("letters");
var guessCounter = document.getElementById("guesses");
var wordBlanks = document.getElementById("word");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
// audio files
var winAudio = document.getElementById("win-audio");
var loseAudio = document.getElementById("lose-audio");

// variables for the word being played
var chosenWord;
var filledBlanks;

// booleans to track end of game conditions
var won = false;
var lost = false;

// (re)initializes the game state
function start() {
    // calculates random word to pick from array
    chosenWord = answers[Math.floor(Math.random() * answers.length)];
    console.log("chosenWord: " + chosenWord);

    // creates blanks to be used for word
    var initBlanks = [];
    for(var i = 0; i < chosenWord.length; i++) {
        initBlanks[i] = "_";
    }
    wordBlanks.textContent = initBlanks.join(" ");
    filledBlanks = initBlanks;

    // calculates how many guesses user should have based on word length
    // arbitrarily choosing 1.5 times the word length
    guessCounter.textContent = Math.round(chosenWord.length * 1.5);
}

// resets the game state
function reset() {
    userInput = null;
    chosenWord = null;
    filledBlanks = null;
    won = false;
    lost = false;
    incorrectGuesses.textContent = "";
    userGuesses = [];
}

// helper function to count how many times user has guessed a letter
// used to determine whether guesses have been repeated
function numOfTimesGuessed(letter) {
    var counter = 0;
    for(var i = 0; i < userGuesses.length; i++) {
        if(userGuesses[i] === letter) {
            counter++;
        }
    }
    return counter;
}

// helper function to determine if the user's guess is a letter
// ensures numbers and modifier keys don't count as incorrect guesses
function isLetter(c) {
    return c.length === 1 && c.match(/[a-z]/i);
}

// start the game
start();

// when the user releases a key
document.onkeyup = function(event) {
    
    // clear the instructions
    instructions.textContent = "";

    // standardize case since it doesn't matter
    userInput = event.key.toLowerCase();

    // logs user's key for debugging purposes
    console.log("userInput: " + userInput);

    // if the user's input is a letter
    if(isLetter(userInput)) {
        
        // log the guess
        userGuesses.push(userInput);

        // if the user has only guessed the letter once
        if(numOfTimesGuessed(userInput) === 1) {

            // if chosenWord contains the user's guess
            if(chosenWord.indexOf(userInput) >= 0) {

                // replace corresponding blanks with the guess
                for(var i = 0; i < chosenWord.length; i++) {
                    if(chosenWord.charAt(i) === userInput) {
                        filledBlanks[i] = userInput;
                    }
                }
                wordBlanks.textContent = filledBlanks.join(" ");

                // if the user wins
                if(filledBlanks.join("") === chosenWord) {
                    // play music, increment wins, alert user of win
                    winAudio.play();
                    won = true;
                    wins.textContent = parseInt(wins.textContent)+1;
                    instructions.textContent = "You won! The word was: " + chosenWord + ". You get to play again! Press any key to get started!";
                }
            }
            // if incorrect guess
            else {
                // report incorrect guess and decrement remaining guesses
                incorrectGuesses.textContent = incorrectGuesses.textContent + userInput + " ";
                guessCounter.textContent = parseInt(guessCounter.textContent)-1;
                
                // if the user loses
                if(parseInt(guessCounter.textContent) === 0) {
                    // play music, increment wins, alert user of loss
                    loseAudio.play();
                    lost = true;
                    losses.textContent = parseInt(losses.textContent)+1;
                    instructions.textContent = "You lost! The word was: " + chosenWord + ". Try again, press any key to get started!";
                }
            }
        }

        // end of game
        if(won || lost) {
            // reset everything
            reset();
            // restart
            start();
        }

    }
}

