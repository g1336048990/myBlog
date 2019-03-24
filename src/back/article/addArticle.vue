<template>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
        <div class="row">
            <div class="col-md-9">
                <h1 class="page-header">撰写新文章</h1>
                <div class="form-group">
                    <label for="article-title" class="sr-only">标题</label>
                    <input type="text" id="article-title" v-model="dataList.title" name="title" class="form-control" placeholder="在此处输入标题" required autofocus autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="article-content" class="sr-only">内容</label>
                    <!-- 富文本编辑器 -->
                    <UE ref="ue"></UE>
                </div>
                <div class="add-article-box">
                    
                </div>
                <div class="add-article-box">
                    
                </div>
            </div>
            <div class="col-md-3">
                <h1 class="page-header">操作</h1>
                <div class="add-article-box">
                    <h2 class="add-article-box-title"><span>栏目</span></h2>
                    <div class="add-article-box-content">
                        <ul class="category-list">
                            <li v-for="(item,index) in category" :key="index">
								<input name="category" type="radio" :id="item.category" :value="item.category" v-model="dataList.category">
								<label :for="item.category">{{item.category}}</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="add-article-box">
                    <h2 class="add-article-box-title"><span>发布</span></h2>
                    <div class="add-article-box-content">
                        <p><label>状态：</label><span class="article-status-display">{{dataList.releaseStatus}}</span></p>
                        <p>
                            <label>公开度：</label>
                            <input name="visibility" type="radio" id="public" value="0" v-model="dataList.visibility">
							<label for="public">公开的</label>
							<input name="visibility" type="radio" id="secrect" value="1" v-model="dataList.visibility">
							<label for="secrect">加密的</label>
                        </p>
                    </div>
                    <div class="add-article-box-footer">
                        <button class="btn btn-primary" @click="submitData()" name="submit">发布</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 
    <script>
    import UE from '../common/ueditor.vue'
    export default {
        data(){
            return{
                dataList:{
                    title:'',
                    content:'',
                    category:'node',
                    releaseStatus:"未发布",
                    visibility:'0',
                    createdTime:'',
                    lastTime:'',
                },
				category: [],
            }
        },
        components:{
            UE:UE,
        },
        created(){
            this.initLoad();
			this.getData();
        },
        mounted(){
			
        },
        methods:{
            initLoad(){
                this.$store.state.msg = '';
            },
            open(errmsg,errmsgTitle){
                this.$alert(errmsg, errmsgTitle, {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                });
            },
            submitData(){
                this.dataList.content = this.$refs.ue.getUEContent();
                this.dataList.releaseStatus = "已发布";
                this.dataList.createdTime = new Date().getTime();
                this.dataList.lastTime = new Date().getTime();
                let url = '/control/addArticle';
                this.$ajax.post(url, this.dataList)
                .then(res => {
                    var err_code = res.data.err_code;
                    var msg = res.data.msg;
                    var msgTitle = res.data.msgTitle;
                    if(err_code == 1){
                        this.open(msg, msgTitle);
                    }
                    else if(err_code == 2){
                        this.open(msg, msgTitle);
                    }
                    else{
                        this.open(msg, msgTitle);
                        this.$router.push({name:'backArticle'});
                    }

                })
                .catch(err => {
                    open('请检查服务器是否启动！！', '提交失败')
                })
            },
			//初始化表格
			getData(){
				this.$ajax.get("/control/category")
				.then(res => {
					this.category = res.data;
				})
				.catch(err => {
					
				})
			},
        },
    }
</script>
<style scoped>
</style>




