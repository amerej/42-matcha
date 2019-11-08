import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  gender: null,
  orientation: null,
  age: null,
  bio: null,
  localization: null,
  tag: null,
  updateUserProfileStatus: "",
  updateUserProfileMessage: "",
  getUserProfileStatus: null,
  isProfileCompleted: false
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
