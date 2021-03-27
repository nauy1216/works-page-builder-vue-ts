<script lang="tsx">
// https://tingtas.com/vue-draggable-resizable-gorkys/
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { PageStore, EditorStore } from "page-admin/store/modules";
import VueDraggableResizable from "editor/plugins/vue-draggable-resizable/index.vue";
import { EventType } from "page-admin/event-bus";
import { Debounce } from "shared/decorator";

@Component({
  components: {
    VueDraggableResizable
  }
})
export default class Vdr extends BaseVue {
  @Prop({
    required: true,
    type: Object
  })
  comp!: ComponentOption;

  isMoveable = false;
  isDragForce = false;

  $refs!: {
    vdr: Vue & {
      checkParentSize: Function;
    };
    component: Vue;
  };

  mounted() {
    this.$eventBus.$on(EventType.PAGE_RESIZE, this.checkParentSize);
    this.$on("hook:destroyed", () => {
      this.$eventBus.$off(EventType.PAGE_RESIZE, this.checkParentSize);
    });

    const handleKeyup = () => {
      this.isDragForce = false;
    };
    const handleKeydown = (ev: KeyboardEvent) => {
      if (ev.shiftKey) {
        this.isDragForce = true;
      }
    };
    window.addEventListener("keydown", handleKeydown, false);
    window.addEventListener("keyup", handleKeyup, false);
    this.$on("hook:destroyed", () => {
      window.removeEventListener("keydown", handleKeydown, false);
      window.removeEventListener("keyup", handleKeyup, false);
    });
  }

  checkParentSize() {
    if (this.$refs.vdr) {
      this.$refs.vdr.checkParentSize();
    }
  }

  handleDrag(comp: ComponentOption, left, top) {
    // const elScrollbarWrap = document.body.querySelector(".rp-page-canvas .el-scrollbar__wrap")!;
    // const overflowDistanceRight = elScrollbarWrap.clientWidth - (left - elScrollbarWrap.scrollLeft + comp.layoutConfig.width);
    // const overflowDistanceLeft = left - elScrollbarWrap.scrollLeft;
    // const overflowDistanceBottom = elScrollbarWrap.clientHeight - (top - elScrollbarWrap.scrollTop + comp.layoutConfig.height);
    // const overflowDistanceTop = top - elScrollbarWrap.scrollTop;
    // let scrollLeft, scrollTop;
    // if (overflowDistanceRight < 0) {
    //   scrollLeft = Math.min(elScrollbarWrap.scrollLeft - overflowDistanceRight, elScrollbarWrap.scrollWidth - elScrollbarWrap.clientWidth);
    //   scrollTop = elScrollbarWrap.scrollTop;
    //   elScrollbarWrap.scrollTo(scrollLeft, scrollTop);
    // } else if (overflowDistanceLeft < 0) {
    //   scrollLeft = Math.max(elScrollbarWrap.scrollLeft + overflowDistanceLeft, 0);
    //   scrollTop = elScrollbarWrap.scrollTop;
    //   elScrollbarWrap.scrollTo(scrollLeft, scrollTop);
    // } else if (overflowDistanceTop < 0) {
    //   scrollLeft = elScrollbarWrap.scrollLeft;
    //   scrollTop = Math.max(elScrollbarWrap.scrollTop + overflowDistanceTop, 0);
    //   elScrollbarWrap.scrollTo(scrollLeft, scrollTop);
    // } else if (overflowDistanceBottom < 0) {
    //   scrollLeft = elScrollbarWrap.scrollLeft;
    //   scrollTop = Math.min(elScrollbarWrap.scrollTop - overflowDistanceBottom, elScrollbarWrap.scrollHeight - elScrollbarWrap.clientHeight);
    //   elScrollbarWrap.scrollTo(scrollLeft, scrollTop);
    // }
    this.updateCompPosition(comp, left, top);
  }

  @Debounce(200)
  updateCompPosition(comp: ComponentOption, left, top) {
    comp.layoutConfig.x = Math.floor(left);
    comp.layoutConfig.y = Math.floor(top);
    PageStore.checkBoundary(comp);
  }

  handleDragStop(comp: ComponentOption, left, top) {
    const snapTolerance = 20 / EditorStore.zoom;
    if (Math.abs(left) < snapTolerance) {
      comp.layoutConfig.x = 0;
    }
    if (Math.abs(top) < snapTolerance) {
      comp.layoutConfig.y = 0;
    }
    if (Math.abs(PageStore.height - comp.layoutConfig.height - top) < snapTolerance) {
      comp.layoutConfig.y = PageStore.height - comp.layoutConfig.height;
    }
    if (Math.abs(PageStore.width - comp.layoutConfig.width - left) < snapTolerance) {
      comp.layoutConfig.x = PageStore.width - comp.layoutConfig.width;
    }
  }

  @Debounce(200)
  setScale(comp: ComponentOption, left: number, top: number, width: number, height: number) {
    comp.layoutConfig.x = Math.floor(left);
    comp.layoutConfig.y = Math.floor(top);
    comp.layoutConfig.width = Math.floor(width);
    comp.layoutConfig.height = Math.floor(height);
    const { layoutConfig } = this.$componentsConfig[this.comp.componentName];
    comp.useScale.scale = width / layoutConfig.width;
    PageStore.checkBoundary(comp);
  }

  handleResize(comp: ComponentOption, left, top, width, height) {
    this.setScale(comp, left, top, width, height);
  }

  handleDeactivated() {
    //   this.setActiveComp(null);
  }

  handleActivated(comp) {
    PageStore.setActiveComp(comp);
  }

  handleComponentContextMenu($event, comp) {
    this.$emit("contextmenu", $event, comp);
  }

  getRefLineParams(params) {
    this.$emit("refLineParams", params);
  }

  render(h) {
    if (!this.comp) return;
    const { tempData, layoutConfig, useScale } = this.comp;
    let style;
    if (useScale.type === "zoom") {
      style = `zoom:${useScale.scale}`;
    } else if (useScale.type === "transform") {
      style = `transform: scale(${useScale.scale}); transform-origin: 0 0;`;
    } else {
      style = "";
    }
    return (
      this.comp && (
        <vue-draggable-resizable
          ref="vdr"
          on={{ "update:active": value => (tempData.active = value) }}
          active={tempData.active}
          x={layoutConfig.x}
          y={layoutConfig.y}
          w={layoutConfig.width}
          h={layoutConfig.height}
          style={{ zIndex: layoutConfig.zIndex }}
          parent={false}
          draggable={true}
          resizable={true}
          disableUserSelect={true}
          lockAspectRatio={useScale.type === "zoom"}
          debug={false}
          prevent-deactivation={true}
          isConflictCheck={false}
          snap={true}
          snapTolerance={20}
          onDragging={(left, top) => this.handleDrag(this.comp, left, top)}
          onDragstop={(left, top) => this.handleDragStop(this.comp, left, top)}
          onResizestop={(left, top) => this.handleDragStop(this.comp, left, top)}
          onResizing={(left, top, width, height) => this.handleResize(this.comp, left, top, width, height)}
          onDeactivated={this.handleDeactivated}
          onActivated={() => this.handleActivated(this.comp)}
          onRefLineParams={this.getRefLineParams}>
          {
            <div
              onContextmenu={$event => this.handleComponentContextMenu($event, this.comp)}
              staticClass="rp-vdr-wrap"
              class={{
                "rp-vdr-wrap--drag-force": this.isDragForce
              }}>
              {h(this.$components[this.comp.componentName], {
                ref: "component",
                style,
                props: {
                  ...this.comp.componentProps,
                  width: this.comp.layoutConfig.width,
                  height: this.comp.layoutConfig.height,
                  scaleRatio: useScale.scale,
                  componentData: this.comp.componentData
                }
              })}
            </div>
          }
        </vue-draggable-resizable>
      )
    );
  }
}
</script>

<style lang="scss" scoped>
.vdr {
  border: 0 !important;
  &:before {
    content: "";
    width: calc(100%);
    height: calc(100%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999999999;
    box-sizing: border-box;
    border: 1px solid var(--theme-color);
    pointer-events: none;
  }
  /deep/.handle {
    z-index: 100;
    border: 0;
    background: var(--theme-color);
  }
  /deep/.handle-tl {
    top: 0px !important;
    left: 0px !important;
  }
  /deep/.handle-tm {
    top: 0px !important;
    width: 40px !important;
    height: 3px !important;
    left: 50% !important;
    transform: translateX(-50%);
  }
  /deep/.handle-tr {
    top: 0px !important;
    right: 0px !important;
  }
  /deep/.handle-ml {
    left: 0px !important;
    height: 40px !important;
    width: 3px !important;
    top: 50% !important;
    transform: translateY(-50%);
  }
  /deep/.handle-mr {
    right: 0px !important;
    height: 40px !important;
    width: 3px !important;
    top: 50% !important;
    transform: translateY(-50%);
  }

  /deep/.handle-bl {
    bottom: 0px !important;
    left: 0px !important;
  }
  /deep/.handle-bm {
    bottom: 0px !important;
    width: 40px !important;
    height: 3px !important;
    left: 50% !important;
    transform: translateX(-50%);
  }
  /deep/.handle-br {
    bottom: 0px !important;
    right: 0px !important;
  }
}

@include b(vdr-wrap) {
  @include e(tool) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999999999;
    padding: 4px;
    background: #ffffff;
    display: none;
    .iconfont {
      color: var(--theme-color);
    }
  }
  @include e(drag-handle) {
    color: var(--font-color-gray1);
    font-size: 16px;
    &:hover {
      cursor: move;
    }
  }
  @include e(moveable) {
    color: var(--font-color-gray1);
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
    @include m(active) {
      color: var(--theme-color);
    }
  }
  @include m(drag-force) {
    pointer-events: none;
  }
  &:hover {
    @include e(tool) {
      display: flex;
      i ~ i {
        margin-left: 10px;
      }
    }
  }
}
</style>
