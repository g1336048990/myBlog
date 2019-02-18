import Vue from 'vue'
//vuex全局状态管理器
import Vuex from 'vuex'
Vue.use(Vuex)
//vuex配置
const store = new Vuex.Store({
	state:{
		msg:'',
		//图片上传地址配置，以后优化，现在能力有限很多东西弄不了
		action:'http://localhost:8889/change'
	}
})

export default store