<script lang="tsx">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "RpColorSelectorGradual"
})
export default class RpColorSelectorGradual extends Vue {
  @Prop({
    type: Array,
    default: ["rgba(19, 206, 102, 0.8)", "rgba(255, 206, 102, 0.8)"]
  })
  value!: string[];
  render() {
    return (
      <div class="rp-color-select">
        <div class="rp-color-select__gradual-color start">
          <span>{this.value[0]}</span>
          <el-color-picker
            value={this.value[0]}
            onChange={value => {
              this.value[0] = value;
              this.$emit("input", [...this.value]);
            }}
            show-alpha></el-color-picker>
        </div>
        <div class="rp-color-select__gradual-color end">
          <span>{this.value[1]}</span>
          <el-color-picker
            value={this.value[1]}
            onChange={value => {
              this.value[1] = value;
              this.$emit("input", [...this.value]);
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
  @include e(gradual-color) {
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
  .end {
    margin-top: 20px;
  }
}
</style>
