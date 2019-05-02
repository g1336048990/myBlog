<template>
   <div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
        <h1 class="page-header">管理评论具体信息 <span class="badge">{{dataList.length}}</span></h1>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th><span class="glyphicon glyphicon-th-large"></span> <span class="">序号</span></th>
                        <th><span class="glyphicon glyphicon-file"></span> <span class="">游客地址</span></th>
                        <th><span class="glyphicon glyphicon-time"></span> <span class="">评论</span></th>
												<th><span class="glyphicon glyphicon-time"></span> <span class="">创建时间</span></th>
                        <th><span class="glyphicon glyphicon-pencil"></span> <span class="">操作</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in commentList" :key="index">
                        <td>{{index+1}}</td>
                        <td class="Notice-title">{{item.name}}</td>
                        <td>{{item.comment}}</td>
						<td>{{item.createdTime}}</td>
                        <td><a @click="delete_commentById(item)">删除</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer class="message_footer">
            <nav>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="dataList.length">
                    </el-pagination>
                </div>
            </nav>
        </footer>
    </div>
</template> 
<script>
    import time from '../../static/js/mytimer.js' 
    export default {
        data(){
					return{
						dataList:[],
						commentList: [],
						articleId: '',
						recordCount: {}
					}
        },
        inject:['reload'],
        created(){
            this.initLoad();
        },
        mounted(){
        },
        methods:{
					handleSizeChange(val){
					},
					handleCurrentChange(val){
						 this.commentList = this.dataList.slice((val - 1)*10, val*10);
					},
					//错误弹窗
					open(errmsg,errmsgTitle){
							this.$alert(errmsg, errmsgTitle, {
									confirmButtonText: '确定',
									callback: action => {
									}
							});
					},
					initLoad() {
						let id = this.$route.query
						this.$ajax.get('/view/comments_byId?_id='+id._id)
						.then(res => {
							this.dataList = res.data.comment;
							this.articleId = res.data.articleid;
							for(var i = 0; i < this.dataList.length; i++){
								this.dataList[i].createdTime = time(Number(this.dataList[i].createTime));   
							}
							this.commentList = this.dataList.reverse().slice(0, 10);
						})
						.catch(err => {
								console.log(err);
						})
					},
					delete_commentById (data){
						let id = this.$route.query
						this.$ajax.post('/control/delete_commentDetil?_id='+id._id, data)
						.then(res => {
							this.postArticleCount(this.articleId, this.dataList.length)
						})
						.catch(err => {
						})
					},
					postArticleCount(_id, count) {
						this.recordCount.comment = (count-1);
						this.$ajax.post('/view_clickArticle?_id='+_id, this.recordCount)
						.then(res => {
							this.reload();
						})
						.catch(err => {
						})
					}
        }
    }
</script>
<style scoped></style>