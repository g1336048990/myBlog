<template>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
        <div class="row">
            <div class="col-md-9">
                <h1 class="page-header">撰写新公告</h1>
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
                    <h2 class="add-article-box-title"><span>关键字</span></h2>
                    <div class="add-article-box-content">
                        <input type="text" v-model="dataList.keywords" class="form-control" placeholder="请输入关键字" name="category" autocomplete="off">
                        <span class="prompt-text">多个标签请用英文逗号,隔开。</span>
                    </div>
                </div>
                <div class="add-article-box">
                    <h2 class="add-article-box-title"><span>描述</span></h2>
                    <div class="add-article-box-content">
                        <textarea v-model="dataList.describe" class="form-control" name="describe" autocomplete="off"></textarea>
                        <span class="prompt-text">描述是可选的手工创建的内容总结，并可以在网页描述中使用</span>
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
                            <span type="radio" v-for="(item,index) in dataList.visibility" :key="index">
                            <input type="radio" name="visibility" value="0" :checked="item.checked" @click="changeChecked(index, dataList.visibility)">{{item.text}}
                            </span> 
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
                    keywords:'',
                    describe:'',
                    releaseStatus:"未发布",
                    visibility:[{ text: '公开', checked: true },
                                { text: '加密', checked: false }],
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
            //改变当前选中状态并把当前状态存入数组中保存
            changeChecked(id,data){
                $.each(data,function(index, item){
                    item.checked = false;
                })
                data[id].checked = true;
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
                this.dataList.content = this.$refs.ue.getUEContent();
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




