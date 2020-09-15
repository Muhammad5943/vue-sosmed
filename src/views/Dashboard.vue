<template>
    <div class="dashboard">
        <div class="container text-center">
            <div>
                <img alt="Vue logo" src="../assets/logo.png" />
                <!-- <HelloWorld msg="Halaman Rumah" /> -->
            </div>
        </div>

        <div class="container">
            <div class="media">
                <img
                    class="mr-3 rounded-circle"
                    src="../assets/m_aji.jpeg"
                    width="70px"
                    height="70px"
                    alt="Generic placeholder image"
                />
                <div class="media-body">
                    <textarea v-model="body.tweet" name="pesan" id="pesan" cols="130" rows="10" placeholder="  Type Tweet"></textarea>
                    <p v-if="sedangLoading == true">Loading...</p>
                    <button @click="postTweet()" class="btn btn-primary">Post</button>
                </div>
            </div>
            <div class="media my-5" v-for="(element, index) in dashboard_tweets.tweets" :key="index">
                <img
                    class="mr-3 rounded-circle"
                    :src=dashboard_tweets.avatar
                    width="70"
                    height="70"
                    alt="Generic placeholder image"
                />
                

                <div class="media-body">
                    <h5 class="mt-0">{{ element.tweet }}</h5>
                    <p class="text-primary">@{{ dashboard_tweets.username }}</p>
                    <button @click="removeTweet(element.id)" class="btn btn-danger">remove</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */

// menggunakan axios dengan cara men
import axios from 'axios'

// bisa mendeklarasikan varisable axios untuk fungsi general dibawah export
/* const api_url = 'http://alfabank-blog.herokuapp.com/api/v1/';
axios.defaults.baseURL = api_url;
axios.defaults.headers["Authorization"] = "Bearer" + " " + localStorage.getItem("token"); */


export default {
    name: "Dashboard",
    data: () => {
    return {
        sedangLoading: false,
        body: {
            tweet: null,
        },
        dashboard_tweets: [],
        };
    },

    mounted() {
        this.getDashboardTweets();
    },

    methods: {
        getDashboardTweets() {
            const api_dashboard = "http://alfabank-blog.herokuapp.com/api/v1/tweets/dashboard";
        // fetch adalah
        fetch(api_dashboard, {
            method:'GET',
            headers: {
                Authorization: "Bearer" + " " + localStorage.getItem("token"),
            }
        })
            .then((response) => response.json())
            .then((response_dashboard) => {
                if (response_dashboard.success == true) {
                    this.dashboard_tweets = response_dashboard.data;
                }
            });
        },

        postTweet() {
            let format_posting = {
                tweet: this.body.tweet,
            };
        
            const api_send_tweets = "http://alfabank-blog.herokuapp.com/api/v1/tweets/create";
            this.sedangLoading = true

            fetch(api_send_tweets, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer" + " " + localStorage.getItem("token"),
                },
                body: JSON.stringify(format_posting),
            })
            .then((response) => response.json())
            .then((response_post) => {
                if (response_post.success == true) {

                    this.getDashboardTweets();
                    this.body.tweet = "";
                    this.sedangLoading = false;
                
                }
            })
        },

        removeTweet(tweet_id) {
            let confirmation = confirm("Are you sure to delete?");
            if ( confirmation == true ) {
            
                const api_url = 'http://alfabank-blog.herokuapp.com/api/v1/';
                axios.defaults.baseURL = api_url;
                axios.defaults.headers["Authorization"] = "Bearer" + " " + localStorage.getItem("token");

                let delete_url = `tweets/delete/${tweet_id}`;

                axios
                .delete(delete_url)
                .then((res) => {
                    if (res.data.success == true) {
                        this.getDashboardTweets();
                    }
                });
                
            } 
            // console.log("sedang memproses hapus");
            // let tweet_id = null;
            // const api_delete = `http://alfabank-blog.herokuapp.com/api/v1/tweets/delete/${tweet_id}`;
            
            // cara lain 

            // (cara bisasa)
            /* axios.delete('http://alfabank-blog.herokuapp.com/api/v1/tweets/delete/' + tweet_id, {
                headers: {
                    Authorization: "Bearer" + " " + localStorage.getItem("token"),
                    },
                }).then((res) => {
                    // console.log(res);
                if (res.data.success == true) {
                    this.getDashboardTweets();
                    }
                }); */
        }
    },
};
</script>
