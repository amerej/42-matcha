const isAuth = state => !!state.accessToken;
const userId = state => state.userId;
const username = state => state.username;
const signinStatus = state => state.signinStatus;
const verifyAccountStatus = state => state.verifyAccountStatus;
const signupStatus = state => state.signupStatus;
const signoutStatus = state => state.signoutStatus;

export default {
  isAuth,
  userId,
  username,
  signinStatus,
  verifyAccountStatus,
  signupStatus,
  signoutStatus
};
