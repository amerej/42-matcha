import UserEditProfilePictures from "@/components/user-edit-profile-pictures";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "user-edit-profile",

  data() {
    return {
      form: {
        gender: "",
        orientation: "",
        bio: "",
        age: "",
        tag: "",
        localization: ""
      },
      items: {
        gender: ["male", "female"],
        orientation: ["bisexual", "male", "female"],
        tag: ["#Sérieux", "#PasDeCoupDunSoir", "#SexFriends", "#CeSoir"]
      },
      rules: {
        gender: [v => !!v || "Gender is required"],
        age: [
          v => !!v || "Age is required",
          v => (v >= 18 && v <= 125) || "Age not valid",
          v => /^\d+$/.test(v) || "Age not valid"
        ],
        tag: [v => !!v || "Tag is required"]
      },
      sn: {
        snackbar: false,
        color: "",
        mode: "",
        timeout: 3000,
        text: ""
      },
      valid: false
    };
  },
  computed: {
    ...mapGetters("auth", ["userId"])
  },
  components: {
    appUserEditProfilePictures: UserEditProfilePictures
  },
  async created() {
    try {
      const result = await axios({
        url: "users/" + this.userId + "/profile",
        method: "GET"
      });
      const profile = result.data.data;
      this.form.gender = profile.gender;
      this.form.orientation = profile.orientation;
      this.form.age = profile.age;
      this.form.bio = profile.bio;
      this.form.localization = profile.localization;
      this.form.tag = profile.tag;
      this.sn.color = "success";
      this.sn.text = "Retrieve user profile success.";
      this.sn.snackbar = true;
    } catch (e) {
      this.sn.color = "error";
      this.sn.text = "Retrieve user profile failed.";
      this.sn.snackbar = true;
    }
  },
  methods: {
    async submit() {
      try {
        const form = this.form;
        const result = await axios({
          url: "users/" + this.userId + "/profile",
          data: form,
          method: "PUT"
        });
        this.form.gender = result.data.gender;
        this.form.orientation = result.data.orientation;
        this.form.age = result.data.age;
        this.form.bio = result.data.bio;
        this.form.localization = result.data.localization;
        this.form.tag = result.data.tag;
        this.sn.color = "success";
        this.sn.text = "Update user profile success.";
        this.sn.snackbar = true;
      } catch (e) {
        this.sn.color = "error";
        this.sn.text = "Update user profile error.";
        this.sn.snackbar = true;
      }
    }
  }
};
