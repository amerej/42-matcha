import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  gender: "",
  orientation: "",
  age: "",
  bio: "",
  localization: "",
  tag: "",
  updateInformationsStatus: "",
  getInformationsStatus: "",
  isProfileCompleted: false
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
