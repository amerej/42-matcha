const getGender = state => state.gender;
const getOrientation = state => state.orientation;
const getAge = state => state.age;
const getBio = state => state.bio;
const getLoc = state => state.localization;
const getTag = state => state.tag;
const isProfileCompleted = state => state.isProfileCompleted;

const updateInformationsStatus = state => state.updateInformationsStatus;
const getInformationsStatus = state => state.getInformationsStatus;

export default {
  getGender,
  getOrientation,
  getAge,
  getBio,
  getLoc,
  getTag,
  isProfileCompleted,
  updateInformationsStatus,
  getInformationsStatus
};
