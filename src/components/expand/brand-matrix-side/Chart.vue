<template>
  <!-- 公共图表 -->
  <div ref="chartWrapper" class="chartWrapper"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "chart",
  data() {
    return {
      chart: null
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = this.chart ? this.chart : this.echarts.init(this.$refs.chartWrapper);
      this.chart.setOption(this.option);
    });
  },
  computed: {
    echarts() {
      return { ...echarts };
    }
  },
  watch: {
    option: {
      deep: true,
      handler(option) {
        if (this.chart) {
          this.chart.clear();
          this.chart.setOption(option);
        }
      }
    }
  },
  methods: {
    // 重新设置图表option
    resetOption() {
      if (this.chart) {
        this.chart.setOption(this.option);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chartWrapper {
  height: 100%;
  width: 100%;
}
</style>
