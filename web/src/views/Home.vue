<template>
    <div class="container">
      <el-carousel height="calc(100vh - 59px)">
        <el-carousel-item v-for="item in 4" :key="item">
          <div :style="{backgroundImage:`url(${require('@/assets/home1.jpg')})`}">

          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="center">
        互联网+时代
      </div>
    </div>
</template>
<style lang="scss" scoped>
.el-carousel div{
  height: 100%;
  background-size: cover;
}
.container{
  position: relative;
  height: calc(100vh - 59px);
}
.center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  line-height: 100px;
  font-size: 60px;
  color: white;
  text-align: center;
}
</style>
<script setup>
</script>