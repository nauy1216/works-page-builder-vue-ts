import BaseVue from "components/BaseVue";
import { Component, Watch } from "vue-property-decorator";
import { debounce } from "throttle-debounce";
import echarts, { ECharts } from "echarts";
// @ts-ignore
// import chinaJson from "echarts/map/json/china.json"; // 省
@Component
export default class MapChart extends BaseVue<Record<string, any>> {
  chart!: ECharts;
  public init(node): ECharts {
    this.chart = echarts.init(node);
    return this.chart;
  }

  @Watch("width")
  resizeMap() {
    this.chart && debounce(500, true, this.chart.resize() as any);
  }

  get echarts() {
    return { ...echarts };
  }
}
