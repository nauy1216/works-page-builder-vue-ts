<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import ComponentBaseInfo from "editor/plugins/component-base-info.vue";
import PageBaseInfo from "editor/plugins/page-base-info.vue";
import DataSource from "editor/plugins/data-source.vue";
import componentEvent from "./event/index.vue";

@Component({
  components: {
    ComponentBaseInfo,
    PageBaseInfo,
    DataSource,
    componentEvent
  }
})
export default class RightTool extends BaseVue {
  activeName = "1";

  render() {
    return (
      <div class="rp-right-tool">
        <el-tabs vModel={this.activeName}>
          <el-tab-pane label="基础" name="1">
            <ComponentBaseInfo></ComponentBaseInfo>
          </el-tab-pane>
          <el-tab-pane label="数据源" name="2">
            <DataSource></DataSource>
          </el-tab-pane>
          <el-tab-pane label="交互" name="3">
            <component-event></component-event>
          </el-tab-pane>
          <el-tab-pane label="页面设置" name="4">
            <PageBaseInfo></PageBaseInfo>
          </el-tab-pane>
        </el-tabs>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@include b(right-tool) {
}
</style>
