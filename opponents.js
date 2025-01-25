import { RED, GREEN, BLUE, counterColors } from "./basics.js";

function strongestComparator(a,b) {
  return b.strength - a.strength;
}

export const defaultOpponent = {
  hand: [],
  portrait: '',
  displayName: '',
  description: '',
  getMove: (state, hand) => hand[0],
};

const barbarianHand = [
  {
    name: 'Strength of Savagery',
    description: 'The weak are weeded out at a young age.',
    type: RED,
    strength: 3,
  },
  {
    name: 'Law of the Strong',
    description: 'These savages only respect strength.',
    type: GREEN,
    strength: 1,
  },
];

export const barbarianOpponent = {
  hand: barbarianHand,
  portrait: 'img/barbarians.png',
  displayName: 'Barbarians',
  description: '',
  getMove: (state, hand=[]) => {
    hand.sort(strongestComparator);
    const currentColor = state.currentEvent.color;
    const winningColor = counterColors[currentColor];
    const bestOptions = hand.filter(c => c.color == winningColor);
    if (bestOptions) return bestOptions[0];
    return hand[0];
  },
};

const nomadHand = [
  {
    name: 'Songs of Fallen Civilizations',
    description: 'They sing songs from a forgotten age of wisdom.',
    type: BLUE,
    strength: 1,
  },
  {
    name: 'Stoic Resilience',
    description: 'These people never waver.',
    type: GREEN,
    strength: 3,
  },
];

export const nomadOpponent = {
  hand: nomadHand,
  portrait: 'img/nomads.png',
  displayName: 'Nomads',
  description: '',
  getMove: (state, hand=[]) => {
    const randomIndex = Math.floor(Math.random() * hand.length);
    return hand[randomIndex];
  }
}
