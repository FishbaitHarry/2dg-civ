import { defaultState, reduceState } from "./model/reducer.js";
import { render } from "./render/render.js";

const rootEl = document.getElementById('app');
render(rootEl, defaultState);
console.log('main.js STARTED')

// for debug
window.gameState = defaultState;
window.gameReducer = reduceState;
