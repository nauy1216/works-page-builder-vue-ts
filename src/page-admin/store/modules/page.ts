import { Module, VuexModule, Mutation, getModule, Action } from "vuex-module-decorators";
import store from "page-admin/store";
import { VueConstructor } from "vue";
import { uuid } from "shared/utils/index";
import EventBus, { EventType } from "page-admin/event-bus";
import { pageAddOrUpdate } from "api/request";

function getDefaultPageConfig(): PageConfig {
  return {
    pageName: "",
    pageId: 0,
    width: 1920,
    height: 1080,
    pageStyle: {},
    childComponents: []
  };
}
type CustomVueConstructor = VueConstructor & Record<string, any>;

if (store.hasModule("page")) {
  store.unregisterModule("page");
}
@Module({ name: "page", dynamic: true, namespaced: true, store })
export default class PageModule extends VuexModule implements PageConfig {
  static module() {
    return getModule(PageModule);
  }

  static watchState(callback: Function) {
    return store.watch(
      () => {
        const page = store.state.page;
        return [page.pageName, page.width, page.height, page.pageStyle, page.childComponents];
      },
      () => {
        if (typeof callback === "function") {
          callback();
        }
      },
      {
        deep: true
      }
    );
  }

  // 获取组件的索引
  static getCompIndex(store: PageModule, comp: ComponentOption | string) {
    if (!comp) return -1;
    let index = -1;
    if (typeof comp === "string") {
      index = store.childComponents.findIndex(child => child.id === comp);
    } else {
      index = store.childComponents.indexOf(comp);
    }
    return index;
  }

  dragComp: CustomVueConstructor | null = null; // 从组件列表中拖动的组件
  activeComp: ComponentOption | null = null; // 画布当前选中的组件
  pageName = "页面";
  pageId = 0;
  width = 1920;
  height = 1080;
  pageStyle = {};
  childComponents: ComponentOption[] = [];

  // 传给后台
  get config() {
    return {
      pageName: this.pageName,
      pageId: this.pageId,
      width: this.width,
      height: this.height,
      pageStyle: this.pageStyle
    };
  }

  // 设置当前拖拽的组件
  @Mutation
  setDragComp(ctor: CustomVueConstructor | null) {
    this.dragComp = ctor;
  }

  // 设置当前激活的组件
  @Mutation
  setActiveComp(comp: ComponentOption | null) {
    if (this.activeComp) {
      this.activeComp.tempData.active = false;
    }
    if (comp) {
      comp.tempData.active = true;
    }
    this.activeComp = comp;
  }

  // 增加组件
  @Mutation
  addComponent(comp: ComponentOption) {
    this.childComponents.push(comp);
    PageModule.module().setActiveComp(comp);
    PageModule.module().checkBoundary(comp);
  }

  // 删除一个组件
  @Mutation
  removeComponent(comp: ComponentOption | string) {
    if (!comp) return;
    const index = PageModule.getCompIndex(this, comp);
    if (index > -1) {
      this.childComponents.splice(index, 1);
      if (typeof comp === "string") {
        if (this.activeComp && this.activeComp.id === comp) {
          this.activeComp = null;
        }
      } else {
        if (this.activeComp && this.activeComp.id === comp.id) {
          this.activeComp = null;
        }
      }
    }
  }

  // 删除所有组件
  @Mutation
  removeAllComponent() {
    this.childComponents = [];
    this.activeComp = null;
  }

  @Mutation
  setPageConfig(data: Partial<PageConfig> = getDefaultPageConfig()) {
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        this[key] = data[key];
      }
    });
  }

  // 重置页面
  @Mutation
  resetPage() {
    PageModule.module().setPageConfig({
      pageName: "",
      pageId: 0,
      width: 1920,
      height: 1080,
      pageStyle: {},
      childComponents: []
    });
  }

  // 按tab键切换当前激活组件
  @Mutation
  setNextActiveComp() {
    if (this.activeComp) {
      const index = PageModule.getCompIndex(this, this.activeComp);
      PageModule.module().setActiveComp(this.childComponents[(index + 1) % this.childComponents.length]);
    } else {
      PageModule.module().setActiveComp(this.childComponents[0]);
    }
  }

  // 复制组件
  @Mutation
  copyComponent(comp: ComponentOption) {
    const copy: ComponentOption = JSON.parse(JSON.stringify(comp));
    copy.id = uuid();
    copy.tempData.key = uuid();
    const index = PageModule.getCompIndex(this, copy.id);
    if (index < 0) {
      PageModule.module().addComponent(copy);
    }
  }

  // 刷新组件
  @Mutation
  refreshComponent(comp: ComponentOption) {
    comp.tempData.key = uuid();
  }

  // 边界检测
  @Mutation
  checkBoundary(comp: ComponentOption) {
    comp;
    // const store = PageModule.module();
    // if (comp.layoutConfig.width > store.width) {
    //   comp.layoutConfig.x = 0;
    //   comp.layoutConfig.height = comp.layoutConfig.height * (store.width / comp.layoutConfig.width);
    //   comp.layoutConfig.width = store.width;
    // }
    // console.log(comp.layoutConfig.x, comp.layoutConfig.y);
    // comp.layoutConfig.x = Math.min(store.width - comp.layoutConfig.width, comp.layoutConfig.x);
    // comp.layoutConfig.y = Math.min(store.height - comp.layoutConfig.height, comp.layoutConfig.y);
    // comp.layoutConfig.x = Math.max(0, comp.layoutConfig.x);
    // comp.layoutConfig.y = Math.max(0, comp.layoutConfig.y);
  }

  @Mutation
  setPageWidth(width: number) {
    this.width = Math.max(width, 0);
    EventBus.$emit(EventType.PAGE_RESIZE);
  }

  @Mutation
  setPageHeight(height: number) {
    this.height = Math.max(height, 0);
    EventBus.$emit(EventType.PAGE_RESIZE);
  }

  @Action
  addOrUpdate(data: { appId: number; pageId: number; pageName: string }) {
    const PageStore = PageModule.module();
    const { pageName, appId, pageId } = data;
    return pageAddOrUpdate({
      pid: pageId,
      name: pageName,
      aid: appId,
      config_content: JSON.stringify(PageStore.config),
      remark: "",
      components: PageStore.childComponents.map(component => {
        const copyComp: ComponentOption = JSON.parse(JSON.stringify(component));
        // @ts-ignore
        delete copyComp.componentData;
        // @ts-ignore
        delete copyComp.tempData;
        const content = copyComp.dataSource.jsonContent;
        copyComp.dataSource.jsonContent = "";
        return {
          uuid: component.id, //前端提供组件唯一ID
          config_content: JSON.stringify(copyComp), //组件配置
          source_type: String(copyComp.dataSource.type), //数据源类型 0:手动录入 1:数据包
          json_content: content, //手动录入数据
          did: copyComp.dataSource.packageId || 0 //数据包ID
        };
      })
    });
  }
}
