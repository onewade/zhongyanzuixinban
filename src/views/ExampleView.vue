<script setup>
import Layout from '@/components/common/Layout.vue'
import { nextTick, onMounted, onUpdated, ref } from 'vue'
import {findExampleAPI,getExempleTablistAPI} from '@/apis/exempleAPI.js'
  const tabIndex = ref(0);
  const tabList = ref([
  {id:1,name:'主要案例',icon:'am-icon-map-o'},
				{id:1,name:'客户案例一',icon:'am-icon-scribd'},
				{id:1,name:'客户案例二',icon:'am-icon-odnoklassniki'},
				{id:1,name:'客户案例三',icon:'am-icon-building-o'},
				{id:1,name:'客户案例四',icon:'am-icon-hand-scissors-o'},
				{id:1,name:'客户案例五',icon:'am-icon-camera'},
]);
  const list = ref([])
	const firstproId =ref()

	const changeTab = (index,Id)=>{
		tabIndex.value = index
		// findExample(index+1)
		findExample(Id)
	}
	const getExempleTablist = async ()=>{
	const {data:res} = await getExempleTablistAPI()
	console.log(res.Data);
	firstproId.value = res.Data[0].Id
	// window.sessionStorage.setItem('firstproId',res.Data[0].Id)
	tabList.value = res.Data
	console.log(tabList.value);
	}

	const findExample = async(ExampleType)=>{
		console.log('触发切换案例');
		const {data:res} = await findExampleAPI(ExampleType)
		if (res.Data){
					const temp = res.Data
					console.log(temp)
					//命名别重复
					const photoslist = [];
					photoslist.length = 0
					for (let i = 1; i < 17; i++) {
						// 判断是否为空
						if (temp['Image'+ i] != null && temp['Image'+ i] != ""){
							photoslist.push(temp['Image'+ i])
						}
					}
					list.value = photoslist
					console.log('789');
					console.log(list.value)
				}else{
					list.value = []
				}
	}
	
	onMounted(()=>{
		
		getExempleTablist().then(()=>{
		findExample(firstproId.value)
		})
		nextTick(()=>{
		// findExample(window.sessionStorage.getItem('firstproId'));
		})
		
	})
onUpdated(()=>{
	// findExample(window.sessionStorage.getItem('firstproId'));
})
</script>
<template>
	<Layout>
		<div class="layout-container" style="width: 100%">
			<div class="page-header">
				<div class="am-container">
					<h1 class="page-header-title">客户案例</h1>
				</div>
			</div>
			<div class="breadcrumb-box">
				<div class="am-container">
					<ol class="am-breadcrumb">
						<li><router-link to="/">首页</router-link></li>
						<li class="am-active">客户案例</li>
					</ol>
				</div>
			</div>
		</div>
		
		<div class="section example">
			<div class="container" style="max-width: 1160px; margin: 0 auto">
				<div class="section--header">
					<h2 class="section--title">全球首创 自主创新</h2>
					<p class="section--description">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提供长期的支持。解决方案供应商应该能够提供培训、技术支持和维护等服务，以确保解决方案的稳定运行。
					</p>
				</div>
				
				<div class="example-container">
					<div class="am-tabs">
						<ul class="am-tabs-nav am-nav am-nav-tabs am-g">
							<li
v-for="(tab,index) in tabList" :key="index"
								class="am-u-md-2"
								style="float: left;"
								:class="tabIndex === index ? 'am-active':''"
								@click.prevent="changeTab(index,tab.Id)">
								<a href="#"><i :class="tab.Icon"></i>{{tab.ListName}}</a>
							</li>
						</ul>
						
						<div class="tabs">
							<div v-for="(image,index) in list" :key="index" class="tab">
							<img :src="image" :alt="(tabList[tabIndex]?.ListName || '案例') + '展示图片 ' + (index + 1)">
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Layout>
</template>


<style scoped>

</style>
