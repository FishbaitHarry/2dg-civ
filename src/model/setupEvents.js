import { RED, GREEN, BLUE } from "./basics.js";

export const playerHand = [
  {
    name: 'Strength of Youth',
    description: 'Our warriors are young and quick, ready to face any challange.',
    type: RED,
    strength: 2,
  },
  {
    name: 'Wisdom of Elders',
    description: 'We respect the elders, for they teach us of their own errors.',
    type: BLUE,
    strength: 1,
  },
  {
    name: 'Legends of Ancestors',
    description: 'We organise as our ancestors do, for their stories are of great victories.',
    type: GREEN,
    strength: 1,
  },
];

let redQueue = [
  {
    name: 'Hunting Grounds',
    description: '',
    type: RED,
    strength: 3,
  },
  {
    name: 'Fertile Lands',
    description: '',
    type: RED,
    strength: 4,
  },
  {
    name: 'Ore Deposits',
    description: '',
    type: RED,
    strength: 5,
  },
  {
    name: 'Domesticated Animals',
    description: '',
    type: RED,
    strength: 6,
  },
  {
    name: 'Ships',
    description: '',
    type: RED,
    strength: 7,
  },
  {
    name: 'Stone Constructions',
    description: '',
    type: RED,
    strength: 8,
  },
];

let blueQueue = [
  {
    name: 'Astrology',
    description: '',
    type: BLUE,
    strength: 3,
  },
  {
    name: 'Wheel',
    description: '',
    type: BLUE,
    strength: 4,
  },
  {
    name: 'Agriculture',
    description: '',
    type: BLUE,
    strength: 5,
  },
  {
    name: 'Pottery',
    description: '',
    type: BLUE,
    strength: 6,
  },
  {
    name: 'Writing',
    description: '',
    type: BLUE,
    strength: 7,
  },
  {
    name: 'Bowmaking',
    description: '',
    type: BLUE,
    strength: 8,
  },
];

let greenQueue = [
  {
    name: 'Settlement',
    description: 'The stability of settled life attracts those of lesser constitution.',
    type: GREEN,
    strength: 3,
  },
  {
    name: 'Military Tradition',
    description: 'It takes special kind of attitude to risk your life.',
    type: GREEN,
    strength: 4,
  },
  {
    name: 'Art of Expression',
    description: 'Leaving a mark of yourself inspires to do better.',
    type: GREEN,
    strength: 5,
  },
  {
    name: 'Mysticism',
    description: 'Concept of something greater than oneself.',
    type: GREEN,
    strength: 6,
  },
  {
    name: 'Code of Laws',
    description: 'Law is only just if it is unpartial and uncaring.',
    type: GREEN,
    strength: 7,
  },
  {
    name: 'Foreign Trade',
    description: 'Trade allows for specialization on a much greater scale.',
    type: GREEN,
    strength: 8,
  },
  {
    name: 'Craftsmanship',
    description: 'Those with talents need motivation to use them for benefit of others.',
    type: GREEN,
    strength: 9,
  },
];

export const eventQueue = [].concat(redQueue, blueQueue, greenQueue).sort((a,b) => a.strength - b.strength);
