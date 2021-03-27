<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { px2rem } from "shared/utils";

@Component({
  name: "RpKeyValueBox"
})
export default class RpKeyValueBox extends BaseVue<Record<string, any>> {
  @Prop({
    type: Array
  })
  linearGradient!: string[];

  @Prop({
    type: String
  })
  title!: string;

  @Prop({
    type: String
  })
  unit!: string;

  @Prop({
    type: Boolean
  })
  isBanner!: boolean;

  get slideWidth() {
    return this.setIsOverturn ? this.width / 2 : this.width;
  }

  get slideHeight() {
    return this.height;
  }

  get setLinearGradient() {
    return {
      background: `linear-gradient(to right, ${this.linearGradient[0]}, ${this.linearGradient[1]}`
    };
  }

  get setIsOverturn() {
    return this.isBanner;
  }

  mounted() {
    //console.log("keyvalu-base组件数据--", this.componentData);
  }

  render() {
    return (
      <div class="rp-key-value-box" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <div class="rp-key-value-box__key" style={{ flex: this.setIsOverturn ? 67.5 : 37.5 }}>
          <div class="key_back"></div>
          {this.title}
        </div>
        <div class="rp-key-value-box__nullbox"></div>
        <div class="rp-key-value-box__value" style={{ flex: this.setIsOverturn ? 25.5 : 57.5 }}>
          <div class="value_back" style={this.setLinearGradient}></div>
          <span>{this.componentData.value + " " + this.unit}</span>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(key-value-box) {
  box-sizing: border-box;
  position: relative;
  display: flex;
  overflow: hidden;
  border-left: 1px solid #979797;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  @include e(key) {
    position: relative;
    flex: 37.5;
    height: 100%;
    color: #cef5f2;
    text-align: center;
    box-sizing: border-box;
    white-space: nowrap;
    //overflow: hidden;
    text-overflow: ellipsis;
    .key_back {
      box-sizing: border-box;
      position: absolute;
      left: -20%;
      top: 0;
      z-index: -1;
      width: 120%;
      height: 100%;
      transform: skewX(27deg);
      border: 1px solid #979797;
      border-left: none;
      border-right: none;
    }
  }
  @include e(nullbox) {
    flex: 5;
    height: 100%;
    transform: skewX(27deg);
    box-sizing: border-box;
    border: 1px solid #979797;
    background-color: #050f18;
    border-color: transparent #979797 transparent #979797;
    z-index: 3;
  }
  @include e(value) {
    position: relative;
    flex: 57.5;
    height: 100%;
    color: #cef5f2;
    text-align: center;
    box-sizing: border-box;
    border-left: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    .value_back {
      position: absolute;
      left: 0;
      top: 0;
      width: 120%;
      height: 100%;
      transform: skewX(27deg);
    }
    span {
      z-index: 1;
    }
  }
}
</style>
