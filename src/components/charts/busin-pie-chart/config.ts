export class RpBusinPieChartConfig implements ComponentConfig<Record<string, any>> {
  alias = "营收分布"; //首页
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 300,
    height: 250,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    xAxisData: ["深圳瑞海联", "北京世昌源", "温州爱比乐", "武汉源盟", "济南世昌源", "武汉汉宠", "太原顶信康源", "深圳利都发展", "青岛乐源瑞美", "广州锐牧佳"],
    seriesData: [2834, 1567, 1594, 1479, 1653, 1417, 1158, 1363, 1129, 1199]
  };
}

export default new RpBusinPieChartConfig();
