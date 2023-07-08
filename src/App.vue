
<script setup>
import {reactive} from 'vue'
import {ref} from'vue'
// 接受 对象类型 数据的参数传入并返回一个响应式的对象
const state = reactive({
    count:0
})
// 简单类型
const count =ref(0)
const setCount = ()=>{
  state.count++
  console.log(state);
}
const addcount =()=>{
  count.value++
  console.log(count);
}
</script>

<template>
  <div>八嘎{{ count }}</div>
  <button @click="setCount">{{ state.count }}</button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
</template>