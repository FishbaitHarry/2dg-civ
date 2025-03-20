import { RED, GREEN, BLUE } from "../basics.js";

const exampleCards = [
  {
    name: 'Random Red Asset',
    description: 'n/a',
    type: RED,
    strength: 1,
  },
  {
    name: 'Random Blue Tech',
    description: 'n/a',
    type: BLUE,
    strength: 1,
  },
  {
    name: 'Random Green Culture',
    description: 'n/a',
    type: GREEN,
    strength: 1,
  },
];

function upgradeCardStrength(card, turn) {
  return {...card, strength: Math.floor(turn/3)};
}

export function getRandomCiv(turnNumber) {
  return {
    hand: exampleCards.map( c => upgradeCardStrength(c, turnNumber) ),
    portrait: 'img/random.png',
    displayName: 'Random Civilization',
    description: 'Randomly generated',
    getMove: (state, hand=[]) => {
      const randomIndex = Math.floor(Math.random() * hand.length);
      return hand[randomIndex];
    }
  }
}
