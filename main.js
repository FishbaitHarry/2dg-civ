import { defaultState, reduceState } from "./reducer.js";
import { render } from "./render.js";

const rootEl = document.getElementById('app');
render(rootEl, defaultState);
console.log('main.js STARTED')

// for debug
window.gameState = defaultState;
window.gameReducer = reduceState;
