<template>	
	<div class="runstate">
		<resTime :title='"响应时间统计"' :requesturl='"xyswarn"' :idname='"resTime"'></resTime>
		<resTime :title='"可用率统计"' :requesturl='"kylwarn"' :idname='"availability"'></resTime>
	</div>
</template>

<script>
import resTime from './widget/resTime'
	export default {
		data () {
			return {
				data: 'a'
			}
		},
		components: {
			resTime
		}
	}
</script>

<style lang='less'>
	
</style>
