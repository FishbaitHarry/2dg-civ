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
  const playerPlayed = state.playerHand[action.playedCardIndex];
  const oppPlayed = state.opponents.map( opp => opp.getMove(state, opp.hand) );
  const allPlayed = [playerPlayed].concat(oppPlayed);
  const sorted = allPlayed.sort( (a,b) => b.strength - a.strength);
    
  // cards in pool, sorted
  const byColor = {
    [RED]: sorted.filter( c => c.color == RED ),
    [BLUE]: sorted.filter( c => c.color == BLUE ),
    [GREEN]: sorted.filter( c => c.color == GREEN ),
  };

  const winners = [
    byColor[RED][0],
    byColor[BLUE][0],
    byColor[GREEN][0],
  ].filter( e => !!e );

  const losses = [];
  if (byColor[RED].length) losses = losses.concat(byColor[GREEN]);
  if (byColor[BLUE].length) losses = losses.concat(byColor[RED]);
  if (byColor[GREEN].length) losses = losses.concat(byColor[BLUE]);

  // these will be given out
  const prizes = {
    [RED]: byColor[RED][0],
    [BLUE]: byColor[BLUE][0],
    [GREEN]: byColor[GREEN][0],
  };

  // new player states
  const humanPlayer = { hand: state.playerHand };
  const civs = [humanPlayer].concat(state.opponents);
  // allPlayed has the same indexes, so index is player's id for this round

  civs.forEach( (civ, i) => {
    const hasWon = [];
    if (winners[RED] == allPlayed[i]) hasWon.push(prizes[GREEN]);
    if (winners[BLUE] == allPlayed[i]) hasWon.push(prizes[RED]);
    if (winners[GREEN] == allPlayed[i]) hasWon.push(prizes[BLUE]);
    civ.hand = civ.hand.filter( c => !losses.includes(c) ).concat(hasWon);
  });

  if (civs[0].hand.length == 0) {
    // you lost the game
  }
  // remove defeated opponents
  const newOpps = civs.slice(1).filter( civ => civ.hand.length );

  return {
    playerHand,
    opponents: newOpps,
    currentEvent: eventQueue.shift(),
    eventQueue,
  }
}
