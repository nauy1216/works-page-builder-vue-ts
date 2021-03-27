import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store<{
  page: PageConfig;
  editor: EditorConfig;
}>({
  state: {} as any,
  mutations: {},
  actions: {},
  modules: {}
});

export default store;
