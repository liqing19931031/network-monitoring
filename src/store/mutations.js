import Vue from 'vue'

export default {
	// 隐藏模态框
	hideModal (state) {
		Vue.set(state, 'modal', false)
	},
	showModal (state) {
		Vue.set(state, 'modal', true)
	},
	changeMon (state, data) {
		Vue.set(state, 'currentMon', data)
	},
	showAlert (state, data) {
		Vue.set(state, 'alertMessage', data.message)
		Vue.set(state, 'alertStyle', data.style)
		Vue.set(state, 'alert', true)
		setTimeout(() => {
			Vue.set(state, 'alert', false)
		}, 5000)
	},
	hideAlert (state, data) {
		Vue.set(state, 'alert', false)
	},
	changeSnpType (state, data) {
		Vue.set(state, 'snpType', data)
	}
}
