import Vue from 'vue'
import Router from 'vue-router'
// 首页
import home from '@/components/home/home'
// 监控系统
import monitoring from '@/components/monitoring/monitoring'
import mongird from '@/components/monitoring/grid'
// 监控详情
import sitemon from '@/components/overview/sitemon'
import runstate from '@/components/overview/runstate'
import mondetail from '@/components/overview/mondetail'
import snapshot from '@/components/overview/snapshot'
// 用户中心
import user from '@/components/user/user'
import inform from '@/components/user/grid'
import editpass from '@/components/user/editpassword'
import monitor from '@/components/user/monitor'
import agreement from '@/components/user/agreement'
// 告警系统
import alarm from '@/components/alarm/alarm'
import Doc from '@/components/Doc'
// 前端页面
// import index from '@/components/index'
import index from '@/components/newindex'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: __dirname,
	routes: [
	    {
		    path: '/',
		    redirect: '/index'
	    },
	    {
	    	path: '/index',
	    	name: 'index',
	    	component: index
	    },
	    {
	    	path: '/home',
	    	name: 'home',
		    component: home
	    },
	    {
	    	path: '/monitoring',
	    	component: monitoring,
	    	children: [
	    		{
	    			path: '',
	    			redirect: 'all'
	    		},
	    		{
	    			path: 'all',
	    			name: 'all',
	    			component: mongird
	    		},
	    		{
	    			path: 'http',
	    			name: 'http',
	    			component: mongird
	    		},
	    		{
	    			path: 'dns',
	    			name: 'dns',
	    			component: mongird
	    		},
	    		{
	    			path: 'ping',
	    			name: 'ping',
	    			component: mongird
	    		},
	    		{
	    			path: 'proof',
	    			name: 'proof',
	    			component: mongird
	    		}
	    	]
	    },
	    {
	    	path: '/miondetail',
	    	component: mondetail,
	    	children: [
	    		{
	    			path: '',
	    			redirect: 'overview'
	    		},
	    		{
	    			path: 'overview',
	    			name: 'overview',
	    			component: sitemon
	    		},
	    		{
	    			path: 'runstate',
	    			name: 'runstate',
	    			component: runstate
	    		},
	    		{
	    			path: 'snapshot',
	    			name: 'snapshot',
	    			component: snapshot
	    		}
	    	]
	    },
	    {
	    	path: '/alarm',
	    	name: 'alarm',
	    	component: alarm
	    },
	    {
	    	path: '/user',
	    	component: user,
	    	children: [
	    		{
	    			path: '/',
	    			redirect: 'inform'
	    		},
	    		{
	    			path: 'inform',
	    			name: 'inform',
	    			component: inform
	    		},
	    		{
	    			path: 'editpass',
	    			name: 'editpass',
	    			component: editpass
	    		},
	    		{
	    			path: 'monitor',
	    			name: 'monitor',
	    			component: monitor
	    		},
	    		{
	    			path: 'agreement',
	    			name: 'agreement',
	    			component: agreement
	    		}
	    	]
	    },
	    {
	    	path: '/doc',
	    	name: 'doc',
	    	component: Doc
	    }
	]
})
