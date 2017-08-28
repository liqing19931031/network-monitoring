<template>
	<div class="chart table-group">
		<div class="table-header">
			{{title}}
		</div>
		<div class="body">
			<div id='myChart'>
				
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
		this.myChart = echarts.init(document.getElementById('myChart'))
		this.getData('get', 'api/listone', undefined, (res) => {
			that.myChart.setOption(that.setOptions(res.data.result))
		}, document.getElementById('myChart'))
	},
	methods: {
		sum: function (arr) {
			let a = 0
			arr.forEach(function (item, index) {
				a += item
			})
			return a
		},
		setOptions: function (data) {
			let option = {
				title: {
					text: '实时监测，共有' + (this.sum(data.error) + this.sum(data.safe)) + '个网站监控项、' + this.sum(data.error) + '个网站异常',
					textAlign: 'left',
					left: 350
				},
				tooltip: {
			        trigger: 'axis',
			        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
			            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    legend: {
			        data: ['正常', '异常'],
			        right: 30
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: [
			        {
			            type: 'category',
			            data: ['HTTP监控', 'DNS监控', 'PING监控', '网站内容监控']
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value'
			        }
			    ],
			    series: [
			        {
			            name: '正常',
			            type: 'bar',
			            data: data.safe,
			            itemStyle: {
			            	normal: {
			            		color: '#5cb85c'
			            	}
			            }
			        },
			        {
			            name: '异常',
			            type: 'bar',
			            stack: '广告',
			            data: data.error,
			            itemStyle: {
			            	normal: {
			            		color: '#e74c3c'
			            	}
			            }
			        }
			    ]
			}
			return option
		}
	}
}
</script>

<style lang='less'>
.chart{
	height: 370px;
	box-sizing: border-box;
	.body{
		height: 303px;
		#myChart{
			padding-top: 20px; 
			height: 100%;
		}
	}
}
</style>
