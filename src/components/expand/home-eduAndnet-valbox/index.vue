<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { px2rem } from "shared/utils";

@Component({
  name: "RpHomeEduAndnetValbox"
})
export default class RpHomeEduAndnetValbox extends BaseVue<Record<string, any>> {
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

  get background() {
    let arr: string[] = [];
    if (this.isRight) {
      arr = ["linear-gradient(-71deg, transparent 16px, rgb(29, 85, 92) 0px)", "linear-gradient(-71deg, transparent 16px, rgb(68, 22, 51) 0px)"];
    } else {
      arr = ["linear-gradient(71deg, transparent 16px, rgb(68, 22, 51) 0px)", "linear-gradient(71deg, transparent 16px, rgb(29, 85, 92) 0px)"];
    }
    return arr;
  }

  mounted() {
    //console.log("首页集团-数值盒子-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-home-eduAndnet-valbox" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <ul class={this.isRight ? "right-warp" : "left-warp"}>
          {this.list?.map((item, index) => {
            return (
              <li key={index}>
                {item.data.map((item_i, index_i) => {
                  return (
                    <div key={index_i}>
                      <p>{item_i.name}</p>
                      <div style={{ background: this.background[index_i] }}>{item_i.value + item_i.unit}</div>
                    </div>
                  );
                })}
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
@include b(home-eduAndnet-valbox) {
  position: relative;
  box-sizing: border-box;
  // overflow: hidden;
  ul {
    width: 100%;
    li {
      width: 100%;
      margin-bottom: 20px;
      font-size: 12px;
      color: #fff;
      p {
        line-height: 14px;
      }
      > div {
        display: inline-block;
        > div {
          box-sizing: border-box;
          margin-right: 14px;
          min-width: 80px;
          padding: 0 10px;
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }
  .left-warp {
    li {
      &:nth-child(2) {
        transform: translateX(12%);
      }
      &:nth-child(3) {
        transform: translateX(20%);
      }
    }
  }
  .right-warp {
    li {
      &:nth-child(2) {
        transform: translateX(-12%);
      }
      &:nth-child(3) {
        transform: translateX(-20%);
      }
    }
  }
}
</style>
