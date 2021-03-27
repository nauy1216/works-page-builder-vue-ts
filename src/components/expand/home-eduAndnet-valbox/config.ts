export class RpHomeEduAndnetValboxConfig implements ComponentConfig<Record<string, any>> {
  alias = "首页集团-数值盒子";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 230,
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
        background: ["rgb(68, 22, 51)", "rgb(29, 85, 92)"],
        data: [
          {
            name: "总数学生",
            value: "104111517",
            unit: "位"
          },
          {
            name: "总数教师数",
            value: "326",
            unit: "位"
          }
        ]
      },
      {
        id: "2",
        background: ["rgb(68, 22, 51)", "rgb(29, 85, 92)"],
        data: [
          {
            name: "金牌讲师数",
            value: "14",
            unit: "位"
          },
          {
            name: "总数外教",
            value: "110",
            unit: "位"
          }
        ]
      },
      {
        id: "3",
        background: ["rgb(68, 22, 51)", "rgb(29, 85, 92)"],
        data: [
          {
            name: "宠物医师",
            value: "94925",
            unit: "位"
          },
          {
            name: "开棵数",
            value: "1326",
            unit: "次"
          }
        ]
      }
    ]
  };
}

export default new RpHomeEduAndnetValboxConfig();
