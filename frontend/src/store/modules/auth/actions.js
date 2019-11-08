import axios from "axios";
import router from "@/router";
import store from "@/store";

// Signin

const setLogoutTimer = ({ dispatch }, expirationDate) => {
  setTimeout(() => {
    dispatch("signout");
  }, expirationDate * 60);
};

// eslint-disable-next-line no-unused-vars
const signin = async ({ commit, dispatch, state }, user) => {
  try {
    commit("SIGNIN_REQUEST");
    const res = await axios({
      url: "signin",
      data: user,
      method: "POST"
    });
    commit("SIGNIN_SUCCESS", {
      accessToken: res.data.accessToken,
      userId: res.data.userId,
      username: res.data.username
    });
    dispatch("setLogoutTimer", res.data.expiresIn);
  } catch (e) {
    commit("SIGNIN_ERROR", e.response.data.error);
  }
};

// Signout

const signout = async ({ commit }) => {
  try {
    commit("signoutRequest");
    const userId = store.getters["auth/userId"];
    await axios({
      url: "signout",
      data: {
        userId
      },
      method: "PUT"
    });
    commit("signoutSuccess");
    router.push({
      name: "Welcome"
    });
  } catch (e) {
    commit("signoutError", e);
    router.push({
      name: "Welcome"
    });
  }
};

// Signup

const signup = async ({ commit }, user) => {
  try {
    commit("signupRequest");
    const res = await axios({
      url: "signup",
      data: user,
      method: "POST"
    });
    commit("signupSuccess", res.data);
    router.push({
      name: "VerifyAccount"
    });
  } catch (e) {
    commit("signupError", e);
    router.push({
      name: "Signup"
    });
  }
};

//  Verify

const verify = async ({ commit }, uuid) => {
  try {
    commit("verifyAccountRequest");
    const res = await axios({
      url: "verify",
      data: uuid,
      method: "POST"
    });
    commit("verifyAccountSuccess", res.data);
    router.push({
      name: "VerifyAccount"
    });
  } catch (e) {
    commit("verifyAccountError", e);
    router.push({
      name: "VerifyAccount"
    });
  }
};

export default {
  setLogoutTimer,
  signin,
  signout,
  signup,
  verify
};
