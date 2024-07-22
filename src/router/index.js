// createRouter:创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import AboutView from '@/views/Aboutview.vue'
import ProductView from '@/views/ProductView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import ExampleView from '@/views/ExampleView.vue'
import NewsView from '@/views/NewView.vue'
import NewsDetailsView from '@/views/NewsDetailsView.vue'
import Solution from '@/views/Solution.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path:'/',redirect:'/index'},
    { path:'/index',component:IndexView },
    { path:'/product',component:ProductView },
    { path: '/product/productId',component: ProductDetailsView },
    { path: '/example',component: ExampleView },
  { path: '/news', component: NewsView },
  { path: '/news/newsId', component: NewsDetailsView },
  { path: '/about', component: AboutView },
  { path: '/solution', component: Solution }
  ]
})

export default router
