import router from "@/router";
import axios from "axios";
import { mapState } from "vuex";

// const uploadPath = process.env.VUE_APP_BACKEND_URL;

export default {
  data() {
    return {
      user: {
        username: "none",
        firstname: "none",
        lastname: "none",
        gender: "none",
        orientation: "none",
        bio: "none",
        age: "none",
        popularity: "none",
        localization: "none",
        tag: "none",
        is_online: "none",
        male: "none",
        female: "none",
        pictures: [
          require("@/assets/empty.png"),
          require("@/assets/empty.png"),
          require("@/assets/empty.png"),
          require("@/assets/empty.png"),
          require("@/assets/empty.png")
        ]
      },
      snack: {
        snackbar: false,
        color: "",
        mode: "",
        timeout: 3000,
        text: ""
      }
    };
  },
  components: {},
  methods: {},
  computed: {
    ...mapState("auth", ["userId"])
  },
  async created() {
    try {
      const currentRouteUserId = router.currentRoute.params.user_id;
      const { userId } = this;
      if (userId != currentRouteUserId) {
        this.$socket.emit("message", {
          userSubId: currentRouteUserId,
          userPubId: userId
        });

        const addVisit = await axios({
          url: "users/" + userId + "/visits",
          data: { currentRouteUserId },
          method: "POST"
        });
        console.log(addVisit);
      }
      const profile = await axios({
        url: "users/" + currentRouteUserId + "/profile",
        method: "GET"
      });
      this.user = Object.assign(this.user, profile.data.data);
      this.snack.color = profile.data.type;
      this.snack.text = profile.data.message;
      this.snack.snackbar = true;
    } catch (e) {
      console.log(e.response);
      this.snack.color = "error";
      this.snack.text = "Retrieve user profile failed.";
      this.snack.snackbar = true;
    }
  }
};
