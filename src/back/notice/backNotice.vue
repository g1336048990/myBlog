<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
		<h1 class="page-header">操作</h1>
		<ol class="breadcrumb">
			<li><router-link :to="{ name: 'addNotice' }">增加公告</router-link></li>
		</ol>
		<h1 class="page-header">
			管理
			<span class="badge">{{ dataList.length }}</span>
			<input type="text" class="input_position" v-model="search_data" placeholder="请输入要查询的公告标题">
		</h1>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>
							<span class="glyphicon glyphicon-th-large"></span>
							<span class="">序号</span>
						</th>
						<th>
							<span class="glyphicon glyphicon-file"></span>
							<span class="">标题</span>
						</th>
						<th>
							<span class="glyphicon glyphicon-time"></span>
							<span class="">创建时间</span>
						</th>
						<th>
							<span class="glyphicon glyphicon-pencil"></span>
							<span class="">操作</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in dataList" :key="index">
						<td>{{ index + 1 }}</td>
						<td class="Notice-title">{{ item.content }}</td>
						<td>{{ detailTime[index] }}</td>
						<td>
							<router-link :to="{ name: 'updateNotice', query: { _id: item._id } }">修改</router-link>
							<a @click="deleteNotice(item._id)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<footer class="message_footer">
			<nav>
				<div class="block">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="1"
						:page-sizes="[10]"
						:page-size="10"
						layout="total, sizes, prev, pager, next, jumper"
						:total="dataList.length"
					></el-pagination>
				</div>
			</nav>
		</footer>
	</div>
</template>
<script>
import time from '../../static/js/mytimer.js';
export default {
	data() {
		return {
			detailTime: [],
			dataList: [],
			dataTotal: 0,
			indexPage: 0,
			search_data: ''
		};
	},
	inject: ['reload'],
	created() {
		this.initLoad(this.indexPage);
	},
	mounted() {},
	methods: {
		handleSizeChange(val) {},
		handleCurrentChange(val) {
			this.indexPage = val - 1;
			this.initLoad(this.indexPage);
		},
		//错误弹窗
		open(errmsg, errmsgTitle) {
			this.$alert(errmsg, errmsgTitle, {
				confirmButtonText: '确定',
				callback: action => {}
			});
		},
		initLoad(indexPage) {
			this.$ajax
				.get('/control/notice?indexPage=' + indexPage)
				.then(res => {
					this.dataList = res.data;
					var tempTime = [];
					for (var i = 0; i < this.dataList.length; i++) {
						//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
						tempTime[i] = time(Number(this.dataList[i].createdTime));
					}
					this.detailTime = tempTime;
					this.getTotal('Notice');
				})
				.catch(err => {
					console.log(err);
				});
		},
		getTotal(title) {
			this.$ajax
				.get('/control/getTotal?name=' + title)
				.then(res => {
					this.dataTotal = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		deleteNotice(id) {
			this.$ajax
				.get('/control/deleteNotice?_id=' + id)
				.then(res => {
					//删除成功后重新刷新页面加载数据
					this.reload();
					this.open(res.data.msg, res.data.msgTitle);
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	watch: {
		search_data(newValue, oldValue) {
			if(newValue != '') {
				this.request_api.request_search_data(newValue, 'notice', data => {
					this.dataList = data
					for (var i = 0; i < this.dataList.length; i++) {
						this.dataList[i].createdTime = time(Number(this.dataList[i].createdTime));
					}
				})
			}else {
				this.initLoad(0)
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
