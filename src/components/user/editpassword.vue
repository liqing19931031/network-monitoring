<template>
	<div class="editpass">
		<div class="table-group">
			<div class="table-header text-center">
				<span class="pull-left">监控设置>>修改密码</span>
			</div>
		    <div class="table-title clearfix">
		    	<form class="form-horizontal">
			      	<div class="form-group">
				        <label class="col-xs-2 control-label">账户名称</label>
				        <div class="col-xs-4">
				          	<input type="text" class="form-control" v-model='userDetail.username' placeholder="账户名称">
				        </div>
			      	</div>
			      	<div class="form-group">
			        	<label class="col-xs-2 control-label">手机号</label>
				        <div class="col-xs-4">
				          	<input type="text" class="form-control" v-model='userDetail.tele' placeholder="手机号">
				        </div>
			     	</div>
			      	<div class="form-group">
				        <label class="col-xs-2 control-label">原密码</label>
				        <div class="col-xs-4">
				          	<input type="text" class="form-control" v-model='userDetail.psword' placeholder="原密码">
				        </div>
			      	</div>
			      	<div class="form-group">
				        <label class="col-xs-2 control-label">新密码</label>
				        <div class="col-xs-4">
				          <input type="password" class="form-control" v-model='userDetail.true_psword' placeholder="新密码">
				        </div>
				        <div class="col-xs-1 no-padding label">
				        	<i v-if='userDetail.true_psword !== "" && userDetail.new_psword !== ""' :class='`glyphicon glyphicon-${userDetail.true_psword === userDetail.new_psword ? "success" : "error"}`'></i>
				        </div>
			      	</div>
			      	<div class="form-group">
				        <label class="col-xs-2 control-label">确认密码</label>
				        <div class="col-xs-4">
				          <input type="password" class="form-control" placeholder="" v-model='userDetail.new_psword'>
				        </div>
				        <div class="col-xs-1 no-padding label">
				        	<i v-if='userDetail.true_psword !== "" && userDetail.new_psword !== ""' class="glyphicon" :class='`glyphicon-${userDetail.true_psword === userDetail.new_psword ? "success" : "error"}`'></i>
				        </div>
			      	</div>
			      	<div class="form-group">
				        <label class="col-xs-2 control-label"></label>
				        <div class="col-xs-2 no-padding-right">
		    				<div class="btn btn-primary" @click='editPswd'>保 存</div>
				        </div>
			      	</div>
			    </form>
		    </div>
		</div>
		<modal :title='modalParams.title'>
			<div slot='body'>
	    		{{modalParams.errMessage}}
	    	</div>
		</modal>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import modal from '../modal'

export default {
	data () {
		return {
			userDetail: {
				tele: '',
				username: '',
				psword: '',
				true_psword: '',
				new_psword: ''
			},
			modalParams: {
	        	title: '',
	        	onOk: '',
	        	custom: true,
	        	errMessage: ''
	       	}
		}
	},
	components: {
		modal
	},
	mounted () {
		this.$http.get(`${this.$store.state.baseUrl}api/userinfo`)
		.then((res) => {
			if (res.data.code === 1) {
				this.$set(this.userDetail, 'username', res.data.result.username)
				this.$set(this.userDetail, 'tele', res.data.result.tele)
			}
		})
	},
	methods: {
		setModalParams (title, errMessage) {
			this.$set(this.modalParams, 'title', title)
			this.$set(this.modalParams, 'errMessage', errMessage)
		},
		editPswd () {
			if (this.userDetail.true_psword !== this.userDetail.new_psword) {
				this.setModalParams('！提示', '两次密码不同！请知悉核对后重新输入！')
				this.showModal()
			} else {
				console.log(1)
				this.$http.post(`${this.$store.state.baseUrl}api/passup`, this.userDetail)
				.then((res) => {
					if (res.data.code === 1) {
						this.setModalParams('', '修改成功！')
						this.showModal()
					} else {
						this.setModalParams('', res.data.message)
						this.showModal()
					}
					setTimeout(() => {
						this.hideModal()
					}, 3000)
				})
			}
		},
		...mapMutations([
            'hideModal',
            'showModal'
        ])
	}
}
</script>

<style lang='less'>
</style>
