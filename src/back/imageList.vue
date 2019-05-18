<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
		<h1 class="page-header">
			管理<span class="badge">{{ dataTotal }}</span>
		</h1>
		<!-- <select v-model="selected">
			<option disabled value="" selected>请选择属性</option>
			<option v-for="cate in imageCategory" v-bind:key="cate.imageCategory">{{ cate.imageCategory }}</option>
		</select> -->
		<!-- <label for="search">搜索</label>
		<input id="search" type="text"> -->
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
							<span class="">预览</span>
						</th>
						<th>
							<span class="glyphicon glyphicon-file"></span>
							<span class="">名称</span>
						</th>
						<th>
							<span class="glyphicon glyphicon-list"></span>
							<span class="">栏目</span>
						</th>
						<th class="hidden-sm">
							<span class="glyphicon glyphicon-comment"></span>
							<span class="">上传时间</span>
						</th>
						<th>
							<span class="glyphicon glyphicon-time"></span>
							<span class="">上传者</span>
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
						<td><a :href="`http://localhost:8889/${item.filePath}/${item.imageName}`" target="_blank"><img class="show_pic" :src="`http://localhost:8889/${item.filePath}/${item.imageName}`" alt=""></a></td>
						<td class="article-title">{{ item.imageName }}</td>
						<td>{{ item.filePath }}</td>
						<td class="hidden-sm">{{item.createdTime}}</td>
						<td>{{ item.userName }}</td>
						<td>
							<!-- <router-link :to="{name: 'imagePlay', query: {imageName: item.imageName, filePath: item.filePath}}">查看</router-link> -->
							<a @click=" deleteimage(item._id, item.imageName, item.filePath)">删除</a>
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
						:total="dataTotal"
					></el-pagination>
				</div>
			</nav>
		</footer>
	</div>
</template>
<script>
import time from '../static/js/mytimer.js';
export default {
	data() {
		return {
			detailTime: [],
			dataList: [],
			dataTotal: 0,
			indexPage: 0,
			imageCategory: [],
			selected: ''
		};
	},
	inject: ['reload'],
	created() {
		
	},
	mounted() {
		this.initLoad(this.indexPage)
		this.getData()
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
				.get('/control_imageList?indexPage=' + indexPage)
				.then(res => {
					this.dataList = res.data
					for (var i = 0; i < this.dataList.length; i++) {
						//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
						this.dataList[i].createdTime = time(Number(this.dataList[i].createdTime));
					}
					this.getTotal('Image');
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
					this.$router.push({ name: 'error404' });
				});
		},
		 deleteimage(id, imageName, filePath) {
			this.$ajax
				.get('/control_deleteImage?_id=' + id + '&imageName=' + imageName + '&filePath=' + filePath)
				.then(res => {
					this.reload();
				})
				.catch(err => {
					this.$router.push({ name: 'error404' });
				});
		},
		getData() {
			this.$ajax
				.get('/control_imageCategory')
				.then(res => {
					this.imageCategory = res.data 
				})
				.catch(err => {}) 
		}
	},
	watch: {
		selected(newValue, oldValue) {
			// this.initLoad(0)
		}
	},
};
</script>
<style scoped>
	.show_pic {
		width: 60px;
		height: 30px;
	}
</style>
