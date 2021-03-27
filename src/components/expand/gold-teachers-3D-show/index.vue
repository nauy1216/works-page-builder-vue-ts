<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { ComponentData } from "./componentData";

type Item = {
  index: number;
  translate: number;
  data: any;
  style: Record<string, number | string>;
};
const SHOW_COUNT = 7;
@Component({
  name: "RpGoldTeachers3DShow"
})
export default class RpGoldTeachers3DShow extends BaseVue<ComponentData> {
  @Prop({
    type: String
  })
  background!: string;

  title = "";
  showTeachers: any[] = [];
  allTeachers: any[] = [];
  items: Item[] = [];

  currentId = "140"; // 中心位置的教师id

  $refs!: {
    li: HTMLElement[];
    avatar: HTMLElement[];
  };

  mounted() {
    this.getData();
  }

  get goldTeacher() {
    return this.componentData || [];
  }

  @Watch("goldTeacher")
  getData() {
    this.title = "金牌讲师";
    this.allTeachers = this.goldTeacher;
    if (this.goldTeacher.length === 0) return;
    this.initTransformStyle();
    this.showTeachers = this.filterTeacher(this.allTeachers, this.currentId);
    this.items.forEach((item, index) => (item.data = this.showTeachers[index]));
  }

  switchSwiper(item: Item) {
    if (item.translate === 0) return;
    this.showTeachers = this.filterTeacher(this.allTeachers, item.data.id);
    if (item.translate < 0) {
      this.items.push(this.items.shift()!);
    } else {
      this.items.unshift(this.items.pop()!);
    }
    const copyArr = this.items.slice();
    copyArr.sort((a, b) => a.translate - b.translate);
    copyArr.forEach((item, index) => (item.data = this.showTeachers[index]));
  }

  filterTeacher(data, id) {
    const { centerIndex } = this;
    const currentTeacherIndex = this.allTeachers.findIndex(v => {
      return v.id === id;
    });
    const dataArr = [...data, ...data, ...data];
    return dataArr.slice(this.allTeachers.length + currentTeacherIndex - centerIndex, this.allTeachers.length + currentTeacherIndex + SHOW_COUNT - centerIndex);
  }

  get centerIndex() {
    return Math.floor(SHOW_COUNT / 2);
  }

  initTransformStyle() {
    const { centerIndex } = this;
    const style: Item[] = [];
    for (let i = 0; i < SHOW_COUNT; i++) {
      style.push({
        index: i,
        translate: (i - centerIndex) * 150,
        data: {},
        style: {
          transform: `translateX(${this.$px2rem((i - centerIndex) * 150)}) scale(${1 - Math.abs(centerIndex - i) / SHOW_COUNT / 3})`,
          zIndex: 1000 - Math.abs(centerIndex - i)
        }
      });
    }
    this.items = style;
  }

  destroyed() {
    this.showTeachers = [];
    this.allTeachers = [];
  }

  render() {
    return (
      <div
        class="rp-gold-allTeachers-3D-show"
        style={{
          backgroundColor: this.background
        }}>
        <div class="swiper-tle">{this.title}</div>
        <div class="swiper">
          <ul>
            {this.items.map((data, index) => {
              const { data: item, style } = data;
              return (
                <li
                  ref="li"
                  refInFor={true}
                  id={item.id}
                  index={data.index}
                  key={index}
                  style={style}
                  onClick={() => {
                    this.switchSwiper(data);
                  }}>
                  <h3 ref="name">{item.name}</h3>
                  <div class="photo">
                    <img src={item.img} alt="" refInFor={true} ref="avatar" />
                  </div>
                  <div class="job">
                    <span>职业:</span>
                    <span>{item.duty}</span>
                  </div>
                  <div class="swiper-doctor-introduce">
                    <div>人物介绍:</div>
                    <div>{item.description}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(gold-allTeachers-3D-show) {
  width: 1600px;
  height: 1200px;
  .swiper-tle {
    width: 100%;
    height: 160px;
    font-size: 39px;
    text-align: center;
    line-height: 160px;
    color: #fff;
  }
  .swiper {
    width: 100%;
    height: 80%;
    margin-top: 20;
    ul {
      position: relative;
    }
    h3 {
      height: 85px;
      line-height: 85px;
      text-align: center;
    }
    ul li {
      padding: 0 20px;
      box-sizing: border-box;
      border-radius: 40px;
      user-select: none;
      cursor: pointer;
      left: 50%;
      margin-left: -250px;
      color: #fff;
      position: absolute;
      width: 500px;
      height: 825px;
      display: inline-block;
      transition: transform 0.5s;
    }
    .photo {
      width: 100%;
      height: 35%;
      margin: 0 auto;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    li {
      font-size: 20px;
      color: #cef5f2;
      background: linear-gradient(to bottom, rgba(2, 146, 169, 0.9) 0%, rgba(0, 28, 35, 1) 100%) !important;
      width: 100%;
    }
    .job {
      overflow: hidden;
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      text-align: left;
    }
    .job span:nth-child(1) {
      color: rgba(255, 255, 255, 0.8);
    }
    .job span:nth-child(2) {
      word-break: break-all;
      color: rgba(255, 255, 255, 0.5);
    }
    .swiper-doctor-introduce div:nth-child(1) {
      color: rgba(255, 255, 255, 0.8);
      text-align: left;
      height: 80px;
      line-height: 80px;
    }

    .swiper-doctor-introduce div:nth-child(2) {
      color: rgba(255, 255, 255, 0.6);
      text-align: left;
      text-indent: 30px;
      line-height: 30px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      overflow: hidden;
    }
  }
}
</style>
