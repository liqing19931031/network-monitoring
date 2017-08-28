<template>
	<div class="chart table-group">
		<div class="table-header">
			概览统计
		</div>
		<div class="body">
			<div id='chartsum'>
				
			</div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts'

export default {
	name: 'chart',
	data () {
		return {
			chartData: {
			}
		}
	},
	mounted () {
		let that = this
		this.myChart = echarts.init(document.getElementById('chartsum'))
		this.getData('get', 'api/listtwo', that.$route.query, (res) => {
			that.myChart.setOption(that.setOptions(res.data.result))
		}, document.getElementById('chartsum'))
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
	#chartsum{
		height: 100%;
	}
</style>
