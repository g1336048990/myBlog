<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
		<h1 class="page-header">
			管理<span class="badge">{{ dataTotal }}</span>
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
						<td class="article-title">{{ item.videoName }}</td>
						<td>{{ item.filePath }}</td>
						<td class="hidden-sm">{{item.createdTime}}</td>
						<td>{{ item.userName }}</td>
						<td>
							<router-link :to="{name: 'videoPlay', query: {videoName: item.videoName, filePath: item.filePath}}">播放</router-link>
							<a @click=" deleteVideo(item._id, item.videoName, item.filePath)">删除</a>
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
			indexPage: 0
		};
	},
	inject: ['reload'],
	mounted() {
		this.initLoad(this.indexPage);
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
				.get('/control_videoList?indexPage=' + indexPage)
				.then(res => {
					this.dataList = res.data
					for (var i = 0; i < this.dataList.length; i++) {
						//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
						this.dataList[i].createdTime = time(Number(this.dataList[i].createdTime));
					}
					this.getTotal('Video');
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
		 deleteVideo(id, videoName, filePath) {
			this.$ajax
				.get('/control_deleteVideo?_id=' + id + '&videoName=' + videoName + '&filePath=' + filePath)
				.then(res => {
					this.reload();
				})
				.catch(err => {
					this.$router.push({ name: 'error404' });
				});
		}
	}
};
</script>
<style scoped></style>
