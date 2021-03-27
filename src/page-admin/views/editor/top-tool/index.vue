<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import PageHeader from "page-admin/components/frame/Header.vue";
import CanvasScale from "editor/plugins/canvas-scale.vue";
import { Debounce } from "shared/decorator";
import EventBus, { EventType } from "page-admin/event-bus";
import { appVersionList, appVersionRelease } from "api/request";
import { getDialog } from "page-admin/components/dialog";

@Component({
  components: { PageHeader }
})
export default class TopTool extends BaseVue {
  versionList: ResponseDetail<typeof appVersionList> = [];
  formData = {
    version: "",
    remark: ""
  };

  @Debounce(300)
  async save() {
    EventBus.$emit(EventType.PAGE_SAVE);
  }

  preview() {
    window.open(`${location.origin}/page-web/${this.$route.query.appId}`);
  }

  getAppVersionList() {
    appVersionList(Number(this.$route.query.appId)).then(res => {
      if (res.code == 200) {
        this.versionList = res.details || [];
      }
    });
  }

  publish() {
    const rules = {};
    getDialog().show({
      dialogProps: {
        title: "",
        width: "460px"
      },
      confirm: close => {
        appVersionRelease({
          id: Number(this.$route.query.appId),
          version: "1.0.1",
          remark: "this.$route.query.appId",
          hids: "972,943,962,973,959,904"
        }).then(res => {
          if (res.code == 200) {
            this.$message.success("发布成功");
            close();
          }
        });
      },
      renderContent: () => {
        return (
          <el-form ref="form" props={{ model: {} }} rules={rules} label-width="60px">
            <el-form-item label="版本号" prop="name">
              <el-input maxlength="10" vModel={this.formData.version}></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="name">
              <el-input type="textarea" maxlength="30" vModel={this.formData.remark}></el-input>
            </el-form-item>
          </el-form>
        );
      }
    });
  }

  render() {
    return (
      <PageHeader>
        <div
          class="rp-top-tool__goback"
          onClick={() => {
            this.$router.go(-1);
          }}>
          <i class="el-icon-arrow-left"></i>
          {this.$route.query.name}
        </div>
        <div class="rp-top-tool">
          <div>
            {/**            <el-button type="text">
              <i class="iconfont icon-shezhi"></i>应用设置
            </el-button> */}
            <el-button
              type="text"
              onClick={() => {
                this.$router.push(`/dataSource?appId=${this.$route.query.appId}`);
              }}>
              <i class="iconfont icon-shujuyuanguanli-02"></i>
              数据源管理
            </el-button>
          </div>
          <div>
            <el-button type="text" class="rp-top-tool__preview" onClick={this.preview}>
              预览
            </el-button>
            <CanvasScale></CanvasScale>
          </div>
          <div class="rp-top-tool__right">
            {/**
                        <el-popover placement="bottom" width="400" trigger="click">
              <el-table data={this.versionList}>
                <el-table-column property="version" label="版本号"></el-table-column>
                <el-table-column property="relaeased_at" label="发布时间"></el-table-column>
                <el-table-column label="操作">
                  {() => {
                    return (
                      <div>
                        <el-button type="text">还原</el-button>
                        <el-button type="text" onClick={this.preview}>
                          预览
                        </el-button>
                      </div>
                    );
                  }}
                </el-table-column>
                <el-table-column property="remark" label="备注"></el-table-column>
              </el-table>
              <el-button type="text" slot="reference" onClick={this.getAppVersionList}>
                <i class="iconfont icon-banbenjilu"></i>版本记录
              </el-button>
            </el-popover> */}

            <el-button type="text" onClick={this.save}>
              <i class="iconfont icon-baocun"></i>保存
            </el-button>
            {/**            <el-button type="text">
              <i class="iconfont icon-jilu"></i>最近保存
            </el-button>
            <el-button type="text" onClick={this.publish}>
              <i class="iconfont icon-fabu"></i>发布
            </el-button> */}
          </div>
        </div>
      </PageHeader>
    );
  }
}
</script>
<style scoped lang="scss">
@include b(top-tool) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 100px;
  @include e(goback) {
    height: 100%;
    float: left;
    display: inline-flex;
    align-items: center;
    color: #7e7e7e;
    .el-icon-arrow-left {
      margin-right: 10px;
    }
    &:hover {
      cursor: pointer;
      color: var(--theme-color);
    }
  }
  @include e(preview) {
    color: #7e7e7e;
    font-size: 16px;
    &:hover {
      color: var(--theme-color);
    }
  }
  .iconfont {
    margin-right: 4px;
  }
  .el-button--text {
    display: inline-flex;
    align-items: center;
  }
  @include e(right) {
    & > * + * {
      margin-left: 40px;
    }
  }
}
</style>
