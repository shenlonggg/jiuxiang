// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import $ from 'jquery'
import('./assets/css/input.css')
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.prototype.$goRoute = function(index){
	this.$router.push(index)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
