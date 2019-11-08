import store from "@/store";
import axios from "axios";
import NewSearch from "@/components/user-search";
import UserList from "@/components/user-list";
import UserProfile from "@/components/user-profile";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      search: {
        age: [18, 69],
        popularity: [0, 100],
        distance: 0,
        tag: "",
        itemsTag: ["#Sérieux", "#PasDeCoupDunSoir", "#SexFriends", "#CeSoir"]
      },
      users: Array,
      selectedUser: Object,
      activeComponent: "appNewSearch",
      status: "",
      message: ""
    };
  },
  methods: {
    ...mapActions("userVisit", ["addVisit"]),
    async searchSubmit() {
      try {
        const userId = store.getters["auth/userId"];
        const { age, popularity, distance, tag } = this.search;
        const result = await axios({
          url: "users/" + userId + "/search",
          params: {
            age: age,
            popularity: popularity,
            distance: distance,
            tag: tag
          },
          method: "GET"
        });
        console.log(result.data.users);
        this.users = result.data.users;
        this.activeComponent = "appUserList";
      } catch (e) {
        this.status = e.response.data.status;
        this.message = e.response.data.message;
      }
    },
    switchComponent(activeComponent) {
      this.activeComponent = activeComponent;
    },
    getSelectedUser(user) {
      this.activeComponent = "appUserProfile";
      this.user = user;
      this.$store.dispatch("userVisit/addVisit", {
        userVisitedId: user.person_id
      });
    },
    userDetails(user) {
      this.activeComponent = "appUserProfile";
      this.user = user;
      this.$store.dispatch("userVisit/addVisit", {
        userVisitedId: user.person_id
      });
    }
  },
  components: {
    appNewSearch: NewSearch,
    appUserList: UserList,
    appUserProfile: UserProfile
  }
};
