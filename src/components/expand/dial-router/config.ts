export class DialRouterConfig implements ComponentConfig<any> {
  alias = "中控转盘";
  useScale: ComponentScale = {
    type: "zoom"
  };

  layoutConfig = {
    x: 0,
    y: 0,
    // width: 797,
    // height: 1080,
    width: 400,
    height: 508,
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
    }
  };

  mockData = null;
}

export default new DialRouterConfig();
