import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  minAge: 18,
  maxAge: 99,
  minPopularity: 0,
  maxPopularity: 100,
  distance: 1,
  updateSettingsStatus: ""
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
