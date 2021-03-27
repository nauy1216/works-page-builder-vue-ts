export class RpHomeSupAndmedProgressConfig implements ComponentConfig<Record<string, any>> {
  alias = "首页集团-进度条";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 215,
    height: 278,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    isRight: {
      label: "是否翻转",
      default: false,
      inputComponent: {
        componentName: "el-checkbox"
      }
    }
  };

  mockData = {
    list: [
      {
        id: "1",
        name: "总销售金额",
        value: "782840189",
        speed: 25,
        unit: "元",
        linearGradient: ["rgb(222, 170, 115)", "rgb(222, 170, 115)"]
      },
      {
        id: "2",
        name: "总销售订单量",
        value: "5280253",
        speed: 52,
        unit: "单",
        linearGradient: ["rgb(45, 135, 114)", "rgb(45, 135, 114)"]
      },
      {
        id: "3",
        name: "总进货数",
        value: "2530368",
        speed: 63,
        unit: "件",
        linearGradient: ["rgb(135, 25, 78)", "rgb(135, 25, 78)"]
      },
      {
        id: "4",
        name: "合作品牌数",
        value: "5280253",
        speed: 45,
        unit: "单",
        linearGradient: ["rgb(52, 151, 154)", "rgb(52, 151, 154)"]
      },
      {
        id: "5",
        name: "全国仓储",
        value: "5280253",
        speed: 25,
        unit: "万m²",
        linearGradient: ["rgb(37, 165, 184)", "rgb(37, 165, 184)"]
      }
    ]
  };
}

export default new RpHomeSupAndmedProgressConfig();
