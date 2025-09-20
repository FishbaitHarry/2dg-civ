export default {
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
}
