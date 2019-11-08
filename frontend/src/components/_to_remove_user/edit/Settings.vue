<template>
  <div id="settings">
    <form @submit.prevent="onSubmit">
      <div class="settings-input">
        <label for="customRange1">Age minimum: {{ minAge }}</label>
        <input type="range" class="custom-range" step="1" min="18" max="99" v-model="minAge">
      </div>
      <div class="settings-input">
        <label for="customRange1">Age maximum: {{ maxAge }}</label>
        <input type="range" class="custom-range" step="1" min="18" max="99" v-model="maxAge">
      </div>
      <div class="settings-input">
        <label for="customRange1">Popularity minimum: {{ minPopularity }}</label>
        <input type="range" class="custom-range" step="1" min="0" max="100" v-model="minPopularity">
      </div>
      <div class="settings-input">
        <label for="customRange1">Popularity maximum: {{ maxPopularity }}</label>
        <input type="range" class="custom-range" step="1" min="0" max="100" v-model="maxPopularity">
      </div>
      <div class="settings-input">
        <label for="customRange1">Distance: {{ distance }}</label>
        <input type="range" class="custom-range" step="1" min="1" max="1000" v-model="distance">
      </div>
      <div class="submit">
        <button type="submit" class="btn btn-lg">Update settings</button>
      </div>
    </form>
  </div>
</template>

<script>
// import Input from '@/components/input/Input'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      minAge: '',
      maxAge: '',
      minPopularity: '',
      maxPopularity: '',
      distance: ''
    }
  },
  methods: {
    ...mapActions('usersSettings', [ 'getSettings', 'updateSettings' ]),
    onSubmit () {
      const { minAge, maxAge, minPopularity, maxPopularity, distance } = this
      this.$store.dispatch('usersSettings/updateSettings', { minAge, maxAge, minPopularity, maxPopularity, distance })
    }
  },
  components: {
    // appInput: Input
  },
  computed: {
    ...mapGetters('usersSettings', [ 'getMinAge', 'getMaxAge', 'getMinPopularity', 'getMaxPopularity', 'getDistance' ])
  },
  created () {
    this.$store.dispatch('usersSettings/getSettings').then(() => {
      this.minAge = this.getMinAge
      this.maxAge = this.getMaxAge
      this.minPopularity = this.getMinPopularity
      this.maxPopularity = this.getMaxPopularity
      this.distance = this.getDistance
    })
  }
}
</script>

<style scoped>

#settings {
  width: 100%;
  max-width: 580px;
  margin: 0px auto;
  padding: 20px;
}
.settings-input {
  padding: 20px 0;
}
#tags {
  margin: 0px auto;
  padding: 40px;
}
.submit {
  margin-top: 40px;
}

.badge-light {
  color: #F62459;
  background-color: #fff;
}

</style>
