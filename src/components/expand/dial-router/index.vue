<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";
import { px2rem } from "shared/utils";
@Component({
  name: "RpDialRouter"
})
export default class RpDialRouter extends BaseVue {
  // 半径,
  r!: number;
  // 起始角度
  initDeg = 240;
  // 自增角度
  autoDeg = 24;
  // 路由数组
  dialActions: Array<string> = [
    "医疗集团",
    "互联网集团",
    "主页",
    "供应链集团",
    "教育集团",
    "医疗集团",
    "互联网集团",
    "主页",
    "供应链集团",
    "教育集团",
    "医疗集团",
    "互联网集团",
    "主页",
    "供应链集团",
    "教育集团"
  ];
  // 中心X
  centerX = -20;
  // 中心Y
  centerY!: number;
  mounted() {
    this.r = this.width / 2;
    this.centerY = this.height / 2 - 30;
    this.positionNode();
  }
  positionNode() {
    this.$nextTick(() => {
      (this.$refs.routeLink as Array<HTMLElement>).map(v => {
        this.computePosition(v);
      });
    });
  }
  // 计算位置
  computePosition(node: HTMLElement) {
    const radianCoefficient = Math.PI / 180;
    const { centerX, centerY, r, autoDeg } = this;
    const radian = radianCoefficient * this.initDeg; // 角度
    const x = centerX + r * Math.cos(radian);
    const y = centerY + r * Math.sin(radian);
    // // 计算倾斜角度
    let skew = this.initDeg % 360 >= 264 ? 360 % (-this.initDeg % 360) : -this.initDeg % 360;
    // // 启用硬件加速
    skew = Math.abs(skew / 2) > 48 ? 0 : skew / 2;
    node.style.transform = `translate3d(${px2rem(x)}, ${px2rem(y)}, 0) skewX(${skew}deg)`;
    node.setAttribute("rotate", this.initDeg.toString());
    node.setAttribute("text", node.getAttribute("text") || node.innerHTML);
    // // 隐藏90deg-270deg范围元素
    this.setStyle(node);
    this.hideLeftContent(node);
    this.initDeg += autoDeg;
  }
  // 切换路由
  swiperRoute(index: number) {
    const nodes: Array<HTMLElement> = this.$refs.routeLink as Array<HTMLElement>;
    const node = this.$refs.routeLink[index];

    // 切换
    if (node.getAttribute("rotate") % 360 === 0) {
      return;
    }
    if (node.innerHTML === "") {
      return;
    }
    // 根据点击元素计算旋转角度
    let rotateDeg;
    if (node.getAttribute("rotate") % 360 >= 0 && node.getAttribute("rotate") % 360 < 180) {
      rotateDeg = -(node.getAttribute("rotate") % 360) / this.autoDeg;
    } else {
      rotateDeg = Math.abs((node.getAttribute("rotate") % 360) - 360) / this.autoDeg;
    }

    nodes.forEach(node => {
      const nodeDeg = node.getAttribute("rotate")!;
      this.initDeg = parseFloat(nodeDeg) + this.autoDeg * rotateDeg;
      this.computePosition(node);
    });
  }
  hideLeftContent(node) {
    const deg = parseInt(node.getAttribute("rotate"));
    let border, innerHTML;
    // 左侧角度值
    if ((deg % 360 >= 66 && deg % 360 <= 294) || (deg <= -72 && deg >= -288)) {
      border = `unset`;
      innerHTML = ``;
    } else {
      border = `1px solid #2089a5`;
      innerHTML = node.getAttribute("text");
    }
    node.style.border = border;
    node.innerHTML = innerHTML;
    return node;
  }
  setStyle(node) {
    const deg = parseInt(node.getAttribute("rotate"));
    let fontSize, opacity, background;
    if (deg % 360 === 0) {
      fontSize = px2rem(26);
      opacity = "1";
      background = `linear-gradient(to right, #166ca4, #43daf8)`;
    } else if (deg % 360 === 24 || deg % 360 === 336) {
      fontSize = px2rem(22);
      opacity = "0.8";
      background = `unset`;
    } else {
      fontSize = px2rem(18);
      opacity = "0.5";
      background = `unset`;
    }
    node.style["font-size"] = fontSize;
    node.style.opacity = opacity;
    node.style.background = background;
    return node;
  }
  render() {
    return (
      <div class="rp-dial-wrapper">
        {this.dialActions.map((v, i) => {
          return (
            <span
              class="rp-dial-wrapper__text"
              ref="routeLink"
              key={v + i}
              refInFor={true}
              onClick={() => {
                this.swiperRoute(i);
              }}>
              {v}
            </span>
          );
        })}
      </div>
    );
  }
}
</script>
<style lang="scss">
$bgurl: "/images/home/home-dial.png";
@include b(dial-wrapper) {
  position: relative;
  width: 100%;
  height: 100%;
  background: url($bgurl) no-repeat center;
  background-size: 100% 100%;
  @include e(text) {
    font-size: 26px;
    text-align: center;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    transition: all 0.25s;
    cursor: pointer;
    box-sizing: border-box;
    padding-right: 20px;
    border: 1px solid #2089a5;
    border-radius: 15px;
    text-align: right;
    line-height: 44px;
    display: inline-block;
    width: 50%;
    height: 10%;
    color: red;
    // color: #fff;
    user-select: none;
    position: absolute;
  }
}
</style>
