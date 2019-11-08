const username = state => state.username;
const firstname = state => state.firstname;
const lastname = state => state.lastname;
const email = state => state.email;
const password = state => state.password;
const updateAccountStatus = state => state.updateAccountStatus;
const getAccountStatus = state => state.getAccountStatus;

export default {
  username,
  firstname,
  lastname,
  email,
  password,
  updateAccountStatus,
  getAccountStatus
};
