<template>
    <div>
        <vue-particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                :options="ParticlesOptions"
        />
        <div class="formContainer">
            <h1 class="title">注册页</h1>
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
    </div>
</template>
<script setup>
import {reactive, ref} from "vue";
import Upload from "@/components/upload/Upload.vue";
import upload from '@/util/upload'
import {useRouter} from "vue-router"
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'
import {loadFull} from "tsparticles";
import {ParticlesOptions} from '@/util/options'

const store = useStore()
const userFormRef = ref()
const router = useRouter()
const userForm = reactive({
    username: "",
    password: "",
    avatar: "",
    file: null,
    gender: 0//保密
})
const options = [
    {
        value: 1,
        label: '编辑'
    },
    {
        value: 2,
        label: '管理员'
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
    avatar: [
        {
            required: true, message: "请选择头像", trigger: "blur"
        }
    ],
})

//每次选择完图片之后的回调函数
const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            //提交数据给后台
            const res = await upload("/webapi/user/add", userForm)
            ElMessage.success('注册成功,即将跳转登录页 ')
            setTimeout(() => {
                -
                    router.push('/login')
            }, 1000)
        }
    })
}
const particlesInit = async (engine) => {
    await loadFull(engine)
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}

.formContainer {
  width: 60%;
  height: 500px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 10px;

  .title {
    text-align: center;
    color: white;
    font-size: 30px;
    z-index: 10000;
  }

}
.el-form-item__content{
    .avatar-uploader{
        background-color: rgba(255,255,255,0.7);
        border-radius: 10px;
    }
}
.el-input__wrapper{
    width: 180px;
}


</style>