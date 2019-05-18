<template>
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
	            <li v-for="(item,index) in dataList" :key="index">
	              <time datetime="2016-01-04">{{item.createdTime}}</time>
	              <a target="_blank" href="javascript:void(0);">{{index+1}}. {{item.content}}</a>
							</li>
	          </ul>
	        </div>
	        <div role="tabpanel" class="tab-pane centre" id="centre">
	          <h4><button @click="loginTest()">登陆后台</button></h4>
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
	      <li v-for="(item,index) in tenArticle" :key="index">
					<router-link :to="{name: 'frontArticle', query: {_id: item._id}}" target="_blank">
						<span class="text" @click="postArticleCount(item._id, item.count)">{{item.title}}</span>
						<span class="muted"><i class="glyphicon glyphicon-time"></i> {{item.createdTime}} </span>
						<span class="muted"><i class="glyphicon glyphicon-eye-open"></i> {{item.count}}</span>
						<span class="muted"><i class="glyphicon glyphicon-comment"></i> {{item.comment}}</span>
					</router-link>
				</li>	       
	    </ul>
	  </div>
	</aside>
</template>

<script>
	export default {
		data() {
			return {
				nowDate: '',
				dataList: [],
				tenArticle: [],
				recordCount: {}
			}
		},
		mounted() {
			this.getNotice();
			this.getArticle();
			let date = new Date();
			let week = ["日", "一", "二", "三", "四", "五", "六"];
			this.nowDate = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日星期" + week[date.getDay()];
		},
		methods: {
			getNotice() {
				this.$ajax.get('/control_getFiveNotice')
				.then(res => {
					this.dataList = res.data;
					for(var i = 0; i < this.dataList.length; i++){
							//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
							this.dataList[i].createdTime = this.timeStrmp(Number(this.dataList[i].createdTime));   
					}
				})
				.catch(err => {
					console.log(err);
				})
			},
			getArticle() {
				this.$ajax.get('/control_getTenArticle')
				.then(res => {
					console.log(res.data)
					this.tenArticle = res.data;
					for(var i = 0; i < this.tenArticle.length; i++){
							//时间戳是整形的数据，而我们接收到的数据是在一个字符串，所以我们要转换一下数据类型
							this.tenArticle[i].createdTime = this.timeStrmp(Number(this.tenArticle[i].createdTime));   
					}
				})
				.catch(err => {
					console.log(err);
				})
			},
			postArticleCount(_id, count) {
				this.recordCount.count = (count+1);
				this.$ajax.post('/view_clickArticle?_id='+_id, this.recordCount)
				.then(res => {
				})
				.catch(err => {
				})
			},
			loginTest() {
				if('login' in localStorage) {
					this.$router.push({name:'backIndex'})
				}else {
					this.$router.push({name:'login'})
				}
			}
		},
		watch: {
			$router (newValue, oldValue) {
				console.log(newValue)
			}
		},
	}
</script>

<style>
</style>
