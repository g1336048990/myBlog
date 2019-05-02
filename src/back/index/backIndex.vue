<template>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
      <h1 class="page-header">信息总览</h1>
      <div class="row placeholders">
        <div class="col-xs-6 col-sm-3 placeholder">
          <h4>文章</h4>
          <span class="text-muted">{{articleCount}} 条</span> </div>
        <div class="col-xs-6 col-sm-3 placeholder">
          <h4>评论</h4>
          <span class="text-muted">{{commentCount}} 条</span> </div>
        <div class="col-xs-6 col-sm-3 placeholder">
          <h4>栏目</h4>
          <span class="text-muted">{{categoryCount}} 条</span> </div>
        <div class="col-xs-6 col-sm-3 placeholder">
          <h4>公告</h4>
          <span class="text-muted">{{noticeCount}} 条</span> </div>
      </div>
      <h1 class="page-header">状态</h1>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <td>登录者: <span>{{loginlog.userName}}</span></td>
            </tr>
            <tr>
              <td>上次登录时间: {{loginlog.createdTime}}</td>
            </tr>
						<tr>
						  <td>上次登录IP:{{loginlog.host}}</td>
						</tr>
          </tbody>
        </table>
      </div>
      <!-- <h1 class="page-header">系统信息</h1> -->
    </div>
</template>
<script>
  export default {
    data() {
      return {
				articleCount: 0,
				commentCount: 0,
				categoryCount: 0,
				noticeCount:0,
				loginlog: ''
      }
    },
		created() {
			this.getLoginLog()
			this.getTotal('Article');
			this.getTotal('Comment');
			this.getTotal('Category');
			this.getTotal('Notice');
		},
		mounted() {
		},
		methods: {
			getLoginLog() {
				this.loginlog = JSON.parse(localStorage.getItem('login'))
			},
			getTotal(title){
				this.$ajax.get('/control/getTotal?name='+title)
				.then(res => {
					switch(title){
						case 'Article':
							this.articleCount = res.data;
							break;
						case 'Comment':
							this.commentCount = res.data;
							break;
						case 'Category':
							this.categoryCount = res.data;
							break;
						case 'Notice':
							this.noticeCount = res.data;
							break;
					}
				})
				.catch(err => {
				})
			},
		},
  }
</script>
<style scoped>
</style>
