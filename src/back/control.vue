<template>
	<div class="user-select">
		<section class="container-fluid">
			<head-vue></head-vue>
			<div class="row">
				<menu-vue></menu-vue>
					 <!--留坑  	-->
					<router-view></router-view>
				</div>
		</section>
		<foot-vue></foot-vue>
	</div>
</template> 
<script>
	import HeadVue from './common/headVue.vue'
	import FootVue from './common/footVue.vue'
	import MenuVue from './common/menuVue.vue'
	export default {
		data(){
		    return{
		    }
	    },
	    methods:{
	    	text(){
	    		console.log('加载了');
	    	}
	    },
		components:{
			headVue:HeadVue,
			footVue:FootVue,
			menuVue:MenuVue
		},
		created(){
		    this.text();
		},
		mounted(){
			// console.log(JSON.parse(localStorage.getItem('login')))
		},
	}
</script>
<style scoped>
	@import "../static/backgroundStatic/css/style.css";
</style>