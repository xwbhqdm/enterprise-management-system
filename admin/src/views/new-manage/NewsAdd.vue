<template>
  <div>
  <!-- TODO 封装组件 -->
    <el-page-header icon="" title="新闻管理" content="添加新闻"/>
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
        <editor @event="contentHandleChange"/>
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
          添加新闻
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
 import {ref,reactive} from 'vue'
 import {useRouter} from 'vue-router'
 import {useStore} from "vuex";
 import editor from '@/components/editor/Editor.vue'
 import Upload from "@/components/upload/Upload.vue";
 import upload from "@/util/upload";
 const router = useRouter()
 const store = useStore()
 const newsForm = reactive({
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
       //后台通信
       await upload("/adminapi/news/add",{...newsForm,username:store.state.userInfo.username})
       router.push('/news-manage/newslist')
     }
   })
 }
</script>
<style scoped lang="scss">
 .el-form{
   margin-top: 50px;
 }
</style>