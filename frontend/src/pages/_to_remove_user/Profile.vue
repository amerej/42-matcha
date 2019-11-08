<template>
  <div class="" id="user-profile">
    <div class="card">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" :src="pictures[0]" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" :src="pictures[1]" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" :src="pictures[2]" alt="Third slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" :src="pictures[3]" alt="Fourth slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" :src="pictures[4]" alt="Fifth slide">
          </div>
        </div>
        <!-- <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a> -->
      </div>
      <div class="card-body">
        <h5 class="card-title">Audran</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ getAge }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">{{ getLoc }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">{{ getOrientation }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">{{ getTag }}</h6>
        <p class="card-text">{{ getBio }}</p>
        <a href="#" class="card-link">Like</a>
        <a href="#" class="card-link">Report</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapGetters('auth', [ 'userId' ]),
    ...mapGetters('usersPictures', [ 'pictures', 'getPicturesStatus' ]),
    ...mapGetters('usersInformations', [ 'getGender', 'getOrientation', 'getBio', 'getAge', 'getLoc', 'getTag' ])
  },
  methods: {
    ...mapActions('usersVisits', [ 'getMessage' ]),
    ...mapActions('usersPictures', [ 'getPictures' ]),
    ...mapActions('usersInformations', [ 'getInformations' ])
  },
  created () {
    const userId = this.userId
    const visitedId = this.$route.params.id
    if (userId !== visitedId) {
      this.$store.dispatch('usersVisits/addVisit', { userId, visitedId })
    }
    this.$store.dispatch('usersInformations/getInformations')
    this.$store.dispatch('usersPictures/getPictures')
  }
}
</script>

<style scoped>
  #user-profile {
    width: 100%;
    max-width: 600px;
    margin: 30px auto;
    text-align: left;
  }
  .card {
    border: none;
}
</style>
