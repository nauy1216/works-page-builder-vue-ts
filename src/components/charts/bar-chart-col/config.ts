import RpColorSelectorGradual from "components/helpers/color-selector-gradual/index.vue";
export class RpBarChartColConfig implements ComponentConfig<Record<string, any>> {
  alias = "柱状图";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 280,
    height: 230,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    seriesName: {
      label: "系列名称",
      default: "",
      inputComponent: "el-input"
    },
    linearGradient: {
      label: "柱形颜色",
      default: ["rgba(6, 165, 245, 1)", "rgba(12, 120, 221, 1)"],
      inputComponent: {
        componentName: RpColorSelectorGradual
      }
    },
    unit: {
      label: "单位",
      default: "个",
      inputComponent: "el-input"
    },
    radius: {
      label: "柱形圆角",
      default: 0,
      inputComponent: "el-input-number"
    },
    isRow: {
      label: "是否横向",
      default: false,
      inputComponent: {
        componentName: "el-checkbox"
      }
    }
  };

  mockData = {
    xAxisData: ["深圳瑞海联", "北京世昌源", "温州爱比乐", "武汉源盟", "济南世昌源", "武汉汉宠", "太原顶信康源", "深圳利都发展", "青岛乐源瑞美", "广州锐牧佳"],
    seriesData: [2834, 1567, 1594, 1479, 1653, 1417, 1158, 1363, 1129, 1199]
  };
}

export default new RpBarChartColConfig();
