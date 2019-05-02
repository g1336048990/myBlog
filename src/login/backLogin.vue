<template>
	<div class="testImage">
		<div class="siteIcon"><img src="../static/images/icon/icon.png" alt="" data-toggle="tooltip" data-placement="top" title="欢迎使用个人博客管理系统" draggable="false" /></div>
		<div autocomplete="off" class="form-signin">
			<h2 class="form-signin-heading">管理员登录</h2>
			<label for="userName" class="sr-only">用户名</label>
			<input type="text" class="form-control" placeholder="请输入用户名" required autofocus autocomplete="off" v-model="userInfo.userName" maxlength="10" />
			<label for="userPwd" class="sr-only">密码</label>
			<input type="password" class="form-control" placeholder="请输入密码" required autocomplete="off" v-model="userInfo.userPwd" maxlength="18" />
			<button class="btn btn-lg btn-primary btn-block" type="submit" id="signinSubmit" @click="login()">登录</button>
		</div>
		<div class="footer">
			<p><router-link :to="{ name: 'frontIndex' }" style="color: white;">返回首页 →</router-link></p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userInfo: {
				userName: '',
				userPwd: '',
				backImage: '../static/images/snow.jpg'
			}
		};
	},
	created() {},
	methods: {
		login() {
			this.$ajax
				.post('/login', this.userInfo)
				.then(res => {
					switch (res.data.code) {
						case '001':
							alert('用户名错误！！');
							break;
						case '002':
							alert('密码错误！！');
							break;
						default:
							setTimeout(this.successLogin(res.data), 2000);
					}
				})
				.catch(err => {
					alert(err);
				});
		},
		successLogin(data) {
			data.host = location.host;
			data.user_id = data._id;
			data.createdTime = this.timeStrmp(Date.now());
			delete data._id;
			localStorage.setItem('login', JSON.stringify(data));
			this.$ajax
				.post('/loginLog', data)
				.then(res => {
					this.$router.push({ name: 'backIndex' });
				})
				.catch(err => {
					alert(err);
				});
		}
	},
	watch: {}
};
</script>
<style lang="less" scoped>
@import '../static/backgroundStatic/css/style.css';
@import '../static/backgroundStatic/css/login.css';
.testImage {
	background-image: url('../static/images/snow.jpg');
	background-repeat: no-repeat;
	width: 100%;
	height: 100%;
}
</style>
