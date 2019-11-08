import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  visits: null,
  count: 0,
  getVisitsStatus: "",
  updateVisitsStatus: ""
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
