<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "RpSubTitle"
})
export default class RpSubTitle extends BaseVue {
  @Prop({
    type: Array
  })
  linearGradient!: string[];

  @Prop({
    type: String
  })
  text!: string;

  @Prop({
    type: String
  })
  textColor!: string;

  @Prop({
    type: Boolean
  })
  overturn!: boolean;
  get setLinearGradient() {
    return {
      background: `linear-gradient(to right, ${this.linearGradient[0]} 1%, ${this.linearGradient[1]} 35%`
    };
  }
  get setTextColor() {
    return {
      color: this.textColor
    };
  }
  get setIsOverturn() {
    return {
      transform: this.overturn ? "rotateY(180deg)" : ""
    };
  }
  get setTextPosition() {
    return {
      right: this.overturn ? `20px` : ""
    };
  }
  render() {
    return (
      <div class="rp-sub-wrapper">
        <div class="rp-sub-wrapper__title" style={this.setIsOverturn}>
          <div class="rp-sub-wrapper__block" style={this.setLinearGradient}></div>
        </div>
        <p style={this.setTextPosition}>
          <span style={this.setTextColor}>{this.text}</span>
        </p>
      </div>
    );
  }
}
</script>
<style lang="scss">
@include b(sub-wrapper) {
  width: 100%;
  height: 100%;
  position: relative;
  @include e(title) {
    width: 100%;
    height: 100%;
    filter: blur(5px);
    @include e(block) {
      width: 100%;
      color: #cef5f2;
      background: linear-gradient(to right, rgba(0, 43, 56, 0), rgba(0, 43, 56, 1));
      height: 100%;
      clip-path: polygon(0 10%, 0px 90%, calc(100% - 94px) 100%, 73% 0);
    }
  }
  p {
    white-space: nowrap;
    position: absolute;
    top: 50%;
    transform: translateY(-25%);
    padding-left: 20px;
    display: flex;
    font-size: 20px;
    height: 100%;
  }
}
</style>
