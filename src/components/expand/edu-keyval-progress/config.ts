export class RpEdukeyvalProgressConfig implements ComponentConfig<Record<string, any>> {
  alias = "线下/上教育";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 564,
    height: 200,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    title: {
      label: "数据标题",
      default: "线下",
      inputComponent: "el-input"
    }
  };

  mockData = {
    list: [
      {
        id: "",
        name: "线下课程",
        data: [
          {
            id: "d985070e-2f43-11eb-8b1f-0242ac130002",
            name: "开课数",
            value: "116",
            speed: 30,
            background: ["rgb(149, 0, 82)", "rgb(149, 0, 82)"],
            unit: "次"
          },
          {
            id: "d985079d-2f43-11eb-8b1f-0242ac130002",
            name: "学员数",
            value: "4941",
            speed: 60,
            background: ["rgb(232, 187, 56)", "rgb(232, 187, 56)"],
            unit: "人"
          }
        ]
      },
      {
        id: "",
        name: "线下公开课",
        data: [
          {
            id: "d9851919-2f43-11eb-8b1f-0242ac130002",
            name: "开课数",
            value: "81",
            speed: 40,
            background: ["rgb(39, 160, 207)", "rgb(39, 160, 207)"],
            unit: "次"
          },
          {
            id: "d9851949-2f43-11eb-8b1f-0242ac130002",
            name: "学员数",
            value: "2586",
            speed: 30,
            background: ["rgb(67, 235, 188)", "rgb(67, 235, 188)"],
            unit: "人"
          }
        ]
      }
    ]
  };
}

export default new RpEdukeyvalProgressConfig();
