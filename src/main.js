// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ajax from './xiaobaoajax.js'
import $ from './lq.js'

$('sadsad')
ajax({
	method: 'get',
	url: 'http://api.ufo.adyun.com/index/menu',
	async: true,
	data: {
		id: 1
	},
	callBack: function (a) {
		console.log(a)
	}
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
