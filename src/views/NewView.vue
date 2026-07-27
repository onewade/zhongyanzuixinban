<script setup>
import { onMounted, ref } from 'vue';
import Layout from '../components/common/Layout.vue';
import { getArticleAPI } from '@/apis/newAPI.js'

const first = ref(0);
const articles = ref({})
const pageSize = ref(6);
const total = ref(13)
//获取公司动态文章
const getArticle = async (pageIndex, pageSize) => {
		const { data: res } = await getArticleAPI(pageIndex, pageSize)
		articles.value = res.Data
		total.value = res.Data.Total

	};
// pagination computation removed because pagination UI isn't used in simplified view
// 切换页码

// Pagination and detail navigation currently unused in simplified view; keep code commented for future use
const newList = ref([
	{
		title: '【挥洒汗水 奋勇争先】中烟香港参加第九届中企协运动会',
		time: '2024.10.26',
	},
	{
		title: '中烟香港亮相多特蒙德InterTabac 2024国际烟草展会 深化全球烟草市场布局',
		time: '2024.09.19',
	},
	{
		title: '【媒体动态】中企送温暖  欢乐满耀东',
		time: '2024.09.16',
	},
	{
		title: '【媒体动态】迎中秋，庆国庆！   中企联合议员开展香港地区关爱活动',
		time: '2024.09.14',
	},
	{
		title: '【券商聚焦】安信国际维持中烟香港(06055)「买入」评级 指卷烟出口的恢复性增长给...',
		time: '2024.09.04',
	}
])

onMounted(() => getArticle(1, pageSize.value))
</script>
<template>
	<Layout>
		<div class="layout-container" style="width: 100%">
			<div class="page-header">
				<div class="am-container">
					<div class="page-header-title">公司动态</div>
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

		<div class="">
			<div class="container">
				<div class="section--header">
					<h2 class="newTitle">最近新闻</h2>
					<p v-if="articles.Records" class="section--description">
						<!-- 云适配与中建材信息技术股份有限公司（以下简称“中建信息”）联合举办的“战略
						<br>合作签约仪式暨全国跨屏行动启动大会”在北京成功举办。 -->
						{{ articles.Records[first].Introduction }}
					</p>
				</div>
				<div>
					<div v-for="(item, index) in newList" :key="index" class="newsContainer">
						<div>{{ item.title }}</div>
						<div>{{ item.time }}</div>
					</div>
				</div>

				<!-- <div class="news-contaier">
					<div class="blog">
						<div class="am-g">
							<div class="am-u-lg-4 am-u-md-6 am-u-end" v-for="(article,index) in articles.Records" :key="index">
								<div class="article">
									<div class="article-img">
										<img :src="article.Cover" :alt="article.Title + '封面图片'" />
									</div> -->
				<!-- 命名的路由 -->
				<!-- <div class="article-header">
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
						</div> -->

				<!-- <ul class="am-pagination" style="text-align: center;">
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
						</ul> -->
				<!-- </div> -->

				<!-- </div> -->
			</div>
		</div>

	</Layout>
</template>

<style scoped lang="scss">
.newTitle {
	font-size: 24px;
	text-align: center;
	margin-top:20px;
}

.newsContainer {
	>div:nth-child(1) {
		font-size: 20px;
		font-weight: bold;
	}
    width: 1200px;
	padding:30px;
	font-size: 14px;
	box-shadow: 5px 5px 5px 5px #eeeeee;
	margin: 20px 0px;
	cursor: pointer;
}
.newsContainer:hover {
	background-color: #f9f9f8;
	transform: scale(1.1);
}
</style>
