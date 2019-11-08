import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  updateAccountStatus: "",
  getAccountStatus: ""
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
