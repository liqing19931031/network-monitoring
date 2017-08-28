<template>
	<div class="chart table-group">
		<div class="table-header">
			{{title}}
		</div>
		<div class="body">
			<div id='timeLong'>
				
			</div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts'

export default {
	props: ['title', 'resTime'],
	name: 'chart',
	data () {
		return {
			chartData: {
			}
		}
	},
	mounted () {
		let that = this
		this.timeLong = echarts.init(document.getElementById('timeLong'))
		this.getData('get', 'api/listtwo', undefined, (res) => {
			console.log(res.data)
			that.timeLong.setOption(that.setOptions(res.data.result))
		}, document.getElementById('timeLong'))
	},
	methods: {
		setOptions: function (data) {
			let title = []
			let series = []
			data.chartData.forEach(function (item) {
				title.push(item.name)
				series.push({
					name: item.name,
					type: 'line',
					data: item.dataList
				})
			})
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
			        data: data.timeline
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: series
			}
			return option
		}
	}
}
</script>

<style lang='less'>
.chart{
	height: 370px;
	.body{
		line-height: 300px;
		text-align: center;
		height: 303px;
		#timeLong{
			padding-top: 20px; 
			height: 100%;
		}
	}
}
</style>
