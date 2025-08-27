import { ICard, Suit } from "./types";

class Card implements ICard{
    value: number;
    suit: Suit;

    constructor(value: number, suit: Suit) {
        this.value = value;
        this.suit = suit
    }
}

export default Card