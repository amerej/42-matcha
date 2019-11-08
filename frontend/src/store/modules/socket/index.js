import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  isConnected: false,
  socketMessage: ""
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
