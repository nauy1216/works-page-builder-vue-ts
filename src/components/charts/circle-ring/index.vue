<script lang="tsx">
import BaseVue from "components/BaseVue";
import { px2rem } from "shared/utils";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component({
  name: "RpCircleRing"
})
export default class RpCircleRing extends BaseVue {
  dashboard = false;
  @Prop({
    type: [String, Number],
    default: 50
  })
  percent!: number | string;

  // 外侧圆环线宽
  @Prop({
    type: [String, Number],
    default: 6
  })
  strokeWidth!: number | string;

  // 填充色
  @Prop({
    type: String,
    default: "#1991C1"
  })
  strokeColor!: string;

  // 外侧底环颜色
  @Prop({
    type: String,
    default: "#E6E6E6"
  })
  trailColor!: string;

  // 外侧底环大小
  @Prop({
    type: [String, Number],
    default: 5
  })
  trailWidth!: number | string;

  // 模拟文字
  @Prop({
    type: String,
    default: "4.6亿"
  })
  centerText!: number | string;

  @Prop({
    type: Number,
    default: 30
  })
  bottomFontSize!: number;

  @Watch("width")
  resize(newValue) {
    return {
      width: `${newValue}%`,
      height: `${newValue * 3}%`
    };
  }
  get radius() {
    return 50 - parseInt(this.strokeWidth.toString()) / 2;
  }
  get pathString() {
    if (this.dashboard) {
      return `M 50,50 m 0,${this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}`;
    } else {
      return `M 50,50 m 0,-${this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`;
    }
  }
  get len(): number {
    return Math.PI * 2 * this.radius;
  }

  get trailStyle() {
    let style = {};
    if (this.dashboard) {
      style = {
        "stroke-dasharray": `${(this.len as any) - 75}% ${this.len}%`,
        "stroke-dashoffset": `-${75 / 2}%`,
        transition: "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s"
      };
    }
    return style;
  }
  get bottomInsideCircle() {
    const radius = this.radius - this.radius * 0.035;
    return `M 50,50 m 0,${radius}
        a ${radius},${radius} 0 1 1 0,-${2 * radius}
        a ${radius},${radius} 0 1 1 0,${2 * radius}`;
  }
  get computedStrokeWidth() {
    return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth;
  }

  get pathStyle() {
    let style = {};
    if (this.dashboard) {
      style = {
        "stroke-dasharray": `${((this.percent as number) / 100) * (this.len - 75)}% ${this.len}%`,
        "stroke-dashoffset": `-${75 / 2}%`,
        transition: "stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s"
      };
    } else {
      style = {
        "stroke-dasharray": `${this.len}px ${this.len}%`,
        "stroke-dashoffset": `${((100 - (this.percent as number)) / 100) * this.len}%`,
        transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
      };
    }
    return style;
  }
  get circleFontSize() {
    return {
      color: this.strokeColor,
      "font-size": px2rem(this.bottomFontSize)
    };
  }

  render() {
    return (
      <div style={this.resize} id="circleTrapper">
        <svg viewBox="0 0 100 120">
          <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" fill={this.strokeColor}>
            {this.centerText}
          </text>
          {/**底侧外圆环 */}
          <path d={this.pathString} stroke={this.trailColor} stroke-width={this.trailWidth} fill-opacity="0" style={this.trailStyle} />

          <path d={this.bottomInsideCircle} stroke="#0a2B48" stroke-width="3" fill-opacity="0" style={this.trailStyle} />
          <path d={this.pathString} stroke-linecap="round" stroke={this.strokeColor} stroke-width={this.computedStrokeWidth} fill-opacity="0" style={this.pathStyle} />
        </svg>
        <div style={this.circleFontSize} class="circleText">
          总订单数
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss">
#circleTrapper {
  position: relative;
}
.circleText {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -20%;
  // left: 50%;
  // transform: translate(-50%, -50%);
}
</style>
