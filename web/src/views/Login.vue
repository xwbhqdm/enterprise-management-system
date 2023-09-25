<template>
    <div>
        <vue-particles
            id="tsparticles"
            :particlesInit="particlesInit"
            :particlesLoaded="particlesLoaded"
            :options="options"
        />
        <div class="formContainer">
            <h3 class="title">企业门户官网</h3>
            <el-form
                    ref="loginFormRef"
                    :model="loginForm"
                    status-icon
                    :rules="loginRules"
                    label-width="80px"
                    class="loginform"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()"
                    >登录
                    </el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import {loadFull} from "tsparticles"
import {reactive,ref} from "vue";
import {useRouter} from 'vue-router'
import {useStore}  from "vuex";
import axios from 'axios'
const store = useStore()
//绑定组件需要的数据
const loginForm = reactive({
    username:"",
    password:""
})// 表单绑定的响应式对象
const loginFormRef = ref() //表单的引用对象

const loginRules = reactive({
    username:[
        {
            required:true,message:"请输入用户名",trigger:"blur"
        }
    ],
    password:[
        {
            required:true,message:"请输入密码",trigger:"blur"
        }
    ]
})
const router = useRouter()
//提交表单函数
const submitForm = ()=>{
    //1.校验表单
    loginFormRef.value.validate((valid)=>{
        if (valid){
            //提交表单到后台
            axios.post('/webapi/user/login',loginForm).then((res)=>{
                if (res.data.ActionType === 'OK'){
                    store.commit('changeUserInfo',res.data.data)
                    router.push('/')
                }else {
                    //TODO：通过防抖函数限制消息提示数量
                    ElMessage.error('用户名密码不正确')
                }
            })
        }
    })

}
//-------------
const particlesInit = async (engine) => {
    await loadFull(engine)
}
const options = {
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: {min: 1, max: 5},
        }
    },
    detectRetina: true
}

</script>
<style lang="scss" scoped>

.formContainer{
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba($color:#000000,$alpha:0.5);
  color:white;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
}
::v-deep .el-form-item__label{
  color: white;
}
.title{
  color: white;
  font-size: 30px;
}
.loginform{
  margin-top: 20px;
}
</style>