<template>
  <div class="container edit accordion" id="accordion">
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Settings</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Account</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <app-edit-profile></app-edit-profile>
      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <app-edit-settings></app-edit-settings>
      </div>
      <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
    </div>
  </div>
</template>

<script>
import EditProfile from '@/components/user/edit/Profile'
import EditSettings from '@/components/user/edit/Settings'

export default {
  data () {
    return {
    }
  },
  components: {
    appEditProfile: EditProfile,
    appEditSettings: EditSettings
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #F62459;
}
.edit {
  margin: 30px auto;
  padding: 20px;
}
.link {
  color: #F62459;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
}
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  color: #fff;
  background-color: #F62459;
}
</style>
