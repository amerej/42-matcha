export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    userDetails: {
      type: Function,
      required: true
    },
    showMoreList: {
      type: Function,
      required: true
    },
    isShowMoreButtonEnabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  }
};
