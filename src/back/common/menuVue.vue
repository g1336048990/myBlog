<template>
        <aside class="col-sm-3 col-md-2 col-lg-2 sidebar">
          <ul class="nav nav-sidebar">
            <li><router-link :to="{name:'backIndex'}">报告</router-link></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><router-link :to="{name:'backArticle'}">文章</router-link></li>
            <li><router-link :to="{name:'backNotice'}">公告</router-link></li>
            <li><router-link :to="{name:'comment'}">评论</router-link></li>
						<li><router-link :to="{name:'backCategory'}">栏目</router-link></li>
						<li><router-link :to="{name:'manageUser'}">管理用户</router-link></li>
						<li><router-link :to="{name:'backLoginLog'}">管理登录日志</router-link></li>
          </ul>
        </aside>
</template>

<script>
  export default {
    data(){

      return{

      }
    }
  }
</script>
<style></style>