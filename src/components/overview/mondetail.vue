<template>
	<div class="overview home">
		<div class="left-content pull-left">
			<div class="content">
				<div class="header text-gray text-big">
					网站监控
				</div>
				<div class="body">
					<div class="leftnav text-primary">
				    	<div class="nav" @click='changeMonitor("网站概览")'>
				    		<router-link :to='{path: "overview", query: this.$router.currentRoute.query}'>网站概览</router-link>
				    	</div>
				    	<div class="nav" @click='changeMonitor("运行状态")'>
				    		<router-link :to='{path: "runstate", query: this.$router.currentRoute.query}'>运行状态</router-link>
				    	</div>
				    	<div class="nav" @click='changeMonitor("历史快照")'>
				    		<router-link :to='{path: "snapshot", query: this.$router.currentRoute.query}'>历史快照</router-link>
				    	</div>
				    </div>
				</div>
			</div>
		</div>
		<div class="right-content pull-left">
			<div class="table-group clearfix">
				<div class="table-header">
					<span class="pull-left text-big">网站监控>>{{this.monitorType}}</span>
					<!-- <div class="btn btn-primary-opposite pull-right" @click='addMonitoring("创建网站监控")'>创建监控</div> -->
				</div>
			</div>
			<baseMessage :baseMessage='this.baseMessage'></baseMessage>
			<router-view :title='this.monitorType' :monpoints='this.baseMessage'></router-view>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import baseMessage from './widget/baseMessage'

export default {
	data () {
		return {
			monitorType: '网站概览',
			baseMessage: {
			}
		}
	},
	mounted () {
		this.getData('get', 'api/basewarn', this.$router.currentRoute.query, (res) => {
			this.$set(this, 'baseMessage', res.data.result.dataList)
			this.changeSnpType(res.data.result.dataList.type)
		})
	},
	methods: {
		changeMonitor (monitor) {
			this.$set(this, 'monitorType', monitor)
		},
		...mapMutations([
			'changeSnpType'
		])
	},
	components: {
		baseMessage
	}
}
</script>

<style lang='less'>
.overview{
	a{
		text-decoration: none;
	}
	.left-content{
		.content{
			.body{
				padding:10px 0;
				height: 255px;
				.leftnav{
					.nav{
						text-align: center;
						line-height: 30px;
						height: 30px;
						margin-bottom: 10px;
						cursor: pointer;
						a{
							display: block;
							text-decoration: none;
							&.router-link-active{
								background-color: #1795ff;
								color: white;
							}
						}
						a:hover{
							background-color: #1795ff;
							color: white;
						}
					}
				}
			}
		}
	}
}
</style>
