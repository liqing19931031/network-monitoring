// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import store from './store/index'
// import ajax from './xiaobaoajax.js'

Vue.use(VueResource)
// ajax({
// 	method: 'get',
// 	url: 'http://api.ufo.adyun.com/index/menu',
// 	async: true,
// 	data: {
// 		id: 1
// 	},
// 	callBack: function (a) {
// 		console.log(a)
// 	}
// })
Vue.prototype.getData = function (method, url, param, callback, $dom) {
	if ($dom) {
		$dom.insertAdjacentHTML('afterbegin', '<div class="loadding"><img src="/static/loadding.gif" alt="" /></div>')
	}
	if (method === 'get') {
		param = {'params': param}
	}
	this.$http[method](store.state.baseUrl + url, param || '')
	.then((data) => {
	 	if (data.data.code === 1) {
	 		callback.resolve ? callback.resolve(data) : callback(data)
	 		$dom ? $dom.removeChild($dom.childNodes[0]) : ''
	 	} else {
	 		if (data.data.code === -100) {
	 			this.$router.push('/index')
	 		} else {
	 			$dom ? $dom.innerHTML = data.data.message : ''
		 		callback.reject ? callback.reject(data) : ''
		 		store._mutations.showAlert[0]({
		 			message: data.data.message,
					style: 'danger'
		 		})
	 		}
	 	}
	}, () => {
		$dom ? $dom.innerHTML = '服务器异常！' : ''
		store._mutations.showAlert[0]({
			message: '服务器异常！',
			style: 'danger'
		})
	})
}
Vue.prototype.getType = (type) => {
	let types = [
		'HTTP',
		'DNS',
		'PING',
		'网络防篡改'
	]
	return types[type - 1]
}
// 此方法为了用来判断对象是否为空 空返回false 有返回 true
Vue.prototype.isEmptyObject = (obj) => {
	let t
	for (t in obj) {
		return true
	}
	return false
}
Vue.prototype.getState = (state) => {
	let states = [
		'安全',
		'危险'
	]
	let classes = [
		'success',
		'danger'
	]
	return [states[state - 1], classes[state - 1]]
}
// 时间格式化
Vue.prototype.dateFormat = (date) => {
	let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
}
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
