import figlet from "figlet";
import { input } from "@jasonsbarr/simple-io";
import { help } from "../help.js";

export function start() {
  console.log(figlet.textSync("Welcome to Hangman!"));
  let direction = "";

  while (direction !== "Q") {
    direction = input("P for play, H for help, or Q for quit: ");

    switch (direction) {
      case "P":
      case "H":
        help();
      case "Q":
        console.log(figlet.textSync("Goodbye!"));
        process.exit(0);
    }
  }
}
