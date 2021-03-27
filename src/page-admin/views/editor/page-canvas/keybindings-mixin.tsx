import { Component } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { EditorStore, PageStore } from "page-admin/store/modules";

@Component({})
export default class ContexMenuMixin extends BaseVue {
  dragcanvas = false;

  created() {
    let copyComptarget: ComponentOption | null = null;
    const moveStep = 1;

    const keybindings = {
      // "Control +"
      "Control =": () => {
        EditorStore.setZoom(EditorStore.zoom + 0.01);
      },
      // "Control -"
      "Control -": () => {
        EditorStore.setZoom(EditorStore.zoom - 0.01);
      },
      "Control ArrowUp": () => {
        if (PageStore.activeComp) {
          PageStore.activeComp.layoutConfig.y -= moveStep;
          PageStore.checkBoundary(PageStore.activeComp);
        }
      },
      "Control ArrowDown": () => {
        if (PageStore.activeComp) {
          PageStore.activeComp.layoutConfig.y += moveStep;
          PageStore.checkBoundary(PageStore.activeComp);
        }
      },
      "Control ArrowLeft": () => {
        if (PageStore.activeComp) {
          PageStore.activeComp.layoutConfig.x -= moveStep;
          PageStore.checkBoundary(PageStore.activeComp);
        }
      },
      "Control ArrowRight": () => {
        if (PageStore.activeComp) {
          PageStore.activeComp.layoutConfig.x += moveStep;
          PageStore.checkBoundary(PageStore.activeComp);
        }
      },
      "Control c": () => {
        copyComptarget = PageStore.activeComp;
      },
      "Control v": () => {
        if (copyComptarget) {
          PageStore.copyComponent(copyComptarget);
          copyComptarget = null;
        }
      },
      "Control Delete": () => {
        if (PageStore.activeComp) {
          PageStore.removeComponent(PageStore.activeComp);
        }
      },
      "Control Control": () => {
        this.dragcanvas = true;
      },
      Tab: () => {
        PageStore.setNextActiveComp();
      }
    };

    const handleKeydown = (ev: KeyboardEvent) => {
      const key = (ev.ctrlKey ? "Control " : "") + ev.key;
      if (keybindings[key]) {
        keybindings[key] && keybindings[key]();
        ev.preventDefault();
      }
    };

    const handleKeyup = () => {
      // const key = (ev.ctrlKey ? "Control " : "") + ev.key;
      // if (key == "Control") {
      this.dragcanvas = false;
      // }
    };

    window.addEventListener("keydown", handleKeydown, false);
    window.addEventListener("keyup", handleKeyup, false);
    this.$on("hook:destroyed", () => {
      window.removeEventListener("keydown", handleKeydown, false);
      window.removeEventListener("keyup", handleKeyup, false);
    });
  }
}
