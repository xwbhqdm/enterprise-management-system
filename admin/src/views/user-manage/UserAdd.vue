<template>
  <div>
    <el-page-header icon="" title="用户管理" content="添加用户"/>
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
      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @avatarChange="handleChange"/>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm()"
        >
          添加用户
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {reactive,ref} from "vue";
import Upload from "@/components/upload/Upload.vue";
import upload from '@/util/upload'
import {useRouter} from "vue-router"
import {useStore} from 'vuex'
const store = useStore()
const userFormRef = ref()
const router = useRouter()
const userForm = reactive({
  username:"",
  password:"",
  introduction:"",
  avatar:"",
  role:2,
  file: null,
  gender:0//保密
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
  avatar: [
    {
      required: true, message: "请选择头像", trigger: "blur"
    }
  ],
  role: [
    {
      required: true, message: "请选择权限", trigger: "blur"
    }
  ],
})

//每次选择完图片之后的回调函数
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}
const submitForm=()=>{
  userFormRef.value.validate(async (valid)=>{
    if (valid){
      console.log(userForm,'adddd')
      store.commit('changeUserInfoArr',userForm)
      //提交数据给后台
      await upload("/adminapi/user/add",userForm)
      router.push('/user-manage/userlist')
    }
  })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;
}
</style>