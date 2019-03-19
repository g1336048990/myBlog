<template>
		<section class="container">
		  <div class="content-wrap">
		    <div class="content">
		      <div class="title">
		        <h3>最新发布</h3>
		        <div class="more">
							<a v-for="(item,index) in category" :key="index">{{item.category}}</a>
						</div>
		      </div>
					
					
		      <article class="excerpt excerpt-1" v-for="(item,index) in dataList">
						<a class="focus" href="article.html" title="">
							<img class="thumb" data-original="../../static/images/excerpt.jpg" src="../../static/images/excerpt.jpg" alt="">
						</a>
		        <header>
							<a class="cat" href="program">{{item.category}}<i></i></a>
		          <h2>
								<router-link :to="{name: 'frontArticle', query:{_id: item._id}}">{{item.title}}</router-link>
							</h2>
		        </header>
		        <p class="meta">
		          <time class="time">
								<i class="glyphicon glyphicon-time"></i> {{detailTime[index]}}
							</time>
		          <span class="views">
								<i class="glyphicon glyphicon-eye-open"></i> 共120人围观
							</span> <a class="comment" href="article.html#comment">
							<i class="glyphicon glyphicon-comment"></i> 0个不明物体</a>
						</p>
		        <p class="note">{{item.describe}}</p>
		      </article>
					
					
					
		      <nav class="pagination" style="display: none;">
		        <ul>
		          <li class="prev-page"></li>
		          <li class="active"><span>1</span></li>
		          <li><a href="?page=2">2</a></li>
		          <li class="next-page"><a href="?page=2">下一页</a></li>
		          <li><span>共 2 页</span></li>
		        </ul>
		      </nav>
		    </div>
		  </div>
		  <aside class="sidebar">
		    <div class="fixed">
		      <div class="widget widget-tabs">
		        <ul class="nav nav-tabs" role="tablist">
		          <li role="presentation" class="active"><a href="#notice" aria-controls="notice" role="tab" data-toggle="tab">网站公告</a></li>
		          <li role="presentation"><a href="#centre" aria-controls="centre" role="tab" data-toggle="tab">管理中心</a></li>
		          <li role="presentation"><a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">联系站长</a></li>
		        </ul>
		        <div class="tab-content">
		          <div role="tabpanel" class="tab-pane notice active" id="notice">
		            <ul>
		              <li>
		                <time datetime="2016-01-04">01-04</time>
		                <a target="_blank" href="javascript:void(0);">欢迎访问郭羽的博客</a>
									</li>
		              <li>
		                <time datetime="2016-01-04">01-04</time>
		                <a target="_blank" href="javascript:void(0);">博主是学前端的，所以博客内容大多关于前端知识！</a>
									</li>
		              <li>
		                <time datetime="2016-01-04">01-04</time>
		                <a target="_blank" href="javascript:void(0);">在这个小工具中最多可以调用五条</a>
									</li>
		            </ul>
		          </div>
		          <div role="tabpanel" class="tab-pane centre" id="centre">
		            <h4>需要登录才能进入会员中心</h4>
		          </div>
		          <div role="tabpanel" class="tab-pane contact" id="contact">
		            <h2>Email:<br />
		              <a href="g1336048990@163.com" data-toggle="tooltip" data-placement="bottom" title="g1336048990@163.com">g1336048990@163.com</a></h2>
		          </div>
		        </div>
		      </div>
		    </div>
		    <div class="widget widget_sentence">
		      <h3>每日一句</h3>
		      <div class="widget-sentence-content">
		        <h4>{{nowDate}}</h4>
		        <p>Do not let what you cannot do interfere with what you can do.<br />
		          别让你不能做的事妨碍到你能做的事。（John Wooden）</p>
		      </div>
		    </div>
		    <div class="widget widget_hot">
		      <h3>热门文章</h3>
		      <ul>
		        <li v-for="(item,index) in dataList" :key="index">
							<a href="">
								<span class="thumbnail">
									<img class="thumb" data-original="../../static/images/excerpt.jpg" src="../../static/images/excerpt.jpg" alt="">
								</span>
								<span class="text">{{item.title}}</span>
								<span class="muted"><i class="glyphicon glyphicon-time"></i> {{detailTime[index]}} </span>
								<span class="muted"><i class="glyphicon glyphicon-eye-open"></i> 120</span></a>
						</li>	       
		      </ul>
		    </div>
		  </aside>
		</section>
</template>
<script>
	import time from '../../static/js/mytimer.js' 
	export default {
		data(){
			return{
				nowDate: '',
				category: [],
				indexPage: 0,
				dataList: [],
				detailTime:[],
			}
		},
		created(){
			this.getData();
			this.initLoad(this.indexPage);
			let date = new Date();
			let week = ["日", "一", "二", "三", "四", "五", "六"];
			this.nowDate = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日星期" + week[date.getDay()];
		},
		mounted() {
			
		},
		methods:{
			//初始化表格
			getData(){
				this.$ajax.get("/control/category")
				.then(res => {
					this.category = res.data;
				})
				.catch(err => {
					
				})
			},
			initLoad(indexPage){
				this.$ajax.get('/view/index')
				.then(res => {
						this.dataList = res.data;
						// var temp = [];
						var tempTime = [];
						for(var i = 0; i < this.dataList.length; i++){
								//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
								tempTime[i] = time(Number(this.dataList[i].createdTime));   
						}
						// this.column = temp;
						this.detailTime = tempTime;
						// this.getTotal('Article');
				})
				.catch(err => {
						console.log(err);
				})
			},
		},
		watch:{
			
		}
	}
</script>
<style scoped>
</style>