export class RpEduClollegeProfileConfig implements ComponentConfig<Record<string, any>> {
  alias = "学院概况";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 1000,
    height: 56,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    list: [
      { id: 0, title: "湾畔大学", value: "1", unit: "", linearGradient: ["rgb(3, 47, 121)", "rgb(39, 160, 207)"] },
      { id: 1, title: "美联五洲高级学院", value: "1", unit: "", linearGradient: ["rgb(3, 47, 121)", "rgba(67, 232, 188, 0.9)"] },
      { id: 1, title: "维特国际兽医学院", value: "1", unit: "", linearGradient: ["rgb(3, 47, 121)", "rgb(39, 160, 207)"] },
      { id: 1, title: "知跃大学", value: "1", unit: "", linearGradient: ["rgb(3, 47, 121)", "rgba(67, 232, 188, 0.9)"] }
    ]
  };
}

export default new RpEduClollegeProfileConfig();
