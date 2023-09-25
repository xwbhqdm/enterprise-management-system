<template>
  <el-row>
      <el-col :span="17" :offset="1">
          <div>
              <h2>{{currentNews.title}}</h2>
              <div class="time">
                  {{whichTime(currentNews.editTime)}}
              </div>
          </div>
          <el-divider>
              <el-icon><star-filled /></el-icon>
          </el-divider>
          <div v-html="currentNews.content"></div>
      </el-col>

      <el-col :span="4" :offset="1" :pull="1">
          <el-card class="box-card">
              <template #header>
                  <div class="card-header">
                      <span style="font-size: 16px; font-weight:bold;">最近新闻</span>
                  </div>
              </template>
              <div
                  v-for="item in topNews"
                  :key="item._id"
                  class="text item"
                  style="padding: 14px"
                  @click="handleChangePage(item._id)"
              >
                             <span>
                                {{item.title}}
                              </span>
                  <div class="bottom">
                      <time>
                          {{whichTime(item.editTime)}}
                      </time>
                  </div>
              </div>
          </el-card>
      </el-col>
  </el-row>
</template>
<style lang="scss">
.el-row{
  margin-top: 20px;
}
.time{
  font-size: 13px;
  color: gray;
}
</style>
<script setup>
import {onMounted,ref,watchEffect,onBeforeUnmount } from "vue";
import {StarFilled} from '@element-plus/icons-vue'
import axios from 'axios'
import {useRoute,useRouter} from 'vue-router'
import whichTime from "@/util/whichTime";
const currentNews = ref({})
const topNews = ref([])
const route = useRoute()
const router = useRouter()
//watchEffect 监听路由所依赖的参数改变
//watchEffect 内部返回了停止监听的函数
const  stop = watchEffect(async ()=>{
    //如果路由中的id为undefined直接返回
    if (!route.params.id) return
    const currentNewsRes = await await axios.get(`/webapi/news/list/${route.params.id}`)
    const TopNewsRes = await await axios.get(`/webapi/news/toplist?limit=4`)
    topNews.value = TopNewsRes.data.data
    currentNews.value = currentNewsRes.data.data[0]
})
//销毁钩子
onBeforeUnmount(()=>{
    stop()
})
const handleChangePage=(id)=>{
    router.push(`/news/${id}`)
}
</script>