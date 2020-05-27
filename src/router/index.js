import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@views/Main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login",
    component: Main,
    children: [
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@views/login")
  }
];

const router = new VueRouter({
  routes
});

export default router;
