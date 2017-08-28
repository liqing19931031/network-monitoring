import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		modal: false,
		currentMon: 0,
		// baseUrl: 'http://www.sitemonitor.com/',
		baseUrl: '/',
		alert: false,
		alertMessage: '',
		alertStyle: '',
		snpType: 1
	},
	mutations,
	actions
})
