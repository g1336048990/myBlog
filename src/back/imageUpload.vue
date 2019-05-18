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
		<el-upload
			class="upload-demo"
			:action="action"
			:data="userName"
			accept="image/*"
			:on-success="handleSuccess"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			multiple
			:limit="20"
			list-type="picture"><!-- file-list="" -->
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件,可以多文件上传</div>
		</el-upload>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selected: '',
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
		}
	},
	watch: {
		selected(newValue, oldValue) {
			this.action = 'http://localhost:8889/upload_pic?selected=' + newValue 
		}
	}
} 
</script>
<style scoped></style>
