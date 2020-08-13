import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@views/Main";
import Cookie from "js-cookie";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "Root",
    redirect: "/model-list",
    component: Main,
    beforeEnter: (to, from, next) => {
      if (!Cookie.get("token")) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
    children: []
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@views/Login")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@views/Register")
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
