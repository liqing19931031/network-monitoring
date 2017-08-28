<template>
	<div class="table-group grid">
		<div class="table-header">
			<span class="pull-left text-big">网站监控>>{{title}}</span>
			<div class="pull-right">
				<div class="btn btn-primary-opposite" @click='addMonitoring("创建网站监控")'>创建监控</div>
			</div>
		</div>
		<div class="clearfix table-title">
      		<div class="alert alert-warning text-center" role="alert">
		      	<span class="text-danger">警告！共有{{dataList.length}}个监控项，有{{this.getErrorData(dataList)}}个异常监控事件，请及时</span><span><a @click='goAlarm()' style="cursor: pointer">查询处理</a></span>
		    </div>
		    <div class="input-group col-xs-3 pull-right">
	          	<input type=displaynone class="form-control" placeholder="监控项名称、URL" v-model='FILE'>
	          	<span class="input-group-btn">
		            <button class="btn btn-default" type="button" @click='goSearch()'>搜索!</button>
	          	</span>
	        </div>
  		</div>
		<table class="table table-hover-primary">
	      <thead>
	        <tr>
	          <th>监控对象</th>
	          <th>名称</th>
	          <th>任务类型</th>
	          <th>检测频率</th>
	          <th>检测点状态</th>
	          <th>响应时间</th>
	          <th>状态</th>
	          <th>开关</th>
	          <th>操作</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr v-if='dataList.length > 0' v-for='(item, index) in this.dataList'>
	          <td><a>{{item.monitoring}}</a></td>
	          <td>{{item.name}}</td>
	          <td>{{getType(item.type)}}任务</td>
	          <td>{{item.rate}}</td>
	          <td>
	          	<div class="long">
	          		<div :class="item.open === 1 ? 'brand-success' : 'brand-gray-dark'" :style='{ width: (item.stationsState.safe / (item.stationsState.safe + item.stationsState.danger))*100 + "%"}'>{{item.stationsState.safe || ''}}</div>
	          		<div :class="item.open === 1 ? 'brand-danger' : 'brand-gray'" :style='{ width: (item.stationsState.danger / (item.stationsState.safe + item.stationsState.danger))*100 + "%"}'>{{item.stationsState.danger || ''}}</div>
	          	</div>
	          </td>
	          <td>{{Math.round(item.resTime)}}ms</td>
	          <td><div class="errorMessage" :class='`brand-${getState(item.state)[1]}`'>{{getState(item.state)[0]}}</div></td>
	          <td class="switch-group">
		        <input type="checkbox" v-bind:id='`radio${index}`' class="radio-type" :checked='item.open' @click="oepnClose(index, item.id, item.open)">
		        <label v-bind:for='`radio${index}`' class="radio">
		            <span class="circle"></span>
		            <span class="text on"></span>
		            <span class="text off"></span>
	    		</label>
	          </td>
	          <td>
	          <div v-if='item.open'> 
	          		<span><a @click='goDetail(item.id)'>查看</a></span>
          			<span><a @click='addMonitoring("创建网站监控", item.id)'>修改</a></span>
          			<span><a @click='deleteControl(item.id)'>删除</a></span>
	          </div>
	          <div v-else class="disabled">
	          		<span><a>查看</a></span>
          			<span><a>修改</a></span>
          			<span><a>删除</a></span>
	          </div>
	          </td>
	        </tr>
	        <tr v-if='dataList.length === 0'>
	        	<td colspan='9'><span>当前监控无数据！</span></td>
	        </tr>
	      </tbody>
	    </table>
	    <modal :title='modalParams.title'>
	    	<div slot='body' v-if='modalParams.custom === "add"'>
	    		<form class="form-horizontal">
			      <div class="form-group">
			        <label class="col-xs-3 control-label">监控类型</label>
			        <div class="col-xs-8">
			          <select name="" class="form-control" v-model='monParams.type'>
			          	<option value="1">HTTP</option>
			          	<option value="2">DNS</option>
			          	<option value="3">PING</option>
			          	<option value="4">网站内容监控</option>
			          </select>
			        </div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">监控名称</label>
			        <div class="col-xs-8">
			          <input type="text" class="form-control" placeholder="监控名称" v-model='monParams.name'>
			        </div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">监控对象</label>
			        <div class="col-xs-8">
			          <input type="text" class="form-control" placeholder="监控对象" v-model='monParams.monitoring'>
			        </div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">监控点</label>
			        <div class="col-xs-8">
			        	<div class="select-point" v-for='(item, index) in this.MONPOINT'>
		        			<input type="checkbox" :value='item.code' v-model='item.checked' :checked='selectPoint(item.code)'> <span>{{item.name}}</span>
			        	</div>
			        </div>
			      </div>
			      <div class="form-group" v-if='+monParams.type !== 4'>
			        <label class="col-xs-3 control-label">异常条件</label>
			        <div class="col-xs-3 no-padding-right text-small line-height-input">当响应时间大于</div>
			        <div class="col-xs-2 no-padding">
			          <input type=displaynone class="form-control" placeholder="" v-model='monParams.response'>
			        </div>
			        <div class="col-xs-3 line-height-input">ms(毫秒)</div>
			        <div v-if='+monParams.type === 3'>
			        	<div class="col-xs-3 col-xs-offset-3 no-padding-right text-small line-height-input">或者丢包率大于</div>
				        <div class="col-xs-2 no-padding">
				          <select class="form-control" placeholder="丢包率" v-model='monParams.lostpackage'>
				          	<option value="20">20</option>
				          	<option value="40">40</option>
				          	<option value="60">60</option>
				          	<option value="80">80</option>
				          </select>
				        </div>
				        <div class="col-xs-3 no-padding-right text-small line-height-input">%时</div>
			        </div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">告警次数</label>
			        <div class="col-xs-4 no-padding-right text-small line-height-input">本监控每日最多发出</div>
			        <div class="col-xs-2 no-padding">
			          <select class="form-control" v-model='monParams.warnnum'>
			          		<option value="1">1</option>
			          		<option value="3">3</option>
			          		<option value="5">5</option>
			          		<option value="10">10</option>
			          </select>
			        </div>
			        <div class="col-xs-3 no-padding-right text-small line-height-input">次警告信息</div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">监控频率</label>
			        <div class="col-xs-8">
			          <select class="form-control" placeholder="监控频率" v-model='monParams.rate'>
			          	<option value="10" v-if='monParams.type !== "4"'>10分钟</option>
			          	<option value="20">20分钟</option>
			          	<option value="30">30分钟</option>
			          	<option value="60">60分钟</option>
			          </select>
			        </div>
			      </div>
			      <div class="form-group">
			        <label class="col-xs-3 control-label">监控人员</label>
			        <div class="col-xs-8">
			          <select class="form-control" v-model='monParams.link'>
			          	<option v-for='(item, index) in monuser' :value='item.id'>{{item.name}}</option> 
			          </select>
			        </div>
			      </div>
			    </form>
	    	</div>
	    	<div slot='body' v-if='modalParams.custom === "delete"'>
	    		您确定要删除所选监控对象？
	    	</div>
	    	<div slot='button'>
	    		<button class="btn btn-primary" @click='addMon' v-if='modalParams.custom === "add"'>保 存</button>
	    		<button class="btn btn-primary" @click='deleteMon' v-if='modalParams.custom === "delete"'>删 除</button>
                <button class="btn btn-default" @click='hideModal'>取 消</button>
	    	</div>
	    </modal>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import modal from '../modal'

export default {
	props: ['dataList', 'title'],
	data () {
		return {
			NOWMON: {
	       		全部监控: 0,
	       		HTTP监控: 1,
	       		DNS监控: 2,
	       		PING监控: 3,
	       		网站内容监控: 4
	       	},
	       	FILE: '',
			modalParams: {
	        	title: '',
	        	onOk: '',
	        	custom: true
	       	},
	       	monuser: [
	       	],
	       	monParams: {
	       		monitoring: '',
	       		name: '',
	       		type: 1,
	       		spot: [
	       			'ab',
	       			'ac'
	       		],
	       		response: '10000',
	       		lostpackage: 20,
	       		warnnum: '1',
	       		rate: '5',
	       		link: ''
	       	},
	       	MONPARAMS: {
	       		monitoring: '',
	       		name: '',
	       		type: 1,
	       		spot: [
	       			'ab',
	       			'ac'
	       		],
	       		response: '10000',
	       		lostpackage: 20,
	       		warnnum: '1',
	       		rate: '20',
	       		link: ''
	       	},
	       	nowId: '',
	       	MONPOINT: [
	       		{name: '华北北京', code: 'aa', checked: ''},
	       		{name: '华东上海', code: 'ab', checked: true},
	       		{name: '华南深圳', code: 'ac', checked: true},
	       		{name: '杭州电信', code: 'ad', checked: ''}
	       	]
		}
    },
    mounted () {
    	this.getUserList()
    },
	methods: {
		resetModal () {
			this.$set(this, 'monParams', this.MONPARAMS)
			this.MONPOINT.forEach((item, index) => {
				this.$set(this.MONPOINT[index], 'checked', this.selectPoint(item.code))
			})
		},
		getErrorData (dataList) {
			let errornum = 0
			dataList.forEach((item) => {
				if (item.stationsState.danger !== 0) {
					errornum = errornum + 1
				}
			})
			return errornum
		},
		goDetail (id) {
			this.$emit('changeType', 0)
			this.$router.push({path: '/miondetail/overview', query: {urlid: id}})
		},
		goSearch () {
			this.$emit('goSearch', this.FILE)
		},
		getUserList () {
			this.getData('get', 'api/linklist', undefined, (res) => {
				this.$set(this, 'monuser', res.data.result.dataList)
			})
		},
		goAlarm () {
			this.changeMon(this.NOWMON[this.title])
			this.$router.push('/alarm')
		},
		addMon () {
			this.$set(this.monParams, 'spot', this.getChecked())
			let params = this.nowId !== '' ? this.monParams : Object.assign(this.monParams, this.nowId)
			this.getData('post', 'api/addwarns', params, (res) => {
				this.goSearch()
				this.hideModal()
			})
		},
		oepnClose (index, id, checktype) {
			this.getData('post', 'api/openwarn', {urlid: id}, (res) => {
				this.$set(this.dataList[index], 'open', Math.abs(checktype - 1))
			})
		},
		addMonitoring (title, id) {
			this.$set(this, 'nowId', id || '')
			if (id) {
				this.getData('get', 'api/warncont', {warnid: id}, (res) => {
					this.$set(this, 'monParams', res.data.result)
					this.MONPOINT.forEach((item, index) => {
						this.$set(this.MONPOINT[index], 'checked', this.selectPoint(item.code))
					})
				})
			} else {
				this.resetModal()
			}
			this.$set(this.modalParams, 'title', title)
			this.$set(this.modalParams, 'custom', 'add')
			this.showModal()
		},
		deleteControl (id) {
			this.$set(this.modalParams, 'title', '')
			this.$set(this.modalParams, 'custom', 'delete')
			this.$set(this, 'nowId', id)
			this.showModal()
		},
		deleteMon () {
			this.getData('post', 'api/deletewarn', {warnid: this.nowId}, (res) => {
				this.goSearch()
				this.hideModal()
			})
		},
		// 用于判断单个监控点是否被选中（表单回填时引用）
		selectPoint (code) {
			let a = this.monParams.spot.some(function (item) {
				return code === item
			})
			return a
		},
		// 获取选中的监控点
		getChecked () {
			return this.MONPOINT.filter(item => item.checked).map(item => item.code)
		},
		openPoint () {
			this.$set(this, 'MONPOINT', !this.MONPOINT)
		},
		...mapMutations([
            'hideModal',
            'showModal',
            'changeMon'
        ])
	},
	components: {
		modal
	}
}
</script>

<style lang='less'>
.grid{
	tbody{
		.long{
			height: 20px;
			*{
				line-height: 20px;
				color: white;
				float: left;
				height: 20px;
			}
		}
	}
}
.select-point{
	span{
		display: inline-block;
		vertical-align: top;
		font-size: 16px;
	}
}
</style>
