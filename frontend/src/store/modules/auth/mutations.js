import axios from "axios";

// Signin

const SIGNIN_REQUEST = state => {
  state.signinStatus = "loading";
};

const SIGNIN_SUCCESS = (state, userData) => {
  state.signinStatus = "success";
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + userData.accessToken;
  localStorage.setItem("accessToken", userData.accessToken);
  localStorage.setItem("userId", userData.userId);
  localStorage.setItem("username", userData.username);
  state.accessToken = userData.accessToken;
  state.userId = userData.userId;
  state.username = userData.username;
};

const SIGNIN_ERROR = (state, err) => {
  localStorage.clear();
  state.signinErrorMessage = err.message;
  state.signinStatus = "error";
};

// Signout

const signoutRequest = state => {
  state.signoutStatus = "loading";
};

const signoutSuccess = state => {
  state.signoutStatus = "success";
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
  state.accessToken = null;
  state.userId = null;
  state.username = null;
  state.signinStatus = null;
};

const signoutError = state => {
  state.signoutStatus = "error";
};

// Signup

const signupRequest = state => {
  state.signupStatus = "loading";
};

const signupSuccess = state => {
  state.signupStatus = "success";
};

const signupError = state => {
  state.signupStatus = "error";
};

// Verify

const verifyAccountRequest = state => {
  state.verifyStatus = "loading";
};

const verifyAccountSuccess = (state, userData) => {
  state.verifyAccountStatus = "success";
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + userData.accessToken;
  localStorage.setItem("accessToken", userData.accessToken);
  localStorage.setItem("userId", userData.userId);
  localStorage.setItem("username", userData.username);
  state.accessToken = userData.accessToken;
  state.userId = userData.userId;
  state.username = userData.username;
};

const verifyAccountError = state => {
  localStorage.clear();
  state.verifyStatus = "error";
};

export default {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  signoutRequest,
  signoutSuccess,
  signoutError,
  signupRequest,
  signupSuccess,
  signupError,
  verifyAccountRequest,
  verifyAccountSuccess,
  verifyAccountError
};
