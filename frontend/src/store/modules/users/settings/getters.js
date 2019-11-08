const getMinAge = state => state.minAge;
const getMaxAge = state => state.maxAge;
const getMinPopularity = state => state.minPopularity;
const getMaxPopularity = state => state.maxPopularity;
const getDistance = state => state.distance;
const updateSettingsStatus = state => state.updateSettingsStatus;

export default {
  getMinAge,
  getMaxAge,
  getMinPopularity,
  getMaxPopularity,
  getDistance,
  updateSettingsStatus
};
