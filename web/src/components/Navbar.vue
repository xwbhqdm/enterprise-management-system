<template>
  <div class="navbar">
    <el-menu
        :default-active="route.fullPath"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
      <el-menu-item index="/login" @click="handleClickLogin" v-if="!store.state.userInfo">登录</el-menu-item>
      <el-menu-item index="/register" @click="handleClickRegister" v-if="!store.state.userInfo">注册</el-menu-item>
        <el-menu-item index="/logout" @click="handleClicklogout">退出登录</el-menu-item>
    </el-menu>
    <div class="right">
      企业门户官网 欢迎{{store.state.userInfo.username}}
    </div>
  </div>
</template>
<script setup>
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
const store = useStore()
const route = useRoute()
const router = useRouter()
const handleClickLogin=()=>{
    router.push('/login')
}
const handleClickRegister=()=>{
    router.push('/register')
}
const handleClicklogout=()=>{
    localStorage.removeItem('token')
    store.commit('clearUserInfo',{})
    router.push('/login')
}
</script>
<style lang="scss">
.navbar{
  position: sticky;
  top: 0;
  height: 59px;
  line-height: 59px;
  text-align: center;
  z-index: 1000;
}
.right{
  position: fixed;
  top: 0;
  right: 20px;
  line-height: 59px;
  height: 59px;
  text-align: center;
}
</style>