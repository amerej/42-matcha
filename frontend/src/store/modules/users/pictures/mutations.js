const uploadPath = process.env.VUE_APP_BACKEND_URL;

const updateUserPictureRequest = state => {
  state.updateUserPictureStatus = "loading";
};

const updateUserPictureSuccess = (state, res) => {
  state.updateUserPictureStatus = res.status;
  state.updateUserPictureMessage = res.message;
  state.pictures.splice(res.id, 1, uploadPath + res.filename);
};

const updateUserPictureError = state => {
  state.updateUserPictureStatus = "error";
};

const getPicturesRequest = state => {
  state.getPicturesStatus = "loading";
};

const getPicturesSuccess = (state, pictures) => {
  state.getPicturesStatus = "success";
  for (let key in pictures) {
    state.pictures.splice(
      pictures[key].picture_id,
      1,
      uploadPath + pictures[key].filename
    );
  }
};

const getPicturesError = state => {
  state.getPicturesStatus = "error";
};

export default {
  updateUserPictureRequest,
  updateUserPictureSuccess,
  updateUserPictureError,
  getPicturesRequest,
  getPicturesSuccess,
  getPicturesError
};
