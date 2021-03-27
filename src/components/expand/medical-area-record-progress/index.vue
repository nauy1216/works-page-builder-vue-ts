<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";
import { px2rem } from "shared/utils";
import oblongProgress from "../../base/oblong-progress/index.vue";

@Component({
  name: "RpMedicalAreaRecordProgress",
  components: { oblongProgress }
})
export default class RpMedicalAreaRecordProgress extends BaseVue<Record<string, any>> {
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
    //console.log("医疗-各地区病历数=组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-med-arearecord-progress" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <ul>
          {this.list?.map((item, index) => {
            return (
              <li key={index}>
                <oblongProgress
                  class="item-progre"
                  props={{
                    width: 160,
                    height: 10,
                    speed: item.speed,
                    isRight: true,
                    linearGradient: item.linearGradient
                  }}></oblongProgress>
                <p style={{ color: item.linearGradient[0] }}>{item.name}</p>
                <p>{item.value + item.unit}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(med-arearecord-progress) {
  box-sizing: border-box;
  overflow: hidden;
  .item-progre {
    width: 100% !important;
  }
  ul {
    width: 100%;
    li {
      margin-bottom: 10px;
      color: #cef5f2ff;
      font-size: 12px;
      p {
        text-align: right;
        line-height: 30px;
      }
    }
  }
}
</style>
