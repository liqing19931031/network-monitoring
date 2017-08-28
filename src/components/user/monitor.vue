<template>
	<div class="pointIp">
		<div class="table-group">
			<div class="table-header">
				用户中心>>监控点IP地址
			</div>
			<div class="table">
				<div v-for='(item, index) in ipList' class="oneip">
					{{item}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				ipList: [
					'111'
				]
			}
		},
		mounted () {
			this.getData('get', 'api/getip', undefined, (res) => {
				this.$set(this, 'ipList', res.data.result)
			})
		}
	}
</script>

<style lang='less'>
	.oneip{
		padding-left: 60px;
		line-height: 34px;
	}
</style>
