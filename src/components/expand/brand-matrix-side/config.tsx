import { ComponentData } from "./componentData";
export class RpBrandMatrixConfig implements ComponentConfig<ComponentData> {
  alias = "品牌矩阵-侧屏";
  useScale: ComponentScale = {
    type: "none"
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 1600,
    height: 1200,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    list: []
  };
}

export default new RpBrandMatrixConfig();
