import { RED, GREEN, BLUE, colors, counterColors } from "./basics.js";
import { defaultState, defaultAction } from "./basics.js";
import { getNextAdvantage } from "./cards/advantages.js";
import { getNewCivs } from "./civs/index.js";

export function reduceState(state=defaultState, action=defaultAction) {
  const newEvents = [{ description: "New round" }];
  const playerCiv = state.civilizations[0]; // human player
  const playMap = new Map(); // maps civs to played cards
  const playersCard =  state.playerHand[action.playedCardIndex];
  playMap.set(playerCiv, state.playerHand[action.playedCardIndex]);
  state.opponents.forEach( opp => playMap.set(opp, opp.getMove(state, opp.hand) ) );
  const allPlayed = Array.from(playMap.values()).sort( (a,b) => b.strength - a.strength);

  newEvents.push({
    type: 'roundPlayedCards',
    description: `Played cards: ${allPlayed.map(c=>c.name).join(', ')}.`,
    cards: allPlayed,
    playMap: playMap,
  });

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
  
  if (losses.includes(playersCard)) newEvents.push({
    type: 'roundLostCard',
    description: `You lost your played card.`,
    card: playersCard,
  });

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
      newHand = newHand.filter( c => c != undefined ).sort(cardComparison);
      return { ...civ, hand: newHand };
    })
    .filter( civ => civ.hand.length );

  getNewCivs(state).forEach( civ => {
    newEvents.push({ description: `New civilization of ${civ.displayName} has joined the struggle.` });
    newCivs.push(civ);
  });
  if (newCivs[0].displayName != 'Player') {
    newEvents.push({ description: "You lost the game." });
  }

  const newTopCard = getNextAdvantage(state);

  return {
    turnNumber: state.turnNumber + 1,
    playerHand: newCivs[0].hand,
    opponents: newCivs.slice(1),
    civilizations: newCivs,
    currentEvent: newTopCard,
    eventQueue: state.eventQueue,
    eventLog: state.eventLog.concat(newEvents),
  }
}

// for sorting cards in hand
function cardComparison(a, b) {
  if (a.type == b.type) return a.strength - b.strength;
  return (b.type == RED)*2 + (b.type == GREEN)*1 - (a.type == RED)*2 - (a.type == GREEN)*1;
}
