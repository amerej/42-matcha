import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      uuid: "",
      isVerified: false,
      form: {
        valid: false,
        rules: {
          uuid: [
            v => !!v || "Code is required",
            // eslint-disable-next-line prettier/prettier
            v => /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(v) || "Code must be valid"
          ]
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
    ...mapGetters("auth", ["userId"])
  },
  methods: {
    async submitCode() {
      try {
        const { uuid } = this;
        const result = await axios({
          url: "verify",
          data: { uuid },
          method: "POST"
        });
        if (result.data.status === "success") {
          this.isVerified = true;
        } else {
          this.uuid = "";
          this.$refs.form.reset();
        }
        this.snack.color = result.data.status;
        this.snack.text = result.data.message;
        this.snack.snackbar = true;
      } catch (e) {
        this.snack.color = e.response.data.status;
        this.snack.text = e.response.data.message;
        this.snack.snackbar = true;
      }
    }
  }
};
