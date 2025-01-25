import { createApp, shallowRef, ref, triggerRef, inject, computed, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


const RootAppComponent = {
  setup() {
    const state = inject('state');
    function rerender() { triggerRef(state); }
    return { state, rerender };
  },
  mounted() {
    console.log(this.state)
  },
  template: `
    <div @click="rerender">
      <CivilizationList :state="state" />
      <EventLogFeed :eventLog="state.eventLog" />
    </div>
  `,
}
const app = createApp(RootAppComponent);

app.component('EventLogFeed', {
  props: ['log'],
  template: `
    <template v-for="item in log">
      <div>{{ item.description }}</div>
    </template>
  `
});
app.component('CivilizationList', {
  props: ['state'],
  template: `
    <div>
      <template v-for="item in state.civilizations" :key="item.displayName">
        <CivilizationSummary :civ="item" />
      </template>
    </div>
  `
});
app.component('CivilizationSummary', {
  props: ['civ'],
  template: `
    <div>
      <header>{{ civ.displayName }}</header>
      <div class="card-row expandable">
        <template v-for="item in civ.hand">
          <ExpandableCard :card="item" />
        </template>
      </div>
    </div>
  `
});
app.component('ExpandableCard', {
  props: ['card'],
  template: `
    <div :class="card.type">
      <header class="card-name lg-show">{{ card.name }}</header>
      <span class="card-strength">{{ card.strength }}</span>
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
