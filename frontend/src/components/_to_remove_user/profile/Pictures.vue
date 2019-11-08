<template>
  <div id="user-pictures">
    <div class="row align-items-center">
      <div class="col-8">
        <label>
          <img :src="pictures[0]" class="rounded img-fluid" alt="...">
        </label>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <label>
              <img :src="pictures[1]" class="rounded img-fluid" alt="...">
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>
              <img :src="pictures[2]" class="rounded img-fluid" alt="...">
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>
          <img id="3" :src="pictures[3]" class="rounded img-fluid" alt="...">
        </label>
      </div>
      <div class="col">
        <label>
          <img :src="pictures[4]" class="rounded img-fluid" alt="...">
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('usersPictures', [ 'getPictures' ])
  },
  computed: {
    ...mapGetters('usersPictures', [ 'pictures', 'getPicturesStatus' ])
  },
  created: function () {
    this.$store.dispatch('usersPictures/getPictures')
  }
}
</script>

<style scoped>
  #user-pictures {
    width: 100%;
    max-width: 480px;
    margin: 0px auto;
  }
  img {
    margin: 10px;
  }
</style>
