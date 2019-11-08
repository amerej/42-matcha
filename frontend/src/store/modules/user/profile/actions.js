import axios from "axios";
// import store from '@/store'
// import router from '@/router'

const updateUserProfile = async ({ commit }, user) => {
  try {
    commit("updateUserProfileRequest");
    // const userId = store.getters['auth/userId']
    const result = await axios({
      url: "users/" + user.userId + "/profile",
      data: user,
      method: "PUT"
    });
    commit("updateUserProfileSuccess", {
      status: result.data.status,
      message: result.data.message,
      gender: result.data.gender,
      orientation: result.data.orientation,
      age: result.data.age,
      bio: result.data.bio,
      localization: result.data.localization,
      tag: result.data.tag
    });
  } catch (e) {
    commit("updateUserProfileError", {
      status: e.response.data.status,
      message: e.response.data.message
    });
  }
};

const getUserProfile = async ({ commit }, userId) => {
  try {
    commit("getUserProfileRequest");
    const result = await axios({
      url: "users/" + userId + "/profile",
      method: "GET"
    });
    commit("getUserProfileSuccess", {
      gender: result.data.userProfile.gender,
      orientation: result.data.userProfile.orientation,
      age: result.data.userProfile.age,
      bio: result.data.userProfile.bio,
      localization: result.data.userProfile.localization,
      tag: result.data.userProfile.tag
    });
  } catch (e) {
    commit("getUserProfileError", {
      status: e.response.data.status,
      message: e.response.data.message
    });
  }
};

export default {
  updateUserProfile,
  getUserProfile
};
