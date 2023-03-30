import { input, readLines } from "@jasonsbarr/simple-io";

export function play() {}

/**
 * Draws the hangman
 * @param {number} used number of guesses used
 */
function drawMan(used) {
  return used === 7 || used === 6 ? String.raw`       ____
      |    |
      |    O
      |   \|/
      |    |
      |  _/ \_
______|______` : used === 5 ? String.raw`       ____
      |    |
      |    O
      |   \|/
      |    |
      |  _/
______|______` : used === 4 ? String.raw`       ____
      |    |
      |    O
      |   \|/
      |    |
      |
______|______` : used === 3 ? String.raw`       ____
      |    |
      |    O
      |   \|
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
