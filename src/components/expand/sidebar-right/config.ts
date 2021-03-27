export class RpSidebarRightConfig implements ComponentConfig {
  alias = "右侧操作盘";
  useScale: ComponentScale = {
    type: "zoom",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    // width: 674,
    // height: 1080,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = null;
}

export default new RpSidebarRightConfig();
