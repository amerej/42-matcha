import { mapActions } from "vuex";
import generator from "generate-password";

export default {
  data() {
    return {
      user: {
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        latitude: "",
        longitude: ""
      },
      form: {
        valid: false,
        showPassword: false,
        rules: {
          email: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
          ],
          username: [v => !!v || "Username is required"],
          firstname: [v => !!v || "Firstname is required"],
          lastname: [v => !!v || "Lastname is required"],
          password: [v => !!v || "Password is required"]
        }
      }
    };
  },
  methods: {
    ...mapActions("auth", ["signup"]),
    submit() {
      this.$store
        .dispatch("auth/signup", Object.assign({}, this.user))
        .then(() => {
          this.$router.push({
            name: "VerifyAccount"
          });
        });
    }
  },
  created: async function() {
    try {
      // const result = await axios({
      //   url: "http://ipinfo.io",
      //   method: "GET"
      // });
      // const location = result.data.loc.split(",");
      // this.latitude = location[0];
      // this.longitude = location[1];
      this.user.latitude = 45;
      this.user.longitude = 50;

      let password = generator.generate({
        length: 16,
        numbers: true,
        excludeSimilarCharacters: true,
        uppercase: true,
        strict: true
      });
      if (password) {
        this.user.password = password;
      }
    } catch (e) {
      console.log(e);
    }
  }
};
