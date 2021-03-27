<script lang="tsx">
import BaseVue from "page-web/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { px2rem } from "shared/utils";

@Component
export default class AsyncRender extends BaseVue {
  @Prop()
  component!: ComponentOption;

  @Prop({
    type: Boolean,
    default: false
  })
  isSync!: boolean;

  pending = true;

  created() {
    if (this.isSync) {
      this.pending = false;
    } else {
      setTimeout(() => {
        this.pending = false;
      }, 0);
    }
  }

  getScaleStyle(comp: ComponentOption) {
    const { useScale } = comp;
    let style;
    if (useScale.type === "zoom") {
      style = `zoom:${useScale.scale}`;
    } else if (useScale.type === "transform") {
      style = `transform: scale(${useScale.scale}); transform-origin: 0 0;`;
    } else {
      style = "";
    }
    return style;
  }

  render(h) {
    const comp = this.component;
    return (
      <div
        style={{
          position: "absolute",
          transform: `translate(${px2rem(comp.layoutConfig.x)}, ${px2rem(comp.layoutConfig.y)})`,
          width: px2rem(comp.layoutConfig.width),
          height: px2rem(comp.layoutConfig.height),
          zIndex: comp.layoutConfig.zIndex
        }}>
        {!this.pending &&
          h(this.$components[comp.componentName], {
            key: comp.id,
            style: this.getScaleStyle(comp),
            props: {
              ...comp.componentProps,
              width: comp.layoutConfig.width,
              height: comp.layoutConfig.height,
              // TODO
              componentData: comp.componentData
            }
          })}
      </div>
    );
  }
}
</script>
