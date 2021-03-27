export class RpMedicalAreaRecordProgressConfig implements ComponentConfig<Record<string, any>> {
  alias = "各地区病例数(右侧进度条)";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 160,
    height: 168,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    list: [
      {
        id: "1",
        name: "今天病例数",
        value: "13121",
        speed: 25,
        unit: "例",
        linearGradient: ["rgb(222, 32, 128)", "rgb(222, 32, 128)"]
      },
      {
        id: "2",
        name: "累计病历数",
        value: "5280253",
        speed: 63,
        unit: "例",
        linearGradient: ["rgb(199, 177, 121)", "rgb(199, 177, 121)"]
      }
    ]
  };
}

export default new RpMedicalAreaRecordProgressConfig();
