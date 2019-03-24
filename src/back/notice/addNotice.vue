<template>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
        <div class="row">
            <div class="col-md-9">
                <h1 class="page-header">撰写新公告</h1>
                <div class="add-article-box">
                    <h2 class="add-article-box-title"><span>内容</span></h2>
                    <div class="add-article-box-content">
                        <textarea v-model="dataList.content" class="form-control" name="content" autocomplete="off"></textarea>
                        <span class="prompt-text">撰写公告具体内容</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <h1 class="page-header">操作</h1>
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
                    content:'',
                    releaseStatus:"未发布",
                    visibility:'0',
                    createdTime:'',
                    lastTime:'',
                }
            }
        },
        components:{
            UE:UE,
        },
        methods:{
            //加载完成初始化页面
            initLoad(){
                this.$store.state.msg = '';
            },
            //错误弹窗
            open(errmsg,errmsgTitle){
                this.$alert(errmsg, errmsgTitle, {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                });
            },
           
            submitData(){
                this.dataList.releaseStatus = "已发布";
                //时间戳获取
                this.dataList.createdTime = new Date().getTime();
                this.dataList.lastTime = new Date().getTime();

                let url = '/control/addNotice';
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
                        this.$router.push({name:'backNotice'});
                    }

                })
                .catch(err => {
                    open('请检查服务器是否启动！！', '提交失败')
                })
            }
        },
        created(){
            //初始化页面
            this.initLoad();   
        },
        mounted(){
        },
    }
</script>
<style scoped>
</style>




