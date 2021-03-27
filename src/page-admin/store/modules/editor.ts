import { Module, VuexModule, Mutation, getModule } from "vuex-module-decorators";
import store from "page-admin/store";
import EventBus, { EventType } from "page-admin/event-bus";
import VuexPersistence from "vuex-persist";

function getDefaultConfig(): EditorConfig {
  return {
    grid: 20,
    isVisibleGrid: true,
    zoom: 1
  };
}
if (store.hasModule("editor")) {
  store.unregisterModule("editor");
}
@Module({ name: "editor", dynamic: true, namespaced: true, store })
export default class EditorModule extends VuexModule implements EditorConfig {
  static module() {
    return getModule(EditorModule);
  }

  grid = 20;
  isVisibleGrid = true;
  zoom = 1;

  @Mutation
  setZoom(val: number) {
    val = Math.max(0.1, val);
    this.zoom = val;
    EventBus.$emit(EventType.PAGE_SCALE);
  }

  @Mutation
  setEditorConfig(data: Partial<EditorConfig> = getDefaultConfig()) {
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        this[key] = data[key];
      }
    });
  }
}

new VuexPersistence({
  storage: window.localStorage,
  modules: ["editor"]
}).plugin(store);
