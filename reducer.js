import { RED, GREEN, BLUE, colors, counterColors } from "./basics";
import { playerHand, eventQueue } from "./setupEvents";
import { barbarianOpponent, nomadOpponent } from "./opponents";

const defaultState = {
  playerHand,
  opponents: [barbarianOpponent, nomadOpponent],
  currentEvent: eventQueue.shift(),
  eventQueue,
};
const defaultAction = {
  playedCardIndex: 0,
};

function reduceState(state=defaultState, action=defaultAction) {
  const cardPlayed = state.playerHand[action.playedCardIndex];
  const cardPool = state.opponents
    .map( opp => opp.getMove(state, opp.hand) )
    .concat([cardPlayed, state.currentEvent])
    .sort( (a,b) => b.strength - a.strength);
  const byColor = {
    [RED]: cardPool.filter( c => c.color == RED ),
    [BLUE]: cardPool.filter( c => c.color == BLUE ),
    [GREEN]: cardPool.filter( c => c.color == GREEN ),
  };
  const prizes = {
    [RED]: cardPool.filter( c => c.color == RED ),
    [BLUE]: cardPool.filter( c => c.color == BLUE ),
    [GREEN]: cardPool.filter( c => c.color == GREEN ),
  };

  return {
    playerHand,
    opponents: [barbarianOpponent, nomadOpponent],
    currentEvent: eventQueue.shift(),
    eventQueue,
  }
}