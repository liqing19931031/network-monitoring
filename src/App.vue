<template>
  <div id="app">
  	<alert></alert>
  	<div class="navigation" v-if='this.$router.currentRoute.name !== "index"'>
  		<div class="nav-content">
			<div class="logo pull-left">
				<img src="/static/logo.png" alt="">
			</div>
			<router-link class="pull-left" to='/home'><div class="content">概览</div></router-link>
			<router-link class="pull-left" to='/monitoring'><div class="content">监控</div></router-link>
			<router-link class="pull-left" to='/alarm'><div class="content">告警</div></router-link>
			<router-link class="pull-left" to='/user'><div class="content">用户中心</div></router-link>
			<div class="logout pull-right">
				<i class="glyphicon glyphicon-logout" @click='logout' style="cursor: pointer"></i>
			</div>
		</div>
  	</div>
  	<div class="clearfix" :class='this.$router.currentRoute.name !== "index" ? "contain" : ""'>
  		<router-view></router-view>
  	</div>
  	<foot></foot>
  </div>
</template>

<script>
import foot from './components/footer'
import alert from './components/alert'

export default {
  name: 'app',
  methods: {
  	logout () {
  		let myDate = new Date()
  		myDate.setTime(-1000)
  		let data = document.cookie
  		let dataArray = data.split(';')
  		this.getData('post', 'api/logout', undefined, (res) => {
  			for (let i = 0; i < dataArray.length; i++) {
	         	let varName = dataArray[i].split('=')
	         	document.cookie = varName[0] + '=; expires=' + myDate.toGMTString()
	        }
	  		this.$router.push('/index')
  		})
  	}
  },
  mounted () {
  },
  components: {
  	foot,
  	alert
  }
}
</script>

<style lang='less'>
@import './less/bootstrap';
body,html{
	height: 100%;
	font-family: 'Microsoft YaHei';
	background-color: #f2f2f2;
}
#app{
	overflow: hidden;
}
.navigation{
	height: 54px;
	background: linear-gradient(left, rgba(66, 133, 244, 1), rgba(26, 214, 253, 1));
	width: 100%;
	.nav-content{
		min-width: 1366px;
		padding:0 60px;
		height:100%;
		.logo{
			width: 100px;
			margin-right: 120px;
			height: 25px;
			clear: both;
			img{
				width: 200px;
				display: block;
				margin:5px auto;
			}
		}
		a{
			width: 80px;
			text-align: center;
			line-height: 54px;
			color: white;
			text-decoration: none;
			.content{
				width: 70px;
				margin:0 5px;
			}
			&.router-link-active{
				color: rgb(56, 153, 246);
				background-color: white;
				.content{
					height: 54px;
					border-bottom: 2px solid rgb(56, 153, 246);
				}
			}
		}
		.logout{
			width: 9%;
			height: 100%;
			color: white;
			i{
				line-height: 54px;
				color: white;
				font-size: 40px;
				&.glyphicon-log-out{
					cursor: pointer;
					font-size: 30px;
				}
			}
		}
	}
}
.contain{
	min-width: 1366px;
	padding:30px 60px;
	@a: 100vh;
	min-height: ~"calc(@{a} - 144px)";
}
</style>
