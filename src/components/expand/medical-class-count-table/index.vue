<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { px2rem } from "shared/utils";

@Component({
  name: "RpMedicalClassCountTable"
})
export default class RpMedicalClassCountTable extends BaseVue<Record<string, any>> {
  @Prop({
    type: Array
  })
  linearGradient!: string[];

  @Prop({
    type: String
  })
  tableTitle!: string;

  get list() {
    return this.componentData?.list || [];
  }
  get title() {
    const tableTitleArr = this.tableTitle.split(",") || [];
    const arrString = ["", "", ""];
    arrString[0] = tableTitleArr[0] || "";
    arrString[1] = tableTitleArr[1] || "";
    arrString[2] = tableTitleArr[2] || "";
    return arrString;
  }
  get setLinearGradient() {
    return {
      background: `linear-gradient(to right, ${this.linearGradient[0]}, ${this.linearGradient[1]}`
    };
  }
  get slideWidth() {
    return this.width;
  }

  get slideHeight() {
    return this.height;
  }

  mounted() {
    //console.log("类型周期统计-组件数据--", this.list);
  }

  render() {
    return (
      <ul class="rp-class-count-table" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <li>
          <div style={this.setLinearGradient}>{this.title[0]}</div>
          <div>{this.title[1]}</div>
          <div>{this.title[2]}</div>
        </li>
        {this.list.map((item, index) => {
          return (
            <li key={index}>
              <div style={this.setLinearGradient}>{item.name}</div>
              <div>{item.value1}</div>
              <div>{item.value2}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(class-count-table) {
  box-sizing: border-box;
  ul {
    width: 100%;
  }
  li {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 46px;
    border: 1px solid rgba(151, 151, 151, 0.5);
    margin-bottom: 40px;
    > div {
      text-align: center;
      line-height: 46px;
      font-size: 14px;
      color: #cef5f2;
      border-right: 1px solid rgba(151, 151, 151, 0.5);
      &:nth-child(1) {
        flex: 4;
      }
      &:nth-child(2) {
        flex: 3;
      }
      &:nth-child(3) {
        flex: 3;
        border-right: none;
      }
    }
  }
}
</style>
