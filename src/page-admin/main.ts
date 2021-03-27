import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import eventBus from "./event-bus";
import "page-admin/style/var.scss";
import "page-admin/style/reset.scss";
import "animate.css";
import "shared/font/iconfont.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import VueDraggableResizable from "vue-draggable-resizable-gorkys";
// import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import components, { componentsConfig, componentcategory } from "components/index";
import Component from "vue-class-component";
import service from "../api";
import api from "../api/dict";
Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave", "beforeRouteUpdate"]);

Vue.config.productionTip = false;
Vue.prototype.$eventBus = eventBus;
Vue.prototype.$components = components;
Vue.prototype.$componentsConfig = componentsConfig;
Vue.prototype.$componentcategory = componentcategory;
Vue.prototype.$ajax = service;
Vue.prototype.$api = api;
Vue.use(ElementUI, {
  size: "mini"
});

// Vue.component("vue-draggable-resizable", VueDraggableResizable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
