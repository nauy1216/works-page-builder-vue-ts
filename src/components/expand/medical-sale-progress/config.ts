export class RpMedicalSaleProgressConfig implements ComponentConfig<Record<string, any>> {
  alias = "销售数据";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 380,
    height: 200,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    list: [
      {
        id: "1",
        name: "新客户病例数",
        value: "1391201",
        speed: 25,
        unit: "位"
      },
      {
        id: "2",
        name: "老客户病例数",
        value: "2802253",
        speed: 63,
        unit: "位"
      },
      {
        id: "3",
        name: "商品数",
        value: "8191973",
        speed: 70,
        unit: "个"
      },
      {
        id: "4",
        name: "美容数",
        value: "3987839",
        speed: 60,
        unit: "个"
      },
      {
        id: "5",
        name: "其他",
        value: "234584",
        speed: 40,
        unit: "个"
      }
    ]
  };
}

export default new RpMedicalSaleProgressConfig();
