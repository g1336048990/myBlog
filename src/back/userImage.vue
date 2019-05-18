<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
		<h1 class="page-header">操作</h1>
		<span>
			上传视频类型：
			<select v-model="selected">
				<option disabled value="" selected>请选择属性</option>
				<option v-for="cate in imageCategory" v-bind:key="cate.imageCategory">{{ cate.imageCategory }}</option>
			</select>
			不选择类型默认其他
		</span>
		<!-- <el-upload
			class="upload-demo"
			:action="action"
			:data="userName"
			accept="image/*"
			:on-success="handleSuccess"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			multiple
			:limit="20"
			list-type="picture">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件,可以多文件上传</div>
		</el-upload> -->
		<el-upload
			class="avatar-uploader"
			action="https://jsonplaceholder.typicode.com/posts/"
			:show-file-list="false"
			:on-success="handleAvatarSuccess"
			:before-upload="beforeAvatarUpload">
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selected: '',
			imageUrl: '',
			imageCategory: [],
			action: 'http://localhost:8889/upload_pic?selected=',
			imageName: '',
			filePath: '',
			userName: { userName: JSON.parse(localStorage.getItem('login')).name }
		} 
	},
	mounted() {
		this.getData() 
	},
	methods: {
		handleSuccess(response, file, fileList) {
			console.log(response)
			this.imageName = response.videoName 
			this.filePath = response.filePath 
		},
		handleRemove(file, fileList) {
			this.$ajax
				.get('/control_deleteImage?imageName=' + file.response.videoName + '&filePath=' + file.response.filePath)
				.then(res => {
					console.log(res) 
				})
				.catch(err => {
					console.log(err) 
				}) 
		},
		handlePreview(file) {
			console.log(file) 
		},
		getData() {
			this.$ajax
				.get('/control_imageCategory')
				.then(res => {
					this.imageCategory = res.data 
				})
				.catch(err => {}) 
		},
		handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

	},
	watch: {
		selected(newValue, oldValue) {
			this.action = 'http://localhost:8889/upload_pic?selected=' + newValue 
		}
	}
} 
</script>
<style scoped>
	.avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
