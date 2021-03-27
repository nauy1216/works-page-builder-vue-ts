<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { PageStore } from "page-admin/store/modules";

@Component
export default class ComponentBaseInfo extends BaseVue {
  render() {
    return (
      <el-form label-position="right" label-width="80px">
        <el-form-item label="页面宽度">
          <el-input-number
            controls-position="right"
            value={PageStore.width}
            onInput={width => {
              PageStore.setPageWidth(width);
            }}></el-input-number>
        </el-form-item>
        <el-form-item label="页面高度">
          <el-input-number
            controls-position="right"
            value={PageStore.height}
            onInput={height => {
              PageStore.setPageHeight(height);
            }}></el-input-number>
        </el-form-item>
      </el-form>
    );
  }
}
</script>

<style lang="scss" scoped>
.el-input-number {
  width: 100px !important;
}
</style>
