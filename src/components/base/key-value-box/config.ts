import RpColorSelectorGradual from "components/helpers/color-selector-gradual/index.vue";
export class RpKeyValueBoxConfig implements ComponentConfig<Record<string, any>> {
  alias = "标题、单位数量";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 460,
    height: 50,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    linearGradient: {
      label: "单位渐变",
      default: ["rgb(44, 156, 126)", "rgba(44, 156, 126, 0)"],
      inputComponent: {
        componentName: RpColorSelectorGradual
      }
    },
    title: {
      label: "标题",
      default: "教师数量",
      inputComponent: "el-input"
    },
    unit: {
      label: "单位",
      default: "位",
      inputComponent: "el-input"
    },
    isBanner: {
      label: "是否横标",
      default: false,
      inputComponent: {
        componentName: "el-checkbox"
      }
    }
  };

  mockData = {
    value: ""
  };
}

export default new RpKeyValueBoxConfig();
