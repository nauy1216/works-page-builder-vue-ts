export class RpSwiperConfig implements ComponentConfig {
  alias = "swiper";

  useScale: ComponentScale = {
    type: "transform",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 400,
    height: 200,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    cols: {
      label: "列",
      default: 3,
      inputComponent: {
        componentName: "el-input-number",
        props: {
          controlsPosition: "right"
        }
      }
    },
    rows: {
      label: "行",
      default: 2,
      inputComponent: {
        componentName: "el-input-number",
        props: {
          controlsPosition: "right"
        }
      }
    },
    background: {
      label: "背景",
      default: "#ffffff",
      inputComponent: "el-input"
    }
  };

  mockData = null;
}

export default new RpSwiperConfig();
