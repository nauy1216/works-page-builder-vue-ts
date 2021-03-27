export enum AppType {
  dp = 1, // 大屏
  h5 = 2, // 移动端
  mp = 3 // 小程序
}

export enum DataSourceType {
  none = -1, // 不使用数据包
  json = 0, // 手动输入json字符串
  package = 1 // 数据包
}
