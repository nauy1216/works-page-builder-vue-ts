export class RpMedicalSystemConfig implements ComponentConfig<Record<string, any>> {
  alias = "医疗系统";
  useScale: ComponentScale = {
    type: "none",
    scale: 1
  };

  layoutConfig = {
    x: 0,
    y: 0,
    width: 480,
    height: 100,
    rotate: 0,
    zIndex: 0
  };

  componentProps = {};

  mockData = {
    list: [
      {
        id: 1,
        img: "/images/medicalGroup/history-case.png",
        name: "历史病例系统"
      },
      {
        id: 2,
        img: "/images/medicalGroup/monitor.png",
        name: "门店监控系统"
      },
      {
        id: 3,
        img: "/images/medicalGroup/far-diagnosis.png",
        name: "远程会诊中心"
      },
      {
        id: 4,
        img: "/images/medicalGroup/PACS.png",
        name: "PACS系统"
      }
    ]
  };
}

export default new RpMedicalSystemConfig();
