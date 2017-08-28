<template>
	<div class="">
		<implementation></implementation>
		<chartsum></chartsum>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import modal from '../modal'
import implementation from './widget/implementation'
import chartsum from './widget/chartsum'

export default {
	props: ['dataList', 'title', 'monpoints'],
	methods: {
		...mapMutations([
            'hideModal',
            'showModal'
        ])
	},
	components: {
		modal,
		implementation,
		chartsum
	}
}
</script>

<style lang='less'>
</style>
