import { createApp, shallowRef, ref, triggerRef, inject, computed, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { reduceState } from './reducer.js';


const RootAppComponent = {
  setup() {
    const state = inject('state');
    function rerender() { triggerRef(state); }
    function acceptAction(evt) {
      console.log('received action event:', evt)
      if (evt.type != 'playCard') throw 'Invalid event type.';
      const action = { type:'playCard', playedCardIndex: evt.detail }
      const newState = reduceState(state.value, action);
      console.log('newState:', newState);
      state.value = newState;
    }
    return { state, rerender, acceptAction };
  },
  mounted() {
    console.log(this.state)
  },
  template: `
    <div class="root-component" @playCard="acceptAction">
      <EventLogFeed :eventLog="state.eventLog" />
      <div class="root-overview-panel">
        <CivilizationList :state="state" />
        <ActionPreview :state="state" />
      </div>
    </div>
  `,
}
const app = createApp(RootAppComponent);

app.component('EventLogFeed', {
  props: ['eventLog'],
  template: `
    <div class="event-log-feed">
      <template v-for="item in eventLog">
        <div class="event-row">{{ item.description }}</div>
      </template>
    </div>
  `
});
app.component('ActionPreview', {
  props: ['state'],
  template: `
    <div class="action-preview">
      <div class="action-description">Currently contested advantage:</div>
      <ExpandableCard :card="state.currentEvent" />
    </div>
  `
});
app.component('CivilizationList', {
  props: ['state'],
  template: `
    <div class="civ-list">
      <template v-for="(item, index) in state.civilizations" :key="item.displayName">
        <CivilizationSummary :civ="item" :active="index == 0" />
      </template>
    </div>
  `
});
app.component('CivilizationSummary', {
  props: ['civ', 'active'],
  template: `
    <div class="civ-summary">
      <header>{{ civ.displayName }}</header>
      <div class="card-row expandable">
        <template v-for="(item, index) in civ.hand">
          <ExpandableCard :card="item" :enabled="active" :clickIndex="index" />
        </template>
      </div>
    </div>
  `
});
app.component('ExpandableCard', {
  setup(props, ctx) {
    function onClick(evt) {
      console.log('player clicks card:', props.clickIndex);
      const event = new CustomEvent('playCard', { detail:props.clickIndex, bubbles:true });
      if (props.enabled) evt.target.dispatchEvent(event);
    }
    return { onClick };
  },
  props: ['card', 'enabled', 'clickIndex'],
  emits: ['playCard'],
  template: `
    <div :class="{[card.type]:true, 'exp-card':true, 'enabled':enabled}" @click="onClick">
      <span class="card-strength">{{ card.strength }}</span>
      <header class="card-name lg-show">{{ card.name }}</header>
      <span class="card-description lg-show">{{ card.description }}</span>
    </div>
  `
});


export function render(rootEl, state) {
  // following line makes `this.state` available in all component instances
  const stateRef = shallowRef(state);
  // app.config.globalProperties.state = stateRef;
  app.provide('state', stateRef);
  // hook it up!
  app.mount(rootEl)
  // return a refresh hook
  function rerender() { triggerRef(stateRef); }
  return rerender;
}
