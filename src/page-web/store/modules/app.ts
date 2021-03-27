import { Module, VuexModule, Mutation, getModule, Action } from "vuex-module-decorators";
import store from "page-web/store";
import { pageList } from "api/request";
import { getAppId } from "shared/utils";

if (store.hasModule("app")) {
  store.unregisterModule("app");
}

type PageList = ResponseDetail<typeof pageList>;
@Module({ name: "app", dynamic: true, namespaced: true, store })
export default class AppModule extends VuexModule {
  static module() {
    return getModule(AppModule);
  }

  pageList: PageList = [];

  @Mutation
  setPageList(pages: any[]) {
    this.pageList = pages;
  }

  @Action
  getPageList() {
    return pageList(Number(getAppId())).then(res => {
      if (res.code === 200) {
        this.setPageList(res.details || []);
      }
    });
  }
}
