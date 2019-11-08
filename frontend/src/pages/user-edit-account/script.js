import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      valid: false,
      email: "",
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      showPassword: false,
      snackbar: false,
      color: "",
      mode: "",
      timeout: 3000,
      text: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      usernameRules: [v => !!v || "Username is required"],
      firstnameRules: [v => !!v || "Firstname is required"],
      lastnameRules: [v => !!v || "Lastname is required"],
      passwordRules: [
        v =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/.test(v) ||
          "Password must contains 8-12 characters with letters & uppercase & digits"
      ]
    };
  },
  computed: {
    ...mapGetters("auth", ["userId"]),
    ...mapGetters("userAccount", [
      "getEmail",
      "getUsername",
      "getFirstname",
      "getLastname",
      "updateUserAccountStatus",
      "updateUserAccountMessage",
      "getUserAccountStatus",
      "getUserAccountMessage"
    ])
  },
  created() {
    this.$store.dispatch("userAccount/getUserAccount").then(() => {
      this.email = this.getEmail;
      this.username = this.getUsername;
      this.firstname = this.getFirstname;
      this.lastname = this.getLastname;
      if (this.getUserAccountStatus === "error") {
        this.color = this.getUserAccountStatus;
        this.text = this.getUserAccountMessage;
        this.snackbar = true;
      }
    });
  },
  methods: {
    ...mapActions("userAccount", ["updateUserAccount", "getUserAccount"]),
    submit() {
      const { userId, email, username, firstname, lastname, password } = this;
      this.$store
        .dispatch("userAccount/updateUserAccount", {
          userId,
          email,
          username,
          firstname,
          lastname,
          password
        })
        .then(() => {
          this.color = this.updateUserAccountStatus;
          this.text = this.updateUserAccountMessage;
          this.snackbar = true;
        });
    }
  }
};
