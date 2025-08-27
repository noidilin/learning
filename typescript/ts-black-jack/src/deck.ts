import Card from "./card";
import { IDealable, Suit } from "./types";
import { shuffleArray } from "./utils";

class Deck implements IDealable {
  private deck: Card[] = [];

  constructor() {
    this.reset()
  }

  private makeDeck(): Card[] {
    const cards: Card[] = []
    const suits = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades]
    for (let i = 1; i <= 52; i++) {
      const value = i % 13 ? i % 13 : 13
      const suit = Math.ceil(i / 13)
      cards.push(new Card(value, suits[suit - 1]))
    }
    return cards
  }

  reset() {
    const cards = this.makeDeck();
    this.deck = shuffleArray(cards);
  }

  deal(num: number): Card[] {
  }
}

export default Deck
