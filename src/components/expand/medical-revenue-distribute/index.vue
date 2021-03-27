<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";
import keyValueBox from "../../base/key-value-box/index.vue";
import { px2rem } from "shared/utils";

@Component({
  name: "RpMedicalRevenueDistribute",
  components: { keyValueBox }
})
export default class RpMedicalRevenueDistribute extends BaseVue<Record<string, any>> {
  get list() {
    return this.componentData?.list || [];
  }
  get slideWidth() {
    return this.width;
  }

  get slideHeight() {
    return this.height;
  }

  mounted() {
    //console.log("营收分布-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-med-revenue-distribute" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        {this.list?.map((item, index) => {
          return (
            <keyValueBox
              key={index}
              props={{
                width: 200,
                height: 30,
                title: item.name,
                unit: item.unit,
                isBanner: false,
                linearGradient: item.linearGradient,
                componentData: { value: item.value }
              }}></keyValueBox>
          );
        })}
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(med-revenue-distribute) {
  box-sizing: border-box;
  .rp-key-value-box {
    margin-bottom: 10px;
  }
}
</style>
