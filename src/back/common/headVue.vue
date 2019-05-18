<template>
	<div>
	  <header>
			<nav class="navbar navbar-default navbar-fixed-top">
				<div class="container-fluid">
					<div class="navbar-header">
						<span class="show_header">个人博客后台管理系统</span>
					</div>
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav navbar-right">
							<li class="dropdown">
							<a data-toggle="modal" data-target="#changePic"><img class="head_icon" :src="imageUrl" title="用户"/> {{loginlog.name}}</a>
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
		<div class="modal fade" id="changePic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div>
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		          <h4 class="modal-title" >更换头像</h4>
		        </div>
		        <div class="modal-body">
		          <table class="table" style="margin-bottom:0px;">
		            <thead>
		              <tr> </tr>
		            </thead>
		            <tbody>
		              <tr>
		                <td>
											<el-upload
												class="avatar-uploader"
												:action="action"
												:show-file-list="false"
												:auto-upload="true"
												:on-change="handleChange"
												:on-success="handleAvatarSuccess"
												:before-upload="beforeAvatarUpload">
												<img v-if="imageUrl" :src="imageUrl" class="avatar">
												<i v-else class="el-icon-plus avatar-uploader-icon"></i>
											</el-upload>
										</td>
		              </tr>
		            </tbody>
		            <tfoot>
		              <tr></tr>
		            </tfoot>
		          </table>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		          <!-- <button type="button" class="btn btn-primary" @click="submitChange()">提交</button> -->
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				loginlog: '',
				imageUrl: '',
				action: 'http://localhost:8889/upload_pic?selected=head_pic&_id='+JSON.parse(localStorage.getItem('login')).user_id,
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
				this.imageUrl = 'http://localhost:8889/' + this.loginlog.filePath +'/'+ this.loginlog.imageName
			},
			submitChange() {
				
			},
			handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
				this.loginlog.filePath = res.filePath
				this.loginlog.imageName = res.imageName
				localStorage.setItem('login', JSON.stringify(this.loginlog))
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
			handleChange(file, fileList) {
			}
		},
		computed: {
			loginImage() {
				
				return this.imageUrl
			}
		},
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
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
	.avatar-uploader {
		margin-left: 6%;
	}
	.modal-content {
		width: 250px;
		left: 30%;
	}
</style>