<template>
	<div>
		<head-vue></head-vue>
		<!-- 留坑 -->
		<router-view></router-view>
		<foot-vue></foot-vue>
	</div>
</template>

<script>
import HeadVue from './common/headVue.vue'
import FootVue from './common/footVue.vue'

	export default {

		data(){

			return{

			}
		},
		components:{
			headVue:HeadVue,
			footVue:FootVue
		}
	}
</script>
<style scoped>
@import "../static/frontStatic/css/style.css";
</style>