// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@fontsource/noto-sans-sc';

//引入动画插件
import "animate.css/animate.min.css";

// 引入字体
import 'font-awesome/css/font-awesome.css'

// 引入响应式样式
import './styles/main.scss'

// 引入初始化样式文件
import './assets/css/style.css'

// 引入懒加载指令插件并且注册
import {lazyPlugin} from '@/directives/index.js'
// 中英文切换
import i18n from '../i18n/index.js';
// 语言管理工具
import { initLanguage } from '@/utils/language.js';
// 引用animate.css
import 'animate.css'

// 初始化语言设置
initLanguage();
// 移动端适配

// 引入响应式监听目标元素的可见性
// import { useIntersectionObserver } from '@vueuse/core'

// 测试接口函数
// import {getCategory} from '@/apis/testAPI.js'
// getCategory().then(res =>{
//   console.log(res);
// })

// 注册插件
const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(lazyPlugin)
app.use(i18n)
app.use(ElementPlus)
app.mount('#app')





// 定义全局指令
// app.directive('img-lazy',{
//     mounted(el,binding){
//     // el:指令绑定的那个元素代码img
//     // binding：binding.value 指令等于号后面绑定的表达式的值 图片url
//     console.log(el,binding.value);
//     useIntersectionObserver(
//       el,
//       ([{ isIntersecting }]) => {
//         console.log(isIntersecting);
//         if(isIntersecting){
//         // 进入视口区域
//         el.src = binding.value
//         }
//       }
//       )
//     }
// })