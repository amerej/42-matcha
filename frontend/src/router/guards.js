import store from "../store";

export const ifAuthenticated = (to, from, next) => {
  const isAuth = store.getters["auth/isAuth"];
  if (isAuth) {
    next();
    return;
  }
  next("/welcome");
};

export const ifNotAuthenticated = (to, from, next) => {
  const isAuth = store.getters["auth/isAuth"];
  if (!isAuth) {
    next();
    return;
  }
  next("/");
};

export const restrictToSelf = (to, from, next) => {
  const userId = store.getters["auth/userId"];
  const paramsId = to.params.user_id;
  if (userId === paramsId) {
    next();
    return;
  }
  next("/user/" + userId + "/profile");
};
