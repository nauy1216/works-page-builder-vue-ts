import { ComponentData } from "./componentData";
import { goldTeacher } from "./mockData";

export class RpGoldTeachersConfig implements ComponentConfig<ComponentData> {
  alias = "金牌讲师、助教展示";
  useScale: ComponentScale = {
    type: "zoom",
    scale: 0.3
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 1600,
    height: 1200,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    cols: {
      label: "列",
      default: 1,
      inputComponent: {
        componentName: "el-input-number",
        props: {
          controlsPosition: "right"
        }
      }
    },
    rows: {
      label: "行",
      default: 1,
      inputComponent: {
        componentName: "el-input-number",
        props: {
          controlsPosition: "right"
        }
      }
    },
    background: {
      label: "背景",
      default: "#000000",
      inputComponent: "el-color-picker"
    }
  };

  mockData = goldTeacher.doctorsData;
}

export default new RpGoldTeachersConfig();
