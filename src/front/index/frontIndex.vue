<template>
		<section class="container">
				<div class="content-wrap">
						<div class="content">
						<div class="title">
								<h3 @click="getNewArticle()">最新发布</h3>
								<div class="more">
										<span class="category" v-for="(item,index) in category" :key="index" @click="showCategory(item.category, indexPage)">
											{{item.category}}
										</span>
								</div>
						</div>
		      <article class="excerpt excerpt-1" v-for="(item,index) in dataList" :key="index">
		        <header>
							<a class="cat" href="javascript: void(0);">{{item.category}}<i></i></a>
		          <h2 @click="postArticleCount(item._id, item.count)">
								<router-link :to="{name: 'frontArticle', query:{_id: item._id}}">{{item.title}}</router-link>
							</h2>
		        </header>
		        <p class="meta">
		          <time class="time">
								<i class="glyphicon glyphicon-time"></i> {{item.createdTime}}
							</time>
		          <span class="views">
								<i class="glyphicon glyphicon-eye-open"></i> {{item.count}}次点击
							</span> <a class="comment" href="javascript: void(0);">
							<i class="glyphicon glyphicon-comment"></i> {{item.comment}}条评论</a>
						</p>
		      </article>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totals">
					</el-pagination>
		    </div>
		  </div>
		  <aside-vue></aside-vue>
		</section>
</template>
<script>
	import time from '../../static/js/mytimer'
	import AsideVue from '../common/asideVue.vue'
	export default {
		data(){
			return{
				category: [],
				indexPage: 0,
				totals: 0,
				categoryName: '',
				dataList: [],
				recordCount: {}
			}
		},
		components: {
			asideVue:AsideVue
		},
		created(){
			
		},
		mounted() {
			this.getData();
			this.initLoad(this.indexPage);
		},
		methods:{
			//初始化表格
			handleSizeChange(val){
			},
			handleCurrentChange(val){
				this.indexPage = val - 1;
				if(this.categoryName == '') {
					this.initLoad(this.indexPage);
				}else {
					this.showNextCategory(this.categoryName, this.indexPage);
				}
			},
			getData(){
				this.$ajax.get("/control/category")
				.then(res => {
					this.category = res.data;
				})
				.catch(err => {
				})
			},
			getTotal(title, category){
			    this.$ajax.get('/control/getTotal?name='+title+'&category='+category)
			    .then(res => {
			      this.totals = res.data;
			    })
			    .catch(err => {
			    })
			},
			showCategory(data) {
				this.categoryName = data;
				this.indexPage = 0;
				this.$ajax.get('/view/index?type='+data+'&indexPage=0')
				.then(res => {
					this.dataList = res.data;
					for(var i = 0; i < this.dataList.length; i++){
							//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
							this.dataList[i].createdTime = time(Number(this.dataList[i].createdTime));   
					}
					this.getTotal('Article', this.categoryName);
				})
				.catch(err => {
					alert(err);
				})
			},
			showNextCategory(data, indexPage) {
				this.$ajax.get('/view/index?type='+data+'&indexPage='+this.indexPage)
				.then(res => {
					this.dataList = res.data;
					for(var i = 0; i < this.dataList.length; i++){
							//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
							this.dataList[i].createdTime = time(Number(this.dataList[i].createdTime));   
					}
				})
				.catch(err => {
					alert(err);
				})
			},
			initLoad(indexPage){
				this.$ajax.get('/view/index?indexPage='+indexPage)
				.then(res => {
					this.dataList = res.data;
					for(var i = 0; i < this.dataList.length; i++){
							this.dataList[i].createdTime = time(Number(this.dataList[i].createdTime));   
					}
					this.getTotal('Article', 1);
				})
				.catch(err => {
				})
			},
			getNewArticle() {
				this.categoryName = '';
				this.initLoad(0);
			},
			postArticleCount(_id, count) {
				this.recordCount.count = (count+1);
				this.$ajax.post('/view_clickArticle?_id='+_id, this.recordCount)
				.then(res => {
				})
				.catch(err => {
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.category {
		margin-right: 10px;
    cursor: pointer;
	}
</style>