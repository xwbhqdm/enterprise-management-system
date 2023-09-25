<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统" content="首页"/>
    <el-card class="box-card" >
      <el-row>
        <el-col :span="4"> <el-avatar :size="100" :src="avatarUrl" /></el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px">
            欢迎 {{store.state.userInfo.username}}
            回来，{{welcomeText}}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <span>公司产品</span>
      <el-carousel :interval="4000" type="card" height="500px" v-if="loopList.length" >
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div :style="{
            backgroundImage:`url(http://localhost:3000/${item.cover})`,
            backgroundSize:'100% 500px',
            backgroundRepeat:'no-repeat'
          }">
            <h3 text="2xl" justify="center" style="height: 500px;">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>
<style scoped>
.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<script setup>
import {computed, onMounted,ref} from 'vue'
import {useStore} from "vuex";
import store from "../../store";
import axios from "axios";
const stroe = useStore()
const avatar = stroe.state.userInfo.avatar
const avatarUrl = computed(()=>avatar ? 'http://localhost:3000' + avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
const welcomeText =computed(()=> new Date().getHours()<12?'要开心每一天':'喝杯咖啡提提神吧')
const loopList = ref([])
onMounted(() => {
  getLoopData()
})
const getLoopData = async () => {
  const res = await axios.get('/adminapi/product/list')
  loopList.value = res.data.data
}
</script>