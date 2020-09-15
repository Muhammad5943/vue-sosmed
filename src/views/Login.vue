<template>
    <div class="login">
        <div class="container text-center">
            <img alt="Vue logo" src="../assets/logo.png" />
            <h1>Login</h1>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    v-model="credential.email"
                    placeholder="email"
                />
            </div>
            <div class="form-group">
                <input
                    type="password"
                    class="form-control"
                    v-model="credential.password"
                    placeholder="password"
                />
            </div>

            <button @click="login()" class="btn btn-info btn-block px-5">Tekan</button>

            <div class="my-2" style="float: left">
                <router-link to="/register">
                    <span class="mr-5">Masuk halaman regisater</span>
                </router-link>
            </div>
        </div>
    <div class="container">
        <p>testing credential : {{ credential }}</p>
    </div>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            const api_login = "http://alfabank-blog.herokuapp.com/api/v1/login";
            fetch(api_login,{
                method: "POST",
                headers: {
                    'Content-Type' : "application/json"
                },
                body: JSON.stringify(this.credential),
            }).then((response ) => {
                return response.json();
            }).then((response_login) => {
                // return response_login.json();
                console.log(response_login);
                if (response_login.success == true) {
                    
                    let token = response_login.credential.token;
                    let user = response_login.credential.user;
                    
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("berhasil", response_login.success);

                    this.$router.push('/dashboard')

                } else {
                    alert('Cek Credential anda')
                }

            })
            // console.log(this.credential);
        },
    },
        data: () => {
            return {
                credential: {
                email: null,
                password: null,
            },
        };
    },
};
</script>
