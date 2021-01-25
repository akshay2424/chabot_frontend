
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import axios from 'axios';

import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false
// axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.defaults.baseURL = 'http://127.0.0.1:5000/';
axios.defaults.headers['x-access-token'] =  sessionStorage.getItem("jwt_token");

// var cors = require('cors')

// app.use(cors())

Vue.use(ArgonDashboard,BootstrapVue)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
