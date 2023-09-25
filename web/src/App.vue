<template>
  <router-view/>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb{
  background-color: #1890ff;
}
::-webkit-scrollbar-track{
  background-color: #ddd;
}
</style>
<script setup>
  import Navbar from "@/components/Navbar.vue";
</script>