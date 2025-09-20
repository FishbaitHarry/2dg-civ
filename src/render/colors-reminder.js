import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export default {
  setup() {
    return { hidden: ref(false) };
  },
  template: `
    <div class="colors-reminder" :class="{'hidden':hidden}" @click="hidden=true">
      <div><span class="red">RED</span>     takes <span class="green">GREEN</span></div>
      <div><span class="green">GREEN</span> takes <span class="blue">BLUE</span></div>
      <div><span class="blue">BLUE</span>   takes <span class="red">RED</span></div>
      <div>Click to close</div>
    </div>
  `
}
