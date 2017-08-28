<template>
	<div class="table-group">
		<div class="table-header">
			<span class="pull-left text-big">监控设置>>{{title}}</span>
			<div class="pull-right">
				<div class="btn btn-primary-opposite" @click='addMonitoring("创建网站监控人")'>创建监控人</div>
			</div>
		</div>
		<div class="table-title" style="height: 95px">
      		<div class="alert alert-warning text-center" role="alert">
		      	<span class="text-danger">当前共有{{dataList.length}}个联系人</span>
		    </div>
  		</div>
		<table class="table table-hover-primary">
	      <thead>
	        <tr>
	          <th>姓名</th>
	          <th>邮箱</th>
	          <th>手机</th>
	          <th>操作</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr v-if='dataList.length > 0' v-for='(item, index) in this.dataList'>
	          <td>{{item.name}}</td>
	          <td>{{item.email}}</td>
	          <td>{{item.tele}}</td>
	          <td>
	          		<span><a @click='addMonitoring("创建网站监控人", item.id)'>修改</a></span>
	          		<span><a @click='deleteControl(item.id)'>删除</a></span>
	          </td>
	        </tr>
	        <tr v-if='dataList.length === 0'>
	        	<td colspan='4'><span>当前无联系人！请添加！</span></td>
	        </tr>
	      </tbody>
	    </table>
	    <modal :title='modalParams.title'>
	    	<div slot='body' v-if='modalParams.custom === "add"'>
	    		<form class="form-horizontal">
			      <div class="form-group">
			        <label class="col-xs-3 control-label">姓名</label>
			        <div class="col-xs-8">
			          <input type="text" class="form-control" placeholder="姓名" v-model='userData.name'>
			        </div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">邮箱</label>
			        <div class="col-xs-8">
			          <input type="text" class="form-control" placeholder="邮箱" v-model='userData.email'>
			        </div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">手机</label>
			        <div class="col-xs-8">
			          <input type="text" class="form-control" placeholder="手机" v-model='userData.tele'>
			        </div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">校验码</label>
			        <div class="col-xs-3 no-padding-right">
			          <input type="text" class="form-control" placeholder="" v-model='userData.telecode'>
			        </div>
			        <div class="col-xs-3 no-padding-right text-small line-height-input">
			        	<div class="btn btn-primary-opposite" :class='time > 0 && time < 60 ? "disabled" : ""' style="width: 96px" @click='valiTele(userData.tele)'>{{btnText}}</div>
			        </div>
			      </div>
			    </form>
	    	</div>
	    	<div slot='body' v-if='modalParams.custom === "delete"'>
	    		您确定要删除所选监控对象？<span class="text-danger">该监控对象所绑定监控项将归为默认联系人！</span>
	    	</div>
	    	<div slot='body' v-if='modalParams.custom === "warning"'>
	    		验证码不正确！请仔细审核！
	    	</div>
	    	<div slot='button'>
	    		<button class="btn btn-primary" @click='addUser' v-if='modalParams.custom === "add"'>保 存</button>
	    		<button class="btn btn-primary" @click='deleteUser' v-if='modalParams.custom === "delete"'>确 定</button>
                <button class="btn btn-default" @click='hideModal'>取 消</button>
	    	</div>
	    </modal>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import modal from '../modal'

export default {
	props: ['title'],
	data () {
		return {
			btnText: '获取验证码',
			modalParams: {
	        	title: '',
	        	onOk: '',
	        	custom: true
	       	},
	       	dataList: [
	       	],
	       	userData: {
	       		name: '',
	       		email: '',
	       		tele: '',
	       		telecode: ''
	       	},
	       	nowId: '',
	       	time: 60
		}
    },
    mounted () {
    	this.getUserList()
    },
	methods: {
		// 手机验证
		valiTele (tele) {
			if (this.time > 0 && this.time < 60) {
				return
			}
			this.$http.post(`${this.$store.state.baseUrl}api/tele`, { tele: tele })
			.then((data) => {
				if (data.data.code === 1) {
					this.timer()
				} else {
					this.hideModal()
				}
			})
		},
		// 按钮倒计时计时器
		timer () {
			if (this.time > 0) {
				this.time--
				this.$set(this, 'btnText', this.time)
				setTimeout(this.timer, 1000)
			} else {
				this.$set(this, 'time', 60)
				this.$set(this, 'btnText', '重新发送')
			}
		},
		// 获取用户列表
		getUserList () {
			this.getData('get', 'api/linklist', '', (data) => {
				this.$set(this, 'dataList', data.data.result.dataList)
			})
		},
		// 获取单个用户信息
		getUser (id) {
			console.log(1)
			this.getData('get', 'api/linkdesc', {linkid: id}, (data) => {
				this.$set(this, 'userData', data.data.result)
			})
		},
		// 添加单个用户
		addUser () {
			this.getData('post', 'api/addlink', Object.assign(this.userData, {id: this.nowId}), (res) => {
				this.getUserList()
				this.hideModal()
			})
		},
		// 重置表单
		resetModal (param) {
			for (let key in this[param]) {
				this.$set(this[param], key, '')
			}
		},
		// 添加&修改联系人
		addMonitoring (title, id) {
			this.$set(this, 'nowId', id || '')
			this.resetModal('userData')
			id ? this.getUser(id) : ''
			this.$set(this.modalParams, 'title', title)
			this.$set(this.modalParams, 'custom', 'add')
			this.showModal()
		},
		// 删除联系人操作
		deleteUser () {
			this.getData('post', 'api/delelink', { id: this.nowId }, (res) => {
				this.getUserList()
				this.hideModal()
			})
		},
		// 删除操作弹框
		deleteControl (id) {
			this.$set(this.modalParams, 'title', '！提示')
			this.$set(this.modalParams, 'custom', 'delete')
			this.$set(this, 'nowId', id)
			this.showModal()
		},
		...mapMutations([
            'hideModal',
            'showModal'
        ])
	},
	components: {
		modal
	}
}
</script>

<style lang='less' >
</style>
