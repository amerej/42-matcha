import multiguard from "vue-router-multiguard";
import { ifAuthenticated, ifNotAuthenticated } from "@/router/guards";

import Welcome from "@/pages/welcome";

import Signin from "@/pages/auth/signin";
import Signup from "@/pages/auth/signup";
import VerifyAccount from "@/pages/auth/verify-account";
import Signout from "@/pages/signout";

import UserProfile from "@/pages/user-profile";
import UserEditProfile from "@/pages/user-edit-profile";
import UserEditAccount from "@/pages/user-edit-account";

import UserSuggestions from "@/pages/suggestions";
import UserSearch from "@/pages/user-search";
import UserLikes from "@/pages/likes";
import UserVisits from "@/pages/visits";
import UserMessages from "@/pages/messages";

import NotFound from "@/components/not-found";

export const routes = [
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: ifNotAuthenticated
  },
  { path: "/verify", name: "VerifyAccount", component: VerifyAccount },
  {
    path: "/signout",
    name: "Signout",
    component: Signout,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/user/:user_id/profile",
    name: "UserProfile",
    component: UserProfile,
    beforeEnter: multiguard([ifAuthenticated])
  },
  {
    path: "/user/edit-profile",
    name: "UserEditProfile",
    component: UserEditProfile,
    beforeEnter: multiguard([ifAuthenticated])
  },
  {
    path: "/user/edit-account",
    name: "UserEditAccount",
    component: UserEditAccount,
    beforeEnter: multiguard([ifAuthenticated])
  },
  {
    path: "/",
    name: "UserSuggestions",
    component: UserSuggestions,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/search",
    name: "UserSearch",
    component: UserSearch,
    beforeEnter: multiguard([ifAuthenticated])
  },
  {
    path: "/user/likes",
    name: "UserLikes",
    component: UserLikes,
    beforeEnter: multiguard([ifAuthenticated])
  },
  {
    path: "/user/messages",
    name: "UserMessages",
    component: UserMessages,
    beforeEnter: multiguard([ifAuthenticated])
  },
  {
    path: "/user/visits",
    name: "UserVisits",
    component: UserVisits,
    beforeEnter: multiguard([ifAuthenticated])
  },
  { path: "*", name: "NotFound", component: NotFound }
];
