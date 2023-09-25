<template>
  <div>
    <el-card>
      <el-page-header icon="" title="用户管理" content="添加用户"/>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名"/>
        <el-table-column label="头像">
          <template #default="scope">
            <!--TODO 以后要封装计算属性-->
            <div v-if="scope.row.avatar">
              <el-avatar :size="50" :src="'http://localhost:3000'+scope.row.avatar">

              </el-avatar>
            </div>
            <div v-else>
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-tag class="ml-2" type="danger" v-if="scope.row.role === 2">管理员</el-tag>
            <el-tag class="ml-2" type="success" v-if="scope.row.role === 1">编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
            >
            <el-popconfirm
                title="你确定要删除吗"
                @confirm="handleDelete(scope.$index, scope.row)"
                :confirm-button-text="确定"
                :cancel-button-text="取消">
              <template #reference>
                <el-button
                    size="small"
                    type="danger"
                >删除</el-button
                >
              </template>

            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
        v-model="dialogVisible"
        title="编辑用户"
        width="50%"
    >
      <el-form
          ref="userFormRef"
          :model="userForm"
          status-icon
          :rules="userFormRules"
          label-width="80px"
          class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password"/>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" style="width: 100%">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="userForm.introduction" type="textarea"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
import axios from 'axios'
import Upload from "@/components/upload/Upload.vue";
//用于对话框显示
const dialogVisible = ref(false)
//用于表单绑定表单数据
const userForm = reactive({
  username:"",
  password:"",
  introduction:"",
  role:2,
})
const userFormRef = ref()
//绑定表单规则
const userFormRules = reactive({
  username: [
    {
      required: true, message: "请输入名字", trigger: "blur"
    }
  ],
  password: [
    {
      required: true, message: "请输入密码", trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true, message: "请输入介绍", trigger: "blur"
    }
  ],
  role: [
    {
      required: true, message: "请选择权限", trigger: "blur"
    }
  ],
})
const options=[
  {
    value:1,
    label:'编辑'
  },
  {
    value:2,
    label:'管理员'
  },
]
const store = useStore()
 const tableData = ref([])
onMounted(()=>{
  getTableData()
})
const getTableData=async ()=>{
  const res=await axios.get('/adminapi/user/list')
  store.commit('changeUserInfoArr',res.data.data)
  tableData.value = res.data.data
}
  const handleEdit=async (id,data)=>{
    const res = await axios.get(`/adminapi/user/list/${data._id}`)
    console.log(res.data.data)
    Object.assign(userForm,res.data.data[0])
    dialogVisible.value = true
}
const handleDelete=async (_,data)=>{
  await axios.delete(`/adminapi/user/list/${data._id}`)
  //判断是否删除当前用户
  isDel(data)
  //使用filter实现乐观加载
  tableData.value = tableData.value.filter(item => item._id !== data._id)
}
//确认编辑
const handleEditConfirm =async ()=>{
  userFormRef.value.validate(async (valid)=>{
    if (valid){
      //1 更新后台
      await axios.put(`/adminapi/user/list/${userForm._id}`,userForm)
      //2 dialog隐藏
      dialogVisible.value = false
      //3 乐观加载 TODO:这里应该使用乐观加载
      getTableData()
      if (userForm._id === store.state.userInfo._id){
        if (userForm.password !== store.state.userInfo.password){
          localStorage.removeItem('token')
          store.commit('clearUserInfo')
          location.href = '/login'
        }
        store.commit('changeUserInfo',userForm)
         store.state.userInfo.password
      }
    }
  })

}
//定义一个方法用于判断在删除用户时是否删除了当前用户
const isDel =(data)=>{
  if (data._id === store.state.userInfo._id){
    localStorage.removeItem('token')
    store.commit('clearUserInfo')
    location.href = '/login'
  }
}
</script>
<style lang="scss" scoped>
.el-table{
  margin-top: 50px;
}
</style>