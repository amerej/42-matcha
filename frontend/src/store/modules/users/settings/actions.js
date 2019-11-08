import axios from "axios";
import store from "@/store";

const updateSettings = async ({ commit }, userSettings) => {
  try {
    commit("updateSettingsRequest");
    const userId = store.getters["auth/userId"];
    const url = "users/" + userId + "/settings";
    const result = await axios({ url: url, data: userSettings, method: "PUT" });
    const data = result.data.settings;
    commit("updateSettingsSuccess", {
      minAge: data.min_age,
      maxAge: data.max_age,
      minPopularity: data.min_popularity,
      maxPopularity: data.max_popularity,
      distance: data.distance
    });
  } catch (e) {
    commit("updateSettingsError");
    console.log(e);
  }
};

const getSettings = async ({ commit }) => {
  try {
    commit("getSettingsRequest");
    const userId = store.getters["auth/userId"];
    const url = "users/" + userId + "/settings";
    const result = await axios({ url: url, method: "GET" });
    const data = result.data.settings;
    commit("getSettingsSuccess", {
      minAge: data.min_age,
      maxAge: data.max_age,
      minPopularity: data.min_popularity,
      maxPopularity: data.max_popularity,
      distance: data.distance
    });
  } catch (e) {
    commit("getSettingsError");
    console.log(e);
  }
};

export default {
  updateSettings,
  getSettings
};
