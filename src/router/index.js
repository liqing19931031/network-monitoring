import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Doc from '@/components/Doc'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: __dirname,
	routes: [
	    {
		    path: '/',
		    name: 'Hello',
		    component: Hello
	    },
	    {
	    	path: '/doc',
	    	name: 'doc',
	    	component: Doc
	    }
	]
})
