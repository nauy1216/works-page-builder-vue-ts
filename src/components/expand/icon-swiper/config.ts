export class RpIconBannerConfig implements ComponentConfig<Record<string, any>> {
  alias = "品牌矩阵";
  useScale: ComponentScale = {
    type: "zoom",
    scale: 1
  };
  layoutConfig = {
    x: 0,
    y: 0,
    width: 400,
    height: 200,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {
    cols: {
      label: "列",
      default: 3,
      inputComponent: {
        componentName: "el-input-number",
        props: {
          controlsPosition: "right"
        }
      }
    },
    rows: {
      label: "行",
      default: 2,
      inputComponent: {
        componentName: "el-input-number",
        props: {
          controlsPosition: "right"
        }
      }
    },
    background: {
      label: "背景",
      default: "#ffffff",
      inputComponent: "el-input"
    }
  };

  mockData = {
    list: [
      { id: "1", name: "你我它", img: "https://file.vetscloud.com/pagebuiild/get.png" },
      { id: "2", name: "凯特喵", img: "https://file.vetscloud.com/pagebuiild/get%20%281%29.png" },
      { id: "3", name: "安安", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-46-1.png" },
      { id: "4", name: "宠颐生", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-69.png" },
      { id: "5", name: "爱玩乐", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-67.png" },
      { id: "6", name: "爱诺", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-45.png" },
      { id: "7", name: "瑞鹏", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-52.png" },
      { id: "8", name: "纳吉亚", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-46%E5%A4%8D%E5%88%B6.png" },
      { id: "9", name: "美宠医和", img: "https://file.vetscloud.com/pagebuiild/%E7%BE%8E%E5%AE%A0%E5%8C%BB%E5%92%8C.png" },
      { id: "10", name: "美联众合", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-48.png" },
      { id: "11", name: "芭比堂", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-51.png" },
      { id: "12", name: "凯特喵", img: "https://file.vetscloud.com/pagebuiild/get%20%281%29.png" },
      { id: "1", name: "你我它", img: "https://file.vetscloud.com/pagebuiild/get.png" },
      { id: "2", name: "凯特喵", img: "https://file.vetscloud.com/pagebuiild/get%20%281%29.png" },
      { id: "3", name: "安安", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-46-1.png" },
      { id: "4", name: "宠颐生", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-69.png" },
      { id: "5", name: "爱玩乐", img: "https://file.vetscloud.com/pagebuiild/%E7%BC%96%E7%BB%84-67.png" }
    ]
  };
}

export default new RpIconBannerConfig();
