// createRouter:创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import AboutView from '@/views/AboutView.vue'
import ProductView from '@/views/ProductView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import ExampleView from '@/views/ExampleView.vue'
// import NewsView from '@/views/NewView.vue'
import NewsDetailsView from '@/views/NewsDetailsView.vue'
import Solution from '@/views/Solution.vue'
import MainBusiness from '@/views/MainBusiness.vue'
import ContactInformation from '@/views/ContactInformation.vue'
import JoinUs from '@/views/JoinUs.vue'
import News from '@/views/news.vue'
import newsDetail from '@/views/newsDetail.vue'
import subGroup from '@/views/SubGroup.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', component: IndexView },
    { path: '/product', component: ProductView },
    { path: '/product/productId', component: ProductDetailsView },
    { path: '/example', component: ExampleView },
    { path: '/news', component: News },
    { path: '/news/newsId', component: NewsDetailsView },
    { path: '/about', component: AboutView },
    { path: '/overview', component: Solution },
    { path: '/MainBusiness', component: MainBusiness },
    { path: '/ContactInformation', component: ContactInformation },
    {path:'/JoinUs', component: JoinUs},
    {path:'/newsDetail/:id?',component: newsDetail},
    {path:'/subGroup/:id?',component: subGroup}
  ]
})

// 路由守卫：确保每次路由跳转时语言状态正确
router.beforeEach((to, from, next) => {
  // 导入语言管理工具
  import('@/utils/language.js').then(({ getCurrentLanguage }) => {
    const currentLang = getCurrentLanguage();
    
    // 确保 i18n 的语言设置与 localStorage 一致
    import('../../i18n/index.js').then((i18nModule) => {
      const i18n = i18nModule.default;
	      if (i18n.global.locale.value !== currentLang) {
	        i18n.global.locale.value = currentLang;
	      }
    });
  });
  
  next();
});

export default router
