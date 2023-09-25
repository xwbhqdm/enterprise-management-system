<template>
  <div>
    <el-card>
      <el-page-header icon="" title="产品管理" content="添加产品"/>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称"/>
        <el-table-column prop="introduction" label="简要描述" />
        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
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
      </el-table>
    </el-card>
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
  const res = await axios.get('/adminapi/product/list')

  tableData.value = res.data.data.filter((item)=>item.username == store.state.userInfo.username)
}
//删除回调
const handleDelete=async (id,data)=>{
  await axios.delete(`/adminapi/product/list/${data._id}`)
  //乐观加载
  tableData.value = tableData.value.filter((item)=>data._id !== item._id)
}
//编辑回调
const handleEdit=(item)=>{
  //跳转到/news-manage/aditnews/:id
  router.push(`/product-manage/editproduct/${item._id}`)
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