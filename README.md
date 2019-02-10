# Word-Guess-Game

Created a game similar to hangman using JavaScript with specific focus on DOM manipulation.
User is show instructions and a basic interface for the game.
At the beginning of the game, a randomly selected word is chosen from an array and blanks representing the word's characters are shown.
  The word is a piece of technology most people will use on a fairly regular basis.
  The user is given an arbitrary number of allowed incorrect guesses (1.5x the word length).
As the user types letters on the keyboard, if that character is in the mysterious word, it will populate the respective space(s). If the character is not in the word, it is displayed as an incorrect guess, and the number of incorrect guesses decrements.
If the user guesses all of the characters without going over their alloted remaining guess, a winning tune is played and their wins increament. If the user exhausts all of their permitted guesses, a loss is recorded and a losing tune is played.
