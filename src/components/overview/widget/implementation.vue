<template>
	<div class="table-group">
		<div class="table-header">
			<span class="pull-left text-big">实时状态</span>
		</div>
		<table class="table" :class='this.impList.length > 0 ? "table-hover-danger" : ""'>
	      <thead>
	        <tr>
	          <th>序号</th>
	          <th>检测点</th>
	          <th>状态</th>
	          <th>响应码</th>
	          <th>响应时间</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr v-if='impList.length > 0' v-for='(item, index) in this.impList'>
	          <td>{{index + 1}}</td>
	          <td>{{MONPOINT[item.spot]}}</td>
	          <td><div class="errorMessage" :class='`brand-${item.stat === 1 ? "success" : "danger"}`'>{{STATE[item.stat]}}</div></td>
	          <td>{{item.code}}</td>
	          <td>{{Math.round(item.time)}}ms</td>
	        </tr>
	        <tr v-if='impList.length === 0'>
	        	<td colspan='5'><span class="text-success">恭喜您！当前没有任何警告信息</span></td>
	        </tr>
	      </tbody>
	    </table>
	</div>
</template>

<script>
	export default {
		name: 'implementation',
		data () {
			return {
				impList: [],
				MONPOINT: {
					'aa': '宁波电信',
					'ab': '宁波联通',
					'ac': '大连联通',
					'ad': '杭州电信'
				},
				STATE: [
					'危险',
					'安全'
				]
			}
		},
		mounted () {
			this.getData('get', 'api/sonwarn', this.$router.currentRoute.query, (res) => {
				this.$set(this, 'impList', res.data.result.dataList)
			})
		}
	}
</script>

<style lang='less'>
</style>
