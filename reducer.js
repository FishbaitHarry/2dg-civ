import { RED, GREEN, BLUE, colors, counterColors } from "./basics.js";
import { playerHand, eventQueue } from "./setupEvents.js";
import { barbarianOpponent, nomadOpponent } from "./opponents.js";

const defaultPlayer = {
  displayName: 'Player',
  hand: playerHand,
};
export const defaultState = {
  playerHand,
  opponents: [barbarianOpponent, nomadOpponent],
  civilizations: [defaultPlayer, barbarianOpponent, nomadOpponent],
  currentEvent: eventQueue.shift(),
  eventQueue,
  eventLog: [],
};
const defaultAction = {
  playedCardIndex: 0,
};
const defaultEvent = {
  type: 'plain',
  description: 'Human readable',
  card: null,
};

export function reduceState(state=defaultState, action=defaultAction) {
  const newEvents = [{ description: "New round" }];
  const playerCiv = state.civilizations[0]; // human player
  const playMap = new Map(); // maps civs to played cards
  playMap.set(playerCiv, state.playerHand[action.playedCardIndex]);
  state.opponents.forEach( opp => playMap.set(opp, opp.getMove(state, opp.hand) ) );
  const allPlayed = Array.from(playMap.values()).sort( (a,b) => b.strength - a.strength);

  newEvents.push({ description: `Played cards: ${allPlayed.map(c=>c.name).join(', ')}.` });

  const byColorPlayed = {
    [RED]: allPlayed.filter( c => c.type == RED ),
    [BLUE]: allPlayed.filter( c => c.type == BLUE ),
    [GREEN]: allPlayed.filter( c => c.type == GREEN ),
  };

  const winners = [
    byColorPlayed[RED][0],
    byColorPlayed[BLUE][0],
    byColorPlayed[GREEN][0],
  ].filter( e => !!e );

  let losses = [];
  if (byColorPlayed[RED].length) losses = losses.concat(byColorPlayed[GREEN]);
  if (byColorPlayed[BLUE].length) losses = losses.concat(byColorPlayed[RED]);
  if (byColorPlayed[GREEN].length) losses = losses.concat(byColorPlayed[BLUE]);

  // these will be given out, strongest of each color
  const allPrizes = [state.currentEvent].concat(allPlayed).sort( (a,b) => b.strength - a.strength);
  const prizes = {
    [RED]: allPrizes.find( c => c.type == RED),
    [BLUE]: allPrizes.find( c => c.type == BLUE),
    [GREEN]: allPrizes.find( c => c.type == GREEN),
  };
  const destroyed = []; // TODO: all except the prizes cards are destroyed as they are weak

  // allPlayed has the same indexes, so index is player's id for this round
  const newCivs = state.civilizations
    .map( (civ, i) => {
      const playedCard = playMap.get(civ);
      let newHand = civ.hand.filter( c => !losses.includes(c) );
      if (winners.includes(playedCard)) {
        if (playedCard.type == RED) newHand.push(prizes[GREEN]);
        if (playedCard.type == BLUE) newHand.push(prizes[RED]);
        if (playedCard.type == GREEN) newHand.push(prizes[BLUE]);
      }
      newHand = newHand.filter( c => c != undefined );
      return { ...civ, hand: newHand };
    })
    .filter( civ => civ.hand.length );

  if (newCivs[0].displayName != 'Player') {
    newEvents.push({ description: "You lost the game." });
  }

  const newTopCard = eventQueue.shift();

  return {
    playerHand: newCivs[0].hand,
    opponents: newCivs.slice(1),
    civilizations: newCivs,
    currentEvent: newTopCard,
    eventQueue,
    eventLog: state.eventLog.concat(newEvents),
  }
}
