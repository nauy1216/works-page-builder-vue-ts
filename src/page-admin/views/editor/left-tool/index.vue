<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import ComponentList from "editor/plugins/component-list.vue";
import PageManage from "editor/plugins/page-manage.vue";
import VueDraggableResizable from "editor/plugins/vue-draggable-resizable/index.vue";

@Component({
  components: {
    ComponentList,
    PageManage,
    VueDraggableResizable
  }
})
export default class LeftTool extends BaseVue {
  height = 200;
  maxHeight = 500;

  handleResize(left, top, width, height) {
    this.height = height;
  }

  $refs!: {
    pageManage: Vue & {
      addPage: Function;
    };
  };

  mounted() {
    this.calcMaxHeight();
    window.addEventListener("resize", this.calcMaxHeight);
    this.$on("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.calcMaxHeight);
    });
  }

  calcMaxHeight() {
    const bodyHeight = document.body.clientHeight;
    this.maxHeight = Math.max(0, bodyHeight - 200);
    this.height = Math.max(0, Math.min(this.maxHeight, this.height));
  }

  handleAddPage() {
    this.$refs.pageManage && this.$refs.pageManage.addPage();
  }

  render() {
    return (
      <div class="rp-left-tool">
        <div class="rp-left-tool__left">
          <i class="iconfont icon-chuangjian" onClick={this.handleAddPage}></i>
          {/**          <i class="iconfont icon-wenben"></i>
          <i class="iconfont icon-shipin"></i>
          <i class="iconfont icon-tupian"></i>
          <i class="iconfont icon-iFrame"></i> */}
        </div>
        <div class="rp-left-tool__right">
          <div
            style={{
              height: this.height + "px",
              marginBottom: "10px"
            }}>
            <VueDraggableResizable
              x={0}
              y={0}
              w={220}
              h={this.height}
              maxHeight={this.maxHeight}
              draggable={false}
              handles={["bm"]}
              active={true}
              prevent-deactivation={true}
              onResizing={this.handleResize}>
              <PageManage ref="pageManage" height={this.height}></PageManage>
            </VueDraggableResizable>
          </div>
          <ComponentList height={`calc(100vh - var(--header-height) - ${this.height}px)`}></ComponentList>
        </div>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@include b(left-tool) {
  display: flex;
  @include e(left) {
    flex: 0 0 40px;
    box-shadow: 0 0 2px 0px #e0e0e0;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 100;
    .iconfont {
      font-size: 20px;
      color: var(--theme-color);
      &:hover {
        cursor: pointer;
      }
    }
    .iconfont + .iconfont {
      margin-top: 20px;
    }
  }

  @include e(right) {
    flex: 1 1 100%;
  }

  .vdr {
    border: none;
    border-bottom: 1px solid rgb(235, 238, 245) !important;
  }
  /deep/.handle-bm {
    border: none !important;
    width: 40px !important;
    height: 4px !important;
    background: var(--theme-color) !important;
    left: 50% !important;
    transform: translate(-20px, 3px);
  }
}
</style>
