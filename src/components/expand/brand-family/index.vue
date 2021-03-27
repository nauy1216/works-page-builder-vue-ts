<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";

@Component({
  name: "RpBrandFamily"
})
export default class RpBrandFamily extends BaseVue {
  render() {
    return (
      <div class="rp-brand-family">
        <img src="/images/pin_pai_jia_zu.png"></img>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(brand-family) {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
