<template>
	<div class="user-select single">
		<section class="container">
			<div class="content-wrap">
				<div class="content">
					<header class="article-header">
						<h1 class="article-title">
							<a href="article.html">{{ dataList.title }}</a>
						</h1>
						<div class="article-meta">
							<span class="item article-meta-time">
								<time class="time" data-toggle="tooltip" data-placement="bottom" :title="'创建时间：' + dataList.createdTime">
									<i class="glyphicon glyphicon-time"></i>{{ dataList.createdTime }}
								</time>
							</span>
							<span class="item article-meta-source" data-toggle="tooltip" data-placement="bottom" title="来源：原文">
								<i class="glyphicon glyphicon-globe"></i>原文
							</span>
							<span class="item article-meta-category" data-toggle="tooltip" data-placement="bottom" title="标签">
								<i class="glyphicon glyphicon-list"></i>{{ dataList.category }}
							</span>
							<span class="item article-meta-views" data-toggle="tooltip" data-placement="bottom" :title="'查看：' + dataList.count">
								<i class="glyphicon glyphicon-eye-open"></i>{{dataList.count}}次点击
							</span>
							<span class="item article-meta-comment" data-toggle="tooltip" data-placement="bottom" :title="'评论：' + dataList.comment">
								<i class="glyphicon glyphicon-comment"></i>{{dataList.comment}}个不明物体
							</span>
						</div>
					</header>
					<article class="article-content">
						 <p class="text-indent" v-for="(item, index) in content" :key="index">{{ item }}</p>
					</article>
					<!-- <div class="article-tags">
						标签：
						<a href="" rel="tag">{{ dataList.category }}</a>
					</div> -->
					<div class="relates">
						<div class="title"><h3>相关推荐</h3></div>
						<ul>
							<!-- <li v-for="(item, index) in "><a href="article.html">{{php如何判断一个日期的格式是否正确}}</a></li> -->
						</ul>
					</div>
					<div class="title" id="comment"><h3>评论</h3></div>
					<!-- <div id="respond">
		        <div class="comment-signarea">
		          <h3 class="text-muted">评论前必须登录！</h3>
		          <p> <a href="javascript:;" class="btn btn-primary login" rel="nofollow">立即登录</a> &nbsp; <a href="javascript:;" class="btn btn-default register" rel="nofollow">注册</a> </p>
		          <h3 class="text-muted">当前文章禁止评论</h3>
		        </div>
		      </div> -->
					<div id="respond">
						<form action="" method="post" id="comment-form">
							<div class="comment">
								<div class="comment-title">
									<img class="avatar" src="../../static/images/icon/icon.png" alt="" />
								</div>
								<div class="comment-box">
									<textarea placeholder="您的评论可以一针见血" name="comment" id="comment-textarea" cols="100%" rows="3" tabindex="1" v-model="commentOne.comment.comment"></textarea>
									<div class="comment-ctrl">
										<div class="comment-prompt">
											<i class="fa fa-spin fa-circle-o-notch"></i>
											<span class="comment-prompt-text"></span>
										</div>
										<input type="hidden" value="1" class="articleid" />
										<input type="button" name="comment-submit" id="comment-submit" tabindex="5" articleid="1"  @click="postComment()" value="评论" />
									</div>
								</div>
							</div>
						</form>
					</div>
					<div id="postcomments">
						<ol class="commentlist">
							<li class="comment-content" v-for="(item, index) in commentLists" :key="index">
								<div class="comment-avatar">
									<img class="avatar" src="../../static/images/icon/icon.png" alt="" />
								</div>
								<div class="comment-main">
									<p>
										来自
										<span class="address">{{item.name}}</span>
										的用户
										<span class="time">({{item.createTime}})</span>
										<br />
										{{item.comment}}
									</p>
								</div>
							</li>
						</ol>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="commentList.length">
						</el-pagination>
					</div>
				</div>
			</div>
			<aside-vue></aside-vue>
		</section>
	</div>
</template>
<script>
	import time from '../../static/js/mytimer.js';
	import AsideVue from '../common/asideVue.vue'
export default {
	data() {
		return {
			dataList: {},
			category: [],
			content: [],
			recordCount: {},
			commentOne: {
				articleid: '',
				comment: {
					name: location.host,
					createTime: '',
					comment: '',
				},
			},
			commentList: [],
			commentLists: []
		};
	},
	inject:['reload'],
	components: {
		asideVue:AsideVue
	},
	beforeRouteEnter(to, from, next) {
		document.documentElement.scrollTop = 0
		next()
	},
	created() {
		this.getinfo();
		this.getData();
		let date = new Date();
		let week = ['日', '一', '二', '三', '四', '五', '六'];
		this.nowDate =
			date.getFullYear() +
			'年' +
			(date.getMonth() + 1) +
			'月' +
			date.getDate() +
			'日星期' +
			week[date.getDay()];
	},
	mounted() {
	},
	computed: {
	},
	methods: {
		handleSizeChange(val){
		},
		handleCurrentChange(val){
			this.commentLists = this.commentList.slice((val - 1)*10, val*10);
		},
		//初始化表格
		getData() {
			this.$ajax.get('/control/category')
				.then(res => {
					this.category = res.data;
				})
				.catch(err => {});
		},
		getinfo() {
			const id = this.$route.query;
			this.$ajax.get('/view/article?_id=' + id._id)
				.then(res => {
					this.dataList = res.data;
					this.commentOne.articleid = res.data._id;
					this.commentOne.comment.comment = '';
					this.content = res.data.content.split('<br />');
					this.dataList.createdTime = time(Number(this.dataList.createdTime));
					this.getComment();
				})
				.catch(err => {
					console.log(err);
				});
		},
		postComment() {
			if(this.commentOne.comment.comment === ""){
				return false;
			}
			console.log(this.commentOne)
			this.commentOne.comment.createTime = Date.now();
			this.$ajax.post('/view/comment', this.commentOne)
			.then( res => {
				this.postArticleCount(this.commentOne.articleid, this.commentList.length)
				this.reload()
			})
			.catch( err => {
				console.log(err)
			})
		},
		getComment() {
			this.$ajax.get('/view/comment?articleid='+this.commentOne.articleid)
			.then( res => {
				if('comment' in res.data) {
					this.commentList = res.data.comment.reverse();
					this.commentLists = this.commentList.slice(0, 10);
				}
			})
			.catch( err => {
				console.log(err)
			})
		},
		postArticleCount(_id, count) {
			this.recordCount.comment = (count+1);
			this.$ajax.post('/view_clickArticle?_id='+_id, this.recordCount)
			.then(res => {
			})
			.catch(err => {
			})
		}
	}
};
</script>
<style scoped>
.text-indent {
	text-indent: 20px;
}
</style>
