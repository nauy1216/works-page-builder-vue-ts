import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "page-admin/style/reset.scss";
import components from "components/index";
import Component from "vue-class-component";
Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave", "beforeRouteUpdate"]);

Vue.config.productionTip = false;
Vue.prototype.$components = components;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
