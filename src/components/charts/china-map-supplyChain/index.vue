<script lang="tsx">
import { Component } from "vue-property-decorator";
import MapChart from "../BaseMapChart";
// @ts-ignore
import chinaJson from "echarts/map/json/china.json"; // 省
import { px2rem } from "shared/utils";
// import chinaCities from "echarts/map/json/china-cities.json"; // 市

@Component({
  name: "RpChinaMapSupplyChain"
})
export default class RpChinaMapSupplyChain extends MapChart {
  mounted() {
    const node = this.$refs.chart as HTMLElement;
    this.init(node);
    this.registerMapEvent("china", chinaJson);
    this.chart.setOption(this.componentData, true);
    this.chart.on("click", context => {
      this.mapClickEvent(context);
    });
  }
  get setSwiperSize() {
    return {
      width: px2rem(this.width),
      height: px2rem(this.height)
    };
  }
  public registerMapEvent(name, data): void {
    this.echarts.registerMap(name, data);
  }

  mapClickEvent(context) {
    alert(context);
  }
  handlePrev() {
    (this.$refs.carousel as Vue & { prev: Function }).prev();
  }
  handleNext() {
    (this.$refs.carousel as Vue & { next: Function }).next();
  }
  render() {
    return (
      <div class="rp-chart-wrapper">
        <div
          class="rp-chart-wrapper__btn rp-chart-wrapper__btn--left"
          onClick={() => {
            this.handlePrev();
          }}>
          <img src="/images/supplyChainGroup/arrow-left.png" />
        </div>
        <el-carousel ref="carousel" autoplay={false} arrow="never" indicator-position="none">
          <el-carousel-item class="rp-chart-wrapper__swiper" width={`${this.width}px`}>
            <div ref="chart" class="rp-chart-wrapper__chart" style={this.setSwiperSize}></div>
          </el-carousel-item>
          <el-carousel-item class="rp-chart-wrapper__swiper" width={`${this.width}px`}>
            <img src="/images/supplyChainGroup/map.png" />
          </el-carousel-item>
        </el-carousel>
        <div
          class="rp-chart-wrapper__btn rp-chart-wrapper__btn--right"
          onClick={() => {
            this.handleNext();
          }}>
          <img src="/images/supplyChainGroup/arrow-right.png" />
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss">
@include b(chart-wrapper) {
  position: relative;
  width: 100%;
  height: 100%;
  @include e(swiper) {
    width: 100%;
    height: 100%;
  }
  @include e(chart) {
    width: 100%;
    height: 100%;
  }
  @include e(btn) {
    position: absolute;
    top: 50%;
    z-index: 99;
    @include m(left) {
      left: 0;
    }
    @include m(right) {
      right: 0;
    }
  }
}
.el-carousel__container {
  height: 100% !important;
}
.el-carousel {
  height: 100% !important;
}
</style>
