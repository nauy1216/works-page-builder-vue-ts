<script lang="tsx">
import { Component, Watch } from "vue-property-decorator";
import { px2rem } from "shared/utils";
import MapChart from "../BaseMapChart";
import Options from "./homeRevenProfile";

@Component({
  name: "RpBusinPieChart"
})
export default class RpBusinPieChart extends MapChart {
  get slideWidth() {
    return this.width;
  }

  get slideHeight() {
    return this.height;
  }

  get options() {
    return JSON.parse(JSON.stringify(Options));
  }

  mounted() {
    //console.log("首页=营收分布-base组件数据--", this.componentData);
    this.$nextTick(() => {
      this.initBarChart();
    });
  }

  @Watch("options", { deep: true })
  initBarChart() {
    //创建图形
    const node = this.$refs.barChart as HTMLDivElement;
    this.init(node);
    this.chart.setOption(this.options, true);
  }

  destroyed() {
    //
  }

  render() {
    return <div class="rp-busin-pie-chart" ref="barChart" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}></div>;
  }
}
</script>

<style lang="scss" scoped>
@include b(busin-pie-chart) {
}
</style>
