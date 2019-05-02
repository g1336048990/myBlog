<template>
	<div id="app" class='background_image'>
		<!-- 留坑 -->
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		name:'app',
		provide(){
			return{
			    reload:this.reload
			}
		},
		data(){
			return{
				isRouterAlive:true
			}
		},
		methods:{
			reload(){
				this.isRouterAlive = false;
				this.$nextTick(() => {
					this.isRouterAlive = true;
				});
			}
		},
		watch: {
			$route(to, from) {
				if((/login/.test(to.path) || /login/.test(from.path)) && !(/loginLog/.test(to.path) || /loginLog/.test(from.path))) {
					location.reload()
				}
			}
		},
		
	}
</script>
<style lang="less" scoped>
	.background_image {
		
	}
</style>