import RpColorSelectorGradual from "components/helpers/color-selector-gradual/index.vue";
export class RpOblongProgressConfig implements ComponentConfig<Record<string, any>> {
  alias = "长方形-进度条";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 180,
    height: 10,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    speed: {
      label: "进度",
      default: 70,
      inputComponent: "el-input-number"
    },
    linearGradient: {
      label: "进度渐变色",
      default: ["rgb(239, 85, 43)", "rgb(239, 85, 43)"],
      inputComponent: {
        componentName: RpColorSelectorGradual
      }
    },
    isRight: {
      label: "是否翻转",
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

export default new RpOblongProgressConfig();
