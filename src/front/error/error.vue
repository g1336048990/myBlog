<template>
	<div class="user-select">
		<section class="container">
		  <div class="panel">
		    <div class="text-center">
		      <h2><stong>404错误！很抱歉，您要找的页面不存在</stong></h2>
		      <div>
		        <div class="float-left"> <img src="../../static/images/404/left.gif" alt="" />
		          <div class="alert"> 卧槽！页面不见了！ </div>
		        </div>
		        <div class="float-right"> <img src="../../static/images/404/right.png" width="260" class="hidden-xs" alt="" /> </div>
		      </div>
		      <div class="padding-big"> <a class="btn btn-primary" @click="backIndex()">返回首页</a></div>
		    </div>
		  </div>
		</section>
	</div>
</template>
<script>
	export default {
		data(){
			return{
			}
		},
		methods: {
			backIndex() {
				this.$router.replace({name: 'frontIndex'})
			}
		},
	}
</script>
<style scoped>
.panel{
	padding:80px 20px 0px;
	min-height:500px;
	cursor:default;
}
.text-center {
	margin:0 auto;
    text-align: center;
	border-radius:10px;
	max-width:900px;
	-moz-box-shadow: 0px 0px 5px rgba(0,0,0,.3);
	-webkit-box-shadow: 0px 0px 5px rgba(0,0,0,.3);
	box-shadow: 0px 0px 5px rgba(0,0,0,.1);
}
.float-left {
    float: left !important;
}
.float-right {
    float: right !important;
}
img {
    border: 0;
    vertical-align: bottom;
}
h2 {
    padding-top: 20px;
	font-size: 20px;
}
.padding-big {
    padding: 20px;
}
.alert {
    border-radius: 5px;
    padding: 15px;
    border: solid 1px #ddd;
    background-color: #f5f5f5;
}
</style>