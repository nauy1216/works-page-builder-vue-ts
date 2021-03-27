<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop, Watch } from "vue-property-decorator";
// import { parseToThousandth } from "shared/utils";

// 当前数字长度不足11位进行补0
const MAX_LEN = 11;
// let timer;
@Component({
  name: "RpCounter"
})
export default class RpCounter extends BaseVue {
  isNaN(item) {
    return isNaN(item);
  }
  @Prop({
    type: String,
    default: "3785962635"
  })
  text!: string;
  counterNum: Array<any> = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
  diffLength = 0;
  @Watch("text")
  changeNum(value) {
    const newValueArray = this.formatt(value);
    // 获取上一次的值对比,计算滚动偏移
    (this.$refs.text as Array<HTMLElement>).map((v, i) => {
      let scrollIndex = 0;
      const lastValue = parseInt(v.getAttribute("value")!);
      const newValue = parseInt(newValueArray[i]);
      if (newValue - lastValue > 0) {
        scrollIndex = newValue - lastValue;
      } else if (newValue === lastValue) {
        scrollIndex = 0;
      } else if (10 - lastValue === 1 && newValue === 0) {
        scrollIndex = 1;
      } else {
        scrollIndex = 10 - (lastValue - newValue);
      }
      v.style.transition = "transform  0.8s ease-in-out";
      v.style.transform = `translate(-50%, -${scrollIndex * 10}%)`;
      this.resetPosition(newValueArray);
    });
  }
  mounted() {
    this.init();
  }
  init() {
    const arrayCounter = this.formatt(this.text);
    // 设置滚动到指定位置
    setTimeout(() => {
      this.setScrollTransform(arrayCounter);
    }, 500);
  }
  formatt(text: string): Array<string> {
    // 初始化数字
    const splitArray = text.split("");
    const len = splitArray.length;
    // 自动补0
    if (len < MAX_LEN) {
      const diff = MAX_LEN - len;
      for (let i = 0; i < diff; i++) {
        splitArray.unshift("0");
      }
    }
    return splitArray;
  }

  setScrollTransform(value: Array<any>) {
    (this.$refs.text as Array<HTMLElement>).map((v, i) => {
      v.style.transform = `translate(-50%, -${value[i] * 10}%)`;
    });
    this.resetPosition(value);
  }

  resetPosition(value: Array<any>) {
    // 初始化滚动，更新span中的元素位置
    setTimeout(() => {
      (this.$refs.text as Array<HTMLElement>).map((v, i) => {
        v.style.transition = "none";
        v.style.transform = `translate(-50%, 0%)`;
        // 更新每一个0123456789的位置
        let str = "";
        if (parseInt(value[i]) <= 9) {
          for (let j = parseInt(value[i]); j < 10; j++) {
            str += j;
          }
        }
        const leng = str.length;
        for (let k = 0; k < 10 - leng; k++) {
          str += k;
        }
        v.innerHTML = str;
        v.setAttribute("value", value[i]);
      });
    }, 800);
  }

  render() {
    return (
      <ul class="rp-counter-wrapper">
        {this.counterNum.map((v, i) => {
          return (
            <li class={[!this.isNaN(v) ? "rp-counter-wrapper__item" : "item"]} data-key={i}>
              {
                <span ref="text" refInFor={true} key={v + i}>
                  0123456789
                </span>
              }
            </li>
          );
        })}
      </ul>
    );
  }
}
</script>

<style lang="scss" scoped>
$bg: "/images/home/counter.png";
@include b(counter-wrapper) {
  text-align: center;
  position: relative;
  width: 100%;
  font-size: 50px;
  color: rgb(100, 200, 218);
  @include e(item) {
    height: 78px;
    width: 50px;
    margin-right: 10px;
    display: inline-block;
    background: url($bg) no-repeat center;
    background-size: 100%;
    position: relative;
    overflow: hidden;

    // div {
    //   height: 78px;
    //   position: relative;
    //   overflow: hidden;
    span {
      writing-mode: vertical-lr;
      text-orientation: upright;
      font-weight: 400;
      display: inline-block;
      line-height: 78px;
      position: relative;
      top: 13px;
      left: 50%;
      transform: translate(-50%, 0);
      transition: transform 0.8s ease-in-out;
      // transition: all 0.8s ease-in-out;
      letter-spacing: 20px;
    }
    // }
  }
  .item {
    display: inline-block;
  }
}
</style>
