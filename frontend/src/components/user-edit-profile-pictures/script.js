import { mapGetters } from "vuex";
import axios from "axios";

const uploadPath = process.env.VUE_APP_BACKEND_URL;

export default {
  data() {
    return {
      pictures: [
        require("@/assets/empty.png"),
        require("@/assets/empty.png"),
        require("@/assets/empty.png"),
        require("@/assets/empty.png"),
        require("@/assets/empty.png")
      ],
      snackbar: false,
      color: "",
      mode: "",
      timeout: 3000,
      text: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["userId"])
  },
  async created() {
    try {
      const result = await axios({
        url: "users/" + this.userId + "/pictures",
        method: "GET"
      });
      for (let key in result.data.pictures) {
        this.pictures.splice(
          result.data.pictures[key].index,
          1,
          uploadPath + result.data.pictures[key].filename
        );
      }
    } catch (e) {
      this.color = e.response.data.status;
      this.text = e.response.data.message;
      this.snackbar = true;
    }
  },
  methods: {
    async handleFileChange(e) {
      try {
        var formData = new FormData();
        formData.append("image", e.target.files[0]);
        formData.append("index", e.target.id);

        const result = await axios({
          url: "users/" + this.userId + "/picture",
          data: formData,
          method: "PUT"
        });
        this.pictures.splice(
          result.data.index,
          1,
          uploadPath + result.data.filename
        );
        this.color = result.data.status;
        this.text = result.data.message;
        this.snackbar = true;
      } catch (e) {
        this.color = e.response.data.status;
        this.text = e.response.data.message;
        this.snackbar = true;
      }
    }
  }
};
