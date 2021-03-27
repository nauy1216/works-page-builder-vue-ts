<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";
import RpCircleRing from "components/charts/circle-ring/index.vue";
@Component({
  name: "RpCircleCombination",
  components: {
    RpCircleRing
  }
})
export default class RpCircleCombination extends BaseVue {
  render() {
    return (
      <div class="rp-circle-wrapper">
        <div class="rp-circle-wrapper__container">
          <rp-circle-ring width={500} height={500} bottomFontSize={this.width / 10}></rp-circle-ring>
        </div>
        <div class="rp-circle-wrapper__container">
          <rp-circle-ring strokeColor="rgb(196,71,78)" width={500} height={500} bottomFontSize={this.width / 10}></rp-circle-ring>
        </div>
      </div>
    );
  }
}
</script>
<style lang="scss">
@include b(circle-wrapper) {
  position: relative;
  @include e(container) {
    display: inline-block;
    width: 50%;
  }
}
</style>
