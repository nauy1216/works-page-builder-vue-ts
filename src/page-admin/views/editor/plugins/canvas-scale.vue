<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import { EditorStore } from "page-admin/store/modules";

type Option = {
  label: string;
  value: number;
  divided?: boolean;
  isAdd?: boolean;
  keybinding?: string;
};

@Component
export default class CanvasScale extends BaseVue {
  options: Option[] = [
    { label: "放大", value: 0.1, isAdd: true, keybinding: "ctrl +" },
    { label: "缩小", value: -0.1, isAdd: true, keybinding: "ctrl -" },
    { label: "25%", value: 0.25, divided: true },
    { label: "50%", value: 0.5 },
    { label: "75%", value: 0.75 },
    { label: "100%", value: 1 },
    { label: "200%", value: 2 }
  ];

  scale(opt: Option) {
    let zoom = EditorStore.zoom;
    if (opt.isAdd) {
      zoom += opt.value;
    } else {
      zoom = opt.value;
    }
    EditorStore.setZoom(zoom);
  }

  render() {
    return (
      <el-dropdown trigger="click">
        <span class="rp-canvas-scale">
          缩放 {(EditorStore.zoom * 100).toFixed(0)}%<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          {this.options.map((item, index) => {
            return (
              <el-dropdown-item
                key={index}
                divided={item.divided}
                nativeOnClick={() => {
                  this.scale(item);
                }}>
                <div class="rp-canvas-scale__item">
                  <span>{item.label}</span> {item.keybinding ? <span class="keybinding">{`${item.keybinding}`}</span> : null}
                </div>
              </el-dropdown-item>
            );
          })}
        </el-dropdown-menu>
      </el-dropdown>
    );
  }
}
</script>
<style scoped lang="scss">
@include b(canvas-scale) {
  margin-left: 20px;
  color: var(--font-color-gray1);
  cursor: pointer;
  &:hover {
    color: var(--theme-color);
  }
  @include e(item) {
    width: 100px;
    display: flex;
    justify-content: space-between;
    .keybinding {
      color: var(--font-color-gray4);
    }
  }
}
</style>
