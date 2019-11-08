import axios from "axios";
import store from "@/store";
// import router from '@/router'

const updatePicture = async ({ commit }, picture) => {
  try {
    commit("updateUserPictureRequest");
    const userId = store.getters["auth/userId"];
    const userPicture = await axios({
      url: "users/" + userId + "/picture",
      data: picture,
      method: "PUT"
    });
    commit("updateUserPictureSuccess", {
      status: userPicture.data.status,
      message: userPicture.data.message,
      id: userPicture.data.picture.picture_id,
      filename: userPicture.data.picture.filename
    });
  } catch (e) {
    commit("updateUserPictureError", {
      status: e.response.data.status,
      message: e.response.data.message
    });
  }
};

const getPictures = async ({ commit }, userId) => {
  try {
    commit("getPicturesRequest");
    // const userId = router.currentRoute.params.id
    const pictures = await axios({
      url: "users/" + userId + "/pictures",
      method: "GET"
    });
    commit("getPicturesSuccess", pictures.data.pictures);
  } catch (e) {
    commit("getPicturesError");
    console.log(e);
  }
};

export default {
  updatePicture,
  getPictures
};
