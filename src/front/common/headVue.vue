<template>
	<div class="user-select">
		<header class="header">
		  <nav class="navbar navbar-default" id="navbar">
		    <div class="container">
		      <div class="header-topbar hidden-xs link-border">
		        <ul class="site-nav topmenu">
		          <li><router-link :to="{ name: 'frontTags' }">标签云</router-link></li>
		          <li><router-link :to="{ name: 'frontReaders' }">读者墙</router-link></li>
		          <li><router-link :to="{ name: 'frontLinks' }">友情链接</router-link></li>
		          <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" rel="nofollow">关注本站<span class="caret"></span></a>
		            <ul class="dropdown-menu header-topbar-dropdown-menu">
		              <li><a data-toggle="modal" data-target="#WeChat" rel="nofollow"><i class="fa fa-weixin"></i> 微信</a></li>
		              <li><a href="#" rel="nofollow"><i class="fa fa-weibo"></i> 微博</a></li>
		              <li><a data-toggle="modal" data-target="#areDeveloping" rel="nofollow"><i class="fa fa-rss"></i> RSS</a></li>
		            </ul>
		          </li>
		        </ul>
		        <a data-toggle="modal" data-target="#loginModal" class="login" rel="nofollow">Hi,请登录</a>&nbsp;&nbsp;<a href="javascript:;" class="register" rel="nofollow">我要注册</a>&nbsp;&nbsp;<a href="" rel="nofollow">找回密码</a> </div>
		      <div class="navbar-header">
		        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#header-navbar" aria-expanded="false"> <span class="sr-only"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
		        <h1 class="logo hvr-bounce-in"><a href="" title=""><img src="../../static/images/logo.png" alt=""></a></h1>
		      </div>
		      <div class="collapse navbar-collapse" id="header-navbar">
		        <ul class="nav navbar-nav navbar-right">
		          <li class="hidden-index active"><router-link :to="{ name: 'frontIndex' }">首页</router-link></li>
		          <li><router-link :to="{ name: 'frontFrontCategory'}">前端技术</router-link></li>
		          <li><router-link :to="{ name: 'frontBackCategory'}">后端技术</router-link></li>
		          <li><router-link :to="{ name: 'control'}">管理系统</router-link></li>
		          <li><router-link :to="{ name: 'frontResourses'}">授人以渔</router-link></li>
		          <li><router-link :to="{ name: 'frontPersonalLife'}">程序人生</router-link></li>
		        </ul>
		        <form class="navbar-form visible-xs" action="/Search" method="post">
		          <div class="input-group">
		            <input type="text" name="keyword" class="form-control" placeholder="请输入关键字" maxlength="20" autocomplete="off">
		            <span class="input-group-btn">
		            <button class="btn btn-default btn-search" name="search" type="submit">搜索</button>
		            </span> </div>
		        </form>
		      </div>
		    </div>
		  </nav>
		</header>
		<!--微信二维码模态框-->
		<div class="modal fade user-select" id="WeChat" tabindex="-1" role="dialog" aria-labelledby="WeChatModalLabel">
		  <div class="modal-dialog" role="document" style="margin-top:120px;width:470px;">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="WeChatModalLabel" style="cursor:default;">微信扫一扫</h4>
		      </div>
		      <div class="modal-body" style="text-align:center"> <img src="../../static/images/weixin.jpg" alt="" style="cursor:pointer"/> </div>
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

				dataInfor:this.$route.path,
			}
		},
		created(){
		},
		methods:{
            change(){
                this.$router.push({name:'frontIndex'})
                }
            }
	}
</script>
<style scoped>
/* @import "../../static/frontStatic/css/style.css"; */
</style>