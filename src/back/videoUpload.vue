<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
		<h1 class="page-header">操作</h1>
		<span>
			上传视频类型：
			<select v-model="selected">
				<option disabled value="" selected>请选择属性</option>
				<option v-for="cate in category" v-bind:key="cate.category">{{ cate.category }}</option>
			</select>
			不选择类型默认其他
		</span>

		<el-upload
			class="upload-demo"
			:action="action"
			:data="userName"
			accept="video/*"
			:on-success="handleSuccess"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:limit="1"
		>
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传视频，但是未限制视频格式</div>
		</el-upload>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selected: '',
			category: [],
			action: 'http://localhost:8889/upload_video?selected=',
			videoName: '',
			filePath: '',
			userName: { userName: JSON.parse(localStorage.getItem('login')).name }
		} 
	},
	mounted() {
		this.getData() 
	},
	methods: {
		handleSuccess(response, file, fileList) {
			this.videoName = response.videoName 
			this.filePath = response.filePath 
		},
		handleRemove(file, fileList) {
			this.$ajax
				.get('/control_deleteVideo?videoName=' + this.videoName + '&filePath=' + this.filePath)
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
		submitUpload() {
			this.$refs.upload.submit() 
		},
		getData() {
			this.$ajax
				.get('/control/category')
				.then(res => {
					this.category = res.data 
				})
				.catch(err => {}) 
		}
	},
	watch: {
		selected(newValue, oldValue) {
			this.action = 'http://localhost:8889/upload_video?selected=' + newValue 
		}
	}
} 
</script>
<style scoped></style>
