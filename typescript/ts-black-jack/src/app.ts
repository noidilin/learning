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

  // Deal the cards
  deck.reset();
  playerHand = deck.deal(2);
  dealerHand = deck.deal(2);

  const playerValue = getHandValue(playerHand);
  const dealerValue = getHandValue(dealerHand);

  console.log(`Your hand: ${getStrHand(playerHand)} (Total: ${playerValue})`);
  if (playerValue === 21) {
    balance += bet * 2.5;
    console.log(`Blackjack! You won $${bet * 2.5}`);
    continue;
  } else if (dealerValue === 21) {
    console.log(`Dealer's hand: ${getStrHand(dealerHand)}, (Total: 21)`);
    console.log("Dealer has Blackjack, you lost...");
    continue;
  }
  console.log(`Dealer's hand: ${getStrHand(dealerHand, true)}`);

}

console.log("You ran out of money!");
