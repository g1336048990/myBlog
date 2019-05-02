<template>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
        <div class="row">
            <div class="col-md-9">
                <h1 class="page-header">修改文章</h1>
                <div class="form-group">
                    <label for="article-title" class="sr-only">标题</label>
                    <input type="text" id="article-title" v-model="dataList.title" name="title" class="form-control" placeholder="在此处输入标题" required autofocus autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="article-content" class="sr-only">内容</label>
                    <!-- 富文本编辑器 -->
                    <UE ref="ue"></UE>
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
                        <p><label>发布于：</label><span class="article-time-display"><input style="border: none;" type="datetime" name="time" v-model="dataList.createdTime" /></span></p>
                    </div>
                    <div class="add-article-box-footer">
                        <button class="btn btn-primary" type="submit" name="submit" @click="updataArticle()">更新</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 
<script>
    import UE from '../common/ueditor.vue'
    import time from '../../static/js/mytimer.js'
    export default {
        data(){
            return{
                createdTime:'',
                dataList:{},
				category:[]
            }
        },
        created(){
            this.getinfo();
        },
        mounted(){
        },
        methods:{
            //错误弹窗
            open(errmsg,errmsgTitle){
                this.$alert(errmsg, errmsgTitle, {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                });
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
            getinfo(){
                //获取url上的信息
                const id = this.$route.query;
                this.$ajax.get('/control/updateArticle?_id='+id._id)
                .then(res => {
                    this.dataList = res.data;
                    this.createdTime = this.dataList.createdTime;
                    this.dataList.createdTime = time(Number(this.dataList.createdTime));
                    //状态管理器的使用
                    this.$store.state.msg = this.dataList.content;
					this.getData();
                })
                .catch(err => {
                    console.log(err);
                })
            },
            updataArticle(){
                this.dataList.content = this.$refs.ue.getUEContent();
                this.dataList.lastTime = new Date().getTime();
                this.dataList.createdTime = this.createdTime;
                this.$ajax.post('/control/updateArticle', this.dataList)
                .then(res => {
                    var msg = res.data.msg;
                    var msgTitle = res.data.msgTitle;
                    this.open(msg, msgTitle);
                    this.$router.push({name:'backArticle'});
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        components:{
            UE:UE,
        }
    }
</script>
<style scoped>
</style>


    
