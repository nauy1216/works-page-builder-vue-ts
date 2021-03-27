// const base_url = "http://10.1.234.4";
const base_url = "/data-visual/backend";
// const base_url_map = "http://10.1.234.4";
const api = {
  GetDemo: base_url + "admin/post",
  main: base_url + "/DataPackage/data/main.json",
  fss: base_url + "/up_fss/fss/File/upload",
  componentsScreen: base_url + "/screen",
  login: base_url + "/login",
  pageList: base_url + "/page/list",
  pageUpdate: base_url + "/page/update",
  pageDelete: base_url + "/page/delete",
  historyView: base_url + "/page/history-view",
  //应用相关
  getAppList: base_url + "/app/list",
  updateApp: base_url + "/app/update",
  delApp: base_url + "/app/delete",
  copyApp: base_url + "/app/copy",
  map: "/map/DataPackage/data/map/",
  mapHospital: "/map/DataPackage/data/main.json",
  appVersionList: base_url + "/app/version-list",
  appVersionRelease: base_url + "/app/version-release",
  //数据源
  getDataSourceList: base_url + "/datafile/list",
  updateDataSource: base_url + "/datafile/add",
  delDataSource: base_url + "/datafile/delete",
  syncDataSource: base_url + "/datafile/sync",
  checkSql: base_url + "/datafile/check"
  // 事件
};

export default api;
