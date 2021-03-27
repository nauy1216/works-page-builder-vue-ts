<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { px2rem } from "shared/utils";
import oblongProgress from "../../base/oblong-progress/index.vue";

@Component({
  name: "RpHomeSupAndmedProgress",
  components: { oblongProgress }
})
export default class RpHomeSupAndmedProgress extends BaseVue<Record<string, any>> {
  @Prop({
    type: Boolean
  })
  isRight!: boolean;

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
    //console.log("首页集团-进度条-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-home-supAndmed-progress" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <ul class={this.isRight ? "right-warp" : "left-warp"}>
          {this.list?.map((item, index) => {
            return (
              <li key={index}>
                <oblongProgress
                  class="item-progre"
                  props={{
                    width: 160,
                    height: 10,
                    speed: item.speed,
                    isRight: this.isRight ? false : true,
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
@include b(home-supAndmed-progress) {
  position: relative;
  box-sizing: border-box;
  // overflow: hidden;
  .item-progre {
    width: 100% !important;
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      margin-bottom: 10px;
      font-size: 12px;
      p {
        color: #fff;
        line-height: 18px;
      }
    }
  }
  .left-warp {
    p {
      text-align: right;
    }
    li {
      &:nth-child(2) {
        transform: translateX(-12%);
      }
      &:nth-child(3) {
        transform: translateX(-20%);
      }
      &:nth-child(4) {
        transform: translateX(-24%);
      }
      &:nth-child(5) {
        transform: translateX(-26%);
      }
    }
  }
  .right-warp {
    p {
      text-align: left;
    }
    li {
      &:nth-child(2) {
        transform: translateX(12%);
      }
      &:nth-child(3) {
        transform: translateX(20%);
      }
      &:nth-child(4) {
        transform: translateX(24%);
      }
      &:nth-child(5) {
        transform: translateX(26%);
      }
    }
  }
}
</style>
