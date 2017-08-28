<template>
	<div class="table-group">
		<div class="table-header">
			基本信息
		</div>
		<div class="mon-detail-message table-body clearfix">
			<div class="col-xs-12">
				<div class="col-xs-3 col-xs-offset-3 no-padding">检测对象：{{this.baseMessage.monitoring}}</div>
				<div class="col-xs-6">响应阀值：{{this.baseMessage.response}}</div>
			</div>
			<div class="col-xs-12">
				<div class="col-xs-3 col-xs-offset-3 no-padding">检测状态：{{this.baseMessage.jcstate}}</div>
				<div class="col-xs-6">异常现象：{{baseMessage.dangerdesc}}</div>
			</div>
			<div class="col-xs-12">
				<div class="col-xs-3  col-xs-offset-3 no-padding">检测频率：{{this.baseMessage.rate}}分钟</div>
			</div>
		</div>
	</div>	
</template>

<script>
export default {
	props: ['baseMessage'],
	data () {
		return {
			name: 'sitemon'
		}
	}
}
</script>

<style lang='less'>
.mon-detail-message{
	.col-xs-12{
		line-height: 35px;
	}
}
</style>
