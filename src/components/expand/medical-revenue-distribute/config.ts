export class RpMedicalRevenueDistributeConfig implements ComponentConfig<Record<string, any>> {
  alias = "营收分布";
  useScale: ComponentScale = {
    type: "zoom",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    list: [
      {
        id: "1",
        name: "医疗收入",
        value: "1591201",
        speed: 25,
        unit: "万",
        linearGradient: ["rgba(0, 135, 152, 0.9)", "rgba(0, 135, 152, 0.2)"]
      },
      {
        id: "2",
        name: "美容收入",
        value: "15941",
        speed: 63,
        linearGradient: ["rgba(130, 22, 90, 0.9)", "rgba(0, 135, 152, 0.2)"],
        unit: "万"
      },
      {
        id: "3",
        name: "检查收入",
        value: "65",
        speed: 70,
        linearGradient: ["rgba(140, 124, 71, 0.9)", "rgba(140, 124, 71, 0.2)"],
        unit: "万"
      },
      {
        id: "4",
        name: "商品收入",
        value: "25126",
        linearGradient: ["rgba(61, 95, 163, 0.9)", "rgba(61, 95, 163, 0.2)"],
        speed: 60,
        unit: "个"
      },
      {
        id: "5",
        name: "其他收入",
        value: "58969",
        speed: 40,
        linearGradient: ["rgb(220, 68, 167)", "rgba(61, 95, 163, 0.2)"],
        unit: "个"
      }
    ]
  };
}

export default new RpMedicalRevenueDistributeConfig();
