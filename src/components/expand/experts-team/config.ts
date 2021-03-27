export class RpExpertsConfig implements ComponentConfig<any> {
  alias = "专家团队";
  useScale: ComponentScale = {
    type: "zoom"
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 300,
    height: 300,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {};
}

export default new RpExpertsConfig();
