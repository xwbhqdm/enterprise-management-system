<template>
  <div>
    <el-card>
      <el-page-header icon="" title="新闻管理" content="添加新闻"/>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="category" label="分类">
          <template #default="scope">
            {{ categoryFormat(scope.row.category) }}
          </template>
        </el-table-column>
        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="ispublish" label="是否发布">
          <template #default="scope">
            <el-switch v-model="scope.row.ispublish" :active-value="1" :inactive-value="0" @change="handleSwitchChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="ispublish" label="操作">
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" circle :icon="Star" type="success" @click="handlePreview(scope.row)"
              ></el-button
              >
              <el-button size="small" circle :icon="Edit" @click="handleEdit(scope.row)"
              ></el-button
              >
              <el-popconfirm
                  title="你确定要删除吗"
                  @confirm="handleDelete(scope.$index, scope.row)"
                  :confirm-button-text="确定"
                  :cancel-button-text="取消" >
                <template #reference>
                  <el-button size="small" circle :icon="Delete" type="danger"
                  ></el-button
                  >
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
        v-model="dialogVisible"
        title="预览新闻"
        width="50%"
    >
      <div>
        <h2>{{PreviewData.title}}</h2>
        <div style="font-size:12px;color: gray">{{ formatTime.getTime(PreviewData.editTime) }}</div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="PreviewData.content" class="htmlContent"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import {Star, Edit, Delete,StarFilled} from '@element-plus/icons-vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
const tableData = ref([])
const router = useRouter()
const store = useStore()
//预览数据
const PreviewData = ref({})
const dialogVisible = ref(false)
onMounted(() => {
  getTableData()
})
const getTableData = async () => {
  const res = await axios.get('/adminapi/news/list')

  tableData.value = res.data.data.filter((item)=>item.username == store.state.userInfo.username)
}
//格式化分类
const categoryFormat = (category) => {
  //定义一个空数组用于存储分类
  const arr = ["最新动态", "典型案例", "通知公告"]
  return arr[category - 1]
}
const handleSwitchChange=async (item)=>{
  await axios.put(`/adminapi/news/publish`,{
    _id:item._id,
    ispublish:item.ispublish
  })
  //TODO：使用乐观加载
  await getTableData()
}
//删除回调
const handleDelete=async (id,data)=>{
  await axios.delete(`/adminapi/news/list/${data._id}`)
  //乐观加载
  tableData.value = tableData.value.filter((item)=>data._id !== item._id)
}
//预览回调
const handlePreview=(data)=>{
  PreviewData.value = data
  dialogVisible.value = true
}
//编辑回调
const handleEdit=(item)=>{
  //跳转到/news-manage/aditnews/:id
  router.push(`/news-manage/editnews/${item._id}`)
}
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
::v-deep .htmlContent{
  img{
    width: 100%;
  }
}
</style>