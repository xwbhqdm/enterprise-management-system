<template>
  <div>
    <el-aside :width="$store.state.isCollapsed ? '64px':'200px'">
      <el-menu
          :collapse="$store.state.isCollapsed"
          :collapse-transition="false"
          :router="true"
          :default-active="route.fullPath">
        <el-menu-item index="/index">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/center">
          <el-icon>
            <avatar/>
          </el-icon>
          <span>个人中心</span>
        </el-menu-item>

        <el-sub-menu index="/user-mamage" v-admin>
          <template #title>
            <el-icon>
              <user-filled/>
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
            <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="/news-manage">
          <template #title>
            <el-icon>
              <message-box/>
            </el-icon>
            <span>新闻管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/news-manage/addnews">添加新闻</el-menu-item>
            <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="/product-manage">
          <template #title>
            <el-icon>
              <reading/>
            </el-icon>
            <span>产品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
            <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </div>
</template>
<script setup>
 import {HomeFilled,Avatar,UserFilled,MessageBox,Reading,Pointer} from '@element-plus/icons-vue'
 import {useRoute} from "vue-router";
 import {useStore} from 'vuex'
 const store = useStore()
 const route = useRoute()
 //路由权限控制
 //定义自定义指令 通过mounted方法拿到dom节点
 const vAdmin ={
   mounted(el){
     //判断userInfo中的role字段是否不等于2(1编辑 2管理员)
    if (store.state.userInfo.role !==2)
      //如果不是管理员身份 删除用户管理的dom节点
      el.parentNode.removeChild(el)
   }
 }
</script>
<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  .el-menu{
    height: 100vh;
  }
}
</style>
<script setup>
</script>