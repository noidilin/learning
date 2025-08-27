import Card from "./card";
import { IDealable, Suit } from "./types";
import { shuffleArray } from "./utils";

class Deck implements IDealable {
  private deck: Card[] = [];

  constructor() {
  }

  private makeDeck(): Card[] {
  }

  reset() {
  }

  deal(num: number): Card[] {
  }
}

export default Deck
