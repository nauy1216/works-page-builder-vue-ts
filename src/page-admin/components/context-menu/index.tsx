import { Component } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { VNode } from "vue/types/umd";

export interface MenuCommand {
  command: string;
  name: string;
  handle: () => void;
  itemVnode?: VNode;
}

@Component
export default class ContextMenu extends BaseVue {
  x = 0;
  y = 0;
  options: MenuCommand[] = [];

  $refs!: {
    trigger: HTMLElement;
  };

  show(event: MouseEvent, options: MenuCommand[]) {
    this.x = event.clientX;
    this.y = event.clientY;
    this.options = options;
    this.$refs.trigger.click();
  }

  handleCommand(command: string) {
    for (const c of this.options as MenuCommand[]) {
      if (c.command === command) {
        c.handle();
        break;
      }
    }
  }

  render() {
    return (
      <div style={{ left: this.x + "px", top: this.y + "px", position: "fixed" }}>
        <el-dropdown trigger="click" onCommand={this.handleCommand}>
          <span ref="trigger" style="position: fixed; z-index: 1000;" class="rp-context-menu__trigger"></span>
          <el-dropdown-menu slot="dropdown">
            {this.options.map(command => (
              <el-dropdown-item key={command.command} command={command.command}>
                {command.itemVnode ? command.itemVnode : command.name}
              </el-dropdown-item>
            ))}
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    );
  }
}
