// import EVENT_LIST from "../../event";
export class RpCounterConfig implements ComponentConfig {
  alias = "翻牌器";
  useScale: ComponentScale = {
    type: "zoom"
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 756,
    height: 78,
    rotate: 0,
    zIndex: 0
  };
  event = {
    componentEvent: [],
    list: []
  };
  componentProps = {
    // 模拟数据，随后更改在数据源中
    text: {
      label: "文本数据",
      default: "9765987562",
      // 9765987562
      inputComponent: {
        componentName: "el-input"
      }
    }
  };

  mockData = null;
}

export default new RpCounterConfig();
