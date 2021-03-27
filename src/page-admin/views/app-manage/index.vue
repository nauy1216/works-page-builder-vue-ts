<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import { getDialog } from "page-admin/components/dialog";
import { AppType } from "shared/const";
import { BeforeRouteEnter, BeforeRouteLeave, NextFunc, Route } from "types/routeHooks";
import { getAppList, appAddOrUpdate, delApp, copyApp } from "api/request";

type AppList = ResponseDetail<typeof getAppList>;
type App = ItemOfArray<AppList>;
@Component
export default class AppManage extends BaseVue implements BeforeRouteEnter, BeforeRouteLeave {
  beforeRouteLeave(to: Route, from: Route, next: NextFunc): void {
    next();
  }

  beforeRouteEnter(to: Route, from: Route, next: NextFunc): void {
    next();
  }

  appConfig: Partial<AppConfig> = {
    id: 0,
    name: "",
    application_type: 1,
    template_type: 1,
    remark: "",
    width: 1920,
    height: 1080
  };
  rules = {};
  dialogTitle = "创建应用";
  isShowDetail = true;
  curShowDetailData = {
    application_type: 1,
    created_at: "2020-12-01 14:18:40",
    height: 1080,
    id: 3,
    last_released_at: "",
    last_released_by: "",
    name: "",
    remark: "",
    template_type: 1,
    thumbnail: "",
    width: 1920
  };

  appListData: AppList = [];

  showBase() {
    getDialog().show({
      dialogProps: {
        title: this.dialogTitle,
        width: "460px"
      },
      confirm: this.confirmForm,
      renderContent: () => {
        return (
          <el-form ref="form" props={{ model: this.appConfig }} rules={this.rules} label-width="80px">
            <el-form-item label="应用名称" prop="name">
              <el-input vModel={this.appConfig.name} maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="屏幕尺寸" prop="name">
              <el-input vModel={this.appConfig.width} placeholder="宽" style="width: 80px;text-align:center"></el-input>
              <span style="margin: 0 10px;">x</span>
              <el-input vModel={this.appConfig.height} placeholder="高" style="width: 80px;text-align:center"></el-input>
            </el-form-item>
            <el-form-item label="应用类型" prop="name">
              <el-select vModel={this.appConfig.application_type} placeholder="请选择">
                <el-option label="大屏可视化" value={AppType.dp}></el-option>
                <el-option label="h5" value={AppType.h5} disabled></el-option>
                <el-option label="小程序" value={AppType.mp} disabled></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模板" prop="name" v-show={this.appConfig.application_type == 1}>
              <el-select vModel={this.appConfig.template_type} placeholder="请选择">
                <el-option label="主页" value={1}></el-option>
                <el-option label="中控" value={2}></el-option>
                <el-option label="侧屏" value={3}></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="name">
              <el-input vModel={this.appConfig.remark} type="textarea" maxlength="30"></el-input>
            </el-form-item>
          </el-form>
        );
      }
    });
  }

  render() {
    return (
      <div>
        <ul class="rp-app-list">
          {this.appListData?.map((item, index) => {
            return (
              <li
                class="rp-app-list__item"
                key={index}
                onClick={() => {
                  this.onEditModelPage(item);
                }}
                onMouseenter={() => {
                  this.mouseEnterItem(item);
                }}
                onMouseleave={() => {
                  this.isShowDetail = false;
                }}>
                <div class="rp-model">
                  <img v-show={item.thumbnail} src={item.thumbnail} class="rp-model-img" />
                  <img v-show={!item.thumbnail} src="/images/module_defult_them.png" class="rp-model-defult-img" />
                </div>
                <div class="rp-des">
                  {item.name}
                  <el-dropdown>
                    <span class="el-dropdown-link" onClick={ev => ev.stopPropagation()}>
                      <i class="el-icon-s-tools"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        icon="el-icon-edit"
                        nativeOnClick={() => {
                          this.onEditModel(item);
                        }}>
                        重命名
                      </el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-document-copy"
                        nativeOnClick={() => {
                          this.onCopyModel(item.id);
                        }}>
                        复制
                      </el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-delete"
                        nativeOnClick={() => {
                          this.onDeletModel(Number(item.id));
                        }}>
                        删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </li>
            );
          })}
          <li class="rp-app-list__item rp-app-list__item--add" onClick={this.onCreateModel}>
            <i class="el-icon-circle-plus-outline"></i>
          </li>
        </ul>
        <div class="rp-hover-foot" v-show={this.isShowDetail}>
          <i
            class="el-icon-close"
            onClick={() => {
              this.onCloseDetailView();
            }}></i>
          <ul>
            <li>
              <span>应用名称：{this.curShowDetailData.name}</span>
              <span>应用类型：{this.application_type_filter(this.curShowDetailData.application_type)}</span>
            </li>
            <li>
              <span>模板：{this.template_type_filter(this.curShowDetailData.template_type)}</span>
              <span>尺寸：{this.curShowDetailData.width + "*" + this.curShowDetailData.height}</span>
            </li>
            <li>
              <span>创建时间：{this.curShowDetailData.created_at}</span>
              <span>最后发布时间：{this.curShowDetailData.last_released_at}</span>
            </li>
            <li>
              <span>描述：{this.curShowDetailData.remark}</span>
              <span>最后修改：{this.curShowDetailData.last_released_by}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  created() {
    this.getAppList();
  }

  getAppList() {
    getAppList()
      .then(res => {
        if (res.code === 200) {
          this.appListData = res.details || [];
        }
      })
      .finally(() => {
        // this.loading = false;
      });
  }

  onCreateModel() {
    //创建模板-基本信息
    this.dialogTitle = "创建应用";
    this.appConfig = {
      id: 0,
      name: "",
      application_type: 1,
      template_type: 1,
      remark: "",
      width: 1920,
      height: 1080
    };
    this.showBase();
  }
  onEditModel(data: Record<string, any>) {
    //编辑模板-基本信息
    this.dialogTitle = "编辑应用";
    this.appConfig = data;
    this.showBase();
  }
  onCopyModel(id: number) {
    copyApp(id).then(res => {
      if (res.code == 200) {
        this.$message({
          message: "复制成功",
          type: "success"
        });
        this.getAppList();
      }
    });
  }
  onDeletModel(id: number) {
    this.$confirm("确定删除该模板?", "", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        delApp(id).then(res => {
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAppList();
          }
        });
      })
      .catch(() => {
        // done
      });
  }
  onEditModelPage(app: App) {
    this.$router.push({ path: "/editor", query: { appId: String(app.id), width: String(app.width), height: String(app.height), name: app.name } });
  }
  confirmForm(close) {
    const params: Partial<AppConfig> = {
      id: this.appConfig.id,
      name: this.appConfig.name,
      application_type: this.appConfig.application_type,
      template_type: this.appConfig.template_type,
      remark: this.appConfig.remark,
      width: Number(this.appConfig.width),
      height: Number(this.appConfig.height)
    };

    appAddOrUpdate(params).then(res => {
      if (res.code == 200) {
        if (this.dialogTitle == "创建应用") {
          this.$router.push({ path: "/editor", query: { appId: String(this.appConfig.id), width: String(this.appConfig.width!), height: String(this.appConfig.height!), name: this.appConfig.name } });
          close();
        } else {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.getAppList();
          close();
        }
      }
    });
  }
  mouseEnterItem(item: any) {
    this.curShowDetailData = item;
    this.isShowDetail = true;
  }
  onCloseDetailView() {
    this.isShowDetail = false;
  }
  application_type_filter(key: number) {
    const filterObj = {
      0: "",
      1: "大屏",
      2: "移动端"
    };
    return filterObj[key] || "";
  }
  template_type_filter(key: number) {
    const filterObj = {
      0: "",
      1: "主页大屏",
      2: "中控",
      3: "侧屏"
    };
    return filterObj[key] || "";
  }
}
</script>
<style scoped lang="scss">
@include b(app-list) {
  list-style: none;
  overflow: hidden;
  //display: flex;
  @include e(item) {
    float: left;
    box-sizing: border-box;
    margin-right: 77px;
    margin-bottom: 20px;
    width: 282px;
    height: 282px;
    border-radius: 10px;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    .rp-model {
      position: relative;
      width: 282px;
      height: 214px;
      .rp-model-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .rp-model-defult-img {
        width: 129px;
        height: 113px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .rp-des {
      position: relative;
      width: 100%;
      height: 66px;
      line-height: 66px;
      text-align: center;
      color: #1296db;
      font-size: 18px;
      .el-dropdown {
        position: absolute;
        right: 0;
        top: 0;
        height: 48px;
        width: 50px;
        .el-icon-s-tools {
          cursor: pointer;
          color: #1296db;
          font-size: 18px;
        }
      }
    }
    @include m(add) {
      position: relative;
      cursor: pointer;
      .el-icon-circle-plus-outline {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 30px;
        color: #1296db;
      }
    }
  }
}
.rp-hover-foot {
  box-sizing: border-box;
  padding: 40px 20px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  pointer-events: none;
  right: 40px;
  width: calc(100vw - 260px);
  height: 228px;
  box-shadow: 0 3px 10px 0 #666;
  opacity: 0.54;
  background: #999;
  //color: #454545;
  //color: #cef5f2ff;
  animation: 0.4s;
  .el-icon-close {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 20px;
    cursor: pointer;
  }
  li {
    display: flex;
    justify-content: space-between;
    text-align: left;
    margin-bottom: 30px;
    span {
      flex: 1;
    }
  }
}
</style>
