<template>
	<div class="index">
		<div class="banner">
			<div class="banner-title">
				盘石云信 为诚信网站保驾护航
			</div>
			<div class="text-center" style="margin-top: 72px;">
				<img src="/static/logo.png" alt="">
			</div>
			<div class="text-center" style="margin-top: 30px;">
				<div class="btn" @click='this.showModal'>进入监控后台</div>
			</div>
		</div>
		<div class="content" style="background: url('/static/mod-bg.png') 100% 100% no-repeat;">
			<div class="content-body">
				<div class="title-header">
					云信监测
				</div>
				<div class="text-center">
					诚信网站的守护神，实时监控网站安全
				</div>
				<div class="logo clearfix">
					<i class="glyphicon glyphicon-renzheng pull-left" style="color: #f05c46"></i>
					<div class="pull-left description">
						<div>一次认证，全年监控。</div>
						<br>
						<div>对接“诚信网站”认证系统，365天全年无间断网站监控，打造网站安全体系。</div>
					</div>
				</div>
				<div class="logo clearfix">
					<i class="glyphicon glyphicon-tixing pull-left" style="color: #468af7"></i>
					<div class="pull-left description">
						<div>智能机器，安全提醒。</div>
						<br>
						<div>“盘石云信”系统第一时间将不安全信息通过手机短信和邮件进行通知。</div>
					</div>
				</div>
				<div class="logo clearfix">
					<i class="glyphicon glyphicon-kuaijie pull-left" style="color: #fc7b1a"></i>
					<div class="pull-left description">
						<div>全面快捷，拒绝篡改。</div>
						<br>
						<div>利用云计算技术快速安全监控，防止网站篡改，保障网站安全。</div>
					</div>
				</div>
				<div class="logo clearfix">
					<i class="glyphicon glyphicon-pachong pull-left" style="color: #cb76fc"></i>
					<div class="pull-left description">
						<div>算法强大，精准爬虫</div>
						<br>
						<div>对接“诚信网站”认证系统，365天全年无间断网站监控，打造网站安全体系。</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mon">
			<div class="contain">
				<div class="star-1" :style='{left: this.star.one + "px", transition: this.star.one === 150 ? "all 0s linear" : "all 10s linear"}'></div>
				<div class="star-2" :style='{left: this.star.two + "px", transition: this.star.two === 500 ? "all 0s linear" : "all 10s linear"}'></div>
				<div class="title-header">
					网站监控
				</div>
				<div class="text-center">
					24小时不间断地监控网站，第一时间通过邮件和短信反馈网站主检测信息。
				</div>
				<div class="content">
					<div class="content-left">
						<div class="content-des">
							<div class="title-img text-center">
								<img src="/static/HTTP.png" alt="">
							</div>
							<div class="title">
								HTTP监控
							</div>
							<div class="mon-content">
								用户自定义HTTP监控项目来模拟用户请求访问被监控站点，实时获取站点的响应状态和请求详情，精准的探测出网站的各种异常。
							</div>
						</div>
						<div class="content-des">
							<div class="title-img text-center">
								<img src="/static/PING.png" alt="">
							</div>
							<div class="title">
								PING监控
							</div>
							<div class="mon-content">
								用户自定义PING监控项目来模拟用户请求访问被监控站点，可实时掌握站点/服务器的连通状态，丢包率、RTT响应时间。
							</div>
						</div>
						<div class="content-des">
							<div class="title-img text-center">
								<img src="/static/DNS.png" alt="">
							</div>
							<div class="title">
								DNS监控
							</div>
							<div class="mon-content">
								用户自定义DNS监控项目来模拟用户请求访问被监控站点，及时发现网站的区域解析异常以及DNS劫持，提升网站安全性。
							</div>
						</div>
						<div class="content-des">
							<div class="title-img text-center">
								<img src="/static/WEB.png" alt="">
							</div>
							<div class="title">
								网站篡改监控
							</div>
							<div class="mon-content">
								用户指定网站进行网站防篡改监控，通过强大的数据抓取技术及数据分析能力，及时将篡改信息通知用户。
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="slide">
			<div class="slide-contain">
				<div class="slide-header clearfix title-header">
					合作伙伴
				</div>
				<div class="text-center">100,000+家网站正在使用我们的产品</div>
				<div class="slide-body clearfix">
					<div class="slide-rects clearfix" v-for='(item, index) in SLIDES' :class='index === nowIndex ? "on" : ""'>
						<div class="rect" v-for='(img, imgIndex) in item'>
							<img :src="`/static/slides/logo${img}.jpg`" alt="">
						</div>
					</div>
					<div class="slide-dots clearfix">
						<div class="slide-dot" v-for='(item, index) in SLIDES' :class='index === nowIndex ? "slide-active" : ""' @click='changeIndex(index)'>
						</div>
					</div>
				</div>
			</div>
		</div>
		<modal :title='"盘石云信 为诚信网站保驾护航"' :class='LOGINSTATE ? "shake-horizontal" : ""'>
			<div slot='header'>
				<div class="modal-header brand-primary" style="color: white;font-size: 20px;border-radius: 0px">
					<div class="text-center">盘石云信 为诚信网站保驾护航</div>
				</div>
			</div>
			<div slot='body' style="margin-top: 30px;">
				<form class="form-horizontal">
					<div class="form-group">
				        <label class="col-xs-3 control-label"><span class="text-primary">*&nbsp&nbsp</span>账号</label>
				        <div class="col-xs-8">
				          <input type="text" style="color: #777" class="form-control" placeholder="账号" v-model='login.username'>
				        </div>
				      </div>
				      <div class="form-group">
				        <label class="col-xs-3 control-label"><span class="text-primary">*&nbsp&nbsp</span>密码</label>
				        <div class="col-xs-8">
				          <input type="password" style="color: #777" class="form-control" placeholder="密码" v-model='login.password'>
				        </div>
				      </div>
				</form>
			</div>
			<div slot='button'>
	    		<button class="btn btn-primary" style="width: 100px;" @click='goLogin'>登 录</button>
	    	</div>
		</modal>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import modal from './modal'

export default {
	data () {
		return {
			SLIDES: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
				[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
			],
			star: {
				one: 150,
				two: 500
			},
			login: {
				username: '',
				password: ''
			},
			LOGINSTATE: false,
			HAVECLASS: 1,
			nowIndex: 0
		}
	},
	components: {
		modal
	},
	mounted () {
		let ca = document.cookie.split(';')
		this.$set(this.star, 'one', 2000)
		this.$set(this.star, 'two', 2000)
		this.start()
		this.starGo()
		if (ca.every(this.getCookie)) {
			this.$router.push('/home')
		}
	},
	methods: {
		getCookie (name) {
			return name === 'login=true'
		},
		changeIndex (index) {
			this.$set(this, 'nowIndex', index)
		},
		starGo () {
			if (this.HAVECLASS > 0) {
				this.$set(this.star, 'one', this.star.one === 150 ? 2000 : 150)
				this.$set(this.star, 'two', this.star.two === 500 ? 2000 : 500)
				setTimeout(this.starGo, this.star.one === 2000 ? 10000 : 0)
			} else {
				return
			}
		},
		start () {
			if (this.nowIndex > -1) {
				this.changeIndex(this.nowIndex === 1 ? 0 : 1)
				setTimeout(this.start, 4000)
			} else {
				return
			}
		},
		goLogin () {
			this.getData('post', 'api/login', this.login, {
				resolve: (res) => {
					this.$router.push('/home')
					document.cookie = 'login=' + true + ';max-age=7200;'
					this.hideModal()
				},
				reject: (res) => {
					this.$set(this, 'LOGINSTATE', true)
					setTimeout(() => {
						this.$set(this, 'LOGINSTATE', false)
					}, 500)
				}
			})
		},
		...mapMutations([
            'hideModal',
            'showModal'
        ])
	}
}
</script>

<style lang='less' scoped>
@import '../less/star-groups';

.make-stars-point();
/*/*访csshake动画*(密码错误抖动)/*/
.shake-horizontal{
    animation-name: shake-horizontal;
    animation-duration: 100ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-play-state: running;
}
input:-webkit-autofill {
	-webkit-box-shadow: 0 0 0px 1000px #fff inset;
}
@keyframes shake-horizontal
{
  2% {
    transform: translate(2px, 0) rotate(0); }
  4% {
    transform: translate(5px, 0) rotate(0); }
  6% {
    transform: translate(8px, 0) rotate(0); }
  8% {
    transform: translate(-4px, 0) rotate(0); }
  10% {
    transform: translate(2px, 0) rotate(0); }
  12% {
    transform: translate(-9px, 0) rotate(0); }
  14% {
    transform: translate(8px, 0) rotate(0); }
  16% {
    transform: translate(9px, 0) rotate(0); }
  18% {
    transform: translate(-8px, 0) rotate(0); }
  20% {
    transform: translate(-7px, 0) rotate(0); }
  22% {
    transform: translate(-7px, 0) rotate(0); }
  24% {
    transform: translate(-3px, 0) rotate(0); }
  26% {
    transform: translate(-4px, 0) rotate(0); }
  28% {
    transform: translate(7px, 0) rotate(0); }
  30% {
    transform: translate(6px, 0) rotate(0); }
  32% {
    transform: translate(2px, 0) rotate(0); }
  34% {
    transform: translate(-5px, 0) rotate(0); }
  36% {
    transform: translate(9px, 0) rotate(0); }
  38% {
    transform: translate(-8px, 0) rotate(0); }
  40% {
    transform: translate(-6px, 0) rotate(0); }
  42% {
    transform: translate(-6px, 0) rotate(0); }
  44% {
    transform: translate(-1px, 0) rotate(0); }
  46% {
    transform: translate(0px, 0) rotate(0); }
  48% {
    transform: translate(5px, 0) rotate(0); }
  50% {
    transform: translate(10px, 0) rotate(0); }
  52% {
    transform: translate(-9px, 0) rotate(0); }
  54% {
    transform: translate(-9px, 0) rotate(0); }
  56% {
    transform: translate(0px, 0) rotate(0); }
  58% {
    transform: translate(7px, 0) rotate(0); }
  60% {
    transform: translate(1px, 0) rotate(0); }
  62% {
    transform: translate(5px, 0) rotate(0); }
  64% {
    transform: translate(-8px, 0) rotate(0); }
  66% {
    transform: translate(0px, 0) rotate(0); }
  68% {
    transform: translate(2px, 0) rotate(0); }
  70% {
    transform: translate(-5px, 0) rotate(0); }
  72% {
    transform: translate(-2px, 0) rotate(0); }
  74% {
    transform: translate(9px, 0) rotate(0); }
  76% {
    transform: translate(5px, 0) rotate(0); }
  78% {
    transform: translate(-1px, 0) rotate(0); }
  80% {
    transform: translate(-3px, 0) rotate(0); }
  82% {
    transform: translate(-1px, 0) rotate(0); }
  84% {
    transform: translate(-8px, 0) rotate(0); }
  86% {
    transform: translate(-9px, 0) rotate(0); }
  88% {
    transform: translate(9px, 0) rotate(0); }
  90% {
    transform: translate(9px, 0) rotate(0); }
  92% {
    transform: translate(4px, 0) rotate(0); }
  94% {
    transform: translate(7px, 0) rotate(0); }
  96% {
    transform: translate(9px, 0) rotate(0); }
  98% {
    transform: translate(10px, 0) rotate(0);}
  0%, 100% {
    transform: translate(0, 0) rotate(0); } 
}
br + div{
	font-size: 17px;
}
.title-header{
	padding-top: 40px;
	padding-bottom: 5px;
	width: 100px;
	margin:0 auto;
	text-align: center;
	font-size: 24px;
	border-bottom:2px solid #027cd2;
}
.title-header + div{
	margin-top: 20px;
	font-size: 16px;
	padding-bottom: 40px;
}
.gray-border{
	color: #e6e6e6;
}
.index{
	font-family: 'Microsoft YaHei';
	.banner{
		height: 900px;
		min-width: 1246px;
		background: url('/static/topbanner.jpg') no-repeat center center;
		.banner-title{
			font-size: 50px;
			text-align: center;
			color: white;
			padding-top: 340px;
		}
		.btn{
			font-size: 18px;
			background-color: #0264a9;
			text-align: center;
			color: white;
		}
	}
	.content{
		height: 800px;
		width: 100%;
		background-color: white;
		padding:0 100px;
		.content-body{
			min-width: 1200px;
			margin:0 auto;
			height: 100%;
			padding: 0px 10%;
		}
		.logo{
			float: left;
			width: 50%;
			margin-top: 120px;
			i{
				font-size: 120px;
			}
			.description{
				width: 320px;
				margin-left: 20px;
				padding-top: 10px;
				div:nth-child(1) {
					font-size: 24px;
				}
				div:nth-child(2) {
					font-size: 18px;
				}
			}

		}
	}
	.mon{
		height: 500px;
		width: 100%;
		background-color: #fff;
		.contain{
			margin: 0 auto;
			width: 1200px;
			height: 100%;
			position: relative;
			.header{
				margin-top: 50px;
				font-size: 36px;
			}
			.content{
				height: 300px;
				padding: 0;
				.content-left{
					height: 100%;
					float: left;
					padding: 20px 20px;
					background-color: white;
					.content-des{
						border:2px solid #e6e6e6;
						padding:30px 10px;
						float: left;
						width: 285px;
						height: 240px;
						transition: all 0.5s ease-in-out;
						.title{
							margin-top: 15px;
							margin-bottom: 5px;
							text-align: center;
							color: #333;
						}
						.mon-content{
							color: #666;
						}
						&:hover{
							box-shadow: 0px 0px 30px rgba(2, 100, 169, 0.2);
						};
					}
					.content-des + .content-des{
						margin-left: 20px;
					}
				}
			}
		}
	}
	.slide{
		height: 600px;
		background: url('/static/footerbanner.png') no-repeat;
		.slide-contain{
			width: 1246px;
			margin:0 auto;
			color: white;
			font-size: 16px;
			.slide-body{
				width: 100%;
				margin-top: 20px;
				position: relative;
				.slide-rects{
					position: absolute;
					top: 0;
					left: 0;
					transition: all 0.4s ease-in-out;
					opacity: 0;
					&.on{
						opacity: 1;
					}
					.rect{
						float: left;
						background-color: orange;
						width: 209px;
						height: 78px;
						margin-bottom: 50px;
						margin-left: 50px;
					}
					.rect:nth-child(5n+1){
						margin-left: 0;
					}
				}
				.slide-dots{
					height: 5px;
					width: 200px;
					margin:0 auto;
					.slide-dot{
						margin-top: 400px;
						float: left;
						width: 60px;
						height: 5px;
						cursor: pointer;
						background-color: #bfbfbf;
						transition: all 0.4s ease-in-out;
						border-radius: 5px;
						&.slide-active{
							background-color: #027cd2;
						}
					}
					.slide-dot + .slide-dot{
						margin-left: 40px;
					}
				}
			}
		}
	}
}

</style>
