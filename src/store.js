import Vue from 'vue'
//vuex全局状态管理器
import Vuex from 'vuex'
Vue.use(Vuex)
//vuex配置
const store = new Vuex.Store({
	state:{
		msg:'',
		onedata:{}
	},
})

export default store