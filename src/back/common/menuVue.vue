<template>
        <aside class="col-sm-3 col-md-2 col-lg-2 sidebar">
          <ul class="nav nav-sidebar">
            <li class="active"><router-link :to="{name:'backIndex'}">报告</router-link></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><router-link :to="{name:'backArticle'}">文章</router-link></li>
            <li><router-link :to="{name:'backNotice'}">公告</router-link></li>
            <li><router-link :to="{name:'comment'}">评论</router-link></li>
            <li><a data-toggle="tooltip" data-placement="bottom" title="网站暂无留言功能">留言</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><router-link :to="{name:'backCategory'}">栏目</router-link></li>
            <li><a class="dropdown-toggle" id="otherMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">其他</a>
              <ul class="dropdown-menu" aria-labelledby="otherMenu">
                <li><router-link :to="{name:'backFlink'}">友情链接</router-link></li>
                <li><a data-toggle="modal" data-target="#areDeveloping">访问记录</a></li>
              </ul>
            </li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a class="dropdown-toggle" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">用户</a>
              <ul class="dropdown-menu" aria-labelledby="userMenu">
                <li><a data-toggle="modal" data-target="#areDeveloping">管理用户组</a></li>
                <li><router-link :to="{name:'manageUser'}">管理用户</router-link></li>
                <li role="separator" class="divider"></li>
                <li><router-link :to="{name:'backLoginLog'}">管理登录日志</router-link></li>
              </ul>
            </li>
            <li><a class="dropdown-toggle" id="settingMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">设置</a>
              <ul class="dropdown-menu" aria-labelledby="settingMenu">
                <li><router-link :to="{name:'setting'}">基本设置</router-link></li>
                <li><router-link :to="{name:'readSet'}">阅读设置</router-link></router-link></li>
                <li role="separator" class="divider"></li>
                <li><a data-toggle="modal" data-target="#areDeveloping">安全配置</a></li>
                <li role="separator" class="divider"></li>
                <li class="disabled"><a>扩展菜单</a></li>
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