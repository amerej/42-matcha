<template>
  <div class="container" id="edit-profile">
    <div class="row align-items-center">
      <div class="col-md">
        <app-edit-photos></app-edit-photos>
      </div>
      <div class="col-md">
        <app-edit-informations></app-edit-informations>
      </div>
    </div>
  </div>
</template>

<script>

import EditInformations from '@/components/user/edit/profile/Informations'
import EditPictures from '@/components/user/edit/profile/Pictures'

export default {
  data () {
    return {
    }
  },
  components: {
    appEditInformations: EditInformations,
    appEditPhotos: EditPictures
  }
}

</script>

<style scoped>

#edit-profile {
  margin-top: 30px;
}

</style>
