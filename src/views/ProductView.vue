<script setup>
import { nextTick, onMounted, ref } from 'vue';
import Layout from '../components/common/Layout.vue';
import { getTabListAPI, getGoodsListAPI } from '@/apis/productAPI.js'
import { getSlidephotoAPI } from '@/apis/indexAPI.js'
import p1 from "@/assets/images/person/p1.jpg";
import p2 from "@/assets/images/person/p2.jpg";
import p3 from "@/assets/images/person/p3.jpg";
const one = ref({
	img: p1,
	name: '邵岩先生 ',
	position: '主席、非执行董事',
	date: '自2018年6月起担任董事会主席兼非执行董事',
	time: '于2016年8月加入本公司'
},)
const personLIst = ref([
	{
		img: p2,
		name: '代佳辉先生 ',
		position: '执行董事、总经理 ',
	},
	{
		img: p3,
		name: '王成瑞先生  ',
		position: '执行董事、公司秘书',
	}
])
const tabList = ref([]);
const goodsList = ref([]);
const slideshowPhoto = ref([]);
const defaultId = ref()
const getSlideshow = async () => {
	const { data: res } = await getSlidephotoAPI();
	console.log(res.Data);
	if (res.Data) {
		// console.log(res.Data[0].ImageUrl);
		const temp = res.Data
		console.log(temp.length);
		//命名别重复
		const photoslist = [];
		photoslist.length = 0
		for (let i = 0; i < res.Data.length; i++) {
			// 判断是否为空
			console.log(temp[i].ImageUrl);
			// if (temp[i].ImageUrl != null && temp[i].ImageUrl != ""){
			photoslist.push(temp[i].ImageUrl);
			// }
		}
		slideshowPhoto.value = photoslist
		console.log(slideshowPhoto.value);
	} else {
		slideshowPhoto.value = []

	}

}
//获取选项列表
const getTabList = async () => {
	const { data: res } = await getTabListAPI()
	tabList.value = res.Data
	defaultId.value = res.Data[0].Id
	console.log(defaultId.value, '这里');
	window.sessionStorage.setItem('defaultId', res.Data[0].Id);
};
// 点击选项切换选项
//从for循环得到的选项id发起请求获取该选项的产品列表
const getGoodsList = async (typeId) => {
	const { data: res } = await getGoodsListAPI(typeId)
	console.log(res.Data);
	goodsList.value = res.Data
};
// router and detail navigation removed because the detail template is currently disabled
onMounted(() => {
	getSlideshow();
	getTabList().then(() => {
		console.log(defaultId.value, '这里88888');
		getGoodsList(defaultId.value)
	})

	nextTick(() => {
		// console.log(defaultId.value,'这里9999');

		// getGoodsList(window.sessionStorage.getItem('defaultId'))
	})

})
</script>
<template>
	<Layout>
		<!--<div class="product-background"></div>-->

		<div class="layout-container" style="width: 100%">
			<div class="page-header">

				<!-- <el-carousel style="height:600px" arrow="never">
      <el-carousel-item v-for="item in slideshowPhoto" :key="item" style="height:634px">
				<el-image :src="item" style="width: 100%; height: 100%" fit="fill"/>
      </el-carousel-item>
    </el-carousel> -->

				<div class="container" style="text-align: center;font-size:60px;color:#fff;font-weight:400;">
					<p>机构设置</p>

				</div>
			</div>
		</div>
		<div class="layout-container" style="width: 100%">
			<div class="breadcrumb-box">
				<div class="am-container">
					<ol class="am-breadcrumb">
						<li><router-link to="/">首页</router-link></li>
						<li class="am-active">机构设置</li>
					</ol>
				</div>
			</div>
		</div>
		<div class="investor">管治团队</div>
		<div class="personContent animate__animated animate__backInRight" >
			<div class="per">
				<h1>{{ one.name }}</h1>
				<div>{{ one.position }}</div>
				<div>{{ one.date }}</div>
				<div>{{ one.time }}</div>
			</div>
			<div>
					<img :src="one.img" :alt="one.name + ' ' + one.position + '照片'" class="imgs">
			</div>
		</div>
			<div class="personContainer animate__animated animate__backInLeft">
			<div v-for="(item, index) in personLIst" :key="index" class="personContent personContent1 ">
				<div class="per">
					<h1>{{ item.name }}</h1>
					<div>{{ item.position }}</div>
				</div>
				<div>
					<img :src="item.img" :alt="item.name + ' ' + item.position + '照片'" class="imgs">
				</div>
			</div>
		</div>

		<!-- <div class="section">
			<div class="container" style="max-width: 1200px">
				<div class="section--header">
					<h2 class="section--title">机构设置中心</h2>
					<p class="section--description">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组织架构。
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
															<img :src="goods.ImageUrl1" :alt="goods.Title + '产品图片'">
									<p>{{goods.Title}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		 -->
	</Layout>
</template>


<style scoped>
.solution-page {
	background: url('@/assets/images/product/bg.jpg');
	color: #fff;
	padding: 110px 0 160px;
}

.el-carousel__container {
	width: 400px;
}

.personContent {
	max-width: 1352px;
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	background-color: #f9f9f8;
	width: 100%;
	height:250px;
}

.investor {
	font-size: 34px;
	font-weight: 700;
	margin-top: 20px;
}

.imgs {
	width: 500px;
	height: 250px;
}

.per {
	padding: 20px;
}

.personContainer {
	margin-bottom: 20px;
	display: flex;
	>div:nth-child(2){
		margin-left:2%;
	}
}
.personContent1 {
	width: 49%!important;

}
</style>
