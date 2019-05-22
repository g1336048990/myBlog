<template>
	<div class="user-select">
		<header class="header">
		  <nav class="navbar navbar-default" id="navbar">
		    <div class="container">
		      <div class="header-topbar hidden-xs link-border">
		        <router-link :to="{name: 'frontIndex'}" class="" rel="nofollow">首页&nbsp;&nbsp;</router-link>
						<router-link :to="{name: 'frontVideo'}" class="" rel="nofollow">视频&nbsp;&nbsp;</router-link>
						<router-link :to="{name: 'frontImage'}" class="" rel="nofollow">图片</router-link>
					</div>
		    </div>
		  </nav>
		</header>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dataInfor:this.$route.path,
			}
		},
		created(){
		},
		methods:{
			change(){
				this.$router.push({name:'frontIndex'})
			}
		}
	}
</script>
<style lang="less" scoped>
</style>