// 导入一个方法defineStore
import { getCategoryAPI } from '@/apis/layout';
import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('counter',()=>{
  // 定义数据（state）
const categoryList = ref([])
  // 定义修改数据的方法(action 同步+异步)
const getCategory = async ()=>{
  const res = await getCategoryAPI()
    categoryList.value = res.result
}

  // 以对象的方式return供组件使用
  return{ 
    categoryList,
  getCategory
  }
})