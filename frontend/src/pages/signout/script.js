import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["isAuth", "userId"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("auth", ["signout"])
  },
  created() {
    this.$store.dispatch("auth/signout");
  }
};
