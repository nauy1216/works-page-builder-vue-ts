import axiosInstance from "api/index";
import { Component } from "vue-property-decorator";
import Vue from "vue";
import { Logger } from "shared/utils";

@Component
class PackageManager extends Vue {
  private readonly packages: Record<string, any> = {};
  private readonly laodingPackages: Record<string, Promise<any>> = {};

  /**
   * 存包数据
   * @param url
   * @param data
   */
  set(url: string, data: any) {
    this.$set(this.packages, url, data);
  }

  /**
   * 获取缓存中的包数据
   * @param url 包地址
   */
  get(url: string) {
    return this.packages[url];
  }

  /**
   * 拉取包
   * @param packUrl 包请求地址
   * @param isForce 是否强制从服务器获取数据， 默认从缓存里拿
   */
  fetch(packUrl: string, isForce = false) {
    if (isForce || !this.packages[packUrl]) {
      if (this.laodingPackages[packUrl]) {
        return this.laodingPackages[packUrl];
      }
      const url = isForce ? `${packUrl}?t=${+new Date()}` : packUrl;
      const request = new Promise<any>(resolve => {
        axiosInstance
          .json(url)
          .then(res => {
            this.set(packUrl, res);
            Logger.info(`数据包${packUrl}拉取成功`);
            resolve(res);
          })
          .catch(() => {
            resolve(null);
            Logger.error(`数据包${packUrl}拉取失败`);
          })
          .finally(() => {
            delete this.laodingPackages[packUrl];
          });
      });
      this.laodingPackages[packUrl] = request;
      return request;
    }
    Logger.info(`数据包${packUrl}使用缓存`, JSON.stringify(this.get(packUrl)));
    return Promise.resolve<any>(this.get(packUrl));
  }

  /**
   * 拉取包并绑定组件componentData
   * @param packUrl 包请求地址
   * @param comp    包绑定的组件
   * @param isForce 是否强制从服务器获取数据， 默认从缓存里拿
   */
  bindComponent(packUrl: string, comp: ComponentOption, isForce = false) {
    return this.fetch(packUrl, isForce).then(() => {
      Vue.set(comp, "componentData", this.get(packUrl));
    });
  }

  /**
   * 拉取包并绑定dataSource.jsonContent
   * @param packUrl 包请求地址
   * @param comp    包绑定的组件
   * @param isForce 是否强制从服务器获取数据， 默认从缓存里拿
   */
  bindComponentJsonContent(packUrl: string, comp: ComponentOption, isForce = false) {
    return this.fetch(packUrl, isForce).then(() => {
      comp.dataSource.jsonContent = JSON.stringify(this.get(packUrl), null, 2);
    });
  }
}

const packageManager = new PackageManager();
// @TODO 为了方便测试使用
(window as any).packageManager = packageManager;
export default packageManager;
