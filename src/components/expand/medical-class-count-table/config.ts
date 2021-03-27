import RpColorSelectorGradual from "components/helpers/color-selector-gradual/index.vue";
export class RpMedicalClassCountTableConfig implements ComponentConfig<Record<string, any>> {
  alias = "类别/周期表";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 400,
    height: 230,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    tableTitle: {
      label: "表头",
      default: "类别/统计周期,本月,今年",
      inputComponent: "el-input"
    },
    linearGradient: {
      //该组件默认单位颜色
      label: "单位渐变",
      default: ["rgba(120, 103, 76, 0.8)", "rgba(120, 103, 76, 0.2)"],
      inputComponent: {
        componentName: RpColorSelectorGradual
      }
    }
  };

  mockData = {
    list: [
      { id: 0, name: "初诊数", value1: "153739", value2: "265588116" },
      { id: 2, name: "复诊数", value1: "889642", value2: "15588116" }
    ]
  };
}

export default new RpMedicalClassCountTableConfig();
