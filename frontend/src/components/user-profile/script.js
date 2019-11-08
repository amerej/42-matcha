export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: this.user
    };
  },
  watch: {
    user(user) {
      this.value = user;
    }
  }
};
