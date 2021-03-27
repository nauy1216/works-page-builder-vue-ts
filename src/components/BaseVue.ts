import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { px2rem } from "shared/utils";

// 私有全局属性在这里声明， 避免全几乎污染
@Component
export default class BaseVue<T = unknown> extends Vue {
  @Prop()
  componentData!: T; // 组件数据

  @Prop({
    required: true,
    type: Number
  })
  width!: number; // 组件宽度

  @Prop({
    required: true,
    type: Number
  })
  height!: number; // 组件高度

  @Prop({
    default: 1,
    type: Number
  })
  scaleRatio!: number; // 组件当前宽度与设计稿的宽度比

  $px2rem(pxValue: number): string {
    // 设计稿尺寸转rem
    return px2rem(pxValue, 1);
  }

  $px2ScaleRem(pxValue: number): string {
    // 设计稿尺寸转rem, 同时进行缩放
    return px2rem(pxValue, this.scaleRatio);
  }

  // 公共事件
  $eventBus!: Pick<Vue, "$on" | "$emit" | "$off">;
}
