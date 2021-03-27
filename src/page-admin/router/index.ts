import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Frame from "page-admin/components/frame/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/appManage",
    component: Frame,
    children: [
      {
        path: "/appManage",
        name: "AppManage",
        component: () => import(/* webpackChunkName: "app-manage" */ "../views/app-manage/index.vue")
      }
    ]
  },
  {
    path: "/editor",
    component: () => import(/* webpackChunkName: "app-editor" */ "../views/editor/index.vue")
  },
  {
    path: "/dataSource",
    component: () => import(/* webpackChunkName: "app-dataSource" */ "../views/data-source/index.vue")
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "app-login" */ "../views/login/index.vue")
  }
];

// 开发环境加入playground，用于组件测试
if (process.env.NODE_ENV === "development") {
  routes.push({
    path: "/playground",
    component: () => import(/* webpackChunkName: "app-playground" */ "../views/playground/index.vue")
  });
}

const router = new VueRouter({
  routes
});

//守卫
let token = "";
if (sessionStorage.getItem("token")) {
  token = JSON.parse(sessionStorage.getItem("token")!);
}
const whiteList = ["/login", "/playground"];
router.beforeEach((from, to, next) => {
  if (whiteList.indexOf(from.path) == -1) {
    if (token) {
      next(); // 已登录
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

export default router;
