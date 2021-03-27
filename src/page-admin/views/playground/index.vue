<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import { VueConstructor } from "vue";

@Component({
  name: "Playground"
})
export default class Playground extends BaseVue {
  cacheComp: (VueConstructor & Record<string, any>)[] = [];
  cacheCompConf: any[] = [];
  clickIndex = "";
  selectComponent(name: string, flag: boolean) {
    this.clickIndex = name;
    if (flag) {
      location.href = location.href.split("?")[0] + `?component=${name}`;
    }
  }

  getDefaultProps(index) {
    const props = this.cacheCompConf[index].componentProps;
    const res = {};
    Object.keys(props).forEach(key => {
      res[key] = props[key].default;
    });
    return res;
  }

  created() {
    const htmlFontSize = document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = `${process.env.VUE_APP_HTML_FONT_SIZE}px`;
    this.$on("hook:destoryed", () => {
      if (htmlFontSize) {
        document.documentElement.style.fontSize = htmlFontSize;
      }
    });
    for (const key in this.$components) {
      this.cacheComp.push(this.$components[key]);
      this.cacheCompConf.push(this.$componentsConfig[key]);
    }
    if (this.$route.query.component) {
      this.selectComponent(this.$route.query.component as string, false);
    }
  }

  get isHeadless() {
    return this.$route.query.env === "headless";
  }

  get imgSize(): number {
    return Number(this.$route.query.size) || 140;
  }

  render(h) {
    return (
      <div staticClass="rp-playground" class={{ "rp-playground--headless": this.isHeadless }}>
        <div class="rp-playground__components-list">
          {Object.keys(this.$components).map(name => {
            return (
              <div
                class="rp-playground__components-item"
                onClick={() => {
                  this.selectComponent(name, true);
                }}>
                {this.$componentsConfig[name].alias}
              </div>
            );
          })}
        </div>
        {this.cacheComp.map((comp, index) => {
          const currentIndex = comp.options.name === this.clickIndex;
          const wrapperStyle = this.isHeadless
            ? {
                width: this.imgSize + "px",
                height: this.imgSize + "px",
                background: "url(/images/component_bg.jpg)"
              }
            : {
                paddingTop: "20px"
              };
          const componentStyle = this.isHeadless
            ? {
                width: this.cacheCompConf[index].layoutConfig.width + "px",
                height: this.cacheCompConf[index].layoutConfig.height + "px",
                zoom: this.imgSize / Math.max(this.cacheCompConf[index].layoutConfig.width, this.cacheCompConf[index].layoutConfig.height)
              }
            : {
                width: this.cacheCompConf[index].layoutConfig.width + "px",
                height: this.cacheCompConf[index].layoutConfig.height + "px"
              };
          return currentIndex ? (
            <div ref="wrapper-components" refInFor={true} class="wrapper-components" style={wrapperStyle}>
              <div style="background: #ffffff">
                {h(comp, {
                  props: {
                    ...this.getDefaultProps(index),
                    width: this.cacheCompConf[index].layoutConfig.width,
                    height: this.cacheCompConf[index].layoutConfig.height,
                    componentData: this.cacheCompConf[index].mockData
                  },
                  style: componentStyle,
                  ref: "components",
                  refInFor: true
                })}
              </div>
            </div>
          ) : null;
        })}
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@include b(playground) {
  @include e(components-list) {
    position: fixed;
    left: 0;
    width: 200px;
    height: 100vh;
    overflow: auto;
    border-right: 1px solid #e0e0e0;
  }
  @include e(components-item) {
    padding: 10px 20px;
    border-bottom: 1px solid #e0e0e0;
    &:hover {
      background: #e0e0e0;
    }
  }
  @include e(content) {
    margin-left: 200px;
    padding: 20px;
  }
  .wrapper-components {
    margin-left: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @include m(headless) {
    .wrapper-components {
      position: fixed;
      width: 100vw;
      height: 100vh;
      z-index: 100;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 0;
      padding-top: 0;
    }
  }
}
</style>
