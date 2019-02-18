<template>
	<div id="app">
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
				this.$nextTick(function(){
					this.isRouterAlive = true;
				});
			}
		}
		
	}
</script>
<style>

</style>