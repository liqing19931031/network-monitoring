<template>
	<div class="monitoring home">
		<div class="left-content pull-left">
			<div class="content">
                <div class="header text-gray text-big">
                  套餐信息
                </div>
                <div class="body">
                    <div class="leftnav text-primary">
                    	<div class="nav" @click='changeMonitor("全部监控")'>
                    		<router-link to='./all'>全部监控</router-link>
                    	</div>
                    	<div class="nav" @click='changeMonitor("HTTP监控")'>
                    		<router-link to='./http'>HTTP监控</router-link>
                    	</div>
                    	<div class="nav" @click='changeMonitor("DNS监控")'>
                    		<router-link to='./dns'>DNS监控</router-link>
                    	</div>
                    	<div class="nav" @click='changeMonitor("PING监控")'>
                    		<router-link to='./ping'>PING监控</router-link>
                    	</div>
                    	<div class="nav" @click='changeMonitor("网站内容监控")'>
                    		<router-link to='./proof'>网站内容监控</router-link>
                    	</div>
                    </div>
                </div>
            </div>
		</div>
		<div class="right-content pull-left">
			<router-view :dataList='dataList' :title='monitorType' v-on:changeType='changeMyType' v-on:goSearch='goSearch'></router-view>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	data () {
		return {
			dataList: [
            ],
            monitorType: '全部监控',
            type: 1,
            TYPECODE: {
            	all: '0',
            	http: '1',
            	dns: '2',
            	ping: '3',
            	proof: '4'
            }
		}
	},
	mounted () {
		this.getWarnList()
	},
	watch: {
		'$route' (to, from) {
			if (this.TYPECODE[to.name]) {
				this.getWarnList(this.TYPECODE[to.name])
			}
		}
	},
	methods: {
		goSearch (file) {
			this.getData('get', 'api/warn', {type: this.TYPECODE[this.$router.currentRoute.name], file: file}, (res) => {
				this.$set(this, 'dataList', res.data.result)
			})
		},
		getWarnList (type) {
			this.getData('get', 'api/warn', {type: type || this.TYPECODE[this.$router.currentRoute.name]}, {
				resolve: (res) => {
					this.$set(this, 'dataList', res.data.result)
				},
				reject: (res) => {
					this.$set(this, 'dataList', [])
				}
			})
		},
		changeMyType (typedata) {
			this.$set(this, 'type', typedata)
		},
		changeMonitor (monitor, state) {
			this.$set(this, 'monitorType', monitor)
			this.getWarnList()
		},
		...mapMutations([
            'changeMon'
        ])
	}
}
</script>

<style lang='less'>
	.monitoring{
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
