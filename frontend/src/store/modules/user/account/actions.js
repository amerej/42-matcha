import axios from "axios";
import store from "@/store";
// import router from '@/router'

const updateUserAccount = async ({ commit }, data) => {
  try {
    commit("updateUserAccountRequest");
    const userId = store.getters["auth/userId"];
    const result = await axios({
      url: "users/" + userId + "/account",
      data: data,
      method: "PUT"
    });
    commit("updateUserAccountSuccess", {
      status: result.data.status,
      message: result.data.message,
      email: result.data.email,
      username: result.data.username,
      firstname: result.data.firstname,
      lastname: result.data.lastname
    });
  } catch (e) {
    commit("updateUserAccountError", {
      status: "error",
      message: e.response.data.error.message
    });
  }
};

const getUserAccount = async ({ commit }) => {
  try {
    commit("getUserAccountRequest");
    const userId = store.getters["auth/userId"];
    const result = await axios({
      url: "users/" + userId + "/account",
      method: "GET"
    });
    commit("getUserAccountSuccess", {
      email: result.data.email,
      username: result.data.username,
      firstname: result.data.firstname,
      lastname: result.data.lastname,
      status: result.data.status,
      message: result.data.message
    });
  } catch (e) {
    commit("getUserAccountError", {
      status: e.response.data.status,
      message: e.response.data.message
    });
  }
};

export default {
  updateUserAccount,
  getUserAccount
};
