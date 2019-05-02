<template>

    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
        <h1 class="page-header">操作</h1>
        <ol class="breadcrumb">
          <li><a href="javascript: void(0)" @click="clearAll()">清除所有登录记录</a></li>
          <li><a href="javascript: void(0)" @click="clearMe()">清除本人登录记录</a></li>
        </ol>
        <h1 class="page-header">管理 <span class="badge">{{dataTotal}}</span></h1>
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th><span class="glyphicon glyphicon-th-large"></span> <span class="visible-lg">序号</span></th>
                <th><span class="glyphicon glyphicon-user"></span> <span class="visible-lg">用户</span></th>
                <th><span class="glyphicon glyphicon-time"></span> <span class="visible-lg">时间</span></th>
                <th><span class="glyphicon glyphicon-adjust"></span> <span class="visible-lg">IP</span></th>
                <th><span class="glyphicon glyphicon-remove"></span> <span class="visible-lg">删除</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataList" :key="index">
                <td>{{index+1}}</td>
                <td class="article-title">{{item.name}}</td>
                <td>{{item.createdTime}}</td>
                <td>{{item.host}}</td>
                <td><a herf="javascript: void(0);" @click="deleteOne(item._id)">删除</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <footer class="message_footer">
					<el-pagination @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
					</el-pagination>
        </footer>
    </div>
  
</template> 
<script>
  export default {
    data(){
      return{
				dataTotal:0,
				indexPage:0,
				dataList: []
      }
    },
		inject:['reload'],
    created(){
			this.initLoad(this.indexPage);
    },
		methods: {
			clearAll() {
				this.$ajax.get('/delete_loginLogs')
				.then(res => {
					this.reload()
				})
				.catch(err => {
					
				})
			},
			clearMe() {
				this.$ajax.get('/delete_loginLogsByIds?_id='+JSON.parse(localStorage.getItem('login')).user_id)
				.then(res => {
					this.reload();
				})
				.catch(err => {
					
				})
			},
			deleteOne(one) {
				this.$ajax.get('/delete_loginLogsById?_id='+one)
				.then(res => {
					this.reload();
				})
				.catch(err => {
					
				})
			},
			handleCurrentChange(val) {
				this.indexPage = val-1;
				this.initLoad(this.indexPage);
			},
			initLoad(indexPage){
				this.$ajax.get('/loginLog?indexPage='+indexPage)
				.then(res => {
					console.log(res.data)
					this.dataList = res.data;
					this.getTotal('LoginLog');
				})
				.catch(err => {
				})
			},
			getTotal(title){
			    this.$ajax.get('/control/getTotal?name='+title)
			    .then(res => {
						console.log(res.data)
			       this.dataTotal = res.data;
			    })
			    .catch(err => {
			        console.log(err);
			    })
			},
		}
  }
</script>
<style scoped>
</style>

