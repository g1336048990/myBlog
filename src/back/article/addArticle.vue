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
                    <h2 class="add-article-box-title"><span>栏目</span></h2>
                    <div class="add-article-box-content">
                        <ul class="category-list">
                            <li>
								<input name="category" type="radio" id="Javascript" value="Javascript" v-model="dataList.category">
								<label for="Javascript">Javascript</label>
                            </li>
							<li>
								<input name="category" type="radio" id="HTML" value="HTML" v-model="dataList.category">
								<label for="HTML">HTML</label>
							</li>
							<li>
								<input name="category" type="radio" id="CSS" value="CSS" v-model="dataList.category">
								<label for="CSS">CSS</label>
								
							</li>
							<li>
								<input name="category" type="radio" id="Node" value="Node" v-model="dataList.category">
								<label for="Node">Node</label>
								
							</li>
							<li>
								<input name="category" type="radio" id="Vue" value="Vue" v-model="dataList.category">
								<label for="Vue">Vue</label>
								
							</li>
							<li>
								<input name="category" type="radio" id="React" value="React" v-model="dataList.category">
								<label for="React">React</label>
							</li>
                        </ul>
                    </div>
                </div>
                <div class="add-article-box">
                    <h2 class="add-article-box-title"><span>标签</span></h2>
                    <div class="add-article-box-content">
                        <input type="text" v-model="dataList.tags" class="form-control" placeholder="输入新标签" name="tags" autocomplete="off">
                        <span class="prompt-text">多个标签请用英文逗号,隔开</span> 
                    </div>
                </div>
                <div class="add-article-box">
                    <h2 class="add-article-box-title"><span>标题图片</span></h2>
                    <div class="add-article-box-content">
                        <el-upload class="upload-demo" ref="upload" :action="action"  :on-remove="handleRemove" :on-error="handleError" :data="timeStamp" :file-list="fileList" :limit="1" :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
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
                action:'',
                fileList:[],
                timeStamp:{categoryId:'', num:'0'},
                dataList:{
                    title:'',
                    content:'',
                    keywords:'',
                    describe:'',
                    category:'Javascript',
                    tags:'',
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
                this.action = this.$store.state.action;
                console.log('测试数据'+this.$store.state.action);
            },
            //错误弹窗
            open(errmsg,errmsgTitle){
                this.$alert(errmsg, errmsgTitle, {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                });
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                this.open('图片已移除，如果不再次选择图片，上传时会选择默认图片！！', '已删除图片');
            },
            submitData(){
                this.dataList.content = this.$refs.ue.getUEContent();
                this.dataList.releaseStatus = "已发布";
                //时间戳获取
                this.dataList.createdTime = new Date().getTime();
                this.dataList.lastTime = new Date().getTime();
                //给上传的图片添加一个识别
                this.timeStamp.categoryId = this.dataList.createdTime;

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
                        this.submitUpload();
                        this.open(msg, msgTitle);
                        this.$router.push({name:'backArticle'});
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




