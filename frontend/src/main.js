import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuetify";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import store from "./store";
import "./registerServiceWorker";
import "./stylus/main.styl";
import colors from "vuetify/es5/util/colors";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:4000/",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken3,
    secondary: colors.blue.accent3,
    error: colors.red.accent3
  }
});

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
Vue.use(VueAxios, axios);

const token = localStorage.getItem("accessToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
