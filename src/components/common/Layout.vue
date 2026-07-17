<template>
	<main class="page-wrapper">
		<h1 class="visually-hidden">{{ pageTitle }}</h1>
		<Header class="headerContainer" />
		<div class="main-content">
			<slot></slot>
		</div>
		<FooterNew />
		<button
			v-show="showBackToTop"
			type="button"
			class="back-to-top"
			aria-label="返回页面顶部"
			@click="scrollToTop"
		>
			<span class="back-to-top__icon" aria-hidden="true"></span>
		</button>
	</main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useGlobalKeyboardNavigation } from '@/composables/useGlobalKeyboardNavigation.js';

// 启用全局键盘导航
useGlobalKeyboardNavigation();
const route = useRoute();
const { locale } = useI18n();
const showBackToTop = ref(false);

const handleScroll = () => {
	showBackToTop.value = window.scrollY > 240;
};

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
};

const pageTitleMap = {
	zhCN: {
		home: '首页',
		about: '集团概况',
		product: '集团概况',
		example: '客户案例',
		news: '新闻动态',
		newsDetail: '新闻详情',
		overview: '集团概况',
		mainBusiness: '主营业务',
		contact: '联系方式',
		join: '人才招聘',
		subGroup: '所属企业'
	},
	zhTW: {
		home: '首頁',
		about: '集團概況',
		product: '集團概況',
		example: '客戶案例',
		news: '新聞動態',
		newsDetail: '新聞詳情',
		overview: '集團概況',
		mainBusiness: '主營業務',
		contact: '聯繫方式',
		join: '人才招聘',
		subGroup: '所屬企業'
	},
	en: {
		home: 'Home',
		about: 'About Us',
		product: 'About Us',
		example: 'Customer Cases',
		news: 'News',
		newsDetail: 'News Detail',
		overview: 'About Us',
		mainBusiness: 'Core Business',
		contact: 'Contact Us',
		join: 'Careers',
		subGroup: 'Group Enterprises'
	}
};

const pageTitle = computed(() => {
	const path = route.path.toLowerCase();
	let key = 'home';

	if (path.startsWith('/newsdetail')) {
		key = 'newsDetail';
	} else if (path.startsWith('/news')) {
		key = 'news';
	} else if (path.startsWith('/overview')) {
		key = 'overview';
	} else if (path.startsWith('/mainbusiness')) {
		key = 'mainBusiness';
	} else if (path.startsWith('/contactinformation')) {
		key = 'contact';
	} else if (path.startsWith('/joinus')) {
		key = 'join';
	} else if (path.startsWith('/subgroup')) {
		key = 'subGroup';
	} else if (path.startsWith('/product')) {
		key = 'product';
	} else if (path.startsWith('/example')) {
		key = 'example';
	} else if (path.startsWith('/about')) {
		key = 'about';
	}

	const titles = pageTitleMap[locale.value] || pageTitleMap.zhCN;
	return titles[key] || pageTitleMap.zhCN[key];
});

onMounted(() => {
	handleScroll();
	window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.page-wrapper {
	position: relative;
}

.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
.main-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	-moz-user-select: none;
	-khtml-user-select: none;
	user-select: none;
}

.lang-switcher {
	/* position: fixed;
	top: 10px;
	right: 10px; */
	z-index: 99999;
}

.headerContainer {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	padding-top:0.9rem;
}

.back-to-top {
	position: fixed;
	right: 2.5rem;
	bottom: 2.5rem;
	z-index: 10000;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.2rem;
	height: 3.2rem;
	border: none;
	border-radius: 50%;
	background: #F7B334;
	box-shadow: 0 0.35rem 1rem rgba(0, 0, 0, 0.18);
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.back-to-top:hover,
.back-to-top:focus {
	transform: translateY(-0.15rem);
	box-shadow: 0 0.5rem 1.3rem rgba(0, 0, 0, 0.22);
	outline: 0.2rem solid rgba(247, 179, 52, 0.35);
	outline-offset: 0.2rem;
}

.back-to-top__icon {
	position: relative;
	display: block;
	width: 1.2rem;
	height: 1.2rem;
}

.back-to-top__icon::before {
	content: '';
	position: absolute;
	left: 50%;
	top: 0.35rem;
	width: 0.18rem;
	height: 0.85rem;
	border-radius: 999px;
	background: #fff;
	transform: translateX(-50%);
}

.back-to-top__icon::after {
	content: '';
	position: absolute;
	left: 50%;
	top: 0.15rem;
	width: 0.65rem;
	height: 0.65rem;
	border-top: 0.18rem solid #fff;
	border-left: 0.18rem solid #fff;
	transform: translateX(-50%) rotate(45deg);
}

@media screen and (max-width: 640px) {
	.lang-switcher {
		position: fixed;
		top: 500px !important;
		right: 0;
		z-index: 9999;
	}

	.back-to-top {
		right: 1.2rem;
		bottom: 1.5rem;
		width: 2.8rem;
		height: 2.8rem;
	}

}
</style>

