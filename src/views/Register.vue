<template>
    <div class="login">
        <div class="container text-center">
            <img alt="Vue logo" src="../assets/logo.png" />
            <h1>Register</h1>

            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" v-model="credential.username" placeholder="User ID"></b-form-input>
            </b-input-group>

            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                <b-icon icon="envelope"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="email" v-model="credential.email" placeholder="email@mail.com"></b-form-input>
            </b-input-group>

            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="password" v-model="credential.password" placeholder="Password"></b-form-input>
            </b-input-group>

            <button @click="register()" class="btn btn-info btn-block px-5">
                Tekan
            </button>

            <div class="my-2" style="float: left">
                <router-link to="/login">
                <p class="mr-5">I've been an account</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

const api_register = "http://alfabank-blog.herokuapp.com/api/v1/register";

export default {
    methods: {
        register() {
            axios.post(api_register, this.credential).then((response_register) => {
                console.log(response_register);
                if (response_register.data.success) {
                    
                    this.$router.push('/login')
                }
            });
        },
    },
    data: () => {
    return {
            credential: {
            username: null,
            email: null,
            password: null,
        },
    };
    },
};
</script>
