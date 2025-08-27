import Deck from "./deck";
import { ICard } from "./types";
import { getBet, getDecision, getHandValue, getStrHand } from "./utils";

// should return the hand value after the turn is over
function playerTurn(playerHand: ICard[], deck: Deck): number {
}

// should return the hand value after the turn is over
function dealerTurn(dealerHand: ICard[], deck: Deck): number {
}

let dealerHand: ICard[] = [];
let playerHand: ICard[] = [];
const deck: Deck = new Deck();
let balance = 100;

while (balance > 0) {
  console.log(`\nPlayer funds $${balance}`);
  const bet = getBet(balance);
  balance -= bet;
}

console.log("You ran out of money!");
