// 引入第三方包
import Vue from 'vue';
import 'jquery'
// 引入自己的文件
import App from './app.vue';
import router from './router.js';

//框架样式引入
import "./static/css/bootstrap.min.css";
import "./static/css/font-awesome.min.css";

//框架js引入
import "./static/js/bootstrap.min.js";

//ueditor文件引入
import "./static/lib/ueditor/ueditor.config.js";
import "./static/lib/ueditor/ueditor.all.min.js";
import "./static/lib/ueditor/lang/zh-cn/zh-cn.js";
import "./static/lib/ueditor/themes/default/css/ueditor.min.css";

//Axios:引入axios
import Axios from 'axios';
// Axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=UTF-8';
//Axios:初始化配置
Axios.defaults.baseURL = 'http://localhost:8889/';
// Axios.defaults.timeout = 2000;
//Axios:挂载原型,全局定义
Vue.prototype.$ajax = Axios;


//引入全部的element-ui的控件，后期打包会单独引入所需样式
import ElementUI from 'element-ui';//引入element-ui样式以及js会自动到node_modules里去找
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/index.js';

import Iview from 'iview';
import 'iview/dist/styles/iview.css';
//挂载element-ui
Vue.use(ElementUI);
Vue.use(Iview);
/**
 * vuex
 */
import Vuex from 'vuex'
import store from './store.js'
Vue.use(Vuex)

/**
 * videoplayer 视频播放器
 */
import VideoPlayer from 'vue-video-player'
// import 'videojs-contrib-hls';
Vue.use(VideoPlayer)
/**
 * 引入视频样式文件
 */
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
// import 'videojs-contrib-hls/dist/videojs-contrib-hls'



// 引入自定义样式
// 引入自定义js
import getTime from './static/js/mytimer'
Vue.prototype.timeStrmp = getTime

/**
 * 引入公用api接口
 */
import request_api from './api/request'
Vue.prototype.request_api = request_api


router.beforeEach((to, from, next) => {
	if(/control/.test(to.path)) {
		if('login' in localStorage) {
			next()
		}else {
			next({name: 'login'})
		}
	}else {
		next()
	}
})


new Vue({
	el:'#app',
	router,
	store,
	render:c => c(App)
})