
<script setup>
import {reactive, onMounted} from 'vue'
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
  <!-- 一级路由出口组件 -->
  <RouterView/>
  
</template>
<style lang="scss" scoped>
.test{
  // color: $priceColor;
}
</style>