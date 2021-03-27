<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { px2rem } from "shared/utils";

@Component({
  name: "RpOblongProgress"
})
export default class RpOblongProgress extends BaseVue<Record<string, any>> {
  @Prop({
    type: Array
  })
  linearGradient!: string[];

  @Prop({
    type: Number
  })
  speed!: number;

  @Prop({
    type: Boolean
  })
  isRight!: boolean;

  get slideWidth() {
    return this.width;
  }

  get slideHeight() {
    return this.height;
  }

  get setLinearGradient() {
    return `linear-gradient(to right, ${this.linearGradient[0]}, ${this.linearGradient[1]})`;
  }

  render() {
    return (
      <div class="rp-oblong-progress" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <div class="rp-oblong-progress__speed" style={{ background: this.setLinearGradient, width: this.speed + "%", ...{ [this.isRight ? "right" : "left"]: 0 } }}></div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(oblong-progress) {
  box-sizing: border-box;
  position: relative;
  background: rgba(216, 216, 216, 0.2);
  @include e(speed) {
    position: absolute;
    top: 0;
    height: 100%;
  }
}
</style>
