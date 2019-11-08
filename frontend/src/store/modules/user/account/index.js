import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  updateUserAccountStatus: "",
  updateUserAccountMessage: "",
  getUserAccountStatus: "",
  getUserAccountMessage: ""
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
