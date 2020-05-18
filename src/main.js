import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import $ from "jquery";
import moment from "moment";
import XEUtils from "xe-utils";
import VXEUtils from "vxe-utils";

window.$ = $;
window.moment = moment;

Vue.use(VXEUtils, XEUtils, { mounts: ["cookie", "browse", "locat"] });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
