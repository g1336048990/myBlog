<template>
	  <header>
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <span class="show_header">个人博客后台管理系统</span>
						</div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
								<a><img class="head_icon" src="../../static/images/icon/icon.png" title="用户"/> {{loginlog.name}}</a>
                  <!-- <ul class="dropdown-menu dropdown-menu-left">
                    <li><a title="查看或修改个人信息" data-toggle="modal" data-target="#seeUserInfo">个人信息</a></li>
                    <li><a title="查看您的登录记录" data-toggle="modal" data-target="#seeUserLoginlog">登录记录</a></li>
                  </ul> -->
                </li>
                <li><a @click="loginOut()">退出登录</a> </li>
                <li><a data-toggle="modal" data-target="#WeChat">帮助</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
</template>

<script>
	export default {
		data(){
			return{
				loginlog: '',
			}
		},
		created() {
			this.getLoginLog()
		},
		methods:{
			loginOut(){
				let loginOut = confirm('是否确认退出？');
				if(loginOut){
					localStorage.clear();
					this.$router.replace({name: 'login'});
				}
			},
			getLoginLog() {
				this.loginlog = JSON.parse(localStorage.getItem('login'))
			}
		}
	}
</script>
<style lang="less">
  .show_header {
		font-size: 30px;
		margin-left: 10px;
	}
	.head_icon {
		margin-top: -5px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
	}
</style>