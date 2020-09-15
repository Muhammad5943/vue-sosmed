<template>
    <div id="app">
      <div class="container text-center">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link v-if="isUserLogin" to="/dashboard">Dashboard</router-link>
          <router-link v-else to="/login">Login</router-link>
        </div>
      </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    computed: {
      isUserLogin() {
        return localStorage.getItem('berhasil')
      },
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: maroon;
}
</style>