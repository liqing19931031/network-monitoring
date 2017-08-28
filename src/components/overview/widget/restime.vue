<template>
	<div class="table-group">
		<div class="table-header">
			{{this.title}}
			<div class="tab-group pull-right">
				<ul class="clearfix">
					<li :class='index === chartParam.num ? "active" : ""' v-for='(item, index) in this.TIME' @click='changeType(index)'>{{item}}</li>
				</ul>
			</div>
		</div>
		<div class="body">
			<div :id='this.idname' class="chartDom">
			</div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts'

export default {
	props: ['title', 'requesturl', 'idname'],
	name: 'chart',
	data () {
		return {
			chartData: {
			},
			TIME: [
				'12小时以内',
				'24小时以内',
				'3天内',
				'更多'
			],
			chartParam: {
				num: 0
			}
		}
	},
	mounted () {
		this.myChart = echarts.init(document.getElementById(this.idname))
		this.getResTime()
	},
	methods: {
		setOptions (data) {
			let title = []
			let option = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data: title
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    toolbox: {
			        feature: {
			            magicType: {
			            	type: 'line'
			            }
			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: data.field
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [
			    	{
			    		name: (data.value[0] instanceof Array) ? '响应时间' : '概览统计',
			    		type: 'line',
			    		data: (data.value[0] instanceof Array) ? data.value[0] : data.value
			    	},
			    	{
			    		name: '基准线',
			    		type: 'line',
			    		data: (data.value[1] instanceof Array) ? data.value[1] : []
			    	}
			    ]
			}
			return option
		},
		getResTime () {
			let that = this
			this.getData('get', `api/${this.requesturl}`, Object.assign(
				this.chartParam,
				this.$router.currentRoute.query
			), (res) => {
				that.myChart.setOption(that.setOptions(res.data.result))
			}, document.getElementById(this.idname))
		},
		changeType (index) {
			this.$set(this.chartParam, 'num', index)
			this.getResTime()
		}
	}
}
</script>

<style lang='less'>
.chartDom{
	padding-top: 20px; 
	height: 300px;
}
</style>
