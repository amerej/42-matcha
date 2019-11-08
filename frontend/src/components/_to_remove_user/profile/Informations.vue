<template>
  <div class="user-informations">
    <h1>Kristen</h1>
    <h5 class="card-subtitle mb-2 text-muted">{{ getAge }}</h5>
    <h4>Interested in</h4>
    <p>{{ getOrientation }}</p>
    <h4>Biography</h4>
    <p>{{ getBio }}</p>
    <h4>Localization</h4>
    <p>{{ getLoc }}</p>
    <h4>Tag</h4>
    <p>{{ getTag }}</p>
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
    ...mapActions('usersInformations', [ 'getInformations' ])
  },
  computed: {
    ...mapGetters('usersInformations', [ 'getGender', 'getOrientation', 'getBio', 'getAge', 'getLoc', 'getTag' ])
  },
  created () {
    this.$store.dispatch('usersInformations/getInformations')
  }
}
</script>

<style scoped>
  #user-informations {
    width: 100%;
    max-width: 480px;
    margin: 0px auto;
    padding: 20px;
  }
</style>
