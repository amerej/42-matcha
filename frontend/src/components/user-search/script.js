import RangeSlider from "@/components/range-slider";

export default {
  props: {
    search: {
      type: Object,
      required: true
    },
    searchSubmit: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      searchQuery: this.search
    };
  },
  watch: {
    search(search) {
      this.searchQuery = search;
    }
  },
  components: {
    appRangeSlider: RangeSlider
  }
};
