import Vue, { VueConstructor } from "vue";
import { PageStore } from "page-admin/store/modules";

// 私有全局属性在这里声明， 避免全几乎污染
export default class BaseVue extends Vue {
  $eventBus!: Pick<Vue, "$on" | "$emit" | "$off">;
  $componentcategory!: {
    [key: string]: {
      name: string;
      components: Record<string, VueConstructor>;
    };
  };
  $components!: Record<string, VueConstructor>;
  $componentsConfig!: Record<string, ComponentConfig>;

  // Vuex模块
  get pageStore() {
    return PageStore;
  }
}
