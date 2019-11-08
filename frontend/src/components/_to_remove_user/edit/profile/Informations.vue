<template>
  <div class="edit-informations">
    <!-- <form @submit.prevent="onSubmit">
      <app-input>
        <label slot="label" for="gender" class="col-sm-4 col-form-label">Gender</label>
        <select slot="input" type="text" class="form-control" id="gender" v-model="gender" autocomplete="gender">
          <option>male</option>
          <option>female</option>
        </select>
      </app-input>
      <app-input>
        <label slot="label" for="orientation" class="col-sm-4 col-form-label">Interested in</label>
        <select slot="input" class="form-control" id="orientation" v-model="orientation">
          <option>bisexual</option>
          <option>male</option>
          <option>female</option>
        </select>
      </app-input>
      <app-input>
        <label slot="label" for="age" class="col-sm-4 col-form-label">Age</label>
        <input slot="input" type="text" class="form-control" id="age" v-model="age" autocomplete="age">
      </app-input>
      <div class="form-group row">
        <label for="bio" class="col-sm-4 col-form-label">Bio</label>
        <div class="col-sm-8">
          <textarea class="form-control"  id="bio" v-model="bio" rows="6"></textarea>
        </div>
      </div>
      <app-input>
        <label slot="label" for="localization" class="col-sm-4 col-form-label">Localization</label>
        <input slot="input" type="text" class="form-control" id="localization" v-model="localization">
      </app-input>
      <app-input>
        <label slot="label" for="orientation" class="col-sm-4 col-form-label">Tag</label>
        <select slot="input" class="form-control" id="tag" v-model="tag">
          <option>#Sérieux</option>
          <option>#PasDeCoupDunSoir</option>
          <option>#SexFriends</option>
          <option>#CeSoir</option>
        </select>
      </app-input>
      <div class="submit">
        <button type="submit" class="btn btn-lg">Update profile</button>
      </div>
    </form> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      gender: '',
      orientation: '',
      bio: '',
      age: '',
      localization: '',
      tag: ''
    }
  },
  components: {
  },
  methods: {
    ...mapActions('usersInformations', [ 'updateInformations', 'getInformations' ]),
    onSubmit () {
      const { gender, orientation, bio, age, localization, tag } = this
      this.$store.dispatch('usersInformations/updateInformations', { gender, orientation, bio, age, localization, tag })
    }
  },
  computed: {
    ...mapGetters('usersInformations', [ 'getGender', 'getOrientation', 'getBio', 'getAge', 'getLoc', 'getTag' ])
  },
  created () {
    this.$store.dispatch('usersInformations/getInformations').then(() => {
      this.gender = this.getGender
      this.orientation = this.getOrientation
      this.bio = this.getBio
      this.age = this.getAge
      this.localization = this.getLoc
      this.tag = this.getTag
    })
  }
}
</script>

<style scoped>

#edit-informations {
  width: 100%;
  max-width: 480px;
  margin: 0px auto;
  padding: 20px;
}

.submit {
  margin-top: 40px;
}

textarea {
  overflow: auto;
  resize: none;
}

</style>
