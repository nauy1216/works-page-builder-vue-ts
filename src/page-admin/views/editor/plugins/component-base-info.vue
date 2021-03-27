<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { PageStore } from "page-admin/store/modules";
import { isTypeOf } from "shared/utils";

@Component
export default class ComponentBaseInfo extends BaseVue {
  get activeCompProps() {
    return PageStore.activeComp && this.$componentsConfig[PageStore.activeComp.componentName].componentProps;
  }

  get layoutConfig() {
    return PageStore.activeComp?.layoutConfig;
  }

  render(h) {
    if (!PageStore.activeComp || !this.activeCompProps) return;
    return (
      <el-form label-position="right" label-width="80px">
        {/** 基本信息 */}
        <el-form-item label="组件名称">
          <el-input vModel={PageStore.activeComp.alias}></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input vModel={PageStore.activeComp.desc}></el-input>
        </el-form-item>
        {/** 布局属性 */}
        <el-form-item label="x(px)">
          <el-input-number controls-position="right" vModel={this.layoutConfig!.x}></el-input-number>
        </el-form-item>
        <el-form-item label="y(px)">
          <el-input-number controls-position="right" vModel={this.layoutConfig!.y}></el-input-number>
        </el-form-item>
        <el-form-item label="宽(px)">
          <el-input-number controls-position="right" vModel={this.layoutConfig!.width}></el-input-number>
        </el-form-item>
        <el-form-item label="高(px)">
          <el-input-number controls-position="right" vModel={this.layoutConfig!.height}></el-input-number>
        </el-form-item>
        <el-form-item label="层级(px)">
          <el-input-number controls-position="right" vModel={this.layoutConfig!.zIndex}></el-input-number>
        </el-form-item>
        {/** 自定义属性 */}
        {Object.keys(this.activeCompProps).map((prop, index) => {
          const propConfig = this.activeCompProps![prop];
          let compName;
          let props: Record<string, any>;
          if (isTypeOf<string>("String", propConfig.inputComponent)) {
            compName = propConfig.inputComponent;
            props = {};
          } else {
            compName = propConfig.inputComponent.componentName;
            props = propConfig.inputComponent.props || {};
          }

          return !isTypeOf<string>("String", propConfig.inputComponent) && propConfig.inputComponent.render ? (
            propConfig.inputComponent.render.call(this, h, PageStore.activeComp!.componentProps)
          ) : (
            <el-form-item key={index} label={propConfig!.label}>
              {PageStore.activeComp &&
                h(compName, {
                  key: index,
                  props: {
                    ...props,
                    value: PageStore.activeComp!.componentProps[prop]
                  },
                  on: {
                    input: value => {
                      PageStore.activeComp!.componentProps[prop] = value;
                    }
                  }
                })}
            </el-form-item>
          );
        })}
      </el-form>
    );
  }
}
</script>

<style lang="scss" scoped>
.el-input-number {
  width: 200px !important;
}
</style>
