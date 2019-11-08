const updateSettingsRequest = state => {
  state.updateSettingsStatus = "Loading";
};

const updateSettingsSuccess = (state, userSettings) => {
  state.updateSettingsStatus = "Success";
  state.minAge = userSettings.minAge;
  state.maxAge = userSettings.maxAge;
  state.minPopularity = userSettings.minPopularity;
  state.maxPopularity = userSettings.maxPopularity;
  state.distance = userSettings.distance;
};

const updateSettingsError = state => {
  state.updateSettingsStatus = "Error";
};

const getSettingsRequest = state => {
  state.getSettingsStatus = "Loading";
};

const getSettingsSuccess = (state, userSettings) => {
  state.getSettingsStatus = "Success";
  state.minAge = userSettings.minAge;
  state.maxAge = userSettings.maxAge;
  state.minPopularity = userSettings.minPopularity;
  state.maxPopularity = userSettings.maxPopularity;
  state.distance = userSettings.distance;
};

const getSettingsError = state => {
  state.getSettingsStatus = "Error";
};

export default {
  updateSettingsRequest,
  updateSettingsSuccess,
  updateSettingsError,
  getSettingsRequest,
  getSettingsSuccess,
  getSettingsError
};
