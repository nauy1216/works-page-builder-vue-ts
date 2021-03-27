<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import { px2rem } from "shared/utils";
import MapChart from "../BaseMapChart";
import barOptions from "./homePrand";

@Component({
  name: "RpBarChartCol"
})
export default class RpBarChartCol extends MapChart {
  @Prop({
    type: String
  })
  seriesName!: string;

  @Prop({
    type: Array
  })
  linearGradient!: string[];

  @Prop({
    type: String
  })
  unit!: string;

  @Prop({
    type: Boolean
  })
  isRow!: boolean;

  @Prop({
    type: Number
  })
  radius!: number;

  get slideWidth() {
    return this.width;
  }

  get slideHeight() {
    return this.height;
  }

  get options() {
    const options = JSON.parse(JSON.stringify(barOptions));
    //系列名称
    options.series[0].name = this.seriesName;
    options.legend.data[0] = this.seriesName;
    //柱状颜色
    options.series[0].itemStyle.normal.color.colorStops[0].color = this.linearGradient[0];
    options.series[0].itemStyle.normal.color.colorStops[1].color = this.linearGradient[1];
    //柱形圆角
    options.series[0].itemStyle.normal.barBorderRadius = this.radius;
    //图形数据
    options.series[0].data = this.componentData.seriesData || [];
    //是否翻转
    if (this.isRow) {
      options.xAxis.type = "value";
      options.yAxis.type = "category";
      //单位
      options.yAxis.name = "";
      options.xAxis.name = this.unit;
      //柱形数据
      options.yAxis.data = this.componentData.xAxisData || [];
    } else {
      options.xAxis.type = "category";
      options.yAxis.type = "value";
      //柱形数据
      options.xAxis.data = this.componentData.xAxisData || [];
      //单位
      options.yAxis.name = this.unit;
      options.xAxis.name = "";
    }
    return options || {};
  }
  oBaeChart = null;

  mounted() {
    //console.log("竖形柱状图-base组件数据--", this.componentData);
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
    return <div class="rp-bra-chart-col" ref="barChart" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}></div>;
  }
}
</script>

<style lang="scss" scoped>
@include b(bra-chart-col) {
}
</style>
