import axios from "axios";
import store from "@/store";

const userSearch = async ({ commit }, query) => {
  try {
    commit("userSearchRequest");
    const userId = store.getters["auth/userId"];
    const result = await axios({
      url: "users/" + userId + "/search",
      params: {
        age: query.age,
        popularity: query.popularity,
        distance: query.distance,
        tag: query.tag
      },
      method: "GET"
    });
    commit("userSearchSuccess", {
      users: result.data.users
    });
  } catch (err) {
    commit("userSearchError", {
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
};

export default {
  userSearch
};
