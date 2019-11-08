<template lang="pug">
  v-app
    app-navigation
    v-content
      v-fade-transition(mode="out-in")
        router-view(:key="$route.fullPath")
</template>

<script>
import Navigation from "./components/navigation/index";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store";
import router from "@/router";

export default {
  name: "App",
  components: {
    appNavigation: Navigation
  },
  methods: {
    ...mapActions("auth", ["signout"])
  },
  beforeCreate() {
    // store.commit("setSocket", this.$socket)
  },
  computed: {
    ...mapGetters("auth", ["isAuth", "userId"])
  },
  created: function() {
    if (this.isAuth) {
      this.$socket.emit("room", "room_user_" + this.userId);
      axios.interceptors.response.use(
        function(response) {
          return response;
        },
        function(error) {
          let originalRequest = error.config;
          if (error.response.status === 401 && !originalRequest._retry) {
            store.dispatch("auth/signout").then(() => {
              router.push({
                name: "Welcome"
              });
            });
          }
          return Promise.reject(error);
        }
      );
    }
  }
};
</script>
