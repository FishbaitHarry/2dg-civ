import { createApp, shallowRef, ref, triggerRef, inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { reduceState } from '../model/reducer.js';


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
        <RoundPlayedCardsEvent v-if="item.playMap" :item="item"/>
      </template>
    </div>
  `
});
app.component('RoundPlayedCardsEvent', {
  props: ['item'],
  setup(props) {
    return {
      civs: props.item.playMap.keys(),
      cards: props.item.playMap.values(),
    }
  },
  template: `
    <span v-for="(civ, index) in civs">
      {{ civ.displayName }} played:
      <ExpandableCard :card="item.playMap.get(civ)">
        <CivPortrait :civ="civ" />
      </ExpandableCard>
    </span>
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
        <CivilizationSummary :civ="item" :active="index == 0" />
      </template>
    </div>
  `
});
app.component('CivilizationSummary', {
  props: ['civ', 'active'],
  template: `
    <div class="civ-summary">
      <header class="civ-name">{{ civ.displayName }}</header>
      <div class="card-row expandable">
        <CivPortrait :civ="civ" />
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
  props: ['card', 'enabled', 'clickIndex', 'expanded', 'modifier'],
  emits: ['playCard'],
  template: `
    <div :class="{[card.type]:true, 'exp-card':true, 'enabled':enabled, 'expanded':expanded}" @click="onClick">
      <span class="card-strength">{{ card.strength }}</span>
      <header class="card-name lg-show">{{ card.name }}</header>
      <span class="card-description lg-show">{{ card.description }}</span>
      <span class="mini-slot"><slot></slot></span>
    </div>
  `
});
app.component('ColorsReminder', {
  setup() {return {hidden: ref(false)}; },
  template: `
    <div class="colors-reminder" :class="{'hidden':hidden}" @click="hidden=true">
      <div><span class="red">RED</span>     takes <span class="green">GREEN</span></div>
      <div><span class="green">GREEN</span> takes <span class="blue">BLUE</span></div>
      <div><span class="blue">BLUE</span>   takes <span class="red">RED</span></div>
      <div>Click to close</div>
    </div>
  `
});
app.component('CivPortrait', {
  props: ['civ'],
  template: `<img :src="civ.portrait" class="civ-portrait exp-circle" :label="civ.displayName" />`
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
