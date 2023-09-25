<template>
  <div>
      <el-carousel  height="calc(100vh - 59px)" direction="vertical" :autoplay="false" v-loading="store.state.isLoading">
          <el-carousel-item v-for="item in loopList" :key="item._id">
              <div :style="{backgroundImage:`url(http://localhost:3000${item.cover})`}" class="item">
                  <el-card class="box-card">
                      <template #header>
                          <div class="card-header">
                              {{item.title}}
                          </div>
                      </template>
                      <div>
                          {{item.introduction}}
                      </div>
                      <div class="detail">
                          {{item.detail}}
                      </div>
                      <div class="more">更多信息，请访问 <br> http://localhost:8080</div>
                  </el-card>
              </div>
          </el-carousel-item>
      </el-carousel>
<!--      <el-empty description="暂无产品" v-else/>-->
  </div>
</template>
<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
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
.item{
  width: 100%;
  height: 100%;
  background-size: cover;
}
.box-card{
    width: 50%;
    height: 100%;
    background-color:rgba(255,255,255,0.7);
    .detail{
        margin-top: 20px;
    }
    .more{
        margin-top: 20px;
    }
}

</style>
<script setup>
import {ref,onMounted} from 'vue'
import axios from 'axios'
import {useStore} from 'vuex'
const store = useStore()
let isLoading = ref(false)
const loopList =  ref([])
onMounted(async ()=>{
    const res = await axios.get('/webapi/product/list')
    loopList.value = res.data.data
    store.commit('changeIsLoading',false)
})

</script>