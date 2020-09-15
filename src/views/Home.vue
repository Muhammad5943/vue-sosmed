<template>
  <div class="home">
    <div class="container text-center">
      <div>
        <img alt="Vue logo" src="../assets/logo.png" />
        <span>
          <router-link v-if="loginView" to="/login">
            <b-button pill variant="outline-danger">
              Login
              <!-- <router-link ="loginView = true" to="/login">Login</router-link> -->
            </b-button>
          </router-link>
        </span>
        <span>
          
        </span>
        <!-- <HelloWorld msg="Halaman Rumah" /> -->
      </div>
    </div>

    <div class="container">
      <div class="d-flex justify-content-between align-items-baseline">
          <div>
              <h5 class="text-muted"><span>{{ new Date() | moment("dddd, DD-MMMM-YYYY (h:mm:ss a)") }}</span></h5>
          </div>
          <div>
            <b-button @click="getTweets()" size="sm" pill variant="info" style="height: 30px; font-size: 12">
              <b-icon icon="arrow-counterclockwise" animation="spin-reverse" font-scale="1"></b-icon>
              <span> Refresh</span>
            </b-button>
          </div>
      </div> 
      <hr>
      <div v-if="tweetLoading == true" class="text-center">
        <b-icon icon="three-dots" animation="cylon" font-scale="4"></b-icon>
      </div>
      <div class="media my-5" v-for="(tweet,index) in tweets" :key="index">
        <img
          class="mr-3 rounded-circle"
          :src=tweet.user.avatar
          width="70"
          height="70"
          alt="Generic placeholder image"
        />

        <div class="media-body">
          <h5 class="mt-0">{{tweet.tweet}}</h5>
          <p class="text-primary">@{{tweet.user.username}}</p>
          <p class="text-muted">{{ tweet.created_at | moment("from", "now") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  data: () => {
    return {
      tweets: [],
      tweetLoading: false,
    };
  },


  mounted() {
    this.getTweets();
  },

  methods: {
    getTweets() {
      const api_url = "http://alfabank-blog.herokuapp.com/api/v1/tweets/all";
      // fetch adalah
      this.tweetLoading = true;
      fetch(api_url)
        .then((response) => {
          // membuat response menjadi bentuk json
          return response.json();
        })
        .then((json_response) => {
          // mengisi blog dengan respon dari server yang sudah berbentuk json
          this.tweets = json_response.data;
          if (json_response.success == true) {
            this.tweetLoading = false
          }
        });
    },
  },

  computed: {
    loginView() {
      return localStorage.getItem('berhasil')
    },
  },
};
</script>
