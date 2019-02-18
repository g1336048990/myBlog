import Vue from 'vue';
// 引入路由
import VueRouter from 'vue-router';
// 挂载路由
Vue.use(VueRouter);

//登录页面
import Login from './login/login.vue';

// 自定义组件引入(前台)
//父视图
import Views from './front/views.vue';
// 内容开始
import FrontArticle from './front/article/frontArticle.vue';
import FrontFrontCategory from './front/category/frontFrontCategory.vue';
import FrontBackCategory from './front/category/frontBackCategory.vue';
import FrontError404 from './front/error404/error404.vue';
import FrontIndex from './front/index/frontIndex.vue';
import FrontLinks from './front/links/frontLinks.vue';
import FrontPersonalLife from './front/personalLife/frontPersonalLife.vue';
import FrontReaders from './front/readers/frontReaders.vue';
import FrontResourses from './front/resourses/frontResourses.vue';
import FrontTags from './front/tags/frontTags.vue';

// 内容结束

//自定义组件引入（后台）
//父视图
import Control from './back/control.vue';
// 内容开始
import AddArticle from './back/article/addArticle.vue';
import BackArticle from './back/article/backArticle.vue';
import UpdateArticle from './back/article/updateArticle.vue';
import AddCategory from './back/category/addCategory.vue';
import BackCategory from './back/category/backCategory.vue';
import UpdateCategory from './back/category/updateCategory.vue';
import Comment from './back/common/comment.vue';
import AddFlink from './back/flink/addFlink.vue';
import BackFlink from './back/flink/backFlink.vue';
import UpdateFlink from './back/flink/updateFlink.vue';
import BackIndex from './back/index/backIndex.vue';
import BackLogin from './back/login/backLogin.vue';
import BackLoginLog from './back/login/backLoginLog.vue';
import ManageUser from './back/manage/manageUser.vue';
import AddNotice from './back/notice/addNotice.vue';
import BackNotice from './back/notice/backNotice.vue';
import UpdateNotice from './back/notice/UpdateNotice.vue';
import ReadSet from './back/readSet/readSet.vue';
import Setting from './back/setting/setting.vue';
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
        {path: '/login', redirect: { name: 'login' }},
		//登录路由
		{name: 'login', path:'login', component: Login},
		//前台视图
		{name: 'views', path: '/views', component: Views, children:[
				{name: 'frontIndex', path: 'index', component: FrontIndex},
				{name: 'frontArticle', path: 'article', component: FrontArticle},
				{name: 'frontFrontCategory', path: 'frontCategory', component: FrontFrontCategory},
				{name: 'frontBackCategory', path: 'backCategory', component: FrontBackCategory},
				{name: 'frontLinks', path: 'links', component: FrontLinks},
				{name: 'frontPersonalLife', path: 'personalLife', component: FrontPersonalLife},
				{name: 'frontReaders', path: 'readers', component: FrontReaders},
				{name: 'frontResourses', path: 'resourses', component: FrontResourses},
				{name: 'frontTags', path: 'tags', component: FrontTags},
				{name: 'frontError404', path: 'error404', component: FrontError404},
				//路径不匹配时配置404页面,必须放在路由最后
				{path: '*', redirect: { name: 'frontError404' }}
			]},
		//后台视图
		{name: 'control', path: '/control', component: Control, children:[
				{name: 'addArticle', path: 'addArticle', component: AddArticle},
				{name: 'backArticle', path: 'article', component: BackArticle},
				{name: 'updateArticle', path: 'updateArticle', component: UpdateArticle},
				{name: 'addCategory', path: 'addCategory', component: AddCategory},
				{name: 'backCategory', path: 'Category', component: BackCategory},
				{name: 'updateCategory', path: 'updateCategory', component: UpdateCategory},
				{name: 'comment', path: 'comment', component: Comment},
				{name: 'addFlink', path: 'addFlink', component: AddFlink},
				{name: 'backFlink', path: 'flink', component: BackFlink},
				{name: 'updateFlink', path: 'updateFlink', component: UpdateFlink},
				{name: 'backIndex', path: 'index', component: BackIndex},
				{name: 'backLogin', path: 'login', component: BackLogin},
				{name: 'backLoginLog', path: 'loginLog', component: BackLoginLog},
				{name: 'manageUser', path: 'manageUser', component: ManageUser},
				{name: 'addNotice', path: 'addNotice', component: AddNotice},
				{name: 'backNotice', path: 'notice', component: BackNotice},
				{name: 'updateNotice', path: 'updateNotice', component: UpdateNotice},
				{name: 'readSet', path: 'readSet', component: ReadSet},
				{name: 'setting', path: 'setting', component: Setting},
				{path: '*', redirect: { name: 'frontError404' }}
			]},
		{path: '*', redirect: {name: 'frontError404' }}
	],

})

export default router