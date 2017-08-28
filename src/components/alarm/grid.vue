<template>
	<div class="table-group alarm-grid" @click='hideDatepick'>
		<div class="table-header">
			<span class="pull-left text-big">监控设置>>网站告警历史</span>
		</div>
		<div class="table-title clearfix">	
			<form class="form-horizontal">
		      	<div class="form-group">
			        <label class="col-xs-1 control-label no-padding">监测类别：</label>
			        <div class="tab-group col-xs-4">
				        <ul class="clearfix">
				        	<li :class='index === search.type ? "active" : ""' v-for='(item, index) in this.STATE' @click='changeType(index)'>{{item}}</li>
				        </ul>
			        </div>
		      	</div>
		      	<div class="form-group">
		        	<label class="col-xs-1 control-label no-padding">监测名称：</label>
			        <div class="col-xs-4">
			          	<input type="text" class="form-control" placeholder="监测名称：" v-model='search.name'>
			        </div>
		     	</div>
		      	<div class="form-group">
			        <label class="col-xs-1 control-label no-padding">时间范围：</label>
			        <div class="col-xs-2 no-padding-right">
			        	<date-picker :subData='this.search' :timeName='"start"' :containerStyle='this.dateStyle' :showCalendar='this.DATEPICK'></date-picker>
			        </div>
			        <div class="pull-left" style="line-height: 30px;color: #ccc">—</div>
			        <div class="col-xs-2 no-padding-left">
			        	<date-picker :subData='this.search' :timeName='"end"' :containerStyle='this.dateStyle' :showCalendar='this.DATEPICK'></date-picker>
			        </div>
		      	</div>
		      	<div class="form-group">
			        <label class="col-xs-1 control-label no-padding">监测点：</label>
			        <div class="tab-group col-xs-4">
				        <ul class="clearfix">
				        	<li :class='key === search.spot ? "active" : ""' v-for='(value, key) in this.POINTS' @click='changePoints(key)'>{{value}}</li>
				        </ul>
			        </div>
		      	</div>
		      	<div class="form-group">
			        <label class="col-xs-1 control-label no-padding">监控对象：</label>
			        <div class="col-xs-3">
			          <input type="text" class="form-control" placeholder="监控对象" v-model='search.moniobj'>
			        </div>
			        <div class="col-xs-1">	
						<div class="btn btn-primary-opposite pull-right" @click='getAlarmList()'>查询</div>
			        </div>
		      	</div>
		    </form>
		</div>
		<table class="table table-hover-primary">
	      <thead>
	        <tr>
	          <th>异常发生时间</th>
	          <th>监控对象</th>
	          <th>监控类型</th>
	          <th>当前状态</th>
	          <th>事件信息</th>
	          <th>持续时间</th>
	          <th>操作</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr v-if='dataList.length > 0' v-for='(item, index) in this.dataList'>
	        	<td>{{item.errorTime}}</td>
	        	<td><a :href='item.monitoring'>{{item.monitoring}}</a></td>
	          	<td>{{getType(item.type)}}</td>
	          	<td><div class="errorMessage" :class='item.state === 1 ? "brand-success" : "brand-danger"'>{{item.state === 1 ? '已恢复' : '未恢复'}}</div></td>
	          	<td><div class="errorMessage brand-danger">警告</div> {{item.errorMessage}}</td>
	          	<td>{{item.sustain}}</td>
	          	<td>
	          		<span><a @click='goDetail("告警时间详情", item.id)'>详情</a></span>
	          	</td>
	        </tr>
	        <tr v-if='dataList.length === 0'>
	        	<td colspan='9'><span>当前监控无数据！</span></td>
	        </tr>
	      </tbody>
	    </table>
	    <pagination :totalPage='totalPage' :params='this.search' :getList='this.getAlarmList'></pagination>
	    <modal :title='modalParams.title'>
	    	<div slot='body' v-if='modalParams.custom === "detail"'>
	    		<div class="error clearfix">
	    			<div class="col-xs-3 no-padding-right">报警时长：{{monDetail.sustain}}</div>
	    			<div class="col-xs-5 no-padding">开始时间：{{monDetail.start}}</div>
	    			<div class="col-xs-4 no-padding-left">结束时间：{{monDetail.end}}</div>
	    			<div class="col-xs-3 no-padding-right">姓名：{{monDetail.name}}</div>
	    			<div class="col-xs-5 no-padding">电话：{{monDetail.tele}}</div>
	    			<div class="col-xs-4 no-padding-left">邮箱：{{monDetail.email}}</div>
	    		</div>
	    		<table class="table table-hover-primary">
			      <thead>
			        <tr>
			          <th>监测点</th>
			          <th>探测内容</th>
			          <th>操作</th>
			        </tr>
			      </thead>
			      <tbody>
			        <tr v-if='monList.length > 0' v-for='(item, index) in this.monList'>
			        	<td>{{item.ad_spot}}</td>
			        	<td>{{item.desc}}</td>
			          	<td>
			          		<span><a @click='goHis(item.id)'>查看快照详情</a></span>
			          	</td>
			        </tr>
			        <tr v-if='monList.length === 0'>
			        	<td colspan='3'><span>当前无告警数据</span></td>
			        </tr>
			      </tbody>
			    </table>
	    	</div>
	    </modal>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import modal from '../modal'
import pagination from '../pagination'
import datePicker from '../datePicker'

export default {
	data () {
		return {
			dateStyle: {
				width: '100%',
				padding: 0
			},
			DATEPICK: false,
			STATE: [
				'全部',
				'HTTP',
				'DNS',
				'PING',
				'防篡改'
			],
			POINTS: {
				'': '全部',
				'aa': '华北北京',
				'ab': '华东上海',
				'ac': '华南深圳',
				'ad': '杭州电信'
			},
			modalParams: {
	        	title: '',
	        	onOk: '',
	        	custom: true
	       	},
	       	search: {
	       		type: 0,
	       		moniobj: '',
	       		name: '',
	       		start: `${new Date().getFullYear()}-${new Date().getMonth() < 9 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-${new Date().getDate()} 00:00`, // 设置默认时间
	       		end: `${new Date().getFullYear()}-${new Date().getMonth() < 9 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-${new Date().getDate()} 00:00`, // 设置默认时间
	       		spot: '',
	       		pagesize: 10,
	       		page: 1
	       	},
	       	monDetail: {
	       	},
	       	monList: [
	       	],
	       	dataList: [
	       	],
	       	totalPage: 0
		}
    },
    components: {
		modal,
		pagination,
		datePicker
	},
    mounted () {
    	this.getAlarmList()
    },
	methods: {
		hideDatepick () {
	    	this.$set(this, 'DATEPICK', true)
	    	setTimeout(() => {
	    		this.$set(this, 'DATEPICK', false)
	    	}, 10)
	    },
		changeType (index) {
			this.$set(this.search, 'type', index)
			this.getAlarmList()
		},
		changePoints (point) {
			this.$set(this.search, 'spot', point)
		},
		getAlarmList () {
			this.getData('get', 'api/history', this.search, (res) => {
	    		this.$set(this, 'dataList', res.data.result.dataList)
	    		this.$set(this, 'totalPage', res.data.result.totalpage)
	    	})
		},
		goDetail (title, id) {
			this.$set(this.modalParams, 'title', title)
			this.$set(this.modalParams, 'custom', 'detail')
			this.getData('get', 'api/historydesc', { id: id }, (res) => {
				this.$set(this, 'monList', res.data.result.dataList)
				this.$set(this, 'monDetail', res.data.result.lxb)
			})
			this.showModal()
		},
		goHis (id) {
			this.hideModal()
			this.$router.push({path: '/miondetail/overview', query: {urlid: id}})
		},
		...mapMutations([
            'hideModal',
            'showModal'
        ])
	}
}
</script>

<style lang='less'>
.alarm-grid{
	.modal-confirm{
		width: 750px;
	}
	.error{
		height: auto;
		padding:15px 60px;
		label{
			font-weight: normal;
		}
	}
	.modal-mask{
		.modal-body{
			padding: 0;
			.error{
				padding:15px 5px;
			}
		}
	}
}
</style>
