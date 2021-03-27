export class RpGoldTeachersConfig implements ComponentConfig {
  alias = "品牌家族";
  useScale: ComponentScale = {
    type: "zoom",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 3840,
    height: 1344,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = null;
}

export default new RpGoldTeachersConfig();
