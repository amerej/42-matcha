const forEach = require("lodash/forEach");
const uploadPath = process.env.VUE_APP_BACKEND_URL;

const userSearchRequest = state => {
  state.userSearchStatus = "loading";
};

const userSearchSuccess = (state, res) => {
  state.userSearchStatus = res.status;
  state.userSearchMessage = res.message;
  state.users = res.users;
  forEach(res.users, function(user) {
    for (let i = 0; i < 5; ++i) {
      if (!user.pictures[i]) {
        user.pictures[i] = require("@/assets/unnamed.jpg");
      } else {
        user.pictures[i] = uploadPath + user.pictures[i];
      }
    }
  });
};

const userSearchError = (state, res) => {
  state.userSearchStatus = res.status;
  state.userSearchMessage = res.message;
};

const updateSearch = (state, search) => {
  // merge data with previous state
  state.search = Object.assign({}, state.search, search);
};

export default {
  userSearchRequest,
  userSearchSuccess,
  userSearchError,
  updateSearch
};
