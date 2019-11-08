const updateUserProfileRequest = state => {
  state.updateProfileStatus = "loading";
};

const updateUserProfileSuccess = (state, res) => {
  state.updateUserProfileStatus = res.status;
  state.updateUserProfileMessage = res.message;
  state.gender = res.gender;
  state.orientation = res.orientation;
  state.age = res.age;
  state.bio = res.bio;
  state.localization = res.localization;
  state.tag = res.tag;
};

const updateUserProfileError = (state, res) => {
  state.updateUserProfileStatus = res.status;
  state.updateUserProfileMessage = res.message;
};

const getUserProfileRequest = state => {
  state.updateInformationsStatus = "loading";
};

const getUserProfileSuccess = (state, informations) => {
  state.updateInformationsStatus = "success";
  state.gender = informations.gender;
  state.orientation = informations.orientation;
  state.age = informations.age;
  state.bio = informations.bio;
  state.tag = informations.tag;
  state.localization = informations.localization;
};

const getUserProfileError = state => {
  state.updateInformationsStatus = "error";
};

export default {
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileError,
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileError
};
