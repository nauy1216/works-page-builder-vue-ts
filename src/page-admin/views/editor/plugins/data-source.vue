<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { DataSourceType } from "shared/const";
import { getDataSourceList } from "api/request";
import { PageStore } from "page-admin/store/modules";
import packageManager from "api/package-manager";

type PackageList = ResponseDetail<typeof getDataSourceList>;
type Package = ItemOfArray<PackageList>;

@Component
export default class ComponentBaseInfo extends BaseVue {
  packageList: PackageList = [];
  isUsePackageSampleData = false; // 是否使用包作为示例数据

  created() {
    this.getSourceList();
    this.$watch(
      () => {
        return PageStore.activeComp;
      },
      () => {
        if (PageStore.activeComp) {
          this.isUsePackageSampleData = !!PageStore.activeComp.dataSource.jsonPackageId;
        }
      }
    );
  }

  // 获取数据包列表
  getSourceList() {
    getDataSourceList({ search: "", page_size: 9999999, page_index: 1 }).then(res => {
      if (res.code === 200) {
        this.packageList = res.details || [];
      }
    });
  }

  // 数据检测
  dataCheck(data: any) {
    const dataChecker = this.$componentsConfig[PageStore.activeComp!.componentName].dataChecker;
    if (dataChecker && dataChecker.assert) {
      try {
        dataChecker.assert(data);
      } catch (e) {
        this.$notify({
          title: "数据结构错误",
          message: <div style="color: red; word-break: break-all;">{e.toString()}</div>,
          duration: 0
        });
      }
    }
  }

  // 刷新组件
  refreshComponent() {
    if (!PageStore.activeComp) return;
    switch (PageStore.activeComp.dataSource.type) {
      case DataSourceType.json: {
        // 使用静态json
        try {
          const data = JSON.parse(PageStore.activeComp.dataSource.jsonContent);
          this.dataCheck(data);
          PageStore.activeComp.componentData = data;
        } catch (e) {
          this.$notify({
            title: "数据格式错误",
            message: <div style="color: red">请输入正确的json格式</div>,
            duration: 0
          });
          PageStore.activeComp.componentData = null;
        }
        break;
      }
      case DataSourceType.package: {
        if (!PageStore.activeComp.dataSource.packageId) {
          this.$message.error("请选择数据包");
          return;
        }
        // 绑定数据包
        packageManager.fetch(`/dataSource/${PageStore.activeComp.dataSource.packageId}.json`).then(data => {
          this.dataCheck(data);
          PageStore.activeComp!.componentData = data;
        });
        break;
      }
    }
    PageStore.refreshComponent(PageStore.activeComp);
  }

  // 选择示例数据
  usePackageSampleData(flag: boolean) {
    this.isUsePackageSampleData = flag;
    const mockData = this.$componentsConfig[PageStore.activeComp!.componentName].mockData;
    if (!this.isUsePackageSampleData) {
      // 使用组件的示例数据
      PageStore.activeComp!.dataSource.jsonContent = JSON.stringify(mockData, null, 2);
    } else {
      // 拉取数据包
      PageStore.activeComp!.dataSource.jsonContent = "";
      PageStore.activeComp!.dataSource.jsonPackageId = null;
    }
  }

  // 绑定数据包
  bindPackage(pack: Package) {
    PageStore.activeComp!.dataSource.packageId = pack.id;
  }

  // 静态json使用数据包
  bindComponentJsonContent(pack: Package) {
    packageManager.bindComponentJsonContent(`/dataSource/${pack.id}.json`, PageStore.activeComp!);
  }

  // 数据绑定方式改变
  dataSourceTypeChange() {
    if (!PageStore.activeComp) return;
    switch (PageStore.activeComp.dataSource.type) {
      case DataSourceType.package: {
        PageStore.activeComp.dataSource.jsonContent = "";
        PageStore.activeComp.dataSource.jsonPackageId = null;
        break;
      }
      case DataSourceType.json: {
        PageStore.activeComp.dataSource.packageId = null;
        this.usePackageSampleData(this.isUsePackageSampleData);
        break;
      }
    }
  }

  // 数据包选择
  renderPackage() {
    return (
      <el-form-item label="数据包" label-width="120px">
        <el-select filterable v-model={PageStore.activeComp!.dataSource.packageId} placeholder="请选择数据包">
          {this.packageList.map(pack => {
            return (
              <el-option
                label={pack.name}
                value={pack.id}
                nativeOnclick={() => {
                  this.bindPackage(pack);
                }}></el-option>
            );
          })}
        </el-select>
      </el-form-item>
    );
  }

  // 输入静态json
  renderStaticJson() {
    return (
      <div>
        <div style="display: flex; justify-content: flex-end; margin-bottom: 18px;">
          <el-button
            type={!this.isUsePackageSampleData ? "primary" : ""}
            onClick={() => {
              this.usePackageSampleData(false);
            }}>
            基于示例数据创建
          </el-button>
          <el-button
            type={this.isUsePackageSampleData ? "primary" : ""}
            onClick={() => {
              this.usePackageSampleData(true);
            }}>
            基于数据包创建
          </el-button>
        </div>
        {this.isUsePackageSampleData && (
          <el-form-item label="选择数据包" label-width="120px">
            <el-select v-model={PageStore.activeComp!.dataSource.jsonPackageId} placeholder="请选择数据包">
              {this.packageList.map(pack => {
                return (
                  <el-option
                    label={pack.name}
                    value={pack.id}
                    nativeOnclick={() => {
                      this.bindComponentJsonContent(pack);
                    }}></el-option>
                );
              })}
            </el-select>
          </el-form-item>
        )}
        <el-input type="textarea" autosize={{ minRows: 30, maxRows: 40 }} v-model={PageStore.activeComp!.dataSource.jsonContent} placeholder="请输入json数据"></el-input>
      </div>
    );
  }

  render() {
    const activeComp = PageStore.activeComp;
    if (!activeComp) return null;
    const renderMap = {
      [DataSourceType.package]: this.renderPackage,
      [DataSourceType.json]: this.renderStaticJson
    };
    return (
      <el-form label-position="right" label-width="80px">
        <el-form-item label="数据绑定方式" label-width="120px">
          <el-select filterable v-model={activeComp.dataSource.type} onChange={this.dataSourceTypeChange} placeholder="请选择">
            <el-option label="无" value={DataSourceType.none}></el-option>
            <el-option label="数据包" value={DataSourceType.package}></el-option>
            <el-option label="手动输入" value={DataSourceType.json}></el-option>
          </el-select>
        </el-form-item>
        {renderMap[activeComp.dataSource.type] ? renderMap[activeComp.dataSource.type]() : null}
        <div style="margin-top: 20px; text-align: center">
          <el-button type="primary" onClick={this.refreshComponent}>
            确定
          </el-button>
        </div>
      </el-form>
    );
  }
}
</script>

<style lang="scss" scoped></style>
