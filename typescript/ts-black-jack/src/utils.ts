import { ICard } from "./types";
import promptSync from "prompt-sync";
const prompt = promptSync();

// returns whether the player will hit or stand
export function getDecision(): "hit" | "stand" {
}

// returns the numeric value of a hand
export function getHandValue(cards: ICard[]): number {
}

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements at indices i and j
  }
  return array;
}

// returns the bet the player is making
export function getBet(balance: number): number {
  while (true) {
    const response = prompt("Enter your bet: ");
    try {
      const bet = parseInt(response)
      if (bet > 0 && bet <= balance) return bet;
      console.log('Invalid bet.')
    } catch {
      console.log('Please enter a valid number.')
    }
  }
}

// returns a string representation of the hand
export function getStrHand(hand: ICard[], hideSecondCard: boolean = false): string {
}
