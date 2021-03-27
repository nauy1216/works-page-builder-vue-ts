<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { PageStore } from "page-admin/store/modules";
import { Debounce } from "shared/decorator";
import { VueConstructor, VNode } from "vue";
import pinyin from "pinyin";

type componentcategory = Record<
  string,
  {
    name: string;
    components: Record<string, VueConstructor<Vue>>;
  }
>;
@Component({})
export default class CompList extends BaseVue {
  @Prop({
    type: String,
    default: "400px"
  })
  height!: string;

  keyword = "";
  show: Record<string, boolean> = {};
  activeNames = "";
  componentsList: componentcategory = {};
  nameToPinyin: Record<string, string[]> = {};

  $refs!: {
    scrollbar: Vue & {
      update(): void;
    };
  };

  handleDragStart(event, comp) {
    PageStore.setDragComp(comp);
  }

  handleDragEnd() {
    PageStore.setDragComp(null);
  }

  created() {
    this.init();
  }

  init() {
    const show = {};
    this.componentsList = this.$componentcategory;
    Object.keys(this.componentsList).map(categoryName => {
      show[categoryName] = true;
    });
    this.show = show;
  }

  @Debounce()
  searchComponent(keyword) {
    if (!keyword) {
      this.componentsList = this.$componentcategory;
    } else {
      const componentsList: componentcategory = {};
      Object.keys(this.$componentcategory).forEach(categoryName => {
        Object.keys(this.$componentcategory[categoryName].components).forEach(componentName => {
          const alias = this.$componentsConfig[componentName].alias;
          if (!this.nameToPinyin[alias]) {
            this.nameToPinyin[alias] = [].concat(
              ...pinyin(alias, {
                style: pinyin.STYLE_NORMAL,
                heteronym: true
              })
            );
          }
          if (this.nameToPinyin[alias].indexOf(keyword) > 0 || this.$componentsConfig[componentName].alias.indexOf(keyword) > -1) {
            if (!componentsList[categoryName]) {
              componentsList[categoryName] = {
                name: this.$componentcategory[categoryName].name,
                components: {}
              };
            }
            componentsList[categoryName].components[componentName] = this.$componentcategory[categoryName].components[componentName];
          }
        });
      });
      this.componentsList = componentsList;
    }
  }

  render() {
    const vnode: VNode[] = [];
    if (Object.keys(this.componentsList).length > 0) {
      Object.keys(this.componentsList).forEach(categoryName => {
        const components = this.componentsList[categoryName].components;
        vnode.push(
          <div
            staticClass="rp-component-list__category"
            class={{ "rp-component-list__category--open": this.show[categoryName], "rp-component-list__category--haschild": Object.keys(components).length > 0 }}
            onClick={() => {
              this.show[categoryName] = !this.show[categoryName];
              setTimeout(() => {
                this.$refs.scrollbar.update();
              }, 300);
            }}>
            {/**<i staticClass="iconfont icon-shouqi" class={{ "icon-shouqi-open": this.show[categoryName] }}></i> */}
            <i staticClass="iconfont el-icon-arrow-down" class={{ "icon-shouqi-open": this.show[categoryName] }}></i>
            <span>{this.$componentcategory[categoryName].name}</span>
          </div>,
          <div
            class="rp-component-list__box"
            style={{
              height: this.show[categoryName] ? `${Math.ceil(Object.keys(components).length / 2) * 128}px` : "0px",
              opacity: this.show[categoryName] ? 1 : 0
            }}>
            {Object.keys(components).map((compName, index) => {
              return (
                <div
                  Key={compName + index}
                  class="rp-component-list__item"
                  draggable="true"
                  onDragstart={($event: MouseEvent) => {
                    $event.stopPropagation();
                    this.handleDragStart($event, components[compName]);
                  }}
                  onDragend={($event: MouseEvent) => {
                    $event.stopPropagation();
                    this.handleDragEnd();
                  }}>
                  <img class="img" src={`/images/${compName}Thumbnail.jpeg`}></img>
                  <el-popover placement="top-end" width="400" trigger="click">
                    <div class="rp-component-list__item-popover">
                      <img class="img" src={`/images/${compName}.jpeg`}></img>
                      <div class="name">{this.$componentsConfig[compName].alias}</div>
                    </div>
                    <div slot="reference">
                      <div class="name">{this.$componentsConfig[compName].alias}</div>
                    </div>
                  </el-popover>
                </div>
              );
            })}
          </div>
        );
      });
    } else {
      vnode.push(<div class="rp-component-list__nodata">无数据</div>);
    }

    return (
      <div class="rp-component-list">
        <el-input
          value={this.keyword}
          onInput={value => {
            this.keyword = value;
            this.searchComponent(value);
          }}
          placeholder="搜索组件"
          prefix-icon="el-icon-search"></el-input>
        <el-scrollbar ref="scrollbar" viewClass="rp-component-list__scrollbar" viewStyle={{ height: `calc(${this.height} - 60px)` }}>
          {vnode}
        </el-scrollbar>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(component-list) {
  @include e(box) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
    transition: all 0.3s;
  }
  @include e(item) {
    width: 98px;
    height: 120px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 4px 0;
    padding: 10px 10px 0;
    text-align: center;
    color: var(--font-color-gray1);
    border: 1px solid transparent;
    .img {
      width: 78px;
      height: 78px;
    }
    .name {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover {
        cursor: pointer;
      }
    }
    &:hover {
      cursor: move;
      color: var(--theme-color);
      border: 1px solid var(--theme-color);
    }
  }
  @include e(nodata) {
    line-height: 100px;
    text-align: center;
  }
  @include e(category) {
    display: flex;
    align-items: center;
    padding: 0 5px;
    height: 40px;
    border-top: 1px solid #ebeef5;
    .iconfont {
      transition: all 0.5s;
      margin-right: 10px;
      color: var(--font-color-gray3);
    }
    &:hover {
      background: #f5f7fa;
      cursor: pointer;
      .iconfont,
      span {
        color: var(--theme-color);
      }
    }
    span {
      color: var(--font-color-gray1);
    }
    .icon-shouqi-open {
      transition: all 0.5s;
      transform: rotate(-180deg);
    }
    &:nth-of-type(1) {
      border-top: none;
    }
    &:nth-last-child(2) {
      border-bottom: 1px solid #ebeef5;
    }
    @include m(open) {
      &.rp-component-list__category--haschild {
        border-bottom: 1px solid #ebeef5;
      }
    }
  }
  /deep/.el-input {
    height: 40px;
    border-top: 1px solid rgb(235, 238, 245);
    border-bottom: 1px solid rgb(235, 238, 245);
    input {
      height: 40px;
      line-height: 40px;
      border: none;
    }
  }
}
</style>
<style lang="scss">
@include b(component-list) {
  @include e(scrollbar) {
    width: 100%;
  }
  @include e(item-popover) {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    .img {
      width: 400px;
      height: 400px;
    }
    .name {
      text-align: center;
      line-height: 3.5em;
    }
  }
}
</style>
