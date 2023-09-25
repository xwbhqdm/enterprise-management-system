<template>
  <div class="container">
    <div class="news-header" :style="{backgroundImage:`url(${require('@/assets/newsbg.jpg')})`}">

    </div>
    <div class="search">
      <el-popover
          placement="bottom"
          title="检索结果"
          width="50%"
          :visible="visible"
      >
        <template #reference>
          <el-input
              v-model="searchText"
              class="w-50 m-2"
              placeholder="请输入新闻关键字"
              :prefix-icon="Search"
              type="search"
              size="large"
              @input="visible=true"
              @blur="visible=false"
              @focus="visible=true"
          />
        </template>
        <div v-if="searchNewsList.length">
          <div v-for="item in searchNewsList" class="search-item" @click="handleChangePage(item._id)">{{ item.title }}</div>
        </div>
        <div v-else>
          <el-empty description="暂无新闻" :image-size="50"/>
        </div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row :gutter="20">
        <el-col
            :span="6"
            v-for="item in topNewsList"
            :key="item._id"
        >
          <el-card :body-style="{ padding: '0px' }" :shadow="'hover'" @click="handleChangePage(item._id)">
            <div class="image" :style="{
              backgroundImage:`url(http://localhost:3000${item.cover})`
            }"></div>
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ whichTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="whichTab" class="demo-tabs">
      <el-tab-pane v-for="item in tablist" :label="item.label" :name="item.name"  :key="item.name">
          <el-row :gutter="20">
              <el-col :span="18">
                  <div
                          v-for="item in tabnews[item.name]"
                          :key="item._id"
                          style="padding: 10px"
                  >
                      <el-card :body-style="{padding:'0px'}" shadow="hover" @click="handleChangePage(item._id)">
                          <div class="tab-image" :style="{ backgroundImage:`url(http://localhost:3000${item.cover})`}">

                          </div>
                          <div style="padding: 14px;float: left">
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
                  </div>
              </el-col>
              <el-col :span="6">
                  <el-timeline>
                      <el-timeline-item
                              v-for="(item, index) in tabnews[item.name]"
                              :key="index"
                              :timestamp="whichTime(item.editTime)"
                      >
                          {{ item.title }}
                      </el-timeline-item>
                  </el-timeline>
              </el-col>
          </el-row>
      </el-tab-pane>
    </el-tabs>
      <el-backtop visibility-height="200"/>
  </div>
</template>
<script setup>
import moment from 'moment'
import {Search} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {ref, onMounted, computed} from 'vue'
import axios from 'axios'
import _ from 'lodash'
const searchText = ref("")
const newlist = ref([])
const visible = ref(false)
const whichTab = ref(1)
const router = useRouter()
moment.locale('zh-cn')
onMounted(() => {
  getNewsData()
})
const getNewsData = async () => {
  var res = await axios.get('/webapi/news/list')
  newlist.value = res.data.data
}
const searchNewsList = computed(() => searchText.value ? newlist.value.filter(item => item.title.includes(searchText.value)) : [])
const topNewsList = computed(()=> newlist.value.slice(0, 4))
const whichTime = (time) => {
  return moment(time).format('lll')
}
const handleChangePage=(id)=>{
    router.push(`/news/${id}`)
}
const tablist = [
  {
    label:'最新动态',
    name:1
  },
  {
    label:'典型案例',
    name:2
  },
  {
    label:'通知公告',
    name:3
  },
]
const tabnews = computed(() => _.groupBy(newlist.value, item => item.category));
</script>
<style>
.container {
  position: relative;
  height: 800px;
}

.news-header {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.search {
  position: absolute;
  top: 80%;
  width: 100%;
  text-align: center;

  .el-input {
    width: 50%;
  }
}

.search-item {
  height: 50px;
  line-height: 50px;

  &:hover {
    background-color: whitesmoke;
    color: red;
    cursor: pointer;
  }
}

.topnews {
  margin: 20px;

  .image {
    width: 100%;
    height: 150px;
    background-size: cover;
  }

  .time {
    font-size: 13px;
    color: gray;
  }
}
.tab-image{
  width: 150px;
  height: 150px;
  background-size: cover;
  float: left;
  margin-bottom: 20px;
}
.el-tabs__nav-scroll{
  margin: 20px;
}
.el-card:hover{
  cursor: pointer;
}
</style>