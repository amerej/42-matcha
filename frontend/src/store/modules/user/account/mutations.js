const updateUserAccountRequest = state => {
  state.updateUserAccountStatus = "loading";
};

const updateUserAccountSuccess = (state, res) => {
  state.updateUserAccountStatus = res.status;
  state.updateUserAccountMessage = res.message;
  state.email = res.email;
  state.username = res.username;
  state.firstname = res.firstname;
  state.lastname = res.lastname;
};

const updateUserAccountError = (state, res) => {
  state.updateUserAccountStatus = res.status;
  state.updateUserAccountMessage = res.message;
};

const getUserAccountRequest = state => {
  state.getUserAccountStatus = "loading";
};

const getUserAccountSuccess = (state, res) => {
  state.getUserAccountStatus = "success";
  state.getUserAccountMessage = res.message;
  state.email = res.email;
  state.username = res.username;
  state.firstname = res.firstname;
  state.lastname = res.lastname;
};

const getUserAccountError = (state, res) => {
  state.getUserAccountStatus = res.status;
  state.getUserAccountMessage = res.message;
};

export default {
  updateUserAccountRequest,
  updateUserAccountSuccess,
  updateUserAccountError,
  getUserAccountRequest,
  getUserAccountSuccess,
  getUserAccountError
};
