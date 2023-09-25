<template>
  <div>
    <el-page-header icon="" title="个人中心" content="个人中心"/>
    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="el-card">
          <el-avatar :size="100" :src="avatarUrl"/>
          <h3>{{ store.state.userInfo.username }}</h3>
          <h3>{{ store.state.userInfo.role === 1 ? '编辑' : '管理员' }}</h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
              ref="userFormRef"
              :model="userForm"
              status-icon
              :rules="userFormRules"
              label-width="120px"
              class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username"/>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="userForm.gender" style="width: 100%">
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
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

.el-row {
  margin-top: 20px;

  .box-card {
    text-align: center;
  }
}
</style>
<script setup>
import {useStore} from 'vuex'
import {computed, ref, reactive} from "vue";
import {Plus} from '@element-plus/icons-vue'
import Upload from '@/components/upload/Upload.vue'
import {ElMessage} from 'element-plus'
import upload from "@/util/upload";

const userFormRef = ref()
const store = useStore()
const {username, gender, introduction, avatar} = store.state.userInfo
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null
})
const userFormRules = reactive({
  username: [
    {
      required: true, message: "请输入名字", trigger: "blur"
    }
  ],
  gender: [
    {
      required: true, message: "请选择性别", trigger: "blur"
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
})
const options = [
  {
    value: 0,
    label: '保密'
  },
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '女'
  }
]
//每次选择完图片之后的回调函数
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}

const avatarUrl = computed(
    () =>
        store.state.userInfo.avatar
            ? "http://localhost:3000" + store.state.userInfo.avatar
            : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);
//个人信息提交事件
const submitForm = () => {
  userFormRef.value.validate(async (vaild) => {
    if (vaild) {
      const res = await upload('adminapi/user/upload', userForm)
      if (res.ActionType === 'OK') {
        store.commit('changeUserInfo', res.data)
        ElMessage.success('更新成功')
      }

    }
  })
}
</script>