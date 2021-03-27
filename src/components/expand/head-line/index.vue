<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "RpHeadLine"
})
export default class RpHeadLine extends BaseVue {
  @Prop({
    type: Array
  })
  linearGradient!: string[];

  @Prop({
    type: String
  })
  text!: string;

  @Prop({
    type: Boolean
  })
  overturn!: boolean;

  @Prop({
    type: String
  })
  textColor!: string;

  get setLinearGradient() {
    return {
      background: `linear-gradient(to right, ${this.linearGradient[0]}, ${this.linearGradient[1]}`
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
  render() {
    return (
      <div class="rp-head-line" style={this.setIsOverturn}>
        <div class="rp-head-line__block" style={this.setLinearGradient}>
          <p style={this.setTextColor}>
            <span
              style={{
                transform: this.overturn ? "rotateY(180deg)" : ""
              }}>
              {this.text}
            </span>
          </p>
        </div>
        <div class="rp-head-line__decorate"></div>
      </div>
    );
  }
}
</script>
<style lang="scss">
$decorateUrl: "/images/headline-decorate.png";
@include b(head-line) {
  width: 100%;
  height: 100%;
  @include e(block) {
    color: #cef5f2;
    // background: linear-gradient(to right, rgba(0, 43, 56, 0), rgba(0, 43, 56, 1));
    height: 100%;
    // -webkit-clip-path: polygon(0 0, 0 82%, calc(100% - 94px) 82%, 96% 0);
    clip-path: polygon(0 0, 0px 82%, calc(100% - 54px) 82%, 96% 0);
    p {
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      height: 82%;
    }
  }
  @include e(decorate) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 10px;
    background: url($decorateUrl) no-repeat 25px center;
    background-size: 93% 100%;
  }
}
</style>
