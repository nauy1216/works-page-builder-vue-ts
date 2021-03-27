<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";
import { px2rem } from "shared/utils";
import oblongProgress from "../../base/oblong-progress/index.vue";

@Component({
  name: "RpMedicalSaleProgress",
  components: { oblongProgress }
})
export default class RpMedicalSaleProgress extends BaseVue<Record<string, any>> {
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
    //console.log("医疗-销售数据-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-med-sale-progress" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <ul>
          {this.list?.map((item, index) => {
            return (
              <li key={index}>
                <p>{item.value + item.unit}</p>
                <div class="item-wrap">
                  <div class="item-title">{item.name}</div>
                  <oblongProgress
                    class="item-progre"
                    props={{
                      width: 160,
                      height: 10,
                      speed: item.speed,
                      isRight: false,
                      linearGradient: ["rgb(0, 130, 244)", "rgb(224, 83, 89)"]
                    }}></oblongProgress>
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
@include b(med-sale-progress) {
  box-sizing: border-box;
  overflow: hidden;
  .rp-key-value-box {
    margin-left: 10px;
  }
  ul {
    width: 100%;
    li {
      margin-bottom: 10px;
      color: #cef5f2ff;
      font-size: 12px;
      p {
        text-align: right;
        margin-bottom: 5px;
      }
      .item-wrap {
        display: flex;
        .item-title {
          flex: 73;
        }
        .item-progre {
          flex: 300;
        }
      }
    }
  }
}
</style>
