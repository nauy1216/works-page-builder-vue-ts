// 获取数据还原画布以及参数属性
interface PageConfig {
  pageName: string;
  pageId: number;
  width: number;
  height: number;
  pageStyle: PageStyle;
  childComponents: ComponentOption[];
}

interface PageStyle {
  backround?: string;
}
