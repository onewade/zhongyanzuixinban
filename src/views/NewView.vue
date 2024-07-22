<script setup>
import { computed, onMounted, ref } from 'vue';
import Layout from '../components/common/Layout.vue';
import {getArticleAPI} from '@/apis/newAPI.js'
import { useRouter } from 'vue-router'

	const first = ref(0);
  const articles = ref({})
  const pageIndex = ref(1);
	const pageSize = ref(6);
	const total = ref(13)
		//获取公司动态文章
  const getArticle = async(pageIndex,pageSize)=>{
		const {data:res} = await getArticleAPI(pageIndex,pageSize)
		articles.value = res.Data
		total.value = res.Data.Total
		console.log(articles.value);
		console.log(total.value);

  };
	const pages = computed(()=>{
				return Math.ceil(total.value / pageSize.value)
			})
		// 切换页码
    const changeIndex = (p)=>{
      if (p === 0){
				pageIndex.value = 1
				console.log('00000000');
				console.log('第多少页'+pageIndex.value);
				console.log(pages.value);
			}else if (p === pages.value + 1){
				pageIndex.value = pages.value
				console.log('1111111');
				console.log('第多少页'+pageIndex.value);
				console.log(pages.value);
			}else{
				pageIndex.value = p;
				console.log('2222222');
				console.log('第多少页'+pageIndex.value);
				console.log(pages.value);
				// 根据页码获取公司动态文章
				getArticle(p,pageSize.value)
			}
    };
		const router = useRouter()

		// 点击跳转路由文章详情页
    const handleDetails = (ArticleId)=>{
			window.localStorage.setItem('ArticleId',ArticleId);
			router.push({path:'/news/newsId'})
      
    };
		
    onMounted(()=>getArticle(1,pageSize.value))
</script>
<template>
	<Layout>
		<div class="layout-container" style="width: 100%">
			<div class="page-header">
				<div class="am-container">
					<h1 class="page-header-title">公司动态</h1>
				</div>
			</div>
			
			<div class="breadcrumb-box">
				<div class="am-container">
					<ol class="am-breadcrumb">
						<li><router-link to="/">首页</router-link></li>
						<li class="am-active">公司动态</li>
					</ol>
				</div>
			</div>
		</div>
		
		<div class="section">
			<div class="container" style="max-width: 1160px">
				<div class="section--header">
					<h2 class="section--title">最近新闻</h2>
					<p class="section--description" v-if="articles.Records">
						<!-- 云适配与中建材信息技术股份有限公司（以下简称“中建信息”）联合举办的“战略
						<br>合作签约仪式暨全国跨屏行动启动大会”在北京成功举办。 -->
						{{ articles.Records[first].Introduction}}
					</p>
				</div>
				
				<div class="news-contaier">
					<div class="blog">
						<div class="am-g">
							<div class="am-u-lg-4 am-u-md-6 am-u-end" v-for="(article,index) in articles.Records" :key="index">
								<div class="article">
									<div class="article-img">
										<img :src="article.Cover" alt="" />
									</div>
									<!-- 命名的路由 -->
									<div class="article-header">
										<h2><p @click="handleDetails(article.ArticleId)" style="display: inline;">{{article.Title}}</p></h2>
										<ul class="article--meta">
											<li class="article--meta_item -date">{{article.CreateTime.replace(/T/," ")}}</li>
										</ul>
									</div>
									<div class="article--content">
										<p>{{article.Introduction}}</p>
									</div>
									<div class="article--footer">
										<p @click="handleDetails(article.ArticleId)" class="link">查看更多</p>
									</div>
								</div>
							</div>
						</div>
						
						<ul class="am-pagination" style="text-align: center;">
							<li :class="pageIndex === 1 ? 'am-disabled':''"
								@click="changeIndex(pageIndex - 1)">
								<a href="#">&laquo;</a>
							</li>
							
							<li v-for="(p,index) in pages"
								:key="index"
								@click="changeIndex(p)"
								:class="pageIndex === p ? 'am-active':''">
								<a href="#">{{p}}</a>
							</li>
							
							<li :class="pageIndex === pages ? 'am-disabled':''"
								@click="changeIndex(pageIndex + 1)">
								<a href="#">&raquo;</a>
							</li>
						</ul>
					</div>
				
				</div>
			</div>
		</div>
		
	</Layout>
</template>

<style scoped>

</style>
