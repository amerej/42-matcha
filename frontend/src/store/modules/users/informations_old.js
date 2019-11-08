import axios from "axios";
/* eslint-disable */

const state = {
  gender: "",
  orientation: "",
  age: "",
  bio: "",
  updateProfileStatus: "",
  isProfileCompleted: false
};

const getters = {
  gender: state => state.gender,
  orientation: state => state.orientation,
  age: state => state.age,
  bio: state => state.bio,
  updateProfileStatus: state => state.updateProfileStatus,
  isProfileCompleted: state => state.isProfileCompleted
};

const mutations = {
  updateProfileRequest(state) {
    state.updateProfileStatus = "Loading";
  },
  updateProfileSuccess(state, userData) {
    state.updateProfileStatus = "Success";
    state.gender = userData.gender;
    state.orientation = userData.orientation;
    state.age = userData.age;
    state.bio = userData.bio;
  },
  updateProfileError(state) {
    state.updateProfileStatus = "Error";
  }
};

const actions = {
  updateProfile({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios({ url: "signup", data: user, method: "POST" })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
