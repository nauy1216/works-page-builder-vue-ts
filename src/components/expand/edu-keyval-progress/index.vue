<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { px2rem } from "shared/utils";
import oblongProgress from "../../base/oblong-progress/index.vue";

@Component({
  name: "RpEduKeyvalProgress",
  components: { oblongProgress }
})
export default class RpEduKeyvalProgress extends BaseVue<Record<string, any>> {
  @Prop({
    type: String
  })
  title!: string;

  get list() {
    return this.componentData?.list || [];
  }
  get slideWidth() {
    return this.width;
  }

  get slideHeight() {
    return this.height;
  }

  mounted() {
    //console.log("线下/上教育-组件数据--", this.list);
  }

  render() {
    return (
      <div class="rp-edu-keyval-progress" style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
        <div class="rp-green-box">{this.title}</div>
        <div>
          {this.list?.map((item, index) => {
            return (
              <div key={index}>
                <p class="l-title">{item.name}</p>
                <ul>
                  {item.data?.map((item_i, index_i) => {
                    return (
                      <li key={index_i}>
                        <oblongProgress
                          props={{
                            width: 180,
                            height: 10,
                            speed: item_i.speed,
                            isRight: false,
                            linearGradient: item_i.background
                          }}></oblongProgress>
                        <div class="text-box">
                          <span class="l-text" style={{ color: item_i.background[0] }}>
                            {item_i.name}
                          </span>
                          <span class="r-text">{item_i.value + item_i.unit}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(edu-keyval-progress) {
  box-sizing: border-box;
  overflow: hidden;
  > div {
    float: left;
  }
  .rp-key-value-box {
    margin-right: 10px;
  }
  .rp-green-box {
    width: 60px;
    height: 50px;
    margin-right: 20px;
    text-align: center;
    line-height: 50px;
    border: 1px solid #2d9b7ed9;
    color: #fff;
  }
  .rp-oblong-progress {
    margin: 10px 0;
  }
  .l-title {
    color: #ffffff;
  }
  ul {
    display: flex;
    margin-bottom: 40px;
    li {
      margin-right: 20px;
    }
  }
  .text-box {
    display: flex;
    justify-content: space-between;
    .r-text {
      color: #cef5f2ff;
    }
  }
}
</style>
