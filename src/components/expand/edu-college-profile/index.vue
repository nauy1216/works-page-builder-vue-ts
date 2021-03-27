<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";
import keyValueBox from "../../base/key-value-box/index.vue";
import { px2rem } from "shared/utils";

@Component({
  name: "RpEduCollegeProfile",
  components: { keyValueBox }
})
export default class RpEduCollegeProfile extends BaseVue<Record<string, any>> {
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
    //console.log("学院概况-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-edu-clollege-profile" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        {this.list?.map((item, index) => {
          return (
            <keyValueBox
              key={index}
              props={{
                width: 460,
                height: 50,
                title: item.title,
                unit: item.unit,
                isBanner: true,
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
@include b(edu-clollege-profile) {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  .rp-key-value-box {
    //float: left;
    flex: 1;
    margin-right: 10px;
    &:nth-child(2) {
      margin-right: 30px;
    }
  }
}
</style>
