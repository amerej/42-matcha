import axios from "axios";
import { mapState } from "vuex";
import UserList from "@/components/user-list";
import UserListDetails from "@/components/user-list-details";
import { mapActions } from "vuex";
const _isEmpty = require("lodash/isEmpty");

export default {
  data() {
    return {
      users: [],
      activeComp: "appUserList",
      previousComp: "",
      offset: 0,
      isDisabled: false,
      sn: {
        snackbar: false,
        color: "",
        mode: "",
        timeout: 3000,
        text: ""
      }
    };
  },
  computed: {
    ...mapState("auth", ["userId"])
  },
  sockets: {
    message: function(data) {
      console.log(data);
    }
  },
  methods: {
    ...mapActions("userVisit", ["addVisit"]),
    async showMoreList() {
      let { userId } = this;
      let offset = (this.offset += 5);
      let result = await axios({
        url: "users/" + userId + "/visits",
        params: {
          limit: 5,
          offset: offset
        },
        method: "GET"
      });
      if (_isEmpty(result.data.result)) {
        this.isDisabled = true;
      } else if (result.data.result.length < 5) {
        this.isDisabled = true;
        this.users.push(...result.data.result);
      } else {
        this.users.push(...result.data.result);
      }
    },
    userDetails(user) {
      this.activeComp = "appUserListDetails";
      this.user = user;
      // this.$store.dispatch("userVisit/addVisit", {
      // 	userVisitedId: user.person_id
      // });
    },
    switchComponent(activeComp) {
      this.activeComp = activeComp;
    }
  },
  async created() {
    try {
      let { userId, offset } = this;

      let result = await axios({
        url: "users/" + userId + "/visits",
        params: {
          limit: 5,
          offset: offset
        },
        method: "GET"
      });
      this.users = result.data.result;
      this.sn.color = result.data.status;
      this.sn.text = result.data.message;
      this.sn.snackbar = true;
    } catch (e) {
      this.sn.color = "error";
      this.sn.text = "Retrieve user visits failed.";
      this.sn.snackbar = true;
    }
  },
  components: {
    appUserList: UserList,
    appUserListDetails: UserListDetails
  }
};
