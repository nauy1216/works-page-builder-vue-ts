import chartOptions from "./static/chartOptions";
import RpSelect from "components/helpers/select/index.vue";
export class RpChinaMap implements ComponentConfig<any> {
  alias = "中国地图标准";
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
    mapType: {
      label: "地图类型",
      default: 0,
      inputComponent: {
        componentName: RpSelect,
        props: {
          options: [
            {
              value: 0,
              label: "标准地图"
            },
            {
              value: 1,
              label: "教育集团"
            }
          ]
        }
      }
    },
    // 是否开启下钻
    nextLevel: {
      label: "开启下钻",
      default: false,
      inputComponent: {
        componentName: "el-checkbox"
      }
    }
    // // 下钻数据关联组件
    // associatedComponents: {
    //   label: "关联组件",
    //   default: null,
    //   inputComponent: {
    //     componentName: RpSelect,
    //     props: {
    //       options: []
    //     }
    //   }
    // }
  };

  mockData = chartOptions;
}

export default new RpChinaMap();
