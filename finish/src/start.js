import figlet from "figlet";
import { input } from "@jasonsbarr/simple-io";

export function start() {
  console.log(figlet.textSync("Welcome to Hangman!"));
  let direction = "";

  while (direction !== "Q") {
    direction = input("P for play, H for help, or Q for quit: ");
  }
}
