<script lang="tsx">
import BaseVue from "page-web/BaseVue";
import { px2rem, Logger } from "shared/utils";
import { Component, Watch } from "vue-property-decorator";
import { historyView } from "api/request";
import AsyncRender from "./async-render.vue";
import { AppStore } from "page-web/store/modules";
import { DataSourceType } from "shared/const";
import packageManager from "api/package-manager";

@Component
export default class PageShow extends BaseVue {
  scale = 1;

  pageConfig: PageConfig | null = null;
  childComponents: ComponentOption[] = [];

  created() {
    document.documentElement.style.fontSize = `${process.env.VUE_APP_HTML_FONT_SIZE}px`;
    window.addEventListener("resize", this.resize);
    this.$on("hook:destoryed", () => {
      window.removeEventListener("resize", this.resize);
    });

    this.getPageConfig();
  }

  get pageId() {
    return Number(this.$route.params.pageId);
  }

  @Watch("$route")
  watchRoute() {
    this.getPageConfig();
  }

  getHistoryId() {
    for (const page of AppStore.pageList) {
      if (page.id === this.pageId) {
        return page.hid;
      }
    }
    return -1;
  }

  resize() {
    if (this.pageConfig) {
      const width = document.documentElement.getBoundingClientRect().width;
      this.scale = width / this.pageConfig.width;
    }
  }

  getPageConfig() {
    Logger.info("pageId", this.pageId);
    const hid = this.getHistoryId();
    if (hid < 0) {
      Logger.error(`页面${this.pageId}没有找到hid`);
      return;
    }
    historyView(hid).then(res => {
      if (res.code == 200) {
        const childComponents: ComponentOption[] = [];
        let pageConfig: PageConfig | null = null;
        let compConfig: ComponentOption;
        if (res.details && res.details.components) {
          try {
            if (res.details.pages[0] && res.details.pages[0].config_content) {
              pageConfig = JSON.parse(res.details.pages[0].config_content);
            }
          } catch (e) {
            Logger.error(`JSON解析页面config出错, 后台返回数据： `, res.details.pages[0].config_content);
          }
          res.details.components.forEach(comp => {
            if (comp.config_content) {
              try {
                compConfig = JSON.parse(comp.config_content);
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
                    packageManager.bindComponent(`/dataSource/${compConfig.dataSource.packageId}.json`, compConfig);
                  }
                }

                childComponents.push(compConfig);
              } catch (e) {
                Logger.error(`JSON解析组件config出错, 后台返回数据： `, comp.config_content);
              }
            }
          });
          // childComponents.reverse();
          // childComponents.sort((pre: ComponentOption, next: ComponentOption) => {
          //   if (pre.layoutConfig.x < next.layoutConfig.x || pre.layoutConfig.y < next.layoutConfig.y) {
          //     return -1;
          //   }
          //   if (pre.layoutConfig.x > next.layoutConfig.x || pre.layoutConfig.y > next.layoutConfig.y) {
          //     return 1;
          //   }
          //   return 0;
          // });
        }

        if (pageConfig) {
          this.pageConfig = pageConfig;
        }

        this.resize();
        this.childComponents = childComponents;
      }
    });
  }

  render() {
    if (!this.pageConfig) {
      return null;
    }
    return (
      <div class="view-port">
        <div
          class="page-content"
          style={{
            width: px2rem(this.pageConfig.width),
            height: px2rem(this.pageConfig.height),
            transform: `scale(${this.scale})`,
            "transform-origin": "0 0"
          }}>
          {this.childComponents &&
            this.childComponents.map(comp => {
              return <AsyncRender key={comp.id} component={comp}></AsyncRender>;
            })}
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.view-port {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .page-content {
    position: relative;
    overflow: hidden;
  }
}
</style>
