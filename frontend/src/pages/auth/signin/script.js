import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      form: {
        valid: false,
        showPassword: false,
        rules: {
          username: [v => !!v || "Username is required"],
          password: [v => !!v || "Password is required"]
        }
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
  computed: {
    ...mapState("auth", ["signinStatus", "userId", "signinErrorMessage"])
  },
  methods: {
    ...mapActions("auth", ["signin"]),
    submit() {
      this.$store
        .dispatch("auth/signin", Object.assign({}, this.user))
        .then(() => {
          if (this.signinStatus === "success") {
            this.$router.push({
              name: "UserProfile",
              params: {
                user_id: this.userId
              }
            });
          } else if (this.signinStatus === "error") {
            this.$refs.form.reset();
            this.username = "";
            this.password = "";
            this.snack.color = this.signinStatus;
            this.snack.text = this.signinErrorMessage;
            this.snack.snackbar = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
