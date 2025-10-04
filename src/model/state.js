import { barbarianOpponent, nomadOpponent } from "./opponents.js";
import { playerHand, eventQueue } from "./cards/setupEvents.js";
import { specialIcons } from "./basics.js";

// Set up starting state for simple game.
const humanPlayer = {
  displayName: 'Player',
  portrait: 'img/player.png',
  hand: playerHand,
};
export const startingState = {
  turnNumber: 0,
  playerHand,
  opponents: [barbarianOpponent, nomadOpponent],
  civilizations: [humanPlayer, barbarianOpponent, nomadOpponent],
  specialIcons: specialIcons,
  currentEvent: eventQueue.shift(),
  eventQueue,
  eventLog: [],
};
