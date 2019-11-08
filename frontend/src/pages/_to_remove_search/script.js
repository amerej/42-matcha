import { mapActions, mapState } from 'vuex'
import UserSearch from '@/components/search'
import UserSearchList from '@/components/search-user-list'
import NewSearch from '@/components/new-search'

export default {
  data () {
    return {
      activeComponent: 'appUserSearch',
      sheet: false
    }
  },
  methods: {
    ...mapActions('userSearch', [ 'userSearch' ])
  },
  computed: {
    ...mapState({
      users: state => state.userSearch.users,
      age: state => state.userSearch.search.age,
      popularity: state => state.userSearch.search.popularity,
      distance: state => state.userSearch.search.distance,
      tag: state => state.userSearch.search.tag
    })
  },
  watch: {
    sheet: function () {
      if (this.sheet === false) {
        const { age, popularity, distance, tag } = this
        this.$store.dispatch('userSearch/userSearch', { age, popularity, distance, tag })
          .then(() => {
            console.log(this.users)
          })
      }
    }
  },
  components: {
    appUserSearch: UserSearch,
    appUserSearchList: UserSearchList,
    appNewSearch: NewSearch
  }
}
