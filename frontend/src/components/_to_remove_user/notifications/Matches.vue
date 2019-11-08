<template>
  <div class="">
    <span tag="button" class=" my-2 my-lg-0 btn btn-sm">
      Matches <span class="badge badge-light">{{ count }}</span>
      <span class="sr-only">unread visits</span>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('usersVisits', [ 'getVisits' ])
  },
  computed: {
    ...mapGetters('usersVisits', [ 'visits', 'count' ])
  },
  created () {
    this.$store.dispatch('usersVisits/getVisits')
  }
}
</script>

<style scoped>

.badge {
  font-weight: bold;
  margin: 2px auto;
}

.badge-light {
  color: white;
  background-color: #FF0B29;
  border: 1px solid #F62459;
}

.btn {
  border: none;
  background-color: white;
  color: #1B1819;
  font-weight: bold;
  font-size: 20px;
  padding: 0.5rem 1rem;
}

.btn-sm, .btn-group-sm > .btn {
  border-radius: 2rem;
}
</style>
