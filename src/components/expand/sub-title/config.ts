import RpColorSelectorGradual from "components/helpers/color-selector-gradual/index.vue";
import RpColorSelector from "components/helpers/color-selector/index.vue";
export class RpSubTitle implements ComponentConfig {
  alias = "副标题";
  useScale: ComponentScale = {
    type: "zoom",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 130,
    height: 41,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    text: {
      label: "文本内容",
      default: "医疗集团",
      inputComponent: {
        componentName: "el-input",
        props: {
          controlsPosition: "right"
        }
      }
    },
    textColor: {
      label: "文字颜色",
      default: "rgba(210, 246, 243, 1)",
      inputComponent: {
        componentName: RpColorSelector
      }
    },
    linearGradient: {
      label: "背景渐变",
      default: ["rgba(208,46,139,1)", "rgba(208,46,139,0)"],
      inputComponent: {
        componentName: RpColorSelectorGradual
      }
    },
    overturn: {
      label: "开启翻转",
      default: false,
      inputComponent: {
        componentName: "el-checkbox"
      }
    }
  };

  mockData = null;
}

export default new RpSubTitle();
