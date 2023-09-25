<template>
  <el-header>
    <div class="left">
      <el-icon>
        <Menu @click="handleChangeCollapsed"/>
      </el-icon>
      <span style="margin-left: 10px">企业门户网站管理系统</span>
    </div>
    <!-- TODO:用户名展示还未连接数据库暂时写死 -->
    <div class="right">
      <span>欢迎 {{store.state.userInfo.username}} 回来</span>
      <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon class="el-icon--right" :size="30" :color="'white'">
        <User />
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handlelogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {Menu, Right, User} from '@element-plus/icons-vue'
const store = useStore()
//初始化路由函数
const router = useRouter()
  const handleChangeCollapsed=()=>{
    store.commit('changeCollapsed')
  }
  //跳转个人中心
  const handleCenter = ()=>{
    router.push('/center')
  }
  //跳转退出登录
const handlelogout = ()=>{
  localStorage.removeItem('token')
  store.commit('clearUserInfo')
  router.push('/login')
}
</script>
<style lang="scss" scoped>
.el-header{
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left,.right{
  display: flex;
}
.left{
  i{
    margin: auto;
    cursor: pointer;
  }
}
.right{
  .el-dropdown-menu{
    margin: auto;
  }
}
</style>