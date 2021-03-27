// 定义组件接口
interface ComponentOption {
  id: string;
  // 组件内部名称
  componentName: string;
  // 组件名称
  alias: string;
  // 组件描述
  desc: string;
  useScale: ComponentScale; // 是否根据组件的宽高自动缩放组件
  // 布局属性
  layoutConfig: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
    zIndex: number;
  };
  // 事件
  event?: {
    componentEvent: Array<any>;
    list: Array<any>;
  };
  // 组件属性
  componentProps: Partial<ComponentBaseOption> & Record<string, any>;
  // 数据源
  dataSource: {
    type: AliasDataSourceType; //数据源类型 0:手动录入 1:数据包 -1:不使用数据包
    jsonContent: string; //手动录入数据
    jsonPackageId: number | null; // 静态json使用的包id
    packageId: number | null; // 数据包id
  };
  // 组件数据
  componentData: Record<string, any> | null;
  // 临时数据
  tempData: {
    active: boolean;
    key: string;
    lockAspectRatio: boolean;
  } & Record<string, any>;
}

interface ComponentBaseOption {
  fontSize: number;
  background: string;
  linearGradient: Array<string>;
  opacity: number;
  isVisiable: boolean;
}

interface ComponentScale {
  type: "transform" | "zoom" | "none";
  scale?: number;
}
