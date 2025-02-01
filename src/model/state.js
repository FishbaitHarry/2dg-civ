import { barbarianOpponent, nomadOpponent } from "./opponents.js";
import { playerHand, eventQueue } from "./setupEvents.js";

// Set up starting state for simple game.
const humanPlayer = {
  displayName: 'Player',
  hand: playerHand,
};
export const startingState = {
  playerHand,
  opponents: [barbarianOpponent, nomadOpponent],
  civilizations: [humanPlayer, barbarianOpponent, nomadOpponent],
  specialIcons: {},
  currentEvent: eventQueue.shift(),
  eventQueue,
  eventLog: [],
};
