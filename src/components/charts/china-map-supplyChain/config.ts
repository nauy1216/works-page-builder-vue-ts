// import chartOptions from "./chartOptions";
import chartOptions from "./supplyOptions";
export class RpChinaMap implements ComponentConfig<any> {
  alias = "供应链地图";
  useScale: ComponentScale = {
    type: "none"
    // scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 1725,
    height: 1200,
    // width: 500,
    // height: 1324,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    // 是否开启下钻，下钻关联图表数据  地图标记点经纬度，标记点图片,
  };

  mockData = chartOptions;
}

export default new RpChinaMap();
