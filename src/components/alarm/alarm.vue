<template>
	<div class="alarm clearfix">
		<div class="right-content pull-left">
			<grid></grid>
		</div>
	</div>
</template>

<script>
import grid from './grid'

export default {
	data () {
		return {
			data: 'a'
		}
	},
	mounted () {
	},
	components: {
		grid
	}
}
</script>

<style lang='less'>
	.alarm{
		.right-content{
			width: 100%;
		}
	}
</style>
