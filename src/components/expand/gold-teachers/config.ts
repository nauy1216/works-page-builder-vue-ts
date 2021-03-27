import mockData, { ComponentData } from "./componentData";
import EVENT_LIST from "../../event";
export class RpGoldTeachersConfig implements ComponentConfig<ComponentData> {
  alias = "金牌讲师、助教轮播";
  useScale: ComponentScale = {
    type: "none"
  };

  event = {
    componentEvent: [EVENT_LIST.CLICK, EVENT_LIST.CLICK_ITEM],
    list: []
  };
  // event = [
  //   {
  //     name: "click",
  //     alias: "单击",
  //     callback(params) {
  //       console.log(12456);
  //     }
  //   },
  //   {
  //     name: "clickItem",
  //     alias: "单击item",
  //     callback(params) {
  //       console.log(12456);
  //     }
  //   }
  // ];

  layoutConfig = {
    x: 0,
    y: 0,
    width: 200,
    height: 300,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    // cols: {
    //   label: "列",
    //   default: 1,
    //   inputComponent: {
    //     componentName: "el-input-number",
    //     props: {
    //       controlsPosition: "right"
    //     }
    //   }
    // },
    // rows: {
    //   label: "行",
    //   default: 1,
    //   inputComponent: {
    //     componentName: "el-input-number",
    //     props: {
    //       controlsPosition: "right"
    //     }
    //   }
    // },
    background: {
      label: "背景",
      default: "#ffffff",
      inputComponent: "el-input"
    }
  };

  mockData = mockData;
}

export default new RpGoldTeachersConfig();
