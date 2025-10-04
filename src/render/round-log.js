export default {
  setup(props) {
    return {
      civs: props.item.playMap.keys(),
      cards: props.item.playMap.values(),
    }
  },
  props: ['item'],
  template: `
    <span v-for="(civ, index) in civs">
      <span class="label" hidden> {{ civ.displayName }} played:</span>
      <ExpandableCard :card="item.playMap.get(civ)">
        <CivPortrait :civ="civ" />
      </ExpandableCard>
    </span>
  `
}
