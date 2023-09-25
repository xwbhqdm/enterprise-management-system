<template>
  <div>
    <el-page-header title="产品管理" content="编辑产品" @back="handleBack()"/>
    <el-form
        ref="productFormRef"
        :model="productForm"
        status-icon
        :rules="productFormRules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title"/>
      </el-form-item>
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea"/>
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="productForm.detail" type="textarea"/>
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @avatarChange="handleChange"/>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm()"
        >
          更新产品
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import Upload from "@/components/upload/Upload.vue";
import upload from '@/util/upload'
import {useRouter,useRoute} from "vue-router"
import {useStore} from 'vuex'
import axios from 'axios'
const store = useStore()
const productFormRef = ref()
const router = useRouter()
const route = useRoute()
const productForm = reactive({
  title:"",
  detail:"",
  introduction:"",
  cover:"",
  file: null,
})
const productFormRules = reactive({
  title: [
    {
      required: true, message: "请输入名字", trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true, message: "请输入简要描述", trigger: "blur"
    }
  ],
  detail: [
    {
      required: true, message: "请输入详细描述", trigger: "blur"
    }
  ],
  cover: [
    {
      required: true, message: "请上传产品图片", trigger: "blur"
    }
  ],
})

//每次选择完图片之后的回调函数
const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file)
  productForm.file = file
}
const submitForm=()=>{
  productFormRef.value.validate(async (valid)=>{
    if (valid){
      //提交数据给后台
      await upload("/adminapi/product/list",{...productForm,username:store.state.userInfo.username})
      router.push('/product-manage/productlist')
    }
  })
}
onMounted(()=>{
  getData()
})
const getData=async ()=>{
  const res=await axios.get(`/adminapi/product/list/${route.params.id}`)
  console.log(res.data.data[0],'product')
  Object.assign(productForm,res.data.data[0])
}
const handleBack =()=>{
  router.back()
}
</script>
<style lang="scss" scoped>
.demo-ruleForm{
  margin-top: 50px;
}
</style>