<template>
        <aside class="col-sm-3 col-md-2 col-lg-2 sidebar">
          <!-- <ul class="nav nav-sidebar">
            <li><router-link :to="{name:'backIndex'}">报告</router-link></li>
          </ul> -->
          <!-- <ul class="nav nav-sidebar"> -->
						<!-- <li><a class="dropdown-toggle" id="otherMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">文章设置</a> -->
						  <!-- <ul class="dropdown-menu" aria-labelledby="otherMenu"> -->
							<ul class="nav nav-sidebar">
								<li><router-link :to="{name:'backArticle'}">文章</router-link></li>
								<li><router-link :to="{name:'backNotice'}">公告</router-link></li>
								<li><router-link :to="{name:'comment'}">评论</router-link></li>
								<li><router-link :to="{name:'backCategory'}">栏目</router-link></li> 
							</ul>
						  <!-- </ul> -->
						<!-- </li> -->
          <!-- </ul> -->
					<!-- <ul class="nav nav-sidebar">
					  <li><a class="dropdown-toggle" id="otherMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">用户设置</a>
					    <ul class="dropdown-menu" aria-labelledby="otherMenu"> -->
							<ul class="nav nav-sidebar">
					      <li><router-link :to="{name:'manageUser'}">管理用户</router-link></li>
								<li><router-link :to="{name:'backLoginLog'}">管理登录日志</router-link></li> 
							</ul>
					   <!--  </ul>
					  </li>
					</ul> -->
					<!-- <ul class="nav nav-sidebar">
					  <li><a class="dropdown-toggle" id="otherMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">个性设置</a>
					    <ul class="dropdown-menu" aria-labelledby="otherMenu">
					      <li><router-link :to="{name:'loginImage'}">更换登录背景</router-link></li>
								<li><router-link :to="{name:'userImage'}">更换当前用户头像</router-link></li>
					    </ul>
					  </li>
					</ul> -->
					<ul class="nav nav-sidebar">
					  <li><a class="dropdown-toggle" id="otherMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">视频设置</a>
					    <ul class="dropdown-menu" aria-labelledby="otherMenu">
					      <li><router-link :to="{name:'videoUpload'}">视频上传</router-link></li>
								<li><router-link :to="{name:'videoList'}">视频列表</router-link></li>
								<!-- <li><router-link :to="{name:'videoPlay'}">视频播放</router-link></li> -->
					    </ul>
					  </li>
					</ul>
					<ul class="nav nav-sidebar">
					  <li><a class="dropdown-toggle" id="otherMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">图片设置</a>
					    <ul class="dropdown-menu" aria-labelledby="otherMenu">
								<li><router-link :to="{name:'imageCategory'}">图片分类</router-link></li>
					      <li><router-link :to="{name:'imageUpload'}">上传套图</router-link></li>
								<li><router-link :to="{name:'imageList'}">图片列表</router-link></li>
					    </ul>
					  </li>
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