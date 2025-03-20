export const RED = 'red';
export const GREEN = 'green';
export const BLUE = 'blue'

export const colors = [RED, GREEN, BLUE];

export const counterColors = {
  [RED]: BLUE,
  [BLUE]: GREEN,
  [GREEN]: RED,
};

// lol who needs typescript
export const defaultCard = {
  name: 'The Title of Card',
  description: 'Card description.',
  type: RED,
  strength: 2,
}
export const defaultPlayer = {
  displayName: 'Player',
  hand: [defaultCard],
};
export const specialIcons = { // unused yet
  hasBeenLost: null,
  hasBeenGained: null,
};
export const defaultEvent = {
  type: 'plain',
  description: 'Human readable',
  card: null,
};
export const defaultAction = {
  playedCardIndex: 0,
};
export const defaultState = {
  turnNumber: 0,
  playerHand: [defaultCard],
  opponents: [defaultPlayer],
  civilizations: [defaultPlayer],
  specialIcons,
  currentEvent: defaultCard,
  eventQueue: [defaultCard],
  eventLog: [defaultEvent],
};
