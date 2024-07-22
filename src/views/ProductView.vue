<script setup>
import { nextTick, onMounted, ref } from 'vue';
import Layout from '../components/common/Layout.vue';
import {getTabListAPI,getGoodsListAPI} from '@/apis/productAPI.js'
import {getSlidephotoAPI} from '@/apis/indexAPI.js'
import { useRouter } from 'vue-router'
    const tabList =ref([]);
    const list = ref([]);
    const tabIndex = ref(0);
    const goodsList = ref([]);
		const slideshowPhoto = ref([])
		const defaultId =ref()
		const getSlideshow = async ()=>{
		const {data:res} = await getSlidephotoAPI();
      console.log(res.Data);
			if(res.Data){
      // console.log(res.Data[0].ImageUrl);
			const temp = res.Data
			console.log(temp.length);
			//命名别重复
			const photoslist = [];
					photoslist.length = 0
			for(let i=0; i<res.Data.length; i++){
			// 判断是否为空
			console.log(temp[i].ImageUrl);
			// if (temp[i].ImageUrl != null && temp[i].ImageUrl != ""){
							photoslist.push(temp[i].ImageUrl);
						// }
			}
			slideshowPhoto.value = photoslist
			console.log(slideshowPhoto.value);
		}else{
			slideshowPhoto.value = []
		
		}
			
	}
		//获取选项列表
    const getTabList = async()=>{
		const {data:res} =await getTabListAPI()
		tabList.value = res.Data
		defaultId.value = res.Data[0].Id
		console.log(defaultId.value,'这里');
		window.sessionStorage.setItem('defaultId',res.Data[0].Id);
    };
		// 点击选项切换选项
    const changeTab = (index,typeId)=>{
      //点击选项后高亮索引
			tabIndex.value = index
			console.log(typeId)
			// 得到切换选项的id 传给获取产品列表的方法getGoodsList()
			getGoodsList(typeId)
    };
		//从for循环得到的选项id发起请求获取该选项的产品列表
    const getGoodsList = async(typeId)=>{
			const {data:res} = await getGoodsListAPI(typeId)
			console.log(res.Data);
			goodsList.value = res.Data
    };
		const router = useRouter()
		// 点击跳转路由产品详情页
    const handleDetails = (productId)=>{
			window.localStorage.setItem('productId',productId);
			router.push({path:'/product/productId'})
      
    };
    onMounted(()=>{
			// getSlideshow();
      getTabList().then(()=>{
				console.log(defaultId.value,'这里88888');
				getGoodsList(defaultId.value)
			})
			
			nextTick(()=>{
		// console.log(defaultId.value,'这里9999');
				
			// getGoodsList(window.sessionStorage.getItem('defaultId'))
			})
      
    })
</script>
<template>
	<Layout>
		<!--<div class="product-background"></div>-->
		
		<div class="layout-container" style="width: 100%">
			<div class="page-header"  >

				<!-- <el-carousel style="height:600px" arrow="never">
      <el-carousel-item v-for="item in slideshowPhoto" :key="item" style="height:634px">
				<el-image :src="item" style="width: 100%; height: 100%" fit="fill"/>
      </el-carousel-item>
    </el-carousel> -->
				
				<div class="container" style="text-align: center;font-size:60px;color:#fff;font-weight:400;">
					<p>产品中心</p>
					
				</div>
			</div>
		</div>
		<div class="layout-container" style="width: 100%">
			<div class="breadcrumb-box">
				<div class="am-container">
					<ol class="am-breadcrumb">
						<li><router-link to="/">首页</router-link></li>
						<li class="am-active">产品中心</li>
					</ol>
				</div>
			</div>
		</div>
		
		<div class="section">
			<div class="container" style="max-width: 1200px">
				<div class="section--header">
					<h2 class="section--title">产品展示中心</h2>
					<p class="section--description">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提供最佳的解决方案。通过高效解决问题，企业能够提高生产效率，降低成本，并增强竞争力。
					</p>
				</div>
				
				<div class="solution-container">
					<div data-am-widget="tabs" class="am-tabs ">
						<ul class="am-tabs-nav am-cf">
							<li v-for="(tab,index) in tabList"
								:key="index"
								@click.prevent="changeTab(index,tab.Id)"
								:class="tabIndex === index ? 'am-active':''" style="margin:0 10px;">
								<a style="text-align:center;" href="#">{{tab.TypeName}}</a>
							</li>
						</ul>
						<div class="am-tabs-bd">
							<div class=am-tabs-tab>
								<div class="am-tab"
									v-for="(goods,index) in goodsList"
									:key="index"
									@click="handleDetails(goods.Id)">
									<img :src="goods.ImageUrl1" alt="">
									<p>{{goods.Title}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</Layout>
</template>


<style  scoped>
 .solution-page {
     background: url('@/assets/images/product/bg.jpg'); 
      color: #fff;
     padding: 110px 0 160px; 
 }
.el-carousel__container{
	width: 400px;
 }
</style>
