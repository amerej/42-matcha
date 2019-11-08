import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["isAuth", "userId"])
  },
  data() {
    return {
      drawer: false,
      menu: false,
      fav: true,
      notifications: false,
      items: [
        {
          link: "/",
          router: true,
          title: "Suggestions",
          icon: "face"
        },
        {
          link: "/search",
          router: true,
          title: "Search",
          icon: "search"
        },
        {
          link: "/user/likes",
          router: true,
          title: "Likes",
          icon: "favorite"
        },
        {
          link: "/user/visits",
          router: true,
          title: "Visits",
          icon: "remove_red_eye"
        },
        {
          link: "/user/messages",
          router: true,
          title: "Messages",
          icon: "chat"
        }
      ],
      userItems: [
        {
          link: "/user/edit-profile",
          router: true,
          title: "Edit Profile",
          icon: "person"
        },
        {
          link: "/user/edit-account",
          router: true,
          title: "Edit Account",
          icon: "account_circle"
        }
      ]
    };
  },
  methods: {
    ...mapActions("auth", ["signout"])
  },
  components: {}
};
