<script lang="tsx">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "RpSelect"
})
export default class RpSelect extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  options!: Array<any>;

  @Prop({
    type: Number,
    default: ""
  })
  value!: number;

  render() {
    return (
      <el-select
        value={this.value}
        placeholder="请选择"
        onChange={value => {
          this.$emit("input", value);
        }}>
        {this.options.map(v => {
          return <el-option key={v.value} label={v.label} value={v.value}></el-option>;
        })}
      </el-select>
    );
  }
}
</script>

<style lang="scss"></style>
