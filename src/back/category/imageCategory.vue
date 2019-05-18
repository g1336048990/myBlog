
<template>
<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
      <div class="row">
        <div class="col-md-5">
          <h1 class="page-header">添加</h1>
					<div class="form-group">
						<label for="category-name">图片分类</label>
						<input type="text" class="form-control" placeholder="在此处输入栏目名称" required autocomplete="off" v-model="data.imageCategory">
					</div>
					<button class="btn btn-primary" @click="submitData()">添加新栏目</button>
        </div>
        <div class="col-md-7">
          <h1 class="page-header">管理</h1>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th><span class="glyphicon glyphicon-paperclip"></span> <span class="visible-lg">序号</span></th>
                  <th><span class="glyphicon glyphicon-file"></span> <span class="visible-lg">栏目</span></th>
                  <!-- <th><span class="glyphicon glyphicon-pushpin"></span> <span class="visible-lg">文章总数</span></th> -->
                  <th><span class="glyphicon glyphicon-pencil"></span> <span class="visible-lg">操作</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in datas" :key="index">
                  <td>{{index+1}}</td>
                  <td>{{item.imageCategory}}</td>
                  <!-- <td>0</td> -->
                  <td><a @click="deleteCategory()">暂时不设置删除功能</a></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
  export default {
    data(){
      return{
				data:{
					imageCategory: ""
				},
				datas:[]
      }
    },
		created(){
			this.getData();
    },
		inject:['reload'],
		methods:{
			//新增栏目
			submitData(){
				if(this.data.category === ""){
					alert('请填写内容！！')
					return false;
				}
				this.$ajax.post("/control_addImageCategory", this.data)
				.then(res => {
					this.reload();
				})
				.catch(err => {
					
				})
			},
			//初始化表格
			getData(){
				this.$ajax.get("/control_ImageCategory")
				.then(res => {
					this.datas = res.data;
				})
				.catch(err => {
					
				})
			},
			//删除栏目
			deleteCategory(){
			},
		}
  }
</script>
<style scoped>
</style>

    

