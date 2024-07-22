<script setup>
import Layout from '../components/common/Layout.vue';
import {  onBeforeUnmount, onMounted, ref } from "vue";
import {getstudentAPI} from '@/apis/studentlistAPI.js'
import {getSlidephotoAPI,getAdvantageAPI,getServiceAPI} from '@/apis/indexAPI.js'
	const tabList = ref([
	{name:'家用电梯', desc:'一句话概括特点', icon:'fa fa-arrows-h'},
	{name:'家用电梯', desc:'一句话概括特点', icon:'am-icon-cog'},
				{name:'别墅电梯', desc:'一句话概括特点', icon:'am-icon-lightbulb-o'},
				{name:'观光电梯', desc:'一句话概括特点', icon:'am-icon-line-chart'},
				{name:'关于我们', desc:'一句话概括特点', icon:'am-icon-hourglass-end'},
])
	const tabIndex = ref(0)
	const slideshow = ref([])
	const advantageList = ref([
  {id:1,cover: new URL('../assets/images/index/f01.jpg',import.meta.url).href,title:'简单的适配过程',desc:'用户可快速学习适配开发，通过丰富的组件库完成页面功能的移动化适配。'},
				{id:2,cover: new URL('../assets/images/index/f01.jpg',import.meta.url).href,title:'简单的适配过程',desc:'用户可快速学习适配开发，通过丰富的组件库完成页面功能的移动化适配。'},
				{id:3,cover: new URL('../assets/images/index/f01.jpg',import.meta.url).href,title:'简单的适配过程',desc:'用户可快速学习适配开发，通过丰富的组件库完成页面功能的移动化适配。'},
				{id:4,cover: new URL('../assets/images/index/f01.jpg',import.meta.url).href,title:'简单的适配过程',desc:'用户可快速学习适配开发，通过丰富的组件库完成页面功能的移动化适配。'}
      ])
	const serviceList = ref([
	{id:1,icon:'am-icon-diamond',title:'多页面工作',desc:'标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理'},
				{id:2,icon:'am-icon-user',title:'多页面工作',desc:'标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理'},
				{id:3,icon:'am-icon-umbrella',title:'多页面工作',desc:'标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理'},
				{id:4,icon:'am-icon-briefcase',title:'多页面工作',desc:'标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理'},
])
const indexPhoto=ref()
	const changeTab = (ind)=>{
		tabIndex .value = ind
		indexPhoto.value.style.opcity = '1'
		// console.log(tabIndex.value);
	}

	const getSlideshow = async ()=>{
		const {data:res} = await getSlidephotoAPI();
      console.log(res.Data);
			slideshow.value = res.Data
	}
  const getAdvantage = async ()=>{
    const {data:res} = await getAdvantageAPI();
    console.log(res);
		advantageList.value = res.Data
  }
	const getService = async ()=>{
    const {data:res} = await getServiceAPI();
    console.log(res);
		serviceList.value = res.Data
  }
	const timer = ref(null)
	const swiper = ()=>{
		if(timer.value){
		return
		}
		let looper=(a)=>{
			if(tabIndex.value>=slideshow.value.length-1){
				tabIndex.value = -1
			}
			changeTab(tabIndex.value+1)
		}
		timer.value = setInterval(looper,3000)
	}
	const clearData = ()=>{
		if (timer.value) {
			clearInterval(timer.value);
			timer.value = null
		}
	}
	const closeit = ()=>{
		clearData();
	}
	const openit=()=>{
		swiper();
	}
  onMounted(()=>{
			getSlideshow();
			getAdvantage();
			getService();
			swiper();
			})
	onBeforeUnmount(()=>{
		clearData();
	})
</script>
<template>

<Layout>
  <div  style="width: 100%">
			<div class="index-page">
				<div data-am-widget="tabs" class="am-tabs am-tabs-default" >
					
					<div class="am-tabs-bd">
						<div ref="indexPhoto"
							class="am-tab-panel am-active"
							v-if="slideshow.length > 0"
							:style="{ backgroundImage: `url(${slideshow[tabIndex].ImageUrl})`,backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',transition:'all 2s'}" >
							<div class="index-banner">
								<div class="index-mask">
									<div class="container">
										<div class="am-g">
											<div class="am-u-md-10 am-u-sm-centered" style="text-align: center">
												<h1 class="slide_simple--title">{{slideshow[tabIndex].Name}}</h1>
												<p class="slide_simple--text am-text-left" style="display: flex;justify-content: center">
													{{slideshow[tabIndex].Desc}}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					

					<ul class="am-tabs-nav am-cf index-tab">
						<li v-for="(tab,index) in slideshow" :key="index" :class="tabIndex === index ? 'am-active':''"  @mouseenter="closeit()" @mouseleave="openit()" class="highlight">
							<a href="#" @click.prevent="changeTab(index)">
								<!-- <div class="am-u-md-3 am-u-sm-3 am-padding-right-0">
									<i :class="tab.Icon"></i>
								</div> -->
								<div class="school-item-right am-u-md-9 am-u-sm-9 am-text-left bgchover" style="text-align:center !important;width:100%;padding-left:0px;">
									<strong class="promo_slider_nav--item_title">{{tab.Name}}</strong>
									<p class="promo_slider_nav--item_description">{{tab.Introduction}}</p>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>

			
		</div>
		
		<div class="section">
			<div class="container" style="max-width: 1160px;">
				<div class="section--header">
					<h2 class="section--title">平台优势</h2>
					<p class="section--description-index">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;云码物联智慧AI一脸通系统平台，是一群有着15年以上专业行业场景经验的专业人员全新开发的一套集多介质、多场景、多模块的管理系统软件方案平台，平台部署灵活、系统模块适应多场景的应用需求，在不同行业的场景、需求、第三方关键环节里，可以高效解决用户在管理的痛点，实现系统的快速落地。
					</p>
				</div>
				
				<div class="index-container avdlayout">
					<div class="am-g" style="display: flex; flex-direction:row; flex-wrap: wrap;">
						<div class="am-u-md-3" v-for="(advantage,index) in advantageList" :key="index">
							<div class="features_item">
								<img :src="advantage.Cover" style="width:260px; height: 200px;" alt="">
								<h3 class="features_item--title">{{advantage.Title}}</h3>
								<p class="features_item--text">{{advantage.Desc}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="section" style="border-bottom: 1px solid #e9e9e9; padding-top: 0">
			<div class="container" style="max-width: 1160px;">
				<div class="section--header">
					<h2 class="section--title">我们的服务</h2>
					<p class="section--description-index">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;云码物联秉承专业、认真的工作态度，为我们的合作伙伴提供多样化的软件平台合作方式、项目合作方式，我们所提供的软件平台，可以支持您现有的硬件终端，不乏旷视、海康、宇视、微耕、臻视这些品牌专业硬件厂家，同时也可以根据项目需要，实现合作伙伴自有硬件定制接入，最终达到合作共赢。
					</p>
				</div>
				
				<div class="index-container">
					<div class="am-g" style="display: flex; flex-direction:row; flex-wrap: wrap;">
						<div class="am-u-md-3" v-for="(service,index) in serviceList" :key="index">
							<div class="service_item">
								<!-- <i class="service_item--icon" :class="service.Icon"></i> -->
								<img :src="service.Icon" style="width:228px;height: 228px;" />
								<h3 class="service_item--title">{{ service.Title }}</h3>
								<div class="service_item--text"><p>{{service.Desc}}</p></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</Layout>
</template>



<style>
.highlight:hover{
	background: RGB(156,214,231);
	/* border: 1px solid #59bcdb; */
	/* box-sizing: border-box; */
}
.bgchover:hover{
	background: RGB(156,214,231);

}
</style>