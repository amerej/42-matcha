const updateInformationsRequest = state => {
  state.updateProfileStatus = "Loading";
};

const updateInformationsSuccess = (state, informations) => {
  state.updateInformationsStatus = "Success";
  state.gender = informations.gender;
  state.orientation = informations.orientation;
  state.age = informations.age;
  state.bio = informations.bio;
  state.localization = informations.localization;
  state.tag = informations.tag;
};

const updateInformationsError = state => {
  state.updateInformationsStatus = "Error";
};

const getInformationsRequest = state => {
  state.updateInformationsStatus = "Loading";
};

const getInformationsSuccess = (state, informations) => {
  state.updateInformationsStatus = "Success";
  state.gender = informations.gender;
  state.orientation = informations.orientation;
  state.age = informations.age;
  state.bio = informations.bio;
  state.tag = informations.tag;
  state.localization = informations.localization;
};

const getInformationsError = state => {
  state.updateInformationsStatus = "Error";
};

export default {
  updateInformationsRequest,
  updateInformationsSuccess,
  updateInformationsError,
  getInformationsRequest,
  getInformationsSuccess,
  getInformationsError
};
