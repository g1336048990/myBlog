<template>
    <div>
        <script  id="article-content" name="content" type="text/plain"></script>
    </div>
</template>
<script>
    export default{
        name:'UE',
        data(){
            return{
                editor:null
            }
        },
        mounted(){
            const _this = this;
            this.editor = UE.getEditor('article-content', this.config); // 初始化UE
            this.editor.addListener("ready", function () {
				// _this.editor.execCommand( 'insertcode', 'javascript' );
				console.log(_this.setUEContent())
                _this.editor.setContent(_this.setUEContent()); // 确保UE加载完成后，放入内容。
				// _this.queryCommandValue( 'insertcode' );
				// 
            });
        },
        methods:{
              getUEContent(){ // 获取内容方法
                  return this.editor.getPlainTxt()
              },
              setUEContent(){
                  return this.$store.state.msg
              }
          },
          destroyed(){
              this.editor.destroy();
          }
    }
</script>
<style scoped>
  
</style>