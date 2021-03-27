import RpColorSelectorGradual from "components/helpers/color-selector-gradual/index.vue";
export class RpSupKeyvaluesBoxConfig implements ComponentConfig<Record<string, any>> {
  alias = "供应链(配送、仓储、总订单/金额)";
  useScale: ComponentScale = {
    type: "zoom",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 460,
    height: 180,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    linearGradient: {
      //该组件默认单位颜色
      label: "单位渐变",
      default: ["rgb(3, 51, 131)", "rgba(3, 51, 131, 0)"],
      inputComponent: {
        componentName: RpColorSelectorGradual
      }
    }
  };

  mockData = {
    list: [
      { id: 0, title: "总医院数", value: "1396", unit: "家" },
      { id: 1, title: "B端客户", value: "308988", unit: "个" }
    ]
  };
}

export default new RpSupKeyvaluesBoxConfig();
