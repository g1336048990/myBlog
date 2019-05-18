<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">
		<h1 class="page-header">
			视频播放<span class="badge"></span>
		</h1>
		<video :width="width" :height="height" controls autoplay name="media">
			<source :src="videoUrl" type="video/mp4">
		</video>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
				videoUrl: ''
			}
		},
		mounted() {
			this.videoUrl = 'http://localhost:8889/' + this.$route.query.filePath + '/' + this.$route.query.videoName;
		}
	}
</script>
<style>
	
</style>