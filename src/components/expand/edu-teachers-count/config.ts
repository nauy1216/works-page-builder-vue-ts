export class RpEduTeachersCountConfig implements ComponentConfig<Record<string, any>> {
  alias = "师资";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 564,
    height: 56,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    list: [
      { id: 0, title: "教师数量", value: "215", unit: "", linearGradient: ["rgba(0, 135, 152, 0.9)", "rgba(0, 135, 152, 0.2)"] },
      { id: 1, title: "外教数量", value: "109", unit: "", linearGradient: ["rgba(130, 22, 90, 0.9)", "rgba(130, 22, 90, 0.2)"] }
    ]
  };
}

export default new RpEduTeachersCountConfig();
