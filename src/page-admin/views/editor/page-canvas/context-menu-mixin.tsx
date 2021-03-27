import { Component } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import ContextMenu from "page-admin/components/context-menu/index";
import { PageStore } from "page-admin/store/modules";

@Component({})
export default class ContexMenuMixin extends BaseVue {
  // 画布右键菜单
  handleCanvasContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    (this.$refs.contextMenu as ContextMenu).show(event, [
      {
        command: "delete-all-component",
        name: "删除所有组件",
        handle: () => {
          PageStore.removeAllComponent();
        }
      }
    ]);
  }

  // 组件右键菜单
  handleComponentContextMenu(event, comp: ComponentOption) {
    event.preventDefault();
    event.stopPropagation();
    (this.$refs.contextMenu as ContextMenu).show(event, [
      {
        command: "delete-component",
        name: "删除",
        handle: () => {
          PageStore.removeComponent(comp);
        },
        itemVnode: (
          <div class="rp-page-canvas__context-menu-item">
            <span>删除</span>
            <span>ctrl delete</span>
          </div>
        )
      },
      {
        command: "copy-component",
        name: "复制粘贴",
        handle: () => {
          PageStore.copyComponent(comp);
        },
        itemVnode: (
          <div class="rp-page-canvas__context-menu-item">
            <span>复制粘贴</span>
            <span>ctrl c + ctrl v</span>
          </div>
        )
      },
      {
        command: "auto-width",
        name: "设置宽度与页面宽度一致",
        handle: () => {
          comp.layoutConfig.width = PageStore.width;
        }
      },
      {
        command: "auto-height",
        name: "设置高度与页面高度一致",
        handle: () => {
          comp.layoutConfig.height = PageStore.height;
        }
      },
      {
        command: "horizontal-left",
        name: "左对齐",
        handle: () => {
          comp.layoutConfig.x = 0;
        }
      },
      {
        command: "horizontal-right",
        name: "右对齐",
        handle: () => {
          comp.layoutConfig.x = PageStore.width - comp.layoutConfig.width;
        }
      },
      {
        command: "horizontal-center",
        name: "水平居中",
        handle: () => {
          comp.layoutConfig.x = (PageStore.width - comp.layoutConfig.width) / 2;
        }
      },
      {
        command: "vertical-top",
        name: "顶部对齐",
        handle: () => {
          comp.layoutConfig.y = 0;
        }
      },
      {
        command: "vertical-bottom",
        name: "底部对齐",
        handle: () => {
          comp.layoutConfig.y = PageStore.height - comp.layoutConfig.height;
        }
      },
      {
        command: "vertical-center",
        name: "垂直居中",
        handle: () => {
          comp.layoutConfig.y = (PageStore.height - comp.layoutConfig.height) / 2;
        }
      },
      {
        command: "center",
        name: "中心居中",
        handle: () => {
          comp.layoutConfig.x = (PageStore.width - comp.layoutConfig.width) / 2;
          comp.layoutConfig.y = (PageStore.height - comp.layoutConfig.height) / 2;
        }
      },
      {
        command: "refresh",
        name: "刷新组件",
        handle: () => {
          PageStore.refreshComponent(comp);
        }
      }
    ]);
  }

  renderContextMenu() {
    return <ContextMenu ref="contextMenu"></ContextMenu>;
  }
}
