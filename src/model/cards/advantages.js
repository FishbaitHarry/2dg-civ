import { eventQueue } from "./setupEvents.js";
import { defaultState, defaultCard, GREEN, RED, BLUE } from "../basics.js";

export function getNextAdvantage(state = defaultState) {
  if (eventQueue.length > 0) {
    return eventQueue.shift();
  }

  const { turnNumber } = state;
  const newCardStrength = Math.floor(turnNumber/3);
  // generate fake events and push them
  const rand = Math.floor(Math.random()*6);
  eventQueue.push({
    ...defaultCard,
    type: [RED,RED,BLUE,BLUE,GREEN,GREEN][rand],
    strength: turnNumber*3,
  });
  eventQueue.push({
    ...defaultCard,
    type: [BLUE,GREEN,RED,GREEN,RED,BLUE][rand],
    strength: turnNumber*3,
  });
  eventQueue.push({
    ...defaultCard,
    type: [GREEN,BLUE,GREEN,RED,BLUE,RED][rand],
    strength: turnNumber*3,
  });
  console.log('mixing result: ', eventQueue);
  return eventQueue.shift();
}
