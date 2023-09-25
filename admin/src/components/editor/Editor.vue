<template>
  <div id="myeditor">

  </div>
</template>
<script setup>
import E from 'wangeditor'
import {onMounted,defineEmits,defineProps} from 'vue'
const emit = defineEmits(["event"])
//defineProps用于接收组件传过来的值
const props = defineProps({
  content:String
})
onMounted(()=>{
  const editor = new E("#myeditor")
  editor.config.onchange = function (newHtml) {
    //子传父
    emit('event',newHtml)
  };
// 配置触发 onchange 的时间频率，默认为 200ms
  editor.config.onchangeTimeout = 3000; // 修改为 500ms
  editor.create()
  props.content && editor.txt.html(props.content)
})
</script>