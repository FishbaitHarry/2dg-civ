import { colors } from "./basics";

export const playerHand = [
  {
    name: 'Strength of Youth',
    description: 'Our warriors are young and quick, ready to face any challange.',
    type: colors.RED,
    strength: 2,
  },
  {
    name: 'Wisdom of Elders',
    description: 'We respect the elders, for they teach us of their own errors.',
    type: colors.BLUE,
    strength: 1,
  },
  {
    name: 'Legends of Ancestors',
    description: 'We organise as our ancestors do, for their stories are of great victories.',
    type: colors.GREEN,
    strength: 1,
  },
];

let redQueue = [
  {
    name: 'Hunting Grounds',
    description: '',
    type: colors.RED,
    strength: 3,
  },
  {
    name: 'Fertile Lands',
    description: '',
    type: colors.RED,
    strength: 4,
  },
  {
    name: 'Ore Deposits',
    description: '',
    type: colors.RED,
    strength: 5,
  },
  {
    name: 'Domesticated Animals',
    description: '',
    type: colors.RED,
    strength: 6,
  },
  {
    name: 'Ships',
    description: '',
    type: colors.RED,
    strength: 7,
  },
  {
    name: 'Stone Constructions',
    description: '',
    type: colors.RED,
    strength: 8,
  },
];

let blueQueue = [
  {
    name: 'Astrology',
    description: '',
    type: colors.BLUE,
    strength: 3,
  },
  {
    name: 'Wheel',
    description: '',
    type: colors.BLUE,
    strength: 4,
  },
  {
    name: 'Agriculture',
    description: '',
    type: colors.BLUE,
    strength: 5,
  },
  {
    name: 'Pottery',
    description: '',
    type: colors.BLUE,
    strength: 6,
  },
  {
    name: 'Writing',
    description: '',
    type: colors.BLUE,
    strength: 7,
  },
  {
    name: 'Bowmaking',
    description: '',
    type: colors.BLUE,
    strength: 8,
  },
];

let greenQueue = [
  {
    name: 'Settlement',
    description: 'The stability of settled life attracts those of lesser constitution.',
    type: colors.GREEN,
    strength: 3,
  },
  {
    name: 'Military Tradition',
    description: 'It takes special kind of attitude to risk your life.',
    type: colors.GREEN,
    strength: 4,
  },
  {
    name: 'Art of Expression',
    description: 'Leaving a mark of yourself inspires to do better.',
    type: colors.GREEN,
    strength: 5,
  },
  {
    name: 'Mysticism',
    description: 'Concept of something greater than oneself.',
    type: colors.GREEN,
    strength: 6,
  },
  {
    name: 'Code of Laws',
    description: 'Law is only just if it is unpartial and uncaring.',
    type: colors.GREEN,
    strength: 7,
  },
  {
    name: 'Foreign Trade',
    description: 'Trade allows for specialization on a much greater scale.',
    type: colors.GREEN,
    strength: 8,
  },
  {
    name: 'Craftsmanship',
    description: 'Those with talents need motivation to use them for benefit of others.',
    type: colors.GREEN,
    strength: 9,
  },
];

export const eventQueue = [].concat(redQueue, blueQueue, greenQueue).sort((a,b) => a.strength - b.strength);
