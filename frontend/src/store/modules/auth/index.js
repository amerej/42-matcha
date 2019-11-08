import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  accessToken: localStorage.getItem("accessToken") || null,
  userId: localStorage.getItem("userId") || null,
  username: localStorage.getItem("username") || null,
  isAccountVerified: false,
  isProfileCompleted: false,
  signinStatus: null,
  signinErrorMessage: "",
  verifyAccountStatus: null,
  signupStatus: null,
  signoutStatus: null
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
