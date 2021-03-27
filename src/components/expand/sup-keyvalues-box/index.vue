<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import keyValueBox from "../../base/key-value-box/index.vue";
import { px2rem } from "shared/utils";

@Component({
  name: "RpSupKeyvaluesBox",
  components: { keyValueBox }
})
export default class RpSupKeyvaluesBox extends BaseVue<Record<string, any>> {
  @Prop({
    type: Array
  })
  linearGradient!: string[];

  get list() {
    return this.componentData?.list || [];
  }
  get slideWidth() {
    return this.width;
  }

  get slideHeight() {
    return this.height;
  }

  get setLinearGradient() {
    return this.linearGradient;
  }

  mounted() {
    //console.log("towbox-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-distribution-serve" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        {this.list?.map((item, index) => {
          return (
            <keyValueBox
              key={index}
              props={{
                width: 460,
                height: 50,
                title: item.title,
                unit: item.unit,
                isBanner: false,
                linearGradient: this.setLinearGradient,
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
@include b(distribution-serve) {
  box-sizing: border-box;
  .rp-key-value-box {
    margin-bottom: 30px;
  }
}
</style>
