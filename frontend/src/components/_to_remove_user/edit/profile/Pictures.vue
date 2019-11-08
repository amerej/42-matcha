<template>
  <v-container grid-list-md fill-height>
    <v-layout row wrap align-center justify-center>
      <v-flex v-for="i in 4" :key="`3${i}`" xs6 sm6 md3>
        <v-card flat>
            <v-card-media :src="pictures[i]" height="150px">
              <label>
                <img src="@/assets/add.svg" class="add-button">
                <input v-bind:id="i" type="file" style="display:none" @change="handleFileChange">
              </label>
            </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('usersPictures', [ 'updatePicture', 'getPictures' ]),
    handleFileChange (e) {
      var formData = new FormData()
      formData.append('image', e.target.files[0])
      formData.append('pictureId', e.target.id)
      this.$store.dispatch('usersPictures/updatePicture', formData)
    }
  },
  computed: {
    ...mapGetters('usersPictures', [ 'pictures', 'getPicturesStatus' ])
  },
  created: function () {
    this.$store.dispatch('usersPictures/getPictures')
  }
}
</script>

<style lang="stylus" scoped>

img
  margin 10px

.add-button
  position absolute
  bottom 0px
  right 0px
  z-index 1
  width 16px

</style>
