<template>
  <div>
    <!-- TODO 封装组件 -->
    <el-page-header title="新闻管理" content="编辑新闻" @back="handleback"/>
    <el-form
        ref="newsFormRef"
        :model="newsForm"
        status-icon
        :rules="newsFormRules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title"/>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor @event="contentHandleChange" :content="newsForm.content" v-if="newsForm.content"/>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="newsForm.category" style="width: 100%">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @avatarChange="UploadHandleChange"/>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm"
        >
          更新新闻
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {ref,reactive,onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import editor from '@/components/editor/Editor.vue'
import upload from "@/util/upload";
import axios from 'axios'
import Upload from "@/components/upload/Upload.vue";
const router = useRouter()
//route拿到当前路由
const route = useRoute()
let newsForm = reactive({
  title:"",
  content:"",
  category:1,//1最新动态 2典型案例 3通知公告
  cover:"",
  file:null,
  ispublish:0//用于在官网过滤已经发布的新闻 0未发布 1已发布
})
const newsFormRef = ref()
const newsFormRules = reactive({
  title: [
    {
      required: true, message: "请输入标题", trigger: "blur"
    }
  ],
  content: [
    {
      required: true, message: "请输入内容", trigger: "blur"
    }
  ],
  category: [
    {
      required: true, message: "请选择分类", trigger: "blur"
    }
  ],
  cover: [
    {
      required: true, message: "请上传头像", trigger: "blur"
    }
  ],
})
const options=[
  {
    value:1,
    label:'最新动态'
  },
  {
    value:2,
    label:'典型案例'
  },
  {
    value:3,
    label:'通知公告'
  },
]
const contentHandleChange =(data)=>{
  newsForm.content = data
}
const UploadHandleChange = (file)=>{
  console.log(file,'file')
  newsForm.cover = URL.createObjectURL(file)
  newsForm.file = file
}
const submitForm =()=>{
  newsFormRef.value.validate(async (valid)=>{
    if (valid){
      console.log(newsForm,'12312321')
      //后台通信
     await upload('/adminapi/news/list',newsForm)
      router.back()
    }
  })
}
const handleback=()=>{
  router.back()
}
onMounted(async ()=>{
  const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
  console.log(res.data.data[0])
  Object.assign(newsForm,res.data.data[0])
  console.log(newsForm,'123')
})
</script>
<style scoped lang="scss">
.el-form{
  margin-top: 50px;
}
</style>