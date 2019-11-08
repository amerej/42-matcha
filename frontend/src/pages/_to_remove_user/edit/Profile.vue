<template>
  <v-container id="signin-form" fluid fill-height>
    <v-layout wrap align-center justify-center>
      <v-flex xs12 sm8 md6>
        <app-edit-photos></app-edit-photos>
        <v-card flat>
          <v-card-text>
            <v-form v-model="valid">
              <v-select
                prepend-icon="person"
                :items="itemsGender"
                v-model="gender"
                label="Gender"
                data-vv-name="gender"
                :rules="genderRules"
                required
              ></v-select>
              <v-select
                prepend-icon="person"
                :items="itemsOrientation"
                v-model="orientation"
                label="Orientation"
                item-value="text"
                required
              ></v-select>
              <v-text-field
                prepend-icon="person"
                v-model="age"
                :rules="ageRules"
                label="Age"
                required
              ></v-text-field>
              <v-textarea
                prepend-icon="person"
                name="input-7-1"
                rows="1"
                label="Bio"
                auto-grow
                v-model="bio"
                value="bio"
                :rules="bioRules"
              ></v-textarea>
              <v-select
                prepend-icon="person"
                :items="itemsTag"
                v-model="tag"
                :rules="tagRules"
                label="Tag"
                item-value="text"
                required
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="submit"
              :disabled="!valid"
              color="primary"
              large depressed>
              Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditPictures from '@/components/user/edit/profile/Pictures'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      valid: false,
      gender: null,
      itemsGender: [
        'male',
        'female'
      ],
      genderRules: [
        v => !!v || 'Gender is required'
      ],
      orientation: null,
      itemsOrientation: [
        'bisexual',
        'male',
        'female'
      ],
      bio: null,
      bioRules: [
        v => !!v || 'Bio is required'
      ],
      age: null,
      ageRules: [
        v => !!v || 'Age is required',
        v => (v >= 18 && v <= 125) || 'Age not valid'
      ],
      tag: null,
      itemsTag: [
        '#Sérieux',
        '#PasDeCoupDunSoir',
        '#SexFriends',
        '#CeSoir'
      ],
      tagRules: [
        v => !!v || 'Tag is required'
      ],
      localization: null
    }
  },
  methods: {
    ...mapActions('userProfile', [ 'updateInformations', 'getUserProfile' ]),
    submit () {
      const { gender, orientation, bio, age, localization, tag } = this
      this.$store.dispatch('usersInformations/updateInformations', { gender, orientation, bio, age, localization, tag })
    }
  },
  computed: {
    ...mapGetters('userProfile', [ 'getGender', 'getOrientation', 'getBio', 'getAge', 'getLoc', 'getTag' ])
  },
  created () {
    this.$store.dispatch('userProfile/getUserProfile').then(() => {
      this.gender = this.getGender
      this.orientation = this.getOrientation
      this.bio = this.getBio
      this.age = this.getAge
      this.localization = this.getLoc
      this.tag = this.getTag
    })
  },
  components: {
    appEditPhotos: EditPictures
  }
}

</script>

<style lang="stylus" scoped>

</style>
