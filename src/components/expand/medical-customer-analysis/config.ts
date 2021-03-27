export class RpMedicalCustomerAnalysisConfig implements ComponentConfig<Record<string, any>> {
  alias = "客户分析";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 380,
    height: 180,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    list: [
      {
        id: "1",
        name: "消费客户数",
        value: "365704548",
        speed: 25,
        unit: "个"
      },
      {
        id: "2",
        name: "客单价",
        value: "534",
        speed: 63,
        unit: "元"
      },
      {
        id: "3",
        name: "注册新客数",
        value: "191973",
        speed: 70,
        unit: "个"
      },
      {
        id: "4",
        name: "美容数",
        value: "3987839",
        speed: 40,
        unit: "个"
      }
    ]
  };
}

export default new RpMedicalCustomerAnalysisConfig();
