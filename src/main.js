import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// cara 2 import css dalam file main js
// import "./assets/css/bootstrap.css";

// mengimport bootstrap dan bootstrap vue css 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// inport bootstrap vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const moment = require('moment')
require('moment/locale/id')

Vue.use(require('vue-moment'),{
  moment
});

import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
