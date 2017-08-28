<template>
	<div>
		<div class="tab-group">
			<ul class="clearfix">
				<li v-for='(item, index) in SELECTS[$store.state.snpType]' :class='nowType === index ? "active" : ""' @click='changeSelect(index)'>{{item}}</li>
			</ul>
		</div>
		<div class="table-group clearfix">
			<div class="snpshow" v-for='(item, index) in this.snpData' v-if='nowType === index'>
				<div class="col-xs-12" v-for='(value, key) in item'>
					<div class="col-xs-2 no-padding text-right">{{returnKey(key, index)}}: </div>
					<div :class='key === "snapshot" ? "col-xs-8" : "col-xs-10"'>{{value}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['type', 'snpData'],
		data () {
			return {
				MAPPING: {
					time: '探测时间',
					result: '结果',
					httpState: 'HTTP状态',
					downloadSize: '下载字节数', // bytes
					downloadSpeed: '下载速度', // kb/s
					responseTime: '响应时间', // ms
					serverIp: ['', '响应服务器IP', 'DNS解析服务器', '响应主机IP', ''],
					pageInfo: '网站源代码对比',
					connTime: '建立链接',
					downloadTime: '内容下载',
					parsingTime: 'DNS域名解析',
					serverTime: '服务器响应',
					totalTime: '响应时间',
					lifeTime: 'TTL',
					monUrl: '监控对象',
					type: '类型',
					packageLoss: '丢包率',
					sendPackageNum: '发送包数量',
					packageSize: '数据包大小',
					receivePackageNum: '接受包数量',
					snapshot: 'ping快照'
				},
				SELECTS: [
					[],
					['概述', '反应时间统计', 'HTTP响应头信息'],
					['概述', 'DNS解析快照'],
					['概述', 'ping快照'],
					['概述']
				],
				nowType: 0
			}
		},
		mounted () {
			console.log(this.$store.state.snpType)
		},
		methods: {
			changeSelect (type) {
				this.$set(this, 'nowType', type)
			},
			returnKey (key, index) {
				if (key === 'serverIp') {
					return this.MAPPING[key][this.$store.state.snpType]
				} else if (index === 2 && this.$store.state.snpType === 1) {
					return key
				} else {
					return this.MAPPING[key]
				}
			}
		}
	}
</script>

<style lang='less'>
	.table-group{
		ul{
			li{
				line-height: 30px;
			}
		}
		.snpshow{
			padding: 20px;
			height: 300px;
			box-sizing: border-box;
			background-color: white;
			.col-xs-12{
				line-height: 40px;
				padding: 0;
			}
		}
	}
</style>
