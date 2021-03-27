<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";
import keyValueBox from "../../base/key-value-box/index.vue";
import { px2rem } from "shared/utils";

@Component({
  name: "RpEduTeachersCount",
  components: { keyValueBox }
})
export default class RpEduTeachersCount extends BaseVue<Record<string, any>> {
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
    //console.log("师资-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-edu-teachers-count" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <div class="rp-green-box">师资</div>
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
@include b(edu-teachers-count) {
  box-sizing: border-box;
  overflow: hidden;
  > div {
    float: left;
  }
  .rp-key-value-box {
    margin-right: 10px;
  }
  .rp-green-box {
    width: 60px;
    height: 50px;
    margin-right: 20px;
    text-align: center;
    line-height: 50px;
    border: 1px solid #2d9b7ed9;
    color: #fff;
  }
}
</style>
