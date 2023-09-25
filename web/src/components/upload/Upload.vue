<template>
    <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
    >
        <img v-if="props.avatar" :src="uploadAvatar" class="avatar"/>
        <el-icon
                v-else class="avatar-uploader-icon"
        >
            <Plus/>
        </el-icon>
    </el-upload>
</template>
<script setup>
import {Plus} from "@element-plus/icons-vue";
import {defineEmits,defineProps,computed} from 'vue'
const props = defineProps({
    avatar:String
})
const emit = defineEmits(["avatarChange"])
//每次选择完图片之后的回调函数
const handleChange = (file) => {
    emit("avatarChange",file.raw)
}
//定义一个计算属性用于计算头像路径
const uploadAvatar = computed(() => {
    //如果图片路径包含blob字段 就返回userForm.avatar 如果不包含就进行拼串
    return props.avatar.includes("blob") ?props.avatar : 'http://localhost:3000' + props.avatar
})
</script>
<style lang="scss" scoped>
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>