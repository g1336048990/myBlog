<template>
	<div class="user-select">
		<header class="header">
		  <nav class="navbar navbar-default" id="navbar">
		    <div class="container">
		      <div class="header-topbar hidden-xs link-border">
		        <a data-toggle="modal" data-target="#myModal" class="login" rel="nofollow">Hi,请登录</a>&nbsp;&nbsp;
						<a data-toggle="modal" data-target="#myModal" class="login" rel="nofollow">我要注册</a>
					</div>
		      <div class="navbar-header">
		        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#header-navbar" aria-expanded="false"> <span class="sr-only"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
		        <h1 class="logo hvr-bounce-in"></h1>
		      </div>
		      <div class="collapse navbar-collapse" id="header-navbar">
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
		<!-- 登录模态框 -->
		<div class="container">
			<!-- 模态框 -->
			<div class="modal fade" id="myModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<!-- 模态框头部 -->
						<div class="modal-header">
							<h4 class="modal-title">消息提示</h4>
						</div>
						<!-- 模态框主体 -->
						<div class="modal-body">
							不好意思，现不开放登录注册功能！
						</div>
						<!-- 模态框底部 -->
						<div class="modal-footer">
							<!-- <button type="button" class="btn btn-secondary" data-dismiss="">保存</button> -->
							<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
						</div>
			 
					</div>
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
<style lang="less" scoped>
</style>