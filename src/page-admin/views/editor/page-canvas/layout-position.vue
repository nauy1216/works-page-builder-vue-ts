<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { PageStore } from "page-admin/store/modules";
import Vdr from "./vdr.vue";

@Component({
  components: {
    Vdr
  }
})
export default class LayoutPosition extends BaseVue {
  @Prop({
    type: Number
  })
  width;

  @Prop({
    type: Number
  })
  height;

  vLine: any[] = [];
  hLine: any[] = [];

  get components() {
    return PageStore.childComponents;
  }

  handleComponentContextMenu($event, comp) {
    this.$emit("contextmenu", $event, comp);
  }

  getRefLineParams(params) {
    this.vLine = params.vLine;
    this.hLine = params.hLine;
  }

  render() {
    return (
      <div style={{ width: this.width + "px", height: this.height + "px" }} class="rp-layout-position">
        {this.components.length > 0 &&
          this.components.map(comp => {
            return <Vdr key={comp.tempData.key} comp={comp} onRefLineParams={this.getRefLineParams} onContextmenu={this.handleComponentContextMenu}></Vdr>;
          })}
        {this.vLine.map((item, index) => {
          return <span class="ref-line v-line rp-layout-position__line" key={`v-line-${index}`} v-show={item.display} style={{ left: item.position, top: item.origin, height: item.lineLength }} />;
        })}
        {this.hLine.map((item, index) => {
          return <span class="ref-line h-line rp-layout-position__line" key={`h-line-${index}`} v-show={item.display} style={{ top: item.position, left: item.origin, width: item.lineLength }} />;
        })}
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(layout-position) {
  position: relative;
  pointer-events: none;
  // overflow: hidden;
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: inset 0 0 0px 1px rgb(64, 158, 255);
    pointer-events: none;
  }
  & * {
    pointer-events: all;
  }
  @include e(line) {
    background-color: var(--theme-color);
  }
}
</style>
