<template>
	<div class="snapshot">
		<historical :points='this.monpoints'></historical>
	</div>
</template>

<script>
import historical from './widget/historical'

export default {
	props: ['monpoints'],
	data () {
		return {
			psid: 0
		}
	},
	components: {
		historical
	}
}
</script>

<style lang='less'>
	
</style>
