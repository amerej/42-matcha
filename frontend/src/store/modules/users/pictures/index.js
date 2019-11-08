import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  pictures: [
    require("@/assets/empty.png"),
    require("@/assets/empty.png"),
    require("@/assets/empty.png"),
    require("@/assets/empty.png"),
    require("@/assets/empty.png")
  ],
  updateUserPictureStatus: "",
  updateUserPictureMessage: "",
  getPicturesStatus: ""
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
