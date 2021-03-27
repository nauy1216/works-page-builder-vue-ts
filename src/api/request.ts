import axiosInstance from "./index";
import api from "./dict";

// @TODO 后续有时间拆成模块
//--------------------------------------账户--------------------------------------------------
export function login(param: {
  ad_name: string; //用户名
  ad_passwd: string; //密码
}) {
  return axiosInstance.post<{
    basic: {
      ad_id: number;
      ad_name: string;
      ad_passwd: string;
      ad_passwd_salt: string;
      ad_status: number;
      ad_createtime: number;
      ad_logintime: number;
    };
    token: string;
  }>(api.login, param);
}

//--------------------------------------页面--------------------------------------------------
export function pageList(appId: number) {
  return axiosInstance.get<
    {
      id: number;
      hid: number;
      name: string;
    }[]
  >(api.pageList, {
    id: appId
  });
}

export function pageAddOrUpdate(data: {
  pid: number;
  name: string;
  aid: number;
  config_content: string;
  remark: string;
  components: {
    uuid: string;
    config_content: string;
    source_type: string;
    json_content: string;
    did: number;
  }[];
}) {
  return axiosInstance.post<{
    hid: number;
    id: number;
  }>(api.pageUpdate, data);
}

export function historyView(id: number) {
  return axiosInstance.get<{
    components: {
      config_content: string;
      did: number;
      json_content: string;
      sourse_type: number;
      uuid: string;
    }[];
    pages: {
      config_content: string;
      name: string;
    }[];
  }>(api.historyView, { id });
}

export function pageDelete(id: number) {
  return axiosInstance.get<unknown>(api.pageDelete, { id });
}
//--------------------------------------应用--------------------------------------------------
export function getAppList() {
  return axiosInstance.get<
    {
      application_type: number;
      created_at: string;
      height: number;
      id: number;
      last_released_at: string;
      last_released_by: string;
      name: string;
      remark: string;
      template_type: number;
      thumbnail: string;
      width: number;
    }[]
  >(api.getAppList);
}

export function appAddOrUpdate(params: Partial<AppConfig>) {
  return axiosInstance.post<any>(api.updateApp, params);
}
export function delApp(appId: number) {
  return axiosInstance.get<any>(api.delApp, {
    id: appId
  });
}
export function copyApp(appId: number) {
  return axiosInstance.get<any>(api.copyApp, {
    id: appId
  });
}

export function appVersionList(appId: number) {
  return axiosInstance.get<
    {
      id: number;
      page_history: {
        id: string;
        name: string;
      }[];
      relaeased_at: string;
      remark: string;
      version: string;
    }[]
  >(api.appVersionList, { id: appId });
}

export function appVersionRelease(data: { id: number; version: string; remark: string; hids: string }) {
  return axiosInstance.post<unknown>(api.appVersionRelease, data);
}

// -------------------------------------数据源------------------------------------------------------
export function getDataSourceList(params: { id?: number; search: string; page_size: number; page_index: number }) {
  return axiosInstance.get<
    {
      id: number;
      name: string;
      sql_content: string;
      create_time: string;
      update_time: string;
      data_package: string;
    }[]
  >(api.getDataSourceList, params);
}
export function upDataSource(params: { id: number; name: string; remark: string; data_package: string; sql_content: string }) {
  return axiosInstance.post<any>(api.updateDataSource, params);
}
export function delDataSource(dataId: number) {
  return axiosInstance.get<any>(api.delDataSource, {
    id: dataId
  });
}
export function syncDataSource(dataId: number) {
  return axiosInstance.get<any>(api.syncDataSource, {
    id: dataId
  });
}
export function checkSql(sqlString: string) {
  return axiosInstance.post<any>(api.checkSql, {
    sql_content: sqlString
  });
}
