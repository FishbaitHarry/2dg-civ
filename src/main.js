import { reduceState } from "./model/reducer.js";
import { render } from "./render/render.js";
import { startingState } from "./model/state.js";

const rootEl = document.getElementById('app');
render(rootEl, startingState);
