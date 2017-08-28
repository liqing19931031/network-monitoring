<template>
	<div class="index">
		<div class="banner">
			<div class="earth">
			</div>
			<div class="saturn" :style='{top: this.saturnTop + "px"}'>
			</div>
			<div class="jupiter" :style='{top: this.jupiterTop + "px"}'>
			</div>
			<div class="star1" :style='{right: this.star1.left, top: this.star1.starTop + "px", opacity: this.star1.starOp}' :class='this.HAVECLASS === 1 ? "guodu" : ""'>
			</div>
			<div class="star2" :style='{right: this.star2.left, top: this.star2.starTop + "px", opacity: this.star2.starOp}' :class='this.HAVECLASS === 1 ? "guodu" : ""'>
			</div>
			<div class="gologin text-center" @click='this.showModal'>
				<div class="top-left-rect rect"></div>
				<div class="top-right-rect rect"></div>
				<div class="bottom-left-rect rect"></div>
				<div class="bottom-right-rect rect"></div>
					进入监控后台
			</div>
		</div>
		<div class="content">
			<div class="content-body">
				<div class="logo clearfix">
					<i class="glyphicon glyphicon-renzheng pull-left" style="color: #8cfb64"></i>
					<div class="pull-left description">
						<div>一次认证，全年监控。</div>
						<div>对接“诚信网站”认证系统，365天全年无间断网站监控，打造网站安全体系。</div>
					</div>
				</div>
				<div class="logo clearfix">
					<i class="glyphicon glyphicon-tixing pull-left" style="color: #468af7"></i>
					<div class="pull-left description">
						<div>智能机器，安全提醒。</div>
						<div>“盘石云信”系统第一时间将不安全信息通过手机短信和邮件进行通知。</div>
					</div>
				</div>
				<div class="logo clearfix">
					<i class="glyphicon glyphicon-kuaijie pull-left" style="color: #fc7b1a"></i>
					<div class="pull-left description">
						<div>全面快捷，拒绝篡改。</div>
						<div>利用云计算技术快速安全监控，防止网站篡改，保障网站安全。</div>
					</div>
				</div>
				<div class="logo clearfix">
					<i class="glyphicon glyphicon-pachong pull-left" style="color: #efc004"></i>
					<div class="pull-left description">
						<div>算法强大，精准爬虫</div>
						<div>对接“诚信网站”认证系统，365天全年无间断网站监控，打造网站安全体系。</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mon">
			<div class="contain">
				<div class="header">
					网站监控
				</div>
				<div class="content">
					<div class="content-left">
						<div class="content-des">
							<div class="title">
								HTTP监控：
							</div>
							<br>
							<div class="mon-content">
								用户自定义HTTP监控项目
								来模拟用户请求访问被监控站点，
								实时获取站点的响应状态和请求详情，
								精准的探测出网站的各种异常
							</div>
						</div>
						<div class="content-des">
							<div class="title">
								PING监控：
							</div>
							<br>
							<div class="mon-content">
								用户自定义PING监控项目
								来模拟用户请求访问被监控站点，
								可实时掌握站点/服务器的连通状态，
								丢包率、RTT响应时间。
							</div>
						</div>
						<div class="content-des">
							<div class="title">
								DNS监控：
							</div>
							<br>
							<div class="mon-content">
								用户自定义DNS监控项目
								来模拟用户请求访问被监控站点，
								及时发现网站的区域解析异常以及DNS劫持，
								提升网站安全性。
							</div>
						</div>
						<div class="content-des">
							<div class="title">
								网站篡改监控：
							</div>
							<br>
							<div class="mon-content">
								用户指定网站进行网站防篡改监控，
								通过强大的数据抓取技术及数据分析能力，
								及时将篡改信息通知用户。
							</div>
						</div>
					</div>
					<div class="content-right">
						<div class="computer">
							<canvas id="canvas" width="200" height="200">
								当前浏览器不支持canvas，请更换浏览器使用！
							</canvas>
							<canvas id="point" width='200' height="200"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="slide">
			<div class="slide-contain">
				<div class="slide-header clearfix">
					<div class="slide-header--left">
						合作伙伴
					</div>
					<div class="slide-header--right">
						cooperative partner
					</div>
				</div>
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
		<modal :title='"登陆"' :class='LOGINSTATE ? "shake-horizontal" : ""'>
			<div slot='body'>
				<form class="form-horizontal">
					<div class="form-group">
				        <label class="col-xs-3 control-label">账号</label>
				        <div class="col-xs-8">
				          <input type="text" class="form-control" placeholder="账号" v-model='login.username'>
				        </div>
				      </div>
				      <div class="form-group">
				        <label class="col-xs-3 control-label">密码</label>
				        <div class="col-xs-8">
				          <input type="password" class="form-control" placeholder="密码" v-model='login.password'>
				        </div>
				      </div>
				</form>
			</div>
			<div slot='button'>
	    		<button class="btn btn-primary" @click='goLogin'>登 录</button>
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
			login: {
				username: '',
				password: ''
			},
			LOGINSTATE: false,
			// 土星坐标
			jupiterTop: 500,
			// 木星坐标
			saturnTop: 615,
			// 星星1坐标
			star1: {
				left: '20%',
				starOp: 1,
				starTop: 1
			},
			star2: {
				left: '40%',
				starOp: 1,
				starTop: 1
			},
			HAVECLASS: 1,
			nowIndex: 0
		}
	},
	components: {
		modal
	},
	mounted () {
		// 绘制canvas
		let canvas = document.getElementById('canvas')
		let point = document.getElementById('point')
		if (canvas.getContext) {
			let ctx = canvas.getContext('2d')
			ctx.strokeStyle = 'white'
			ctx.shadowBlur = 10
			ctx.shadowColor = 'white'
			ctx.lineWidth = 2
			ctx.translate(100, 100)
			ctx.moveTo(90, 0)
			ctx.arc(0, 0, 90, 0, 2 * Math.PI, false)
			ctx.moveTo(49, 0)
			ctx.arc(0, 0, 45, 0, 2 * Math.PI, false)
			ctx.moveTo(90, 0)
			ctx.lineTo(-90, 0)
			ctx.moveTo(0, 90)
			ctx.lineTo(0, -90)
			ctx.stroke()
		}
		if (point.getContext) {
			let pointctx = point.getContext('2d')
			let angle = 0
			let count = 360
			pointctx.translate(100, 100)
			pointctx.shadowBlur = 10
			pointctx.shadowColor = 'white'
			pointctx.lineWidth = 2
			pointctx.strokeStyle = 'white'
			pointctx.fillStyle = 'white'
			setInterval(() => {
				pointctx.clearRect(-100, -100, 200, 200)
				this.drawPoint(pointctx, Math.PI * (angle / count) * 2)
				angle = (angle + 1) % count
			}, 20)
		}
		this.start()
		this.startScroll({
			left: '20%',
			starOp: 1,
			starTop: 1
		}, {
			left: '70%',
			starOp: 0,
			starTop: 600
		}, 'star1')
		this.startScroll({
			left: '40%',
			starOp: 1,
			starTop: 1
		}, {
			left: '60%',
			starOp: 0,
			starTop: 600
		}, 'star2')
		// this.startScroll('40%', '80%', 'start2')
		this.startScroll(500, 580, 'jupiterTop')
		this.startScroll(535, 615, 'saturnTop')
	},
	methods: {
		changeIndex (index) {
			this.$set(this, 'nowIndex', index)
		},
		// 绘制点
		drawPoint (ctx, angle) {
			angle = angle || 0
			ctx.save()
			ctx.rotate(angle)
			ctx.beginPath()
			ctx.arc(0, 45, 7, 0, Math.PI * 2, false)
			ctx.fill()
			ctx.restore()
		},
		// canvas 动画
		startScroll (start, end, name) {
			if (this.nowIndex > -1) {
				if (name === 'star1' || name === 'star2') {
					if (this[name].starOp === 0) {
						this.$set(this, 'HAVECLASS', 0)
						this.$set(this[name], 'starOp', start.starOp)
						this.$set(this[name], 'left', start.left)
						this.$set(this[name], 'starTop', start.starTop)
					} else {
						this.$set(this, 'HAVECLASS', 1)
						this.$set(this[name], 'starOp', end.starOp)
						this.$set(this[name], 'left', end.left)
						this.$set(this[name], 'starTop', end.starTop)
					}
				} else {
					let starts = this[name] > start ? start : end
					this.$set(this, name, starts)
				}
				setTimeout(() => {
					this.startScroll(start, end, name)
				}, 4000)
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
				reslove: (res) => {
					console.log(res)
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
/*访csshake动画*/
.shake-horizontal{
    animation-name: shake-horizontal;
    animation-duration: 100ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-play-state: running;
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
.index{
	font-family: 'Microsoft YaHei';
	font-family:'Source-Han-Ligh9e0feb1ab18584';
	.banner{
		height: 900px;
		min-width: 1246px;
		background: url('/static/banner.jpg') no-repeat center center;
		.earth{
			display: inline;
			position: absolute;
			width: 145px;
			height: 101px;
			top: 615px;
			left: 50%;
			transform: translate( -50%, -50%);
			background: url('/static/earth.gif') no-repeat;
		}
		.saturn{
			width: 231px;
			height: 151px;
			display: inline;
			position: absolute;
			left: 80%;
			transition: all 4s ease-in-out;
			transform: translate( -50%, -50%);
			background: url('/static/saturn.png') no-repeat;
		}
		.star1{
			display: inline;
			position: absolute;
			width: 13px;
			height: 13px;
			transform: translate( -50%, -50%);
			background: url('/static/star1.png') no-repeat;
		}
		.guodu{
			transition: all 4s ease-in-out;
		}
		.star2{
			display: inline;
			position: absolute;
			transform: translate( -50%, -50%);
			width: 25px;
			height: 25px;
			background: url('/static/star2.png') no-repeat;
		}
		.jupiter{
			display: inline;
			position: absolute;
			left: 20%;
			transform: translate( -50%, -50%);
			width: 174px;
			height: 173px;
			transition: all 4s ease-in-out;
			background: url('/static/jupiter.png') no-repeat;
		}
		.gologin{
			top: 20px;
			width: 110px;
			height: 40px;
			line-height: 40px;
			position: absolute;
			right: 200px;
			color: white;
			cursor: pointer;
			border-color: white;
			.rect{
				width: 12px;
				height: 12px;
			}
			.top-left-rect{
				position: absolute;
				left: 0;
				top: 0;
				border-left: 1px solid;
				border-top: 1px solid;
			}
			.top-right-rect{
				position: absolute;
				right: 0;
				top: 0;
				border-right: 1px solid;
				border-top: 1px solid;
			}
			.bottom-left-rect{
				position: absolute;
				left: 0;
				bottom: 0;
				border-left: 1px solid;
				border-bottom: 1px solid;
			}
			.bottom-right-rect{
				position: absolute;
				right: 0;
				bottom: 0;
				border-right: 1px solid;
				border-bottom: 1px solid;
			}
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
			padding: 100px 10%;
			padding-top: 0;
		}
		.logo{
			padding-left: 70px;
			float: left;
			width: 50%;
			margin-top: 150px;
			i{
				font-size: 120px;
			}
			.description{
				width: 60%;
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
		height: 800px;
		width: 100%;
		background-color: #f2faf5;
		.contain{
			margin: 0 auto;
			width: 1200px;
			height: 100%;
			.header{
				margin-top: 50px;
				font-size: 36px;
			}
			.content{
				height: 500px;
				background-color: #f2faf5;
				margin-top: 100px;
				padding: 0;
				.content-left{
					width: 680px;
					height: 100%;
					float: left;
					padding: 80px 20px;
					background-color: white;
					.content-des{
						float: left;
						width: 320px;
						height: 200px;
						.mon-content{
							padding:0 30px 0 0;
						}
					}
				}
				.content-right{
					height: 100%;
					width: 500px;
					margin-left: 20px;
					float: left;
					background-color: #c6fcb3;
					position: relative;
					box-shadow: 60px 60px 1px #e5fedc;
					.computer{
						position: absolute;
						bottom: 10px;
						width: 376px;
						height: 250px;
						right: -8px;
						background: url('/static/computer.png') no-repeat;
						display: block;
						canvas{
							position: absolute;
							right: 55px;
							top: 22px;
						}
					}
				}
			}
		}
	}
	.slide{
		height: 600px;
		background-color: #fbfbf9;
		.slide-contain{
			width: 1246px;
			margin:0 auto;
			.slide-header{
				.slide-header--left{
					float: left;
					background-color: #ff4400;
					font-size: 36px;
					color: white;
					width: 200px;
					text-align: center;
				}
				.slide-header--right{
					float: left;
					height: 51px;
					text-align: center;
					font-size: 16px;
					line-height: 45px;
					border-bottom: 3px solid #ff4400;
					width: 180px;
				}
			}
			.slide-body{
				width: 100%;
				margin-top: 50px;
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
						width: 80px;
						height: 5px;
						cursor: pointer;
						background-color: #bfbfbf;
						transition: all 0.4s ease-in-out;
						&.slide-active{
							background-color: #313131;
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
