<script setup>
import AppFunctions from "@/utils/AppFunctions";
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import {getCompanyInfoAPI} from '@/apis/aboutourAPi.js'
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
 const CompanyInfo = ref({})//后台数据获取
 const CompanyInfo1 = ref(JSON.parse(window.sessionStorage.getItem('companyinfo'))?JSON.parse(window.sessionStorage.getItem('companyinfo')):'0')//从会话储存获取
  const getCompanyInfo = async()=>{
		const {data:res} = await getCompanyInfoAPI()
		CompanyInfo.value = res.Data
		window.sessionStorage.setItem('companyinfo',JSON.stringify(res.Data) )
		console.log('获取成功');

	}
  const toggleStickyHeader = ()=>{
    const scrolled = document.documentElement.scrollTop;
			if (scrolled > 100) {
				AppFunctions.addClass('.header-default', 'sticky');
			} else if (scrolled <= 100) {
				AppFunctions.removeClass('.header-default', 'sticky');
			}
  }
  const callPhone = ()=>{
    ElMessage({
    message: h('p', null, [
      h('span', null, '联系电话 '),
      h('i', { style: 'color: teal' },`${CompanyInfo.value.Phone}`),
    ]),
		type: 'success',
		offset:80
  })
  }
  onMounted(()=> {
  window.addEventListener('scroll', toggleStickyHeader);
  toggleStickyHeader();
	getCompanyInfo().then(()=>{
	if(CompanyInfo1.value =='0'){
		console.log('执行');
		// getCompanyInfo().then(()=>{
		router.go(0)
		// })
		
	}
	})
	
  })
  onBeforeUnmount(()=>{
    window.removeEventListener('scroll', toggleStickyHeader);
  })
</script>
<template>
	<div class="header-wrapper" >
		<div class="header">
			<div class="header-left">
				<img :src="CompanyInfo1.Image1" alt="" @click="router.push('/')">
			</div>
			<div class="header-mid">
				<div class="header-item" style="display:none;">
					<i style="color:rgb(31 139 193)" class="contact-icon am-icon-phone"></i>
					<div class="item">
						<strong>{{ CompanyInfo1.Phone }}</strong>
						<span>{{CompanyInfo1.WorkTime}}</span>
					</div>
				</div>
				<div class="header-item">
					<!-- <i style="color:rgb(31 139 193)" class="contact-icon am-icon-map-marker" ></i> -->
					<div class="item">
						<strong style="font-size:25px">{{CompanyInfo1.Name}}</strong>
						<span v-if="CompanyInfo1.Address" style="display:none;">{{CompanyInfo1.Address.replace(/ /,'').replace(/ /,'')}}</span>
					</div>
				</div>
			</div>
			<div class="header-right">
				
					<el-button type="button" @click="callPhone()">联系我们</el-button>
				
			</div>
		</div>
		
		<div class="nav-wrapper header-default">
			<div class="nav">
				<ul class="am-nav am-nav-pills am-nav-justify">
					<li><router-link class="router" to="/index">网站首页</router-link></li>
					<li><router-link class="router" to="/solution">解决方案</router-link></li>
					<li><router-link class="router" to="/product">产品中心</router-link></li>
					<li><router-link class="router" to="/example">客户案例</router-link></li>
					<li><router-link class="router" to="/news">公司动态</router-link></li>
					<li><router-link class="router" to="/about">关于我们</router-link></li>
				</ul>
			</div>
		</div>
	</div>
</template>



<style scoped>
.router.router-link-active{
	/*color: #fff;*/
	/*background-color: #0e90d2;*/
	/*border: 1px solid #0e90d2;*/
	cursor: default;
	
	color: #0e90d2;
}
.header-wrapper{
	-moz-user-select: none;
  -khtml-user-select: none; 
  user-select: none;
}
</style>
