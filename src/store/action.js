// import { http } from 'vue';

// const baseUrl = 'http://api.ufo.adyun.com/';
// // const testUrl = 'http://127.0.0.2/';

// export default {
// 	// 网站导航中心查询
// 	getSitefind({ commit, state }, param) {
// 		http.get(`${baseUrl}supplier/common/sitefind`, { params: param })
// 		.then((res) => {
// 			const data = JSON.parse(res.data).result;
// 			commit('updateSitefind', data);
// 		});
// 	},
// 	// 媒介用途
// 	getMediause({ commit, state }, param) {
// 		http.get(`${baseUrl}supplier/common/meduse`, { param: param || { type: 1 } })
// 		.then((res) => {
// 			const data = JSON.parse(res.data).result;
// 			commit('updateMediause', data);
// 		});
// 	},
// 	// 媒介评分
// 	getMediascore({ commit }) {
// 		http.get(`${baseUrl}supplier/common/medscore`)
// 		.then((res) => {
// 			const data = JSON.parse(res.data).result;
// 			commit('updateMediascore', data);
// 		});
// 	},
// 	// 媒介状态
// 	getMediastate({ commit }) {
// 		http.get(`${baseUrl}supplier/common/medstate`)
// 		.then((res) => {
// 			const data = JSON.parse(res.data).result;
// 			commit('updateMediastate', data);
// 		});
// 	},
// 	// 媒介类型
// 	getMediatype({ commit }) {
// 		http.get(`${baseUrl}supplier/common/medtype`)
// 		.then((res) => {
// 			const data = JSON.parse(res.data).result;
// 			commit('updateMediatype', data);
// 		});
// 	},
// 	// 行业信息获取
// 	getIndustry({ commit, state }, param) {
// 		http.get(`${baseUrl}supplier/common/industry`, { param: param || { type: 1 } })
// 		.then((res) => {
// 			const data = JSON.parse(res.data).result;
// 			commit('updateIndustry', data);
// 		});
// 	},
// 	// 取消导航
// 	cancelHot({ commit, state }, param) {
// 		http.post(`${baseUrl}supplier/common/cancel`, { data: param.data })
// 		.then((res) => {
// 			const code = JSON.parse(res.data);
// 			if (code.code === 1) {
// 				commit('hideModal');
// 				http.get(`${baseUrl}supplier/common/sitefind`, { params: param.params })
// 				.then((response) => {
// 					const data = JSON.parse(response.data).result;
// 					commit('updateSitefind', data);
// 				});
// 			} else {
// 				const params = {
// 					color: 'danger',
// 					content: '取消导航失败!请重新尝试!',
// 					show: true,
// 				};
// 				commit('showModal', params);
// 			}
// 		});
// 	},
// 	// 设置链接
// 	setLink({ commit, state }, param) {
// 		http.post(`${baseUrl}supplier/common/deflink`, param.data)
// 		.then((res) => {
// 			const code = JSON.parse(res.data);
// 			if (code.code === 1) {
// 				commit('hideModal');
// 				http.get(`${baseUrl}supplier/common/sitefind`, { params: param.params })
// 				.then((response) => {
// 					const data = JSON.parse(response.data).result;
// 					commit('updateSitefind', data);
// 				});
// 			}
// 		});
// 	},
// 	// 图片上传
// 	imgUpload({ commit, state }, param) {
// 		param.data.pic.append('siteid', param.data.siteid);
// 		http.post(`${baseUrl}supplier/navigation/uploadpic`, param.data.pic)
// 		.then((res) => {
// 			const code = JSON.parse(res.data);
// 			if (code.code === 1) {
// 				commit('hideModal');
// 				http.get(`${baseUrl}supplier/common/sitefind`, { params: param.params })
// 				.then((response) => {
// 					const data = JSON.parse(response.data).result;
// 					commit('updateSitefind', data);
// 				});
// 			}
// 		});
// 	},
// 	// 排序
// 	setSort({ commit, state }, param) {
// 		http.post(`${baseUrl}supplier/navigation/alexa`, { data: param })
// 		.then((res) => {
// 			const code = JSON.parse(res.data);
// 			if (code.code === 1) {
// 				commit('hideModal');
// 				http.get(`${baseUrl}supplier/common/sitefind`, { params: param.params })
// 				.then((response) => {
// 					const data = JSON.parse(response.data).result;
// 					commit('updateSitefind', data);
// 				});
// 			}
// 		});
// 	},
// };
