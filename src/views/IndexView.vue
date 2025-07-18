<script setup>
import Layout from '../components/common/Layout.vue';
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getstudentAPI } from '@/apis/studentlistAPI.js';
import { getSlidephotoAPI, getAdvantageAPI, getServiceAPI } from '@/apis/indexAPI.js';
import index1 from '../assets/images/newindex/lunbo1.png';
import index2 from '../assets/images/newindex/lunbo2.png';
import index3 from '../assets/images/newindex/lunbo3.png';
import c1 from '../assets/images/newIndex/c1.png';
import c2 from '../assets/images/newindex/c2.png';
import c3 from '../assets/images/newindex/c3.png';
import news from '../assets/images/newindex/news.png';
import news1 from '../assets/images/newindex/news1.png';
import news2 from '../assets/images/newindex/news2.png';
import { useRouter } from 'vue-router';
// 导入swiper组件
import { Swiper, SwiperSlide } from "swiper/vue";
// 引入swiper样式（按需导入）
import "swiper/css";
import "swiper/css/pagination"; // 轮播图底面的小圆点
import "swiper/css/autoplay"; // 自动播放样式
// 引入swiper核心和所需模块
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
const modules = [Mousewheel, Pagination, Autoplay];

// swiper实例
const homeSwiper = ref(null);
// 初始化
const onSwiper = (swiper) => {
	homeSwiper.value = swiper;
};
// swiper切换时触发
const onSlideChange = (swiper) => {

};

const tabList = ref([
	{ name: '家用电梯', desc: '一句话概括特点', icon: 'fa fa-arrows-h' },
	{ name: '家用电梯', desc: '一句话概括特点', icon: 'am-icon-cog' },
	{ name: '别墅电梯', desc: '一句话概括特点', icon: 'am-icon-lightbulb-o' },
	{ name: '观光电梯', desc: '一句话概括特点', icon: 'am-icon-line-chart' },
	{ name: '关于我们', desc: '一句话概括特点', icon: 'am-icon-hourglass-end' },
])
const tabIndex = ref(0)
const slideshow = ref([
	{
		ImageUrl: index3,
		// Name: 'eee',
		// Desc: '聚焦市场拓展',
		// Desc1: '聚力公司治理',
		// Desc2: '聚心社会价值',
		// Desc3: 'FOCUS ON MARKET EXPANSION',
		// Desc4: 'FOCUS ON CORPORATE GOVERNANCE',
		// Desc5: 'FOCUS ON SOCIAL VALUE',
	},
	{
		ImageUrl: index2,
		Name: 'aaa',
		Desc: '',
		Desc1: '',
		Desc2: ' ',
		Desc3: ' ',
	},
	{
		ImageUrl: index1,
		Name: '',
		// Desc: '更加绿色更可持续',
		// Desc1: 'More Green More Sustainable',
	}

])
const advantageList = ref([
	{ id: 1, Cover: c3, title: '烟叶业务', desc: '我们的烟叶业务是从全球主要烟叶产区采购各类型烟叶类产品，并销售至全球市场。。' },
	{ id: 2, Cover: c2, title: '卷烟业务', desc: '我们的卷烟业务是从中国烟草旗下的卷烟生产企业采购卷烟产品，并销售至全球市场（中国内地除外）以及中国内地境内关外免税店。。' },
	{ id: 3, Cover: c1, title: '新型烟草业务', desc: '我们的新型烟草业务是从中国烟草旗下的卷烟生产企业采购新型烟草制品，并独家销售至全球市场（中国内地除外）。' },
])
const serviceList = ref([
	{ id: 1, icon: 'am-icon-diamond', title: '多页面工作', desc: '标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理' },
	{ id: 2, icon: 'am-icon-user', title: '多页面工作', desc: '标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理' },
	{ id: 3, icon: 'am-icon-umbrella', title: '多页面工作', desc: '标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理' },
	{ id: 4, icon: 'am-icon-briefcase', title: '多页面工作', desc: '标签栏可切换，不必为了新内容而被迫跳转界面，多项工作内容并行处理' },
]);
const swiperList = ref([
	// {
	// 	title: '中烟香港亮相多特蒙德',
	// 	title1: 'InterTabac 2024国际烟草展会',
	// 	// img:,
	// 	content: '中烟香港统一组织66人的策展团队，代表中国烟草13家工业企业，携25个品牌、超100个品规的加热烟及30款雪茄产品参展，规模为历次之最。',
	// 	date: '2024.10.14'
	// },
	// {
	// 	title: '中烟香港亮相多特蒙德InterTabac 2024国际烟草展会 深化全球烟草市场布局',
	// 	title1: 'InterTabac 2024国际烟草展会',
	// 	content: '北京时间2024年9月19日，德国多特蒙德InterTabac 2024国际烟草展会开幕。',
	// 	date: '2024.09.16'
	// }
	{
		img: news,
	},
	{
		img: news1,
	},
	{
		img: news2,
	}
])
const indexPhoto = ref()
const changeTab = (ind) => {
	tabIndex.value = ind
	// indexPhoto.value.style.opcity = '1'
}

const getSlideshow = async () => {
	const { data: res } = await getSlidephotoAPI();
	console.log(res.Data);
	slideshow.value = res.Data
}
const getAdvantage = async () => {
	const { data: res } = await getAdvantageAPI();
	console.log(res);
	advantageList.value = res.Data
}
const getService = async () => {
	const { data: res } = await getServiceAPI();
	console.log(res);
	serviceList.value = res.Data
}
const timer = ref(null)
const swiper = () => {
	if (timer.value) {
		return
	}
	let looper = (a) => {
		if (tabIndex.value >= slideshow.value.length - 1) {
			tabIndex.value = -1
		}
		changeTab(tabIndex.value + 1)
	}
	timer.value = setInterval(looper, 3000)
}
const clearData = () => {
	if (timer.value) {
		clearInterval(timer.value);
		timer.value = null
	}
}
const closeit = () => {
	clearData();
}
const openit = () => {
	swiper();
}
const goTo = (item) => {
	// 跳到别的网站怎么写
	window.open('https://www.dotdotnews.com/s/202409/14/AP66e52bdce4b0d645a76ba050.html')

}
const card = ref('');
// 当屏幕小于640px时，设置为vertical
if (window.innerWidth < 640) {
	card.value = '';
} else {
	card.value = 'card';
}
// 数字翻牌器
import { useTransition } from '@vueuse/core'
const source = ref(0)
const outputValue = useTransition(source, {
	duration: 1500,
})
source.value = 24900;
const source1 = ref(0)
const outputValue1 = useTransition(source1, {
	duration: 1500,
})
source1.value = 87;
const source2 = ref(0)
const outputValue2 = useTransition(source2, {
	duration: 1500,
})
source2.value = 31;
const formatter = (value) => {
	// 使用toFixed保留小数点后两位
	return `${value.toFixed(2)}`;
}
const source3 = ref(0)
const outputValue3 = useTransition(source3, {
	duration: 1500,
})
source3.value = 0.97;
// const videoPlayer = ref(null);
const newsList = ref([
	{   id:1,
		title: '国际集团组织员工参观沙头角禁区及香港回归纪念塔活动',
		content: '2025年6月27日，为庆祝香港回归祖国暨香港特别行政区成立二十八周年，国际集团组织全体员工赴新界沙头角禁区开展专题参观学习。队伍依次参观“沙头角之角”石碑，远眺中英街界碑及“一街两制”警戒线，随后考察沙头角口岸旅检大楼旧址，系统了解边境管理沿革与深港合作历程；',
		date: '2025-06-27'
	},
	{
		id:2,
		title: '国际集团召开2025年一季度经济运行分析会',
		content: '4月15日，中烟国际集团有限公司召开一季度经济运行分析会，传达国家局、总公司经济运行分析会精神，分析研究国际集团一季度经济运行情况，安排部署下一步重点工作。国际集团党组书记、总经理邵岩同志指出，一季度国际',
		date: '2025-04-15'
	},
	// {
	// 	id:3,
	// 	title: '国际集团参加香港中企协保龄球邀请赛',
	// 	content: '为进一步加强与驻港中资企业交流，丰富员工文体生活，国际集团积极响应香港中企协的号召，组队参与3月29日在香港启德体育园举办的“‘龄’动精彩，球艺飞扬”中企保龄球邀请赛。国际集团代表队队员们全程投入，奋力拼搏',
	// 	date: '2025-04-01 10:30:00'
	// },
	// {
	// 	id:4,
	// 	title: '国际集团举办《哪吒2》主题观影活动',
	// 	content: '2025年2月26日，国际集团组织员工及家属集体观看国产动画《哪吒2》。影片以传统神话为根基，通过前沿数字技术与东方美学叙事的深度融合，以哪吒“逆天改命”的成长史诗，生动诠释了中华文明“自强不息”的精神内核。多名员工表示，这场视听盛宴不仅让传统文化“活起来”，更让文化自信“强起来”——既为中华文明“守正创新”的基因所震撼，也为身为文化传承者深感自豪。',
	// 	date: '2015-03-05 14:29:00'
	// }
])
const groupList = ref([
	{
		id: 1,
		name: '中烟国际(香港)',
		nameEnglish: 'China Tobacco International (Hong Kong)',
	},
	{
		id: 2,
		name: '天泽烟草',
		nameEnglish: 'Tianze Tobacco',
	},
	{
		id: 3,
		name: '中烟国际巴西',
		nameEnglish: 'China Tobacco International Brazil',
	},
	{
		id: 4,
		name: '中烟国际(北美)',
		nameEnglish: 'China Tobacco International (North America)',
	},
	{
		id: 5,
		name: '中烟国际阿根廷',
		nameEnglish: 'China Tobacco International Argentina',
	},
	{
		id: 6,
		name: '中烟国际(中东)',
		nameEnglish: 'China Tobacco International (Middle East)',
	},
	{
		id: 7,
		name: '中烟英美国际',
		nameEnglish: 'China Tobacco British American International',
	},
	{
		id: 8,
		name: '中烟菲莫国际',
		nameEnglish: 'China Tobacco Philip Morris International',
	},
	{
		id: 9,
		name: '中烟国际(香港)制造',
		nameEnglish: 'China Tobacco International (Hong Kong) Manufacturing',
	},
	{
		id: 10,
		name: '中烟国际(澳门)制造',
		nameEnglish: 'China Tobacco International (Macau) Manufacturing',
	},
	{
		id: 11,
		name: '中烟国际(老挝)制造',
		nameEnglish: 'China Tobacco International (Laos) Manufacturing',
	},
	{
		id: 12,
		name: '中烟国际(柬埔寨)制造',
		nameEnglish: 'China Tobacco International (Cambodia) Manufacturing',
	},
	{
		id: 13,
		name: '中烟国际(罗马尼亚)制造',
		nameEnglish: 'China Tobacco International (Romania) Manufacturing',
	},
	{
		id: 14,
		name: '中烟国际(瑞士)',
		nameEnglish: 'China Tobacco International (Switzerland)',
	},
	{
		id: 15,
		name: '中烟国际(欧洲)',
		nameEnglish: 'China Tobacco International (Europe)',
	},
])
const route = useRouter();
const handleClick = (item) => {
	console.log('item', item);

	// 跳转到子公司详情页，使用路径参数传递
	route.push(`/subGroup/${item.id}`);
	console.log('点击了公司项:', item);
}
const handleGoNew = () => {
	// 跳转到新闻页面
	route.push('/news');
}
const goDetail = (id)=>{
	route.push(`/newsDetail/${id}`);
}
onMounted(() => {
	// videoPlayer.value.play();
	// getSlideshow();
	// getAdvantage();
	// getService();
	swiper();
})
onBeforeUnmount(() => {
	clearData();
})
</script>
<template>
	<Layout>
		<div style="width: 100%">
			<div class="index-page">
				<!-- 使用Swiper替换原有的轮播 -->
				<Swiper :modules="modules" :slides-per-view="1" :space-between="0" :pagination="{ clickable: true }"
					:mousewheel="false" :allowTouchMove="false" :autoplay="{ delay: 3000, disableOnInteraction: false }"
					:loop="true" @swiper="onSwiper" @slideChange="onSlideChange" class="home-swiper">
					<SwiperSlide v-for="(slide, index) in slideshow" :key="index" class="swiper-slide-item" :style="{
						backgroundImage: `url(${slide.ImageUrl})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}">
						<div class="index-banner">
							<!-- 可以在这里添加轮播图上的内容 -->
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
		<div class="news-section">
			<div>
				<img src="../assets/images/newIndex/news.jpg" alt="" style="width: 100%; height: 100%;" @click="goDetail(4)">
			</div>
			<div class="news-content">
				<div class="newsTitle">{{ $t('message.t3') }}</div>
				<div class="news-boxes">
					<div v-for="item in newsList" :key="item.title" class="news-item" @click="goDetail(item.id)">
						<div class="news-item-title">{{ item.title }}</div>
						<div class="news-item-content">{{ item.content }}</div>
						<span class="news-item-date">{{ item.date }}</span>
					</div>
				</div>
				<div class="newsBtn" @click="handleGoNew">{{ $t('message.gengduoxinwen') }}</div>
			</div>
		</div>
		<div class="group-section">
			<div class="group-title">{{ $t('message.suoshuqiye') }}</div>
			<div class="group-line"></div>
			<div class="group-list">
				<div v-for="(item, index) in groupList" class="group-item" :key="index" @click="handleClick(item)">
					<div>{{ item.name }}</div>
					<div></div>
					<!-- <div>{{ item.nameEnglish }}</div> -->
					<img src="../assets/images/newIndex/svg.png" alt="">
				</div>
			</div>
		</div>
	</Layout>
</template>



<style lang="scss" scoped>
// Swiper轮播图样式
.home-swiper {
	width: 100%;
	// height: 700px;

	// @media screen and (min-width: 768px) {
	// 	height: 500px;
	// }

	// @media screen and (min-width: 1024px) {
	// 	height: 600px;
	// }

	// 轮播项样式
	.swiper-slide-item {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	// 分页器样式
	:deep(.swiper-pagination) {
		bottom: 20px !important;
		.swiper-pagination-bullet {
			background: rgba(255, 255, 255, 0.9);
			opacity: 1;
			width: 0.8rem;
			height: 0.8rem;
			margin: 0 0.4rem;
			transition: all 0.3s ease;

			&.swiper-pagination-bullet-active {
				background: #F7B334;
				width: 3rem; /* 激活状态下的横线更长 */
				height: 0.6rem;
				transform: scale(1.1);
				border-radius: 3px;
			}
		}
	}
}


// 公司介绍部分响应式
.section {
	padding: 40px 0;

	@media screen and (min-width: 768px) {
		padding: 60px 0;
	}

	@media screen and (min-width: 1024px) {
		padding: 80px 0;
	}

	.section--header {
		.section--title {
			font-size: 2rem;
			font-weight: 300;
			text-align: center;
			margin-bottom: 1rem;

			@media screen and (min-width: 768px) {
				font-size: 2.5rem;
			}

			@media screen and (min-width: 1024px) {
				font-size: 3rem;
			}
		}

		.english-title {
			font-size: 1.5rem;
			color: #007557;
			text-align: center;
			font-weight: bold;

			@media screen and (min-width: 768px) {
				font-size: 2rem;
			}

			@media screen and (min-width: 1024px) {
				font-size: 2.5rem;
			}
		}

		.english-title1 {
			font-size: 1rem;
			color: #007557;
			text-align: center;
			margin-bottom: 2rem;

			@media screen and (min-width: 768px) {
				font-size: 1.2rem;
			}

			@media screen and (min-width: 1024px) {
				font-size: 1.5rem;
			}
		}
	}

	.container1 {
		display: flex;
		align-items: center;
		gap: 2rem;

		@media screen and (max-width: 767px) {
			flex-direction: column;
			gap: 1rem;
		}

		.boxs {
			width: 100%;
			position: relative;
			top: -20px;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			padding: 10px;
			background: white;
			border-radius: 8px;

			@media screen and (min-width: 768px) {
				width: 40%;
			}

			@media screen and (max-width: 767px) {
				top: 0;
				order: 2;
			}
		}

		.section--description-index {
			width: 100%;
			font-size: 1rem;
			line-height: 1.6;
			color: #9b9b9b;
			text-align: left;
			margin: 0;

			@media screen and (min-width: 768px) {
				width: 60%;
				font-size: 1.1rem;
			}

			@media screen and (min-width: 1024px) {
				width: 54%;
				font-size: 1.2rem;
			}

			@media screen and (max-width: 767px) {
				order: 1;
				text-align: center;
			}

			.moremore {
				color: #007557;
				cursor: pointer;
				margin-top: 1rem;
				font-weight: bold;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
}

// 数字统计部分响应式
.numberBox {
	display: flex;
	justify-content: space-around;
	margin-top: 2rem;
	flex-wrap: wrap;
	gap: 1rem;

	@media screen and (max-width: 767px) {
		flex-direction: column;
		align-items: center;
	}

	.number-item {
		text-align: center;
		flex: 1;
		min-width: 200px;

		@media screen and (max-width: 767px) {
			min-width: auto;
			width: 100%;
		}

		.number-value {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
		}

		.number-label {
			font-size: 0.9rem;
			margin-top: 0.5rem;
			color: #666;

			@media screen and (min-width: 768px) {
				font-size: 1rem;
			}

			@media screen and (min-width: 1024px) {
				font-size: 1.1rem;
			}
		}

		.unit {
			font-size: 0.8rem;

			@media screen and (min-width: 768px) {
				font-size: 0.9rem;
			}

			@media screen and (min-width: 1024px) {
				font-size: 1rem;
			}
		}

		&:nth-child(1),
		&:nth-child(4) {
			.el-statistic__number {
				color: #c9082c;
				font-weight: bold;
				font-size: 1.5rem;

				@media screen and (min-width: 768px) {
					font-size: 1.8rem;
				}

				@media screen and (min-width: 1024px) {
					font-size: 2rem;
				}
			}
		}

		&:nth-child(2),
		&:nth-child(3) {
			.el-statistic__number {
				color: #006953;
				font-weight: bold;
				font-size: 1.5rem;

				@media screen and (min-width: 768px) {
					font-size: 1.8rem;
				}

				@media screen and (min-width: 1024px) {
					font-size: 2rem;
				}
			}
		}
	}
}

// 业务介绍部分响应式
.index-container {
	.avdlayout {
		margin-top: 3rem;
	}

	.am-g {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;

		@media screen and (max-width: 767px) {
			flex-direction: column;
			gap: 1.5rem;
		}
	}

	.am-u-md-31 {
		flex: 1;
		min-width: 300px;

		@media screen and (max-width: 767px) {
			min-width: auto;
		}
	}

	.features_item {
		text-align: center;
		padding: 1.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;

		&:hover {
			transform: translateY(-5px);
		}

		.imgg {
			width: 100%;
			height: 200px;
			border-radius: 8px;
			margin-bottom: 1rem;

			@media screen and (max-width: 767px) {
				height: 150px;
			}
		}

		.features_item--title {
			font-size: 1.2rem;
			font-weight: bold;
			color: #333;
			margin-bottom: 1rem;

			@media screen and (min-width: 768px) {
				font-size: 1.4rem;
			}

			@media screen and (min-width: 1024px) {
				font-size: 1.6rem;
			}
		}

		.features_item--text {
			font-size: 0.9rem;
			line-height: 1.6;
			color: #666;

			@media screen and (min-width: 768px) {
				font-size: 1rem;
			}

			@media screen and (min-width: 1024px) {
				font-size: 1.1rem;
			}
		}
	}
}

// 新闻部分响应式
.news-section {
	padding-top: 0;

	@media screen and (min-width: 1024px) {
		width: 70%;
		display: flex;
		flex: 1;
		margin-top: 90px;
		height: 46.6rem;

	}

	>div {
		@media screen and (min-width: 1024px) {
			width: 50%;
		}

		.newsTitle {
			@media screen and (min-width: 1024px) {
				font-size: 1.6rem;
				font-weight: 700;
				border-bottom: 0.2rem solid #F7B334;
				padding-bottom: 0.9rem;
				width: 46%;
			}

		}
	}

	>div:nth-child(1) {
		width: 60%;
	}

	>div:nth-child(2) {
		width: 40%;
	}

	.news-content {
		display: flex;
		flex-direction: column;
		// 上下两端对齐
		justify-content: space-between;

		@media screen and (min-width: 1024px) {
			margin-left: 3rem;
			margin-top: -50px;
		}
	}

	.news-boxes {
		@media screen and (min-width: 1024px) {
			// display: flex;
			// flex-wrap: wrap;
		}

		// >div:nth-child(even) {
		// 	@media screen and (min-width: 1024px) {
		// 		margin-left: 5%;
		// 	}
		// }
		// >div:nth-child(1),>div:nth-child(2) {
		// 	@media screen and (min-width: 1024px) {
		// 		margin-top: 0;
		// 	}
		// }
	}

	.news-item {
		color: #666666;
		cursor: pointer;

		@media screen and (min-width: 1024px) {
			position: relative;
			width: 100%;
			padding-bottom: 0.9rem;
			border-bottom: 1px solid #e9e9e9;
			margin-top: 2rem;
			font-size: 1.6rem;
		}
	}

	.news-item-title {
		color: #555;
		font-size: 1.1rem;
		line-height: 1.6;
		height: 3.8rem;
	}

	.news-item-content {
		font-size: 0.9rem;
		// margin: 10px 0px 5px 0px;
		// 只显示3行剩下用...代替
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.4;
		max-height: 4.2em; /* 3行 × 1.4行高 = 4.2em */
	}

	.news-item-date {
		@media screen and (min-width: 1024px) {
			font-size: 1rem;
			color: #999;
		}
	}

	.newsBtn {
		@media screen and (min-width: 1024px) {
			padding: 0.6rem 0rem;
			background-color: #F7B334;
			color: white;
			font-size: 1.1rem;
			text-align: center;
			width: 10rem;
			margin-top:1rem;
		}
	}
}
.group-section{
	width: 70%;
}

.group-title {
	@media screen and (min-width: 1024px) {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
		margin-top: 4rem;
	}
}


.group-line {
	width: 6%;
	border-bottom: 0.3rem solid #F7B334;
	margin: 1.4rem auto;
}

.group-list {
	@media screen and (min-width: 1024px) {
		margin-top: 0.8rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		text-align: center;
	}
}

.group-item {
	@media screen and (min-width: 1024px) {
		width: 17.5%;
		margin: 1rem 0rem;
		padding: 0.65rem 0.4rem;
		border: 1px solid #e9e9e9;
		border-radius: 8px;
		background-color: white;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		color: #F7B334;
		font-size: 1.1rem;

		>div:nth-child(1) {
			@media screen and (min-width: 1024px) {
				margin-top: 1.3rem;
				font-size: 1.2rem;
				// font-weight: 550;
				border-bottom: 3px;
			}
		}

		>div:nth-child(2) {
			border: 1px solid #F7B334;
			width: 80%;
			margin: 0.5rem auto;
		}

		>img {
			width: 1.5rem;
			height: 1.5rem;
			margin-top: 0.3rem;
		}
	}
}

// 响应式图片
.responsive-img {
	max-width: 100%;
	height: auto;
	display: block;
}

// 高亮效果
.highlight:hover {
	background: RGB(156, 214, 231);
}

.bgchover:hover {
	background: RGB(156, 214, 231);
}

// Swiper样式
.swiper {
	width: 100%;
	height: 44.7rem;
}

.swiper-slide {
	position: relative;
	background-color: #fafafa;
	width: 100%;
}
</style>