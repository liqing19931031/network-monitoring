<template>
	<div class='alert' :class='`alert-${this.$store.state.alertStyle}`' v-if='this.$store.state.alert'>
		{{this.$store.state.alertMessage}}
		<span class="close">×</span>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang='less' scoped>
	.alert{
		position: fixed;
		top: 50px;
		right: 50px;
		z-index: 99999;
		border:1px solid;
		min-width: 200px;
		&.alert-danger{
			background-color: white;
		}
		.close{
			cursor: pointer;
			font-size: 20px;
			float: right;
			color: #a94442;
		}
	}
</style>
