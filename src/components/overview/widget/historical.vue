<template>
	<div>
		<div class="table-group historical" v-if='this.TYPE === 0'>
			<div class="table-title">
				<div class="mon-point">
					<div class="col-xs-12 no-padding">
						<div class="col-xs-1 no-padding">
							监测点:
						</div>
						<div class="col-xs-11">
							<div class="btn btn-primary-opposite btn-sm" :class='item === hisData.spot ? "active" : ""' v-for='(item, index) in this.points.spot' @click='changeType({name: "spot", data: item})'>
								{{MONPOINT[item]}}
							</div>
						</div>
					</div>
					<div class="col-xs-12 no-padding">
						<div class="col-xs-1 no-padding">
							时间范围:
						</div>
						<div class="col-xs-11">
							<div class="tab-group">
								<ul class="clearfix">
									<li :class='index === hisData.num ? "active" : ""' v-for='(item, index) in this.TIME' @click='changeType({name: "num", data: index})'>{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-xs-12 no-padding">
						<div class="col-xs-1 no-padding">
							监测点状态:
						</div>
						<div class="col-xs-11">
							<div class="input-group">
								<label for="">
									全部
								</label>
								<input type="radio" name="pointState" class="primary" checked="" @click='changeType({ name: "iserr", data: 1})'>
							</div>
							<div class="input-group">
								<label for="">
									异常
								</label>
								<input type="radio" name="pointState" class="primary" @click='' @click='changeType({ name: "iserr", data: 0})'>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="his-list">
				<table class="table table-hover-primary">
					<thead>
		        		<tr>
		        			<th>探测时间</th>
				          	<th>监控项状态</th>
				          	<th>响应时间</th>
				          	<th>响应状态码</th>
				          	<th>历史快照</th>
		        		</tr>
		        	</thead>
		        	<tbody>
				        <tr v-if='hisList.length > 0' v-for='(item, index) in hisList'>
							<td>{{item.stime}}</td>
							<td>
								<div class="errorMessage" :class='item.state ? "brand-success" : "brand-danger"'>{{item.state ? "正常" : "报警"}}</div>
							</td>
							<td>{{item.time}}ms</td>
							<td>{{item.code}}</td>
							<td><a @click='goHisdetail(item.id)'>查看快照详情</a></td>
				        </tr>
				        <tr v-if='hisList.length === 0'>
				        	<td colspan='5'><span>当前监控无数据！</span></td>
				        </tr>
			      	</tbody>
				</table>
				<div class="table-footer">
					<pagination :totalPage='totalPage' :params='hisData' :getList='getHisList' class='clearfix'></pagination>
				</div>
			</div>
		</div>
		<snpdetail v-else :snpData='this.snpData' :type='this.monpoints'></snpdetail>
	</div>
</template>

<script>
import pagination from '../../pagination'
import snpdetail from './snpdetail'

export default {
	props: ['points', 'monpoints'],
	data () {
		return {
			TYPE: 0,
			TIME: [
				'12小时以内',
				'24小时以内',
				'3天内',
				'更多'
			],
			MONPOINT: {
				'aa': '华北北京',
				'ab': '华东上海',
				'ac': '华南深圳',
				'ad': '杭州电信'
			},
			hisData: {
				num: 0,
				urlid: this.$router.currentRoute.query.urlid,
				spot: '',
				iserr: 1,
				pagesize: 5,
				page: 1
			},
			snpData: '',
			totalPage: 1,
			hisList: [
			]
		}
	},
	mounted () {
		this.getHisList(this.hisData)
	},
	methods: {
		changeType (data) {
			this.$set(this.hisData, data.name, data.data)
			this.getHisList(this.hisData)
		},
		goHisdetail (id) {
			this.$set(this, 'TYPE', 1)
			this.getData('get', 'api/hiswOverview', {id: id}, (res) => {
				this.$set(this, 'snpData', res.data.result)
			})
		},
		getHisList (data) {
			this.getData('get', 'api/hostwarn', data, {
				resolve: (res) => {
					this.$set(this, 'hisList', res.data.result.datalist)
					this.$set(this, 'totalPage', res.data.result.totalpage)
				},
				reject: (res) => {
					this.$set(this, 'hisList', [])
					this.$set(this, 'totalPage', 1)
				}
			})
		}
	},
	components: {
		pagination,
		snpdetail
	}
}
</script>

<style lang='less'>
.historical{
	.table-title{
		height: 160px;
		background-color: white;
	}
	.col-xs-12{
		line-height: 40px;
		.col-xs-11{
			height: 40px;
			.btn + .btn{
				margin-left: 5px;
			}
		}
	}
}
</style>
