import { createApp, shallowRef, ref, triggerRef, inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { reduceState } from '../model/reducer.js';

import colorsReminder from './colors-reminder.js';
import expandableCard from './expandable-card.js';
import roundLog from './round-log.js';
import civSummary from './civ-summary.js';

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
      <ColorsReminder />
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
  updated() {
    const container = this.$refs['scrollable'];
    const offset = container.scrollHeight;
    container.scrollTo({top: offset, behavior:'smooth'});
  },
  template: `
    <div class="event-log-feed" ref="scrollable">
      <template v-for="item in eventLog">
        <div class="event-row" v-if="!item.playMap">{{ item.description }}</div>
        <RoundLog v-if="item.playMap" :item="item"/>
      </template>
    </div>
  `
});

app.component('ActionPreview', {
  props: ['state'],
  template: `
    <div class="action-preview">
      <div class="action-description">Currently contested advantage:</div>
      <ExpandableCard :card="state.currentEvent" :expanded="true" />
    </div>
  `
});
app.component('CivilizationList', {
  props: ['state'],
  template: `
    <div class="civ-list">
      <template v-for="(item, index) in state.civilizations" :key="item.displayName">
        <CivSummary :civ="item" :active="index == 0" :special="state.specialIcons" />
      </template>
    </div>
  `
});
app.component('CivSummary', civSummary);
app.component('ExpandableCard', expandableCard);
app.component('ColorsReminder', colorsReminder);
app.component('RoundLog', roundLog);
app.component('CivPortrait', {
  props: ['civ'],
  template: `<img :src="civ.portrait" class="civ-portrait exp-circle" :label="civ.displayName" />`
});
app.component('StatusIcon', {
  props: ['name'],
  template: `<img :src="'img/' + name + '.png'" class="status-icon" :label="name" />`
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
