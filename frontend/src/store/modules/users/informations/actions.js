import axios from "axios";
import store from "@/store";
import router from "@/router";

const updateInformations = async ({ commit }, userInformations) => {
  try {
    commit("updateInformationsRequest");
    const userId = store.getters["auth/userId"];
    const url = "users/" + userId + "/informations";
    const result = await axios({
      url: url,
      data: userInformations,
      method: "PUT"
    });
    const data = result.data;
    commit("updateInformationsSuccess", {
      gender: data.gender,
      orientation: data.orientation,
      age: data.age,
      bio: data.bio,
      localization: data.localization,
      tag: data.tag
    });
  } catch (e) {
    commit("updateInformationsError");
    console.log(e);
  }
};

const getInformations = async ({ commit }) => {
  try {
    commit("getInformationsRequest");
    const userId = router.currentRoute.params.id;
    const url = "users/" + userId + "/profile";
    const result = await axios({ url: url, method: "GET" });
    const data = result.data.userProfile;
    commit("getInformationsSuccess", {
      gender: data.gender,
      orientation: data.orientation,
      age: data.age,
      bio: data.bio,
      localization: data.localization,
      tag: data.tag
    });
  } catch (e) {
    commit("getInformationsError");
    console.log(e);
  }
};

export default {
  updateInformations,
  getInformations
};
