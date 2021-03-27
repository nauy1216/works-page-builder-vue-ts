<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";
import { px2rem } from "shared/utils";
import oblongProgress from "../../base/oblong-progress/index.vue";

@Component({
  name: "RpMedicalCustomerAnalysis",
  components: { oblongProgress }
})
export default class RpMedicalCustomerAnalysis extends BaseVue<Record<string, any>> {
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
    //console.log("医疗-客户分析-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-med-customer-analysis" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <ul>
          {this.list?.map((item, index) => {
            return (
              <li key={index}>
                <div class="item-wrap">
                  <div class="item-title">{item.name}</div>
                  <oblongProgress
                    class="item-progre"
                    props={{
                      width: 160,
                      height: 10,
                      speed: item.speed,
                      isRight: false,
                      linearGradient: ["rgb(215, 1, 125)", "rgb(3, 153, 210)"]
                    }}></oblongProgress>
                  <div class="item-val">{item.value + item.unit}</div>
                </div>
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
@include b(med-customer-analysis) {
  box-sizing: border-box;
  overflow: hidden;
  .rp-key-value-box {
    margin-left: 10px;
  }
  ul {
    width: 100%;
    li {
      margin-bottom: 30px;
      color: #cef5f2ff;
      font-size: 12px;
      .item-wrap {
        display: flex;
        .item-title {
          flex: 70;
        }
        .item-progre {
          flex: 190;
          margin: 0 10px;
        }
        .item-val {
          flex: 100;
        }
      }
    }
  }
}
</style>
