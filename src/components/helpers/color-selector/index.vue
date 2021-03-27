<script lang="tsx">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
// 颜色选择器
@Component({
  name: "RpColorSelector"
})
export default class RpColorSelector extends Vue {
  @Prop({
    type: String,
    default: "rgba(210, 246, 243, 1)"
  })
  value!: string;
  val: string = this.value;

  render() {
    return (
      <div class="rp-color-select">
        <div class="rp-color-select__color">
          <span>{this.value}</span>
          <el-color-picker
            value={this.value}
            onChange={value => {
              this.val = value;
              this.$emit("input", this.val);
            }}
            show-alpha></el-color-picker>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss">
@include b(color-select) {
  @include e(color) {
    position: relative;
    cursor: pointer;
    text-align: center;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
    border: 1px solid #dcdfe6;
    width: 99%;
    height: 26px;
    .el-color-picker {
      opacity: 0;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .el-color-picker__trigger {
        width: 100%;
      }
    }
  }
}
</style>
