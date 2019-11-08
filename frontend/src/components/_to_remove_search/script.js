import RangeSlider from "@/components/range-slider";

export default {
  data() {
    return {
      itemsTag: ["#Sérieux", "#PasDeCoupDunSoir", "#SexFriends", "#CeSoir"]
    };
  },
  computed: {
    age: {
      set(age) {
        this.$store.commit("userSearch/updateSearch", { age });
      },
      get() {
        return this.$store.state.userSearch.search.age;
      }
    },
    popularity: {
      set(popularity) {
        this.$store.commit("userSearch/updateSearch", { popularity });
      },
      get() {
        return this.$store.state.userSearch.search.popularity;
      }
    },
    distance: {
      set(distance) {
        this.$store.commit("userSearch/updateSearch", { distance });
      },
      get() {
        return this.$store.state.userSearch.search.distance;
      }
    },
    tag: {
      set(tag) {
        this.$store.commit("userSearch/updateSearch", { tag });
      },
      get() {
        return this.$store.state.userSearch.search.tag;
      }
    }
  },
  components: {
    appRangeSlider: RangeSlider
  }
};
