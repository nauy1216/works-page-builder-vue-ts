<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";
import { pageList, pageAddOrUpdate, pageDelete, historyView } from "api/request";
import { PageStore, watchPageState } from "page-admin/store/modules";
import { Logger, uuid } from "shared/utils";
import EventBus, { EventType } from "page-admin/event-bus";
import { DataSourceType } from "shared/const";
import packageManager from "api/package-manager";

const hid = -1;
type Detail = ResponseDetail<typeof pageList>;
type Page = ItemOfArray<Detail>;

const noop = () => {
  //
};
@Component({})
export default class PageManage extends BaseVue {
  @Prop({
    default: 200
  })
  height!: number;
  pageList: Page[] = [];
  showEditInput = false;
  loading = false;
  isChange = false;
  unwatch: () => void = noop;
  currentPage: Page | null = null;

  $refs!: {
    scrollbar: Vue & {
      update: Function;
    };
  };

  created() {
    if (!this.appId) {
      this.$router.replace("/appManage");
    }
    this.getPageList();
    const save = () => {
      this.save(true);
    };
    EventBus.$on(EventType.PAGE_SAVE, save);
    this.$on("hook:destroyed", () => {
      EventBus.$off(EventType.PAGE_SAVE, save);
    });
    this.resetState();
  }

  resetState() {
    this.showEditInput = false;
    this.isChange = false;
    this.currentPage = null;
  }

  get appId() {
    return Number(this.$route.query.appId);
  }

  get appWidth() {
    return this.$route.query.width ? Number(this.$route.query.width) : 1920;
  }

  get appHeight() {
    return this.$route.query.height ? Number(this.$route.query.height) : 1080;
  }

  // 获取当前应用所有页面
  getPageList() {
    this.loading = true;
    pageList(this.appId)
      .then(res => {
        if (res.code === 200) {
          PageStore.resetPage();
          this.pageList = res.details || [];
          this.selectDefaultPage();
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  setCurrentPage(page: Page | null) {
    this.currentPage = page;
  }

  // 默认显示第一个页面
  async selectDefaultPage() {
    if (this.pageList.length > 0) {
      this.selectPage(this.pageList[0]);
    }
  }

  selectPage(page: Page) {
    if (this.currentPage && page.id === this.currentPage.id) return;
    this.unwatch();
    this.save().then(() => {
      this.setCurrentPage(page);
      this.showEditInput = false;
      historyView(Number(page.hid)).then(res => {
        if (res.code == 200) {
          const childComponents: ComponentOption[] = [];
          let pageConfig: PageConfig | null = null;
          let compConfig: ComponentOption;
          const awaitList: Promise<any>[] = [];
          if (res.details && res.details.components) {
            try {
              if (res.details.pages[0] && res.details.pages[0].config_content) {
                pageConfig = JSON.parse(res.details.pages[0].config_content);
              }
            } catch (e) {
              Logger.error(`JSON解析组件config出错, 后台返回数据： `, res.details.pages[0].config_content);
            }
            res.details.components.forEach(comp => {
              if (comp.config_content) {
                try {
                  compConfig = JSON.parse(comp.config_content);
                  compConfig.tempData = {
                    active: false,
                    key: uuid(),
                    lockAspectRatio: true
                  };
                  switch (compConfig.dataSource.type) {
                    case DataSourceType.json: {
                      // 使用静态json数据
                      try {
                        compConfig.dataSource.jsonContent = comp.json_content;
                        compConfig.componentData = JSON.parse(compConfig.dataSource.jsonContent);
                      } catch (e) {
                        Logger.error(`JSON解析组件静态json数据出错, 后台返回数据： `, compConfig.dataSource.jsonContent);
                      }
                      break;
                    }

                    case DataSourceType.package: {
                      // 使用数据包
                      awaitList.push(packageManager.bindComponent(`/dataSource/${compConfig.dataSource.packageId}.json`, compConfig));
                    }
                  }
                  childComponents.push(compConfig);
                } catch (e) {
                  Logger.error(`JSON解析组件config出错, 后台返回数据： `, comp.config_content);
                }
              }
            });
          }
          PageStore.setPageConfig({
            width: pageConfig ? pageConfig.width : 1920,
            height: pageConfig ? pageConfig.height : 1080,
            pageName: page.name,
            pageId: Number(page.id),
            childComponents
          });
          this.unwatch();
          Promise.all(awaitList).then(() => {
            this.unwatch = watchPageState(() => {
              this.isChange = true;
            });
          });
        }
      });
    });
  }

  // 增加页面
  addPage() {
    this.save().then(() => {
      const page = { id: 0, hid: hid, name: `页面${this.pageList.length + 1}` };
      this.pageList.push(page);
      this.setCurrentPage(page);
      PageStore.resetPage();
      PageStore.setPageConfig({
        pageName: page.name,
        pageId: 0, // 新增的页面id传0,
        width: this.appWidth,
        height: this.appHeight
      });
      this.$nextTick(() => {
        const wrap = this.$el.querySelector(".el-scrollbar__wrap");
        if (wrap) {
          wrap.scrollTo(0, wrap.scrollHeight - this.height);
        }
        this.$refs.scrollbar.update();
      });
    });
  }

  isNewPage(page: Page | null) {
    return page && page.hid < 0;
  }

  save(isEnforce = false) {
    return new Promise<void>(resolve => {
      if ((this.currentPage && this.isChange) || this.isNewPage(this.currentPage) || isEnforce) {
        const pageId = this.isNewPage(this.currentPage) ? 0 : Number(this.currentPage!.id);
        PageStore.addOrUpdate({
          appId: this.appId,
          pageId,
          pageName: PageStore.pageName
        }).then(res => {
          if (res.code == 200) {
            this.$message.success(`${this.currentPage!.name}已保存`);
            if (this.currentPage && res.details) {
              if (this.currentPage.id == res.details.id) {
                this.currentPage.hid = res.details.hid;
              } else if (this.isNewPage(this.currentPage)) {
                this.currentPage.id = res.details.id;
                this.currentPage.hid = res.details.hid;
              }
            }
          }
          resolve();
          this.isChange = false;
        });
      } else {
        resolve();
      }
      this.isChange = false;
    });
  }

  async deletePage(page: Page) {
    let isDel = false;
    if (this.isNewPage(page)) {
      isDel = true;
    } else {
      const res = await pageDelete(Number(page.id));
      isDel = res.code == 200;
    }
    if (isDel) {
      for (let i = 0; i < this.pageList.length; i++) {
        if (this.pageList[i].id == page.id) {
          this.pageList.splice(i, 1);
          break;
        }
      }
      this.resetState();
      this.$message.success("删除成功");
    }
  }

  copyPage(page: Page) {
    historyView(Number(page.hid)).then(res => {
      if (res.code == 200) {
        if (res.details && res.details.components && res.details.pages) {
          pageAddOrUpdate({
            pid: 0,
            name: res.details.pages[0].name + " copy",
            aid: this.appId,
            config_content: res.details.pages[0].config_content,
            remark: "",
            components: res.details.components as any // 后台接口source_type字段的类型有的是string, 有的是number
          }).then(res => {
            if (res.code == 200) {
              this.loading = true;
              pageList(this.appId)
                .then(res => {
                  if (res.code === 200) {
                    this.pageList = res.details || [];
                  }
                })
                .finally(() => {
                  this.loading = false;
                });
            }
          });
        }
      }
    });
  }

  async handleCommand(command: { type: "delete" | "copy"; page: Page }) {
    switch (command.type) {
      case "delete": {
        this.deletePage(command.page);
        break;
      }
      case "copy": {
        this.copyPage(command.page);
        break;
      }
    }
  }

  async handleEditBlur(page: Page) {
    PageStore.setPageConfig({
      pageName: page.name
    });
    this.showEditInput = false;
  }

  handleEdit(page: Page) {
    this.showEditInput = !this.showEditInput;
    this.$nextTick(() => {
      if (this.$refs[`editor-${page.id}`]) {
        this.$refs[`editor-${page.id}`].$el.querySelector("input").focus();
      }
    });
  }

  render() {
    return (
      <div class="rp-page-manage" v-loading={this.loading}>
        <el-scrollbar ref="scrollbar" viewClass="rp-page-manage__scrollbar" viewStyle={{ height: this.height + "px" }}>
          <ul class="rp-page-manage__list">
            {this.pageList.map(page => {
              return (
                <li
                  staticClass="rp-page-manage__list-item"
                  class={{ "rp-page-manage__list-item--active": this.currentPage && this.currentPage.id == page.id }}
                  onClick={() => {
                    this.selectPage(page);
                  }}>
                  <div class="rp-page-manage__page-name">
                    <i class="iconfont icon-yemian"></i>
                    {this.currentPage && this.currentPage.id == page.id && this.showEditInput ? (
                      <el-input
                        ref={`editor-${page.id}`}
                        v-model={page.name}
                        autofocus={true}
                        onBlur={() => {
                          this.handleEditBlur(page);
                        }}></el-input>
                    ) : (
                      page.name
                    )}
                  </div>
                  <div>
                    {this.currentPage && this.currentPage.id == page.id && !this.showEditInput && (
                      <i
                        class="iconfont icon-web-icon-"
                        onClick={ev => {
                          ev.stopPropagation();
                          this.handleEdit(page);
                        }}></i>
                    )}
                    <el-dropdown trigger="hover" onCommand={this.handleCommand}>
                      <i class="iconfont icon-gengduo"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          command={{
                            type: "copy",
                            page
                          }}>
                          复制
                        </el-dropdown-item>
                        <el-dropdown-item
                          command={{
                            type: "delete",
                            page
                          }}>
                          删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </li>
              );
            })}
          </ul>
        </el-scrollbar>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@include b(page-manage) {
  margin-bottom: 10px;
  @include e(list-item) {
    padding: 0 10px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: var(--font-color-gray2);
    border-bottom: 1px solid rgb(235, 238, 245);
    .icon-yemian,
    .icon-web-icon- {
      margin-right: 10px;
    }
    .iconfont {
      font-size: 18px;
    }
    .icon-yemian {
      font-size: 14px;
    }
    &:hover {
      background-color: #f5f7fa;
    }
    &--active {
      background-color: rgba(64, 158, 255, 0.1) !important;
      color: var(--theme-color);
      .iconfont {
        color: var(--theme-color);
      }
    }
    @include e(page-name) {
      height: 100%;
      display: flex;
      align-items: center;
      /deep/.el-input {
        width: 120px;
        input {
          background: transparent;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@include b(page-manage) {
  @include e(scrollbar) {
    width: 100%;
  }
}
</style>
