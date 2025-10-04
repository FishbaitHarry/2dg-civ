export default {
  props: ['civ', 'active', 'special'],
  template: `
    <div class="civ-summary">
      <header class="civ-name">{{ civ.displayName }}</header>
      <div class="card-row expandable">
        <CivPortrait :civ="civ" />
        <template v-for="(item, index) in civ.hand">
          <ExpandableCard :card="item" :enabled="active" :clickIndex="index">
            <StatusIcon v-if="special.hasBeenGained[0] == item" name="gain" />
            <StatusIcon v-if="special.hasBeenLost[0] == item" name="loss" />
          </ExpandableCard>
        </template>
      </div>
    </div>
  `
}
