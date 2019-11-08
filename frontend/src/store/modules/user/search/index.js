import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  search: {
    age: [18, 99],
    popularity: [0, 100],
    distance: 0,
    tag: null,
    sheet: false
  },
  users: [],
  userSearchStatus: "",
  userSearchMessage: ""
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
