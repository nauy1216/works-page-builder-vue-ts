// 应用设置接口
interface AppConfig {
  id: number;
  application_type: number;
  name: string;
  remark: string;
  width: number;
  height: number;
  template_type: number;
}
interface DataSourceConfig {
  id: number;
  name: string;
  remark: string;
  data_package: string;
  sql_content: string;
}
interface Page {
  id: string;
  name: string;
}
