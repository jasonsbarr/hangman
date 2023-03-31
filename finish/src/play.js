import path from "node:path";
import { fileURLToPath } from "node:url";
import { input, readLines } from "@jasonsbarr/simple-io";

const MAX_GUESSES = 7;

/**
 * @typedef GameState
 * @property {string} word
 * @property {number} guessesUsed
 * @property {string[]} lettersGuessed
 */
const initialGameState = {
  word: "",
  guessesUsed: 0,
  lettersGuessed: []
};

/**
 * Play the game
 */
export function play() {
  let gameState = initialGameState;
  gameState = { ...gameState, word: getWord() };
  console.log("Let's play!");

  // main game loop
  while (true) {
    console.log(drawMan(gameState.guessesUsed));
    console.log();
    writeWordWithGuesses(gameState);
    console.log();
    let guess = input("Guess a letter, or enter 'quit' to quit: ");

    if (guess === "quit") {
      console.log("Goodbye!");
      break;
    } else if (!/^[a-zA-Z]$/.test(guess)) {
      console.log("Your guess must be a letter.");
      continue;
    }

    gameState = guessLetter(guess.toLowerCase(), gameState);

    if (isGameOver(gameState)) {
      endGame(gameState);
      break;
    }
  }
}

/**
 * Draws the hangman
 * @param {number} used number of guesses used
 * @returns {string}
 */
function drawMan(used) {
  return used >= 6 ? String.raw`       ____
      |    |
      |    O
      |   /|\
      |    |
      |  _/ \_
______|______` : used === 5 ? String.raw`       ____
      |    |
      |    O
      |   /|\
      |    |
      |  _/
______|______` : used === 4 ? String.raw`       ____
      |    |
      |    O
      |   /|\
      |    |
      |
______|______` : used === 3 ? String.raw`       ____
      |    |
      |    O
      |   /|
      |    |
      |
______|______` : used === 2 ? String.raw`       ____
      |    |
      |    O
      |    |
      |    |
      |
______|______` : used === 1 ? String.raw`       ____
      |    |
      |    O
      |
      |
      |
______|______` : String.raw`       ____
      |    |
      |
      |
      |
      |
______|______`;
}

/**
 * Gets random integer from 0 to top
 * @param {number} top
 * @returns {number}
 */
function randomInt(top) {
  return Math.floor(Math.random() * top);
}

/**
 * Get random word of at least 5 characters from data/words.txt
 * @returns {string}
 */
function getWord() {
  const words = readLines(
    path.join(fileURLToPath(import.meta.url), "../../data/words.txt")
  ).filter(word => word.length >= 5);
  return words[randomInt(words.length - 1)];
}

/**
 * Draw correctly guessed letters with lines for unguessed letters
 * @param {GameState} gameState
 */
function writeWordWithGuesses(gameState) {
  const wordLetters = gameState.word.split("");
  let guessed = "";

  for (let letter of wordLetters) {
    if (gameState.lettersGuessed.includes(letter)) {
      guessed += letter + " ";
    } else {
      guessed += "_ ";
    }
  }

  console.log(guessed);
}

/**
 * Derives new GameState from guessed letter
 * @param {string} guess letter guessed
 * @param {GameState} gameState
 * @returns {GameState}
 */
function guessLetter(guess, gameState) {
  if (gameState.lettersGuessed.includes(guess)) {
    return gameState;
  }

  let newState = { ...gameState, lettersGuessed: [ ...gameState.lettersGuessed, guess ] };
  if (gameState.word.includes(guess)) {
    return newState;
  } else {
    newState.guessesUsed++;
    return newState;
  }
}

/**
 * Checks to see if game is over
 * @param {GameState} gameState
 * @returns {boolean}
 */
function isGameOver(gameState) {
  if (gameState.guessesUsed >= MAX_GUESSES) {
    return true;
  }

  let letters = [ ...new Set(gameState.word.split("")) ];
  let correctGuesses = 0;

  for (let guess of gameState.lettersGuessed) {
    if (letters.includes(guess)) {
      correctGuesses++;
    }
  }

  return correctGuesses === letters.length;
}

/**
 * Display endgame message depending on whether the player won
 * @param {GameState} gameState ending game state
 */
function endGame(gameState) {
  if (gameState.guessesUsed < MAX_GUESSES) {
    console.log(
      `That's right, ${gameState.word}! You won with ${MAX_GUESSES - gameState.guessesUsed} guesses left!`
    );
  } else {
    console.log(`Sorry, you lost. The word was ${gameState.word}.`)
  }
}
