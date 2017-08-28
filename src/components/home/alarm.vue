<template>
	<div class="table-group">
		<div class="table-header text-gray">
			<div class="table-header--warn">
				<span class="pull-left text-big">当前警告事件</span>当前共有<span class="text-danger">{{this.alarmData.length}}个</span>警告事件
			</div>
		</div>
		<table class="table" :class='this.alarmData.length > 0 ? "table-hover-danger" : ""'>
	      <thead>
	        <tr>
	          <th>监控对象</th>
	          <th>类型</th>
	          <th>异常信息</th>
	          <th>发生时间</th>
	          <th>已持续</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr v-if='alarmData.length && alarmData.length > 0' v-for='(item, index) in this.alarmData'>
	          <td><a>{{item.monitoring}}</a></td>
	          <td>{{getType(item.type)}}</td>
	          <td><div class="errorMessage brand-danger">警告</div> {{item.errorMessage}}</td>
	          <td>{{item.time}}</td>
	          <td>{{item.sustain}}</td>
	        </tr>
	        <tr v-if='alarmData.length === 0'>
	        	<td colspan='5'><span class="text-success">恭喜您！当前没有任何警告信息</span></td>
	        </tr>
	      </tbody>
	    </table>
	    <div class="table-footer">
	    	<span class="pull-right text-primary more"><router-link to='/alarm'>更多信息</router-link></span>
	    </div>
	</div>
</template>

<script>
	export default {
		props: ['alarmData'],
		name: 'alarm',
		mounted () {
			console.log(this.alarmData)
		}
	}
</script>

<style lang='less'>
.table{
	thead{
		tr{
			height: 48px;
			th{
				font-weight: normal;
				padding:0 8px;
				line-height: 48px;
				border-bottom: 1px;
			}
		}
	}
}
th,td{
	text-align: center;
	vertical-align: middle;
}
</style>
