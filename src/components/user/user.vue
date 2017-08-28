<template>
	<div class="user monitoring home">
		<div class="left-content pull-left">
			<div class="content">
                <div class="header text-gray text-big">
                    监控设置
                </div>
                <div class="body">
                    <div class="leftnav text-primary">
                    	<router-link class='nav' to='./inform'>通知方式</router-link>
                    	<router-link class='nav' to='./editpass'>修改密码</router-link>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="header text-gray text-big">
                    监控帮助
                </div>
                <div class="body">
                    <div class="leftnav text-primary">
                    	<router-link class='nav' to='./monitor'>监测点IP监控</router-link>
                    	<router-link class='nav' to='./agreement'>平台协议</router-link>
                    </div>
                </div>
            </div>
		</div>
		<div class="right-content pull-left">
			<router-view :title='monitorType'></router-view>
		</div>
	</div>
</template>

<script>
import grid from './grid'
import edit from './editpassword'

export default {
	data () {
		return {
			monitorType: '通知方式'
		}
	},
	methods: {
		changeMonitor (monitor) {
			this.$set(this, 'monitorType', monitor)
		}
	},
	components: {
		grid,
		edit
	}
}
</script>

<style lang='less'>
	.user{
		.left-content{
			.content{
				.body{
					height: 105px;
					a{
						display: block;
						text-decoration: none;
						&.router-link-active{
							color: white;
							background-color: #1795ff;
						}
					}
				}
			}
		}
	}
</style>
