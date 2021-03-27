<script lang="tsx">
import { uuid } from "shared/utils/index";
import { Component, Mixins } from "vue-property-decorator";
import { PageStore, EditorStore } from "page-admin/store/modules";
import ContexMenuMixin from "./context-menu-mixin";
import DragMixin from "./drag-mixin";
import keybindingsMixin from "./keybindings-mixin";
import LayoutPosition from "./layout-position.vue";
import { Logger } from "shared/utils";
import { EventType } from "page-admin/event-bus";
import { DataSourceType } from "shared/const";

@Component({
  components: { LayoutPosition }
})
export default class PageContent extends Mixins(ContexMenuMixin, DragMixin, keybindingsMixin) {
  $refs!: {
    viewport: Vue & {
      update: Function;
    };
  };

  mounted() {
    this.$eventBus.$on(EventType.PAGE_RESIZE, this.updateScrollbar);
    this.$eventBus.$on(EventType.PAGE_SCALE, this.updateScrollbar);
    this.$on("hook:destroyed", () => {
      this.$eventBus.$off(EventType.PAGE_RESIZE, this.updateScrollbar);
      this.$eventBus.$off(EventType.PAGE_SCALE, this.updateScrollbar);
    });
  }

  updateScrollbar() {
    this.$nextTick(() => {
      if (this.$refs.viewport) {
        this.$refs.viewport.update();
      }
    });
  }

  createBackground(x, y, lineWidth = 1) {
    if (!EditorStore.isVisibleGrid) return "";
    return `linear-gradient(-90deg, rgba(64,158,255, 0.3) ${lineWidth}px, transparent  ${lineWidth}px) 0% 0% / ${5 * x}px ${5 * x}px, 
            linear-gradient(-90deg, rgba(64,158,255, 0.5) ${lineWidth}px, transparent  ${lineWidth}px) 0% 0% / ${25 * x}px ${25 * x}px, 
            linear-gradient(-90deg, rgba(0, 0, 0, 0.1)  ${lineWidth}px, transparent  ${lineWidth}px) 0% 0% / ${x}px ${x}px, 
            linear-gradient(rgba(64,158,255, 0.3)  ${lineWidth}px, transparent  ${lineWidth}px) 0% 0% / ${5 * y}px ${5 * y}px, 
            linear-gradient(rgba(64,158,255, 0.5)  ${lineWidth}px, transparent  ${lineWidth}px) 0% 0% / ${25 * y}px ${25 * y}px, 
            linear-gradient(rgba(0, 0, 0, 0.1)  ${lineWidth}px, transparent  ${lineWidth}px) 0% 0% / ${y}px ${y}px`;
  }

  handlePageDrageover(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  scalePosition(n: number) {
    return parseInt(String(n / EditorStore.zoom));
  }

  // 从组件列表拖拽组件释放
  handlePageDrop(event) {
    const elScrollbarWrap = (this.$refs.viewport as Vue).$el.querySelector(".el-scrollbar__wrap")!;
    const comp = PageStore.dragComp;
    if (comp && comp.options) {
      // 设置组件所在位置
      if (!this.$componentsConfig[comp.options.name]) {
        Logger.error(`未找到组件 ${comp.options.name} 的配置文件, 请检查组件名是否正确。`);
        return;
      }
      const componentConfig: ComponentConfig = JSON.parse(JSON.stringify(this.$componentsConfig[comp.options.name]));
      const rect = elScrollbarWrap.getBoundingClientRect();

      const config = componentConfig.layoutConfig;
      config.x = this.scalePosition(event.clientX - rect.left + elScrollbarWrap.scrollLeft);
      config.y = this.scalePosition(event.clientY - rect.top + elScrollbarWrap.scrollTop);

      config.x = Math.max(0, config.x);
      config.y = Math.max(0, config.y);
      config.x = Math.min(PageStore.width - config.width, config.x);
      config.y = Math.min(PageStore.height - config.height, config.y);

      if (config.width > PageStore.width) {
        config.x = 0;
      }

      if (config.height > PageStore.height) {
        config.y = 0;
      }

      if (componentConfig.useScale.type === "none") {
        // 如果为none, 表示不缩放
        componentConfig.useScale.scale = 1;
      } else {
        if (componentConfig.useScale.scale! <= 0) {
          Logger.error(`组件[${comp.options.name}] useScale.scale 的值为${componentConfig.useScale.scale}, 必须大于0`);
          componentConfig.useScale.scale = 1;
        }
        const scale = componentConfig.useScale.scale || 1;
        // 以设计搞为基准去缩放
        config.width = scale * config.width;
        config.height = scale * config.height;
      }
      // 设置默认属性
      const data: ComponentOption["componentProps"] = {};
      const props = componentConfig.componentProps;
      props &&
        Object.keys(props).forEach(key => {
          if (typeof props[key].default == "function") {
            data[key] = props[key].default();
          } else {
            data[key] = props[key].default;
          }
        });

      // 配置的示例数据
      const mockData = this.$componentsConfig[comp.options.name].mockData;

      PageStore.addComponent({
        id: uuid(),
        componentName: comp.options.name,
        event: componentConfig.event,
        alias: componentConfig.alias,
        useScale: JSON.parse(JSON.stringify(componentConfig.useScale)),
        desc: "",
        layoutConfig: config,
        componentProps: data,
        // 默认使用静态数据源，会将示例数据展示出来
        dataSource: {
          type: mockData ? DataSourceType.json : DataSourceType.none,
          jsonContent: mockData ? JSON.stringify(mockData, null, 2) : "",
          packageId: null,
          jsonPackageId: null
        },
        componentData: (mockData as any) || null,
        tempData: {
          active: true,
          key: uuid(),
          lockAspectRatio: true
        }
      });
    }
  }

  render() {
    return (
      <div
        class="rp-page-canvas view-port"
        style={{
          cursor: this.isStartMove ? "pointer" : ""
        }}>
        <el-scrollbar viewClass="rp-page-canvas__scrollbar" ref="viewport">
          <div
            staticClass="page-content"
            ref="pageContent"
            style={{
              width: PageStore.width + "px",
              height: PageStore.height + "px",
              zoom: EditorStore.zoom,
              transition: this.isStartMove ? "none" : "padding 0.3s  ease-out",
              padding: `${Math.max(0, this.distanceY)}px ${-Math.min(0, this.distanceX)}px ${-Math.min(0, this.distanceY)}px ${Math.max(0, this.distanceX)}px`
            }}
            onDragover={this.handlePageDrageover}
            onDrop={this.handlePageDrop}
            onContextmenu={this.handleCanvasContextMenu}>
            <LayoutPosition
              class={{
                "rp-page-canvas--drag": this.dragcanvas
              }}
              style={{
                background: this.createBackground(EditorStore.grid, EditorStore.grid, 1 / EditorStore.zoom),
                zoom: 1 / EditorStore.zoom,
                transform: `scale(${EditorStore.zoom})`,
                "transform-origin": "0 0"
              }}
              width={PageStore.width}
              height={PageStore.height}
              onContextmenu={this.handleComponentContextMenu}></LayoutPosition>
          </div>
          {this.renderContextMenu()}
        </el-scrollbar>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.view-port {
  .page-content {
    position: relative;
    // padding: 200px;
    // &:after {
    //   content: "";
    //   display: block;
    //   width: 100%;
    //   height: 100%;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   z-index: 100;
    //   box-shadow: inset 0 0 0px 1px rgb(64, 158, 255);
    //   pointer-events: none;
    // }
  }
}
</style>
<style lang="scss">
@include b(page-canvas) {
  user-select: none;
  @include e(scrollbar) {
    width: 100%;
    max-height: calc(100vh - var(--header-height) - 40px);
  }
  @include e(context-menu-item) {
    width: 250px;
    display: flex;
    justify-content: space-between;
  }
  @include m(drag) {
    pointer-events: none !important;
    & * {
      pointer-events: none !important;
    }
  }
}
</style>
