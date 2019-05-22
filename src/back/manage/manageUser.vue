<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
			<h1 class="page-header">操作</h1>
			<ol class="breadcrumb">
				<li><a data-toggle="modal" data-target="#addUser">增加用户</a></li>
			</ol>
			<h1 class="page-header">
				管理
				<span class="badge">{{ userInfos.length }}</span>
				<input type="text" class="input_position" v-model="search_data" placeholder="请输入要查询的用户名">
			</h1>
			<div class="table-responsive">
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th>
								<span class="glyphicon glyphicon-th-large"></span>
								<span class="visible-lg">序号</span>
							</th>
							<th>
								<span class="glyphicon glyphicon-user"></span>
								<span class="visible-lg">用户ID</span>
							</th>
							<th>
								<span class="glyphicon glyphicon-bookmark"></span>
								<span class="visible-lg">用户名</span>
							</th>
							<th>
								<span class="glyphicon glyphicon-phone-alt"></span>
								<span class="visible-lg">电话</span>
							</th>
							<th>
								<span class="glyphicon glyphicon-asterisk"></span>
								<span class="visible-lg">密码</span>
							</th>
							<th>
								<span class="glyphicon glyphicon-time"></span>
								<span class="visible-lg">创建时间</span>
							</th>
							<th>
								<span class="glyphicon glyphicon-pencil"></span>
								<span class="visible-lg">操作</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in userInfos" :key="index">
							<td>{{ index + 1 }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.userName }}</td>
							<td>{{ item.telephone }}</td>
							<td>{{ item.passPwd }}</td>
							<td>{{ item.createdTime }}</td>
							<td>
								<!-- <a data-toggle="modal" data-target="#seeUserInfo" @click="editUser(item)">修改</a> -->
								<a @click="deleteUser(item._id)">删除</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 个人信息修改模态框 -->
		<div class="modal fade" id="seeUserInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div>
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title">个人信息</h4>
						</div>
						<div class="modal-body">
							<table class="table" style="margin-bottom:0px;">
								<thead><tr></tr></thead>
								<tbody>
									<tr>
										<td wdith="20%">姓名:</td>
										<td width="80%"><input type="text" class="form-control" v-model="onedate.name" required /></td>
									</tr>
									<tr>
										<td wdith="20%">用户名:</td>
										<td width="80%"><input type="text" class="form-control" v-model="onedate.userName" required /></td>
									</tr>
									<tr>
										<td wdith="20%">电话:</td>
										<td width="80%"><input type="number" class="form-control" v-model="onedate.telephone" required /></td>
									</tr>
									<tr>
										<td wdith="20%">密码:</td>
										<td width="80%"><input type="password" class="form-control" v-model="onedate.passPwd" required /></td>
									</tr>
									<tr>
										<td wdith="20%">确认密码:</td>
										<td width="80%"><input type="password" class="form-control" v-model="onedate.truePassWord" required /></td>
									</tr>
								</tbody>
								<tfoot><tr></tr></tfoot>
							</table>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" @click="submitEdit()">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import time from '../../static/js/mytimer.js';
export default {
	data() {
		return {
			userInfos: [],
			indexPage: 0,
			dataTotal: 0,
			search_data: '',
			onedate: {
				name: '',
				userName: '',
				telephone: 0,
				passPwd: '',
				truePassWord: ''
			}
		};
	},
	created() {
		this.userInfo();
	},
	inject: ['reload'],
	methods: {
		userInfo() {
			this.$ajax
				.get('/control_userInfo?indexPage=' + this.indexPage)
				.then(res => {
					this.userInfos = res.data;
					this.getTotal('User');
				})
				.catch(err => {
					console.log(err);
				});
		},
		handleCurrentChange(val) {
			this.indexPage = val - 1;
			this.userInfo(this.indexPage);
		},
		editUser(data) {
			this.onedate = data;
		},
		getTotal(title) {
			this.$ajax
				.get('/control/getTotal?name=' + title)
				.then(res => {
					console.log(res.data);
					this.dataTotal = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		submitEdit() {
			if (this.onedate.passPwd != this.onedate.truePassWord) {
				alert('密码不一致');
				return false;
			}
			this.$ajax
				.post('/control_editUser', this.onedate)
				.then(res => {
					this.$router.go(0);
				})
				.catch(err => {
					alert('信息修改失败');
				});
		},
		deleteUser(_id) {
			this.$ajax
				.get('/control_deleteUser?_id=' + _id)
				.then(res => {
					this.reload();
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	computed: {},
	watch: {
		search_data(newValue, oldValue) {
			if (newValue != '') {
				this.request_api.request_search_data(newValue, 'user', data => {
					this.userInfos = data
				})
			} else {
				this.userInfo(0);
			}
		}
	},
};
</script>
<style scoped>
.input_position {
	font-size: 10px;
	width: 200px;
	height: 30px;
	top: -5px;
	position: relative;
}
</style>
