import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import usersPictures from "@/store/modules/users/pictures";
import userProfile from "@/store/modules/user/profile";
import userAccount from "@/store/modules/user/account";
import usersSettings from "@/store/modules/users/settings";
import userVisit from "@/store/modules/user/visit";
import userSearch from "@/store/modules/user/search";
import socket from "@/store/modules/socket";

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    userSearch,
    usersPictures,
    userProfile,
    userAccount,
    usersSettings,
    userVisit,
    socket
  },
  strict: false
});
