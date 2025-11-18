<script setup>
import Layout from '../components/common/Layout.vue';
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { onLanguageChange, getCurrentLanguage } from '@/utils/language.js';
import c1 from '../assets/images/newIndex/c1.png';
import c2 from '../assets/images/newIndex/c2.png';
import c3 from '../assets/images/newIndex/c3.png';
import bannner from '../assets/images/banner.png';
import { useRouter } from 'vue-router';
import zhounian from '../assets/images/newIndex/80zhounian.jpg';
import guanaishequ from '../assets/images/newsPic/guanaishequ.png';
import lifa from '../assets/images/newsPic/lifa.png';
import { useI18n } from 'vue-i18n'
const { t, locale, messages } = useI18n()
// 当前语言（可在模板或逻辑中使用）
const currentLanguage = ref(getCurrentLanguage());
// 存储取消订阅函数
const offLanguageListener = ref(null);
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

const tabIndex = ref(0)
const slideshow = ref([
	{
		ImageUrl: bannner,
	}

])
const newImg = ref([
	{
		ImageUrl: zhounian,
	},
	{
		ImageUrl: guanaishequ,
	},
	{
		ImageUrl: lifa,
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
]); const changeTab = (ind) => {
	tabIndex.value = ind
	// indexPhoto.value.style.opcity = '1'
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
	{
		id: 2,
		title: '国际集团组织参观纪念抗战胜利80周年展览',
		content: '2025年8月26日下午，中烟国际集团有限公司组织全体员工前往香港会展中心，参观由香港大公文汇传媒集团主办的“为了中华民族伟大复兴——纪念中国人民抗日战争暨世界反法西斯战争胜利80周年大型巡回展览”',
		date: '2025-08-27'
	},
	{
		id: 9,
		title: '国际集团开展“中企关爱进社区”义工活动',
		content: '近日，国际集团与香港荃湾各界协会联合开展“中企关爱进社区”义工活动，向荃湾地区困难基层家庭进行探访慰问并送上冷暖风扇和空气净化一体机。 ',
		date: '2025-08-18'
	},
	{
		id: 10,
		title: '国际集团组织员工参观香港立法会活动',
		content: '2025年7月15日，国际集团组织员工赴香港立法会综合大楼参观，开展“爱国爱港主题教育”活动。本次活动得到了全国人大代表、香港立法会议员陈勇先生及工作人员的大力支持。',
		date: '2025-07-18'
	},
])
// 获取新闻列表
const newsListIndex = computed(() => messages.value[locale.value].message.newsListIndex)
// 引用zh-CN里面的companyList数组
const companyList = computed(() => messages.value[locale.value].message.companyList)
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
const goDetail = (id) => {
	route.push(`/newsDetail/${id}`);
}
// 移动端判断
const isMobile = ref(false)

// 检查是否为移动端
const checkMobile = () => {
	isMobile.value = window.innerWidth <= 768
}
// 当语言是英文的时候，首页和路由都不要新闻列表了
const showNews = computed(() => {
	return locale.value !== 'en'
})
onMounted(() => {
	// videoPlayer.value.play();
	// getSlideshow();
	// getAdvantage();
	// getService();
	// 初始化检查移动端
	checkMobile()

	// 初始化当前语言为 i18n 中的 locale（优先）
	currentLanguage.value = locale.value || getCurrentLanguage();

	// 订阅全局语言变更事件（使用 utils 封装）
	offLanguageListener.value = onLanguageChange((lang) => {
		currentLanguage.value = lang;
		console.log('IndexView detected language change:', lang);
		// 在这里可以执行语言切换后需要的额外逻辑（比如重新请求某些接口）
	});
	// 监听窗口大小变化
	window.addEventListener('resize', checkMobile)
	swiper();
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', checkMobile)
	clearData();
	// 取消语言变更监听
	if (offLanguageListener.value) {
		offLanguageListener.value();
		offLanguageListener.value = null;
	}
})
</script>
<template>
	<Layout>
		<div style="width: 100%">
			<div class="index-page">
				<!-- 使用Swiper替换原有的轮播 -->
				<Swiper :modules="modules" :slides-per-view="1" :space-between="0" :pagination="{ clickable: true }"
					:mousewheel="false" :allowTouchMove="true" :autoplay="{ delay: 3000, disableOnInteraction: false }"
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
		<div class="news-section" v-if="showNews">
			<div class="newsTitle" v-if="isMobile">{{ $t('message.t3') }}</div>
			<div>
				<Swiper :modules="modules" :slides-per-view="1" :space-between="0" :pagination="{ clickable: true }"
					:mousewheel="false" :allowTouchMove="true" :autoplay="{ delay: 3000, disableOnInteraction: false }"
					:loop="true" @swiper="onSwiper" @slideChange="onSlideChange" class="home-swiper">
					<SwiperSlide v-for="(slide, index) in newImg" :key="index" class="swiper-slide-item" :style="{
						backgroundImage: `url(${slide.ImageUrl})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: '100% auto',
						backgroundPosition: 'center'
					}">
						<div class="index-banner">
							<!-- 可以在这里添加轮播图上的内容 -->
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
			<div class="news-content">
				<div class="newsTitle" v-if="!isMobile">{{ $t('message.t3') }}</div>
				<div class="news-boxes">
					<div v-for="item in newsListIndex" :key="item.title" class="news-item" @click="goDetail(item.id)">
						<div class="news-item-title">{{ item.title }}</div>
						<div class="news-item-content">{{ item.content }}</div>
						<span class="news-item-date">{{ item.date }}</span>
					</div>
				</div>
				<div class="newsBtn" @click="handleGoNew">{{ $t('message.gengduoxinwen') }}</div>
			</div>
		</div>
		<div v-else>
			<div class="contactContainer1">
				<div class="contactContent">
					<div>{{ $t("message.ywjs") }}</div>
					<div class="fw" style="	text-indent: 2em;">{{ $t('message.ywjs2') }}</div>
					<div class="fw">{{ $t('message.ywjs3') }}</div>
					<div class="fw">{{ $t('message.ywjs4') }}</div>
				</div>
				<div class="contactContent">
					<div>{{ $t('message.ywzx') }}</div>

					<div class="cardContent">
						<div>
							<img src="../assets/images/call.png" alt="">
							<div>
								+852-26206011
							</div>
							<div>
								marketing@cti-group.com.hk
							</div>
							<div>
								<div>{{ $t('message.ywzx2') }}</div>
							</div>
						</div>
						<div>
							<img src="../assets/images/call.png" alt="">
							<div>
								+852-26206308
							</div>
							<div>
								supplychain@cti-group.com.hk
							</div>
							<div>
								<div>{{ $t('message.ywzx1') }}</div>
							</div>
						</div>
						<div>
							<img src="../assets/images/call.png" alt="">
							<div>
								+852-26206055
							</div>
							<div>
								production@cti-group.com.hk
							</div>
							<div>
								<div>{{ $t('message.ywzx3') }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="group-section">
			<div class="group-title">{{ $t('message.suoshuqiye') }}</div>
			<div class="group-line"></div>
			<div class="group-list">
				<div v-for="(item, index) in companyList" class="group-item" :key="index" @click="handleClick(item)">
					<div>{{ item.name }}</div>
					<div></div>
					<img src="../assets/images/newIndex/svg.png" alt="">
				</div>
			</div>
		</div> -->
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
			width: 0.6rem;
			height: 0.6rem;
			margin: 0 0.4rem;
			transition: all 0.3s ease;

			&.swiper-pagination-bullet-active {
				background: #F7B334;
				width: 1.5rem;
				/* 激活状态下的横线更长 */
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
	width: 70%;
	display: flex;
	justify-content: space-between;
	height: 37rem;
	margin-top: 6rem;
	flex: 1;

	@media screen and (min-width: 1024px) {
		width: 70%;
		display: flex;
		flex: 1;
		margin-top: 6rem;
		height: 37rem !important;
		/* 增加 !important 确保优先级 */
		max-height: 37rem;
		/* 限制最大高度 */

	}

	@media screen and (max-width: 767px) {
		width: 100%;
		flex-direction: column;
		margin-top: 0;
	}

	>div {
		@media screen and (min-width: 1024px) {
			width: 50%;
		}

		.newsTitle {
			font-size: 1.6rem;
			font-weight: 700;
			border-bottom: 0.2rem solid #F7B334;
			padding-bottom: 0.9rem;
			width: 46%;

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
		width: 57%;

		@media screen and (min-width: 1024px) {
			width: 57%;
		}

		@media screen and (max-width: 767px) {
			width: 80%;
			padding: 1.5rem 1rem;
			margin: 0rem auto 2rem;
			font-size: 2.2rem;
			border-bottom: 0.3rem solid #F7B334;
			font-weight: 700;
		}
	}

	>div:nth-child(2) {
		width: 38%;

		@media screen and (min-width: 1024px) {
			width: 38%;
		}

		@media screen and (max-width: 767px) {
			width: 80%;
			margin: 0rem auto;
		}
	}

	>div:nth-child(3) {

		@media screen and (max-width: 767px) {
			width: 100%;
			margin: 1rem auto;
		}
	}

	.news-content {
		display: flex;
		flex-direction: column;
		// 上下两端对齐
		justify-content: space-between;
		margin-left: 3rem;
		margin-top: -3.4rem;

		@media screen and (min-width: 1024px) {
			margin-left: 3rem;
			margin-top: -3.4rem;
		}
	}

	.news-boxes {
		@media screen and (min-width: 1024px) {
			// display: flex;
			// flex-wrap: wrap;
		}

		@media screen and (max-width: 767px) {
			width: 90%;
			margin: 1rem auto;

			>div:nth-child(1) {
				margin-top: 0;
			}
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
		position: relative;
		width: 100%;
		// padding-bottom: 0.9rem;
		border-bottom: 1px solid #e9e9e9;
		margin-top: 1rem;
		font-size: 1.6rem;

		@media screen and (min-width: 1024px) {
			position: relative;
			width: 100%;
			// padding-bottom: 0.9rem;
			border-bottom: 1px solid #e9e9e9;
			margin-top: 1rem;
			font-size: 1.6rem;
		}

		@media screen and (max-width: 767px) {
			width: 100%;
			border-bottom: 1px solid #e9e9e9;
			margin-top: 1.5rem;
			font-size: 1.4rem;
			padding: 0rem 0rem 1rem;

		}
	}

	.news-item-title {
		color: #555;
		font-size: 1.1rem;
		line-height: 1.3;
		height: 3.3rem;

		@media screen and (max-width: 767px) {
			font-size: 1.6rem;
			height: 4.8rem;

		}
	}

	.news-item-content {
		font-size: 0.9rem;
		// margin: 10px 0px 5px 0px;
		// 只显示3行剩下用...代替
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.4;
		max-height: 4.2em;

		/* 3行 × 1.4行高 = 4.2em */
		@media screen and (max-width: 767px) {
			font-size: 1.3rem;

		}
	}

	.news-item-date {
		font-size: 1rem;
		color: #999;

		@media screen and (min-width: 1024px) {
			font-size: 1rem;
			color: #999;
		}

		@media screen and (max-width: 767px) {
			font-size: 1.2rem;
			color: #999;
			margin-top: 0.5rem;
		}
	}

	.newsBtn {
		padding: 0.6rem 0rem;
		background-color: #F7B334;
		color: white;
		font-size: 1.1rem;
		text-align: center;
		width: 10rem;
		margin-top: 1rem;

		@media screen and (min-width: 1024px) {
			padding: 0.6rem 0rem;
			background-color: #F7B334;
			color: white;
			font-size: 1.1rem;
			text-align: center;
			width: 10rem;
			margin-top: 1rem;
		}

		@media screen and (max-width: 767px) {
			padding: 0.6rem 0rem;
			background-color: #F7B334;
			color: white;
			font-size: 1.2rem;
			text-align: center;
			width: 10rem;
			margin: 1rem auto;

		}
	}
}

.group-section {
	width: 70%;

	@media screen and (max-width: 767px) {
		width: 90%;
		display: flex;
		flex-direction: column;
		// margin:0 auto;
	}
}

.group-title {
	font-size: 2rem;
	font-weight: bold;
	text-align: center;
	margin-top: 4rem;

	@media screen and (min-width: 1024px) {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
		margin-top: 4rem;
	}

	@media screen and (max-width: 767px) {
		font-size: 1.8rem;
		font-weight: bold;
		text-align: center;
		margin-top: 1rem;
	}
}


.group-line {
	width: 6%;
	border-bottom: 0.3rem solid #F7B334;
	margin: 1.4rem auto;
}

.group-list {
	margin-top: 0.8rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	/* 改为从左开始排列 */
	text-align: center;
	gap: 1.5rem;
	/* 减小间距以适应更多元素 */

	@media screen and (min-width: 768px) and (max-width: 1024px) {
		margin-top: 0.8rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		/* 桌面端也从左开始排列 */
		text-align: center;
		gap: 2.2rem;
		/* 桌面端减小间距 */
	}

	@media screen and (min-width: 1024px) {
		margin-top: 0.8rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		/* 桌面端也从左开始排列 */
		text-align: center;
		gap: 1.4rem;
		/* 桌面端减小间距 */
	}

	@media screen and (max-width: 768px) {
		margin-top: 0.8rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		/* 桌面端也从左开始排列 */
		text-align: center;
		gap: 0rem;
		/* 桌面端减小间距 */
	}


}

.group-item {
	width: calc(18% - 0.4rem);
	/* 桌面端每行5个，更精确的计算 */
	padding: 0.5rem 0.3rem;
	/* 减小内边距以适应更多元素 */
	border: 1px solid #e9e9e9;
	border-radius: 8px;
	background-color: white;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	color: #F7B334;
	font-size: 1.1rem;
	cursor: pointer;
	transition: transform 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
	}

	@media screen and (max-width: 767px) {
		// width: calc(30% - 0.5rem); /* 移动端每行3个 */
		padding: 0.65rem 0.4rem;
		border: 1px solid #e9e9e9;
		border-radius: 8px;
		background-color: white;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		color: #F7B334;
		font-size: 1.2rem;
		margin: 0.5rem;
		width: 45%;
	}

	@media screen and (min-width: 768px) and (max-width: 1024px) {
		width: calc(28% - 0.6rem);
		padding: 0.6rem 0.35rem;
		font-size: 1.0rem;
		margin: 1rem;
	}

	>div:nth-child(1) {
		margin-top: 1.3rem;
		font-size: 1.2rem;
		// font-weight: 550;
		border-bottom: 3px;

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

	// }
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

	@media screen and (max-width: 767px) {
		height: 34rem;
	}
}

.news-section {
	.swiper {
		width: 100%;
		height: 30rem;

		@media screen and (max-width: 767px) {
			height: 25rem;
		}
	}
}

.swiper-slide {
	position: relative;
	background-color: #fafafa;
	width: 100%;
}

.age-modal {
	position: fixed;
	z-index: 99999;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.55);
	display: flex;
	align-items: center;
	justify-content: center;
}

.age-modal-content {
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
	padding: 2.5rem 2rem 2rem;
	max-width: 350px;
	width: 90%;
	text-align: center;
}

.age-modal-title {
	font-size: 1.3rem;
	font-weight: bold;
	margin-bottom: 1.2rem;
	color: #c9082c;
}

.age-modal-desc {
	font-size: 1.05rem;
	margin-bottom: 2rem;
	color: #333;
}

.age-modal-actions {
	display: flex;
	justify-content: space-between;
	gap: 1.2rem;
}

.age-btn {
	flex: 1;
	padding: 0.7rem 0.2rem;
	border-radius: 6px;
	border: none;
	font-size: 1rem;
	cursor: pointer;
	font-weight: bold;
	transition: background 0.2s;
}

.age-btn.deny {
	background: #eee;
	color: #c9082c;
}

.age-btn.confirm {
	background: #F7B334;
	color: #fff;
}

.age-btn:hover {
	opacity: 0.85;
}

.contactContainer1 {
	width: 100%;
	height: 100%;
	background-color: #f7f7f7;
	padding-bottom: 5rem;
}

.contact {
	width: 100%;

}

.fw {
	// font-weight: 550;
	color: #444;
	margin-top: 2rem;
}

.bgImg {
	width: 100%;

	>img {
		width: 100%;
		height: 100%;
	}
}

.contactContent {
	width: 65%;
	margin: 0px auto 20px;
	font-size: 1.3rem;
	padding-top: 3rem;

	>div:nth-child(1) {
		font-size: 1.5rem;
		color: #F7B334;
		font-weight: bold;
		margin-bottom: 1.7rem;
	}

}

.cardContent {
	display: flex;
	justify-content: space-between;

	>div {
		width: 30%;
		// height: 15rem;
		background: #fff;
		padding: 1rem;
		text-align: center;
		font-size: 1.6rem;
		font-weight: 550;
		color: #444;

		>img {
			width: 3rem;
			height: 3rem;
			margin: 2rem 0rem 0rem 0rem
		}

		>div:nth-child(2) {
			font-size: 2.2rem;
			color: #F7B334;
		}

		>div:nth-child(3),
		>div:nth-child(4) {
			font-size: 0.9rem;
			color: #333;
			margin-top: 0.5rem;
		}
	}

	@media screen and (max-width: 767px) {
		width: 100%;
		display: block;

		>div {
			padding: 0rem;
			width: 100%;
			margin-bottom: 2rem;
			padding-bottom: 2rem;
			padding-top: 1rem;
		}

	}
}
</style>