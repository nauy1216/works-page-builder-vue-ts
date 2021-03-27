import RpColorSelector from "components/helpers/color-selector/index.vue";
export class RpCircleRingConfig implements ComponentConfig<any> {
  alias = "环形进度";
  useScale: ComponentScale = {
    type: "zoom"
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 150,
    height: 230,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    percent: {
      label: "百分比",
      default: 50,
      inputComponent: "el-input"
    },
    // 外侧圆环线宽
    strokeWidth: {
      label: "外侧圆环线宽",
      default: 6,
      inputComponent: "el-input"
    },
    strokeColor: {
      label: "填充色",
      default: "#1991C1",
      inputComponent: {
        componentName: RpColorSelector
      }
    },
    trailColor: {
      label: "外侧底环颜色",
      default: "#E6E6E6",
      inputComponent: {
        componentName: RpColorSelector
      }
    },
    // 外侧底环大小
    trailWidth: {
      label: "外侧底环大小",
      default: 5,
      inputComponent: "el-input"
    },
    // 模拟数据
    centerText: {
      label: "模拟数据",
      default: "4.6亿",
      inputComponent: "el-input"
    }
  };

  mockData = {};
}

export default new RpCircleRingConfig();
