import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 挂载路由
Vue.use(VueRouter)

//登录页面
import Login from './login/backLogin.vue'

// 自定义组件引入(前台)
//父视图
import Views from './front/views.vue'
// 内容开始
import FrontArticle from './front/article/frontArticle.vue'
import FrontVideo from './front/frontVideo.vue'
import FrontImage from './front/frontImage.vue'
import FrontError from './front/error/error.vue'
import FrontIndex from './front/index/frontIndex.vue'

// 内容结束
//自定义组件引入（后台）
//父视图
import Control from './back/control.vue'
// 内容开始
import AddArticle from './back/article/addArticle.vue'
import BackArticle from './back/article/backArticle.vue'
import UpdateArticle from './back/article/updateArticle.vue'
import BackCategory from './back/category/backCategory.vue'
import ImageCategory from './back/category/imageCategory.vue'
import Comment from './back/common/comment.vue'
import Comments from './back/common/comments.vue'
import BackIndex from './back/index/backIndex.vue'

import BackLoginLog from './back/login/backLoginLog.vue'
import ManageUser from './back/manage/manageUser.vue'
import AddNotice from './back/notice/addNotice.vue'
import BackNotice from './back/notice/backNotice.vue'
import UpdateNotice from './back/notice/UpdateNotice.vue'
import ReadSet from './back/readSet/readSet.vue'
import Setting from './back/setting/setting.vue'
import VideoPlay from './back/videoPlay.vue'
import VideoUpload from './back/videoUpload.vue'
import ImageUpload from './back/imageUpload.vue'
import VideoList from './back/videoList.vue'
import ImageList from './back/imageList.vue'
import UserImage from './back/userImage.vue'
import LoginImage from './back/loginImage.vue'
// 内容结束





let router = new VueRouter({
	// 设置router-link
	linkActiveClass: 'u-link--Active', 
	//干掉地址栏里边的#号键,存在问题，下次版本更新解决
	// mode: "history",
	// 配置路由规则
	routes: [
	    //通用匹配实现页面跳转，重定向自动补全路径
		{path: '/', redirect: { name: 'frontIndex' }},
		{path: '/views', redirect: { name: 'frontIndex' }},
		{path: '/control', redirect: { name: 'backIndex' }},
		//登录路由
		{name: 'login', path:'/login', component: Login},
		//前台视图
		{name: 'views', path: '/views', component: Views, children:[
			{name: 'frontIndex', path: 'index', component: FrontIndex},
			{name: 'frontArticle', path: 'article', component: FrontArticle},
			{name: 'frontImage', path: 'frontImage', component: FrontImage},
			{name: 'frontVideo', path: 'frontVideo', component: FrontVideo}
		]},
		//后台视图
		{name: 'control', path: '/control', component: Control, children:[
			{name: 'addArticle', path: 'addArticle', component: AddArticle},
			{name: 'backArticle', path: 'article', component: BackArticle},
			{name: 'updateArticle', path: 'updateArticle', component: UpdateArticle},
			{name: 'backCategory', path: 'Category', component: BackCategory},
			{name: 'imageCategory', path: 'imageCategory', component: ImageCategory},
			{name: 'comment', path: 'comment', component: Comment},
			{name: 'comments', path: 'comments', component: Comments},
			{name: 'backIndex', path: 'index', component: BackIndex},
			{name: 'backLoginLog', path: 'loginLog', component: BackLoginLog},
			{name: 'manageUser', path: 'manageUser', component: ManageUser},
			{name: 'addNotice', path: 'addNotice', component: AddNotice},
			{name: 'backNotice', path: 'notice', component: BackNotice},
			{name: 'updateNotice', path: 'updateNotice', component: UpdateNotice},
			{name: 'readSet', path: 'readSet', component: ReadSet},
			{name: 'setting', path: 'setting', component: Setting},
			{name: 'videoPlay', path: 'videoPlay', component: VideoPlay},
			{name: 'videoUpload', path: 'videoUpload', component: VideoUpload},
			{name: 'imageUpload', path: 'imageUpload', component: ImageUpload},
			{name: 'videoList', path: 'videoList', component: VideoList},
			{name: 'imageList', path: 'imageList', component: ImageList},
			{name: 'userImage', path: 'userImage', component: UserImage},
			{name: 'loginImage', path: 'loginImage', component: LoginImage},
		]},
		{name: 'error', path: '*', component: FrontError}
	],

})

export default router