const getEmail = state => state.email;
const getUsername = state => state.username;
const getFirstname = state => state.firstname;
const getLastname = state => state.lastname;

const updateUserAccountStatus = state => state.updateUserAccountStatus;
const updateUserAccountMessage = state => state.updateUserAccountMessage;

const getUserAccountStatus = state => state.getUserAccountStatus;
const getUserAccountMessage = state => state.getUserAccountMessage;

export default {
  getEmail,
  getUsername,
  getFirstname,
  getLastname,
  updateUserAccountStatus,
  updateUserAccountMessage,
  getUserAccountStatus,
  getUserAccountMessage
};
