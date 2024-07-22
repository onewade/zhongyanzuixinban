<script setup>
import { onMounted, ref } from 'vue';
import Layout from '../components/common/Layout.vue';
import {getArticleByArticleIdAPI,getRecentArticleAPI} from '@/apis/newAPI.js'
import { useRouter } from 'vue-router'


  const article = ref({});
  const recentArticles = ref([])
		// 获取文章数据
  const getArticleByArticleId = async(articleId)=>{
    const {data:res} = await getArticleByArticleIdAPI(articleId)
		if(res.Data){
			article.value = res.Data
			console.log(res);
			getRecentArticle(articleId)}
  };
		// 获取附近其他文章
  const getRecentArticle = async(articleId)=>{
    const {data:res} = await getRecentArticleAPI(articleId)
		console.log(res.Data);
		recentArticles.value = res.Data
  };
	const router = useRouter()

		// 点击跳转路由文章详情页
    const handleDetails = (ArticleId)=>{
			console.log('触发跳转路由');
			window.localStorage.setItem('ArticleId',ArticleId);
			// router.push({path:'/news/newsId'})
      getArticleByArticleId(ArticleId)
    };
  onMounted(()=>getArticleByArticleId(window.localStorage.getItem('ArticleId')))
</script>
<template>
	<Layout>
		
		<div class="layout-container" style="width: 100%;">
			<div class="page-header" style="max-height: 14px;"></div>
			<div class="breadcrumb-box">
				<div class="am-container">
					<ol class="am-breadcrumb">
						<li><router-link to="/news">公司动态</router-link></li>
						<li class="am-active">文章详情</li>
					</ol>
				</div>
			</div>
		</div>
		
		<div class="section" style="width: 100%; max-width: 1160px">
			<div class="container" style="max-width: 1160px">
				<div class="section--header">
					<h2 class="section--title">{{article.Title}}</h2>
					<p class="section--description">{{article.Introduction}}</p>
				</div>
				
				<div class="join-container">
					<div class="am-g">
						<div class="am-u-md-3">
							<div class="careers--articles">
								<!--<h3 class="careers&#45;&#45;subtitle">文章信息</h3>-->
								<div class="careers_articles">
									<div class="careers_article" v-for="(article,index) in recentArticles" :key="index">
										<div class="image">
											<img style="height: 160px;width: 240px;" :src="article.Cover" alt="">
										</div>
										<h3 class="careers_article--title">{{ article.Title }}</h3>
										<div class="careers_article--text">{{article.Introduction}}</div>
										<div class="careers_article--footer">
											<!-- 命名的路由 -->
											<p @click="handleDetails(article.ArticleId)" class="link" style="color: #59bcdb;">查看更多</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div class="am-u-md-9">
							<!--<h3 class="careers&#45;&#45;subtitle">文章内容</h3>-->
							<div class="careers--vacancies">
								<div class="am-panel-group" id="accordion">
									<div class="am-panel am-panel-default">
										<div class="am-panel-hd">
											<h4 class="am-panel-title" data-am-collapse="{parent: '#accordion', target: '#do-not-say-1'}" v-if="article.CreateTime">
												<!-- 作者：{{article.Author}} &nbsp;&nbsp;&nbsp;&nbsp; / -->
												 &nbsp;&nbsp;&nbsp;&nbsp; 发布时间：{{article.CreateTime.replace(/T/," ")}}
											</h4>
										</div>
										<div class="am-panel-collapse am-collapse am-in">
											<div class="am-panel-bd">
												<!-- 正文 -->
												<div class="vacancies--item_content js-accordion--pane_content"
													v-html="article.ContentHtml">
												</div>
											</div>
										</div>
									</div>
								</div>
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
