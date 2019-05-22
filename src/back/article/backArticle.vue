<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
		<h1 class="page-header">操作</h1>
		<ol class="breadcrumb">
			<li><router-link :to="{ name: 'addArticle' }">增加文章</router-link></li>
		</ol>
		<h1 class="page-header">
			管理
			<span class="badge">{{ dataList.length }}</span>
			<!-- <select class="select_position" v-model="selected">
				<option style="font-size: 10px;" disabled value="" selected>请选择属性</option>
				<option style="font-size: 10px;" v-for="cate in category" v-bind:key="cate.category">{{ cate.category }}</option>
			</select> -->
			<input type="text" class="input_position" v-model="search_data" placeholder="请输入要查询的文章标题">
			<!-- <button class="button_position">搜索</button> -->
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
							<span class="glyphicon glyphicon-list"></span>
							<span class="">栏目</span>
						</th>
						<th class="hidden-sm">
							<span class="glyphicon glyphicon-comment"></span>
							<span class="">评论条数</span>
						</th>
						<th class="hidden-sm">
							<span class="glyphicon glyphicon-comment"></span>
							<span class="">点击次数</span>
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
						<td class="article-title">{{ item.title }}</td>
						<td>{{ item.category }}</td>
						<td class="hidden-sm">{{item.comment}}</td>
						<td class="hidden-sm">{{item.count}}</td>
						<td>{{ detailTime[index] }}</td>
						<td>
							<router-link :to="{ name: 'updateArticle', query: { _id: item._id } }">修改</router-link>
							<a @click="deleteArticle(item._id)">删除</a>
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
			category: [],
			selected: '',
			search_data: ''
		};
	},
	inject: ['reload'],
	mounted() {
		this.initLoad(this.indexPage)
		// this.request_api.request_article_category(data => {
		// 	this.category = data
		// })
	},
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
				.get('/control/article?indexPage=' + indexPage)
				.then(res => {
					this.dataList = res.data;
					var temp = [];
					var tempTime = [];
					for (var i = 0; i < this.dataList.length; i++) {
						tempTime[i] = time(Number(this.dataList[i].createdTime));
					}
					this.detailTime = tempTime;
					this.getTotal('Article');
				})
				.catch(err => {
					this.$router.push({ name: 'error404' });
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
		deleteArticle(id) {
			this.$ajax
				.get('/control/deleteArticle?_id=' + id)
				.then(res => {
					this.reload();
					this.open(res.data.msg, res.data.msgTitle);
				})
				.catch(err => {
					console.log(err);
				});
		},
		getData() {
			this.$ajax
				.get('/control/category')
				.then(res => {
					this.category = res.data 
				})
				.catch(err => {}) 
		},
		submit_serach() {
			
		}
	},
	watch: {
		search_data(newValue, oldValue) {
			if(newValue != '') {
				this.request_api.request_search_data(newValue, 'article', data => {
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
	.button_position {
		font-size: 10px;
    width: 50px;
    height: 30px;
    top: -6px;
    position: relative;
	}
	.select_position {
		height: 30px;
    position: relative;
    top: -5px;
		font-size: 10px;
	}
</style>
