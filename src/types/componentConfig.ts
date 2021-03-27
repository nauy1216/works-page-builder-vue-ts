// 定义组件配置接口, 编辑器使用
type ComponentConfig<T = null> = {
  alias: string;
  event?: {
    componentEvent: Array<any>;
    list: Array<any>;
  };
  useScale: ComponentOption["useScale"];
  layoutConfig: ComponentOption["layoutConfig"];
  componentProps: PackageComponentProps<ComponentOption["componentProps"]>;
  mockData?: T;
  dataChecker?: { assert: (data: any) => void };
};

type PackageComponentProps<T> = {
  [K in keyof T]: {
    default: T[K];
    label: string;
    inputComponent:
      | string
      | {
          componentName: string | Vue.VueConstructor;
          props?: Record<string, any>;
          render?: PropComponentRender;
        };
  };
};

type PropComponentRender = (h: Vue.CreateElement, props: Record<string, any>) => Vue.VNode | null;
