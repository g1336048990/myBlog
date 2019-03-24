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
								<time class="time" data-toggle="tooltip" data-placement="bottom" :title="'创建时间：' + createdTime">
									<i class="glyphicon glyphicon-time"></i>{{ createdTime }}
								</time>
							</span>
							<span class="item article-meta-source" data-toggle="tooltip" data-placement="bottom" title="来源：原文">
								<i class="glyphicon glyphicon-globe"></i>原文
							</span>
							<span class="item article-meta-category" data-toggle="tooltip" data-placement="bottom" title="标签">
								<i class="glyphicon glyphicon-list"></i>{{ dataList.category }}
							</span>
							<span class="item article-meta-views" data-toggle="tooltip" data-placement="bottom" title="查看：120">
								<i class="glyphicon glyphicon-eye-open"></i>共120人围观
							</span>
							<span class="item article-meta-comment" data-toggle="tooltip" data-placement="bottom" title="评论：0">
								<i class="glyphicon glyphicon-comment"></i>{{commentList.length}}个不明物体
							</span>
						</div>
					</header>
					<article class="article-content">
						 <p class="text-indent" v-for="(item, index) in content" :key="index">{{ item }}</p>
					</article>
					<div class="article-tags">
						标签：
						<a href="" rel="tag">{{ dataList.category }}</a>
					</div>
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
										<span class="emotion">
											<img src="../../static/images/face/5.png" width="20" height="20" alt="" /> 表情
										</span>
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
								<span class="comment-f">#1</span>
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
			<aside class="sidebar">
				<div class="fixed">
					<div class="widget widget-tabs">
						<ul class="nav nav-tabs" role="tablist">
							<li role="presentation" class="active">
								<a href="#notice" aria-controls="notice" role="tab" data-toggle="tab" > 网站公告 </a>
							</li>
							<li role="presentation">
								<a href="#centre" aria-controls="centre" role="tab" data-toggle="tab" > 管理中心 </a>
							</li>
							<li role="presentation">
								<a href="#contact" aria-controls="contact" role="tab" data-toggle="tab" > 联系站长 </a>
							</li>
						</ul>
						<div class="tab-content">
							<div role="tabpanel" class="tab-pane notice active" id="notice">
								<ul>
									<li>
										<time datetime="2016-01-04">01-04</time>
										<a target="_blank" href="javascript:void(0);"> 欢迎访问郭羽的博客 </a>
									</li>
									<li>
										<time datetime="2016-01-04">01-04</time>
										<a target="_blank" href="javascript:void(0);"> 博主是学前端的，所以博客内容大多关于前端知识！ </a>
									</li>
									<li>
										<time datetime="2016-01-04">01-04</time>
										<a target="_blank" href="javascript:void(0);"> 在这个小工具中最多可以调用五条 </a>
									</li>
								</ul>
							</div>
							<div role="tabpanel" class="tab-pane centre" id="centre">
								<h4>需要登录才能进入会员中心</h4>
							</div>
							<div role="tabpanel" class="tab-pane contact" id="contact">
								<h2>
									Email:
									<br />
									<a href="g1336048990@163.com"
										data-toggle="tooltip"
										data-placement="bottom"
										title="g1336048990@163.com"
									>
										g1336048990@163.com
									</a>
								</h2>
							</div>
						</div>
					</div>
				</div>
				<div class="widget widget_sentence">
					<h3>每日一句</h3>
					<div class="widget-sentence-content">
						<h4>{{ nowDate }}</h4>
						<p>
							Do not let what you cannot do interfere with what you can do.
							<br />
							别让你不能做的事妨碍到你能做的事。（John Wooden）
						</p>
					</div>
				</div>
				<div class="widget widget_hot">
					<h3>热门文章</h3>
					<ul>
						<li v-for="(item, index) in dataList" :key="index">
							<a href="">
								<span class="thumbnail">
									<img
										class="thumb"
										data-original="../../static/images/excerpt.jpg"
										src="../../static/images/excerpt.jpg"
										alt=""
									/>
								</span>
								<span class="text">{{ item.title }}</span>
								<span class="muted">
									<i class="glyphicon glyphicon-time"></i>
									{{ detailTime[index] }}
								</span>
								<span class="muted">
									<i class="glyphicon glyphicon-eye-open"></i>
									120
								</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</section>
	</div>
</template>
<script>
import time from '../../static/js/mytimer.js';
export default {
	data() {
		return {
			createdTime: '',
			dataList: {},
			category: [],
			detailTime: [],
			nowDate: '',
			content: '',
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
	created() {
		this.getinfo();
		this.getData();
		
		// this.initLoad(this.indexPage);
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
	computed: {
	},
	methods: {
		handleSizeChange(val){
		},
		handleCurrentChange(val){
			this.commentLists = this.commentList.slice((val - 1)*10, val*10);
		    // this.initLoad(this.indexPage);
		},
		//初始化表格
		getData() {
			this.$ajax
				.get('/control/category')
				.then(res => {
					this.category = res.data;
				})
				.catch(err => {});
		},
		initLoad(indexPage) {
			this.$ajax
				.get('/view/index')
				.then(res => {
					this.dataList = res.data;
					// var temp = [];
					var tempTime = [];
					for (var i = 0; i < this.dataList.length; i++) {
						//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
						tempTime[i] = time(Number(this.dataList[i].createdTime));
					}
					// this.column = temp;
					this.detailTime = tempTime;
					// this.getTotal('Article');
				})
				.catch(err => {
					console.log(err);
				});
		},
		getinfo() {
			//获取url上的信息
			const id = this.$route.query;
			this.$ajax
				.get('/view/article?_id=' + id._id)
				.then(res => {
					this.dataList = res.data;
					this.commentOne.articleid = res.data._id;
					this.commentOne.comment.comment = '';
					this.content = res.data.content.split('<br />');
					this.createdTime = time(Number(this.dataList.createdTime));
					this.getComment();
					// this.getData();
				})
				.catch(err => {
					console.log(err);
				});
		},
		postComment() {
			if(this.commentOne.comment === ""){
				return false;
			}
			let date = new Date();
			this.commentOne.comment.createTime = date.getFullYear() +'-'+ (date.getMonth() + 1) +'-'+ date.getDate();
			this.$ajax.post('/view/comment', this.commentOne)
			.then( res => {
				console.log(res)
			})
			.catch( err => {
				console.log(err)
			})
		},
		getComment() {
			this.$ajax.get('/view/comment?articleid='+this.commentOne.articleid)
			.then( res => {
				this.commentList = res.data.comment;
				this.commentLists = this.commentList.slice(0, 10);
			})
			.catch( err => {
				console.log(err)
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
