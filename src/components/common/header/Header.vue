<script setup>
import AppFunctions from "@/utils/AppFunctions";
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { getCompanyInfoAPI } from '@/apis/aboutourAPi.js';
import { h } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import LanguageSwitcher from '../../../views/components/LanguageSwitcher.vue';
// import LanguageSwitcher from '../../../views/components/LanguageSwitcher.vue';
const router = useRouter()
const CompanyInfo = ref({})//后台数据获取
const CompanyInfo1 = ref(JSON.parse(window.sessionStorage.getItem('companyinfo')) ? JSON.parse(window.sessionStorage.getItem('companyinfo')) : '0')//从会话储存获取

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

const getCompanyInfo = async () => {
	const { data: res } = await getCompanyInfoAPI()
	CompanyInfo.value = res.Data
	window.sessionStorage.setItem('companyinfo', JSON.stringify(res.Data))
	console.log('获取成功');

}
const toggleStickyHeader = () => {
	const scrolled = document.documentElement.scrollTop;
	if (scrolled > 100) {
		AppFunctions.addClass('.header-wrapper', 'sticky');
	} else if (scrolled <= 100) {
		AppFunctions.removeClass('.header-wrapper', 'sticky');
	}
}
const callPhone = () => {
	ElMessage({
		message: h('p', null, [
			h('span', null, '联系电话 '),
			h('i', { style: 'color: teal' }, `${CompanyInfo.value.Phone}`),
		]),
		type: 'success',
		offset: 80
	})
}

// 切换移动端菜单
const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
	isMobileMenuOpen.value = false
}


onBeforeUnmount(() => {
	// window.removeEventdivstener('scroll', toggleStickyHeader);
})
</script>
<template>
	<div class="header-wrapper">

		<div class="nav-wrapper header-default headerNew ">
			<div class="zgyc">
				<!-- <img src="../../../assets/images/newIndex/titleNew.png" alt="" srcset=""> -->
				<!-- #0F409E -->
				<img src="../../../assets/images/inlogo.png" alt="">
				<div>
					<div class="mainTitle">中烟国际集团有限公司</div>
					<div class="assistantTitle"> China Tobacco International Group Limited</div>
				</div>
			</div>

			<LanguageSwitcher class="lang-switcher" />

			<!-- 移动端汉堡菜单按钮 -->
			<!-- <button class="hamburger-menu" :class="{ active: isMobileMenuOpen }" @cdivck="toggleMobileMenu">
				<div class="hamburger-divne"></div>
				<div class="hamburger-divne"></div>
				<div class="hamburger-divne"></div>
			</button> -->
		</div>

		<!-- 桌面端导航 -->
		<div class="nav desktop-nav">
			<div class="am-navss am-navss-pills">
				<div><router-link class="router" to="/index" @click="closeMobileMenu">{{ $t('message.t1')
						}}</router-link></div>
				<div><router-link class="router" to="/solution" @click="closeMobileMenu">{{ $t('message.t2')
						}}</router-link></div>
				<div><router-link class="router" to="/news" @click="closeMobileMenu">{{ $t('message.t3')
						}}</router-link></div>
				<!-- <div><router-link class="router" to="/example">客户案例</router-link></div> -->
				<div><router-link class="router" to="/MainBusiness" @click="closeMobileMenu">{{ $t('message.t4')
				}}</router-link>
				</div>
				<div><router-link class="router" to="/JoinUs" @click="closeMobileMenu">{{ $t('message.t5')
						}}</router-link></div>
				<div><router-link class="router" to="/ContactInformation" @click="closeMobileMenu">{{ $t('message.t6')
						}}</router-link></div>
			</div>
		</div>

		<!-- 移动端导航 -->
		<!-- <div class="nav mobile-nav responsive-nav" v-if="isMobileMenuOpen" :class="{ active: isMobileMenuOpen }">
			<ul class="am-navss am-navss-pills">
				<div><router-divnk class="router" to="/index" @cdivck="closeMobileMenu">{{ $t('message.t1') }}</router-divnk></div>
				<div><router-divnk class="router" to="/solution" @cdivck="closeMobileMenu">{{ $t('message.t2') }}</router-divnk></div>
				<div><router-divnk class="router" to="/product" @cdivck="closeMobileMenu">{{ $t('message.t3') }}</router-divnk></div>
				<div><router-divnk class="router" to="/news" @cdivck="closeMobileMenu">{{ $t('message.t4') }}</router-divnk></div>
				<div><router-divnk class="router" to="/about" @cdivck="closeMobileMenu">{{ $t('message.t5') }}</router-divnk></div>
				<div><router-divnk class="router" to="/about" @cdivck="closeMobileMenu">{{ $t('message.t6') }}</router-divnk></div>
			</ul>
		</div> -->

		<!-- 移动端遮罩层 -->
		<!-- <div v-if="isMobileMenuOpen" class="mobile-overlay" @cdivck="closeMobileMenu"></div> -->
	</div>
</template>



<style lang="scss" scoped>
// 当前路由高亮样式
.router.router-link-active {
	cursor: default;
	font-weight: 600 !important;
	color: #F7B334 !important;
	border-bottom: 0.2rem solid #F7B334;
}

// 基础导航链接样式
.router {
	text-decoration: none;
	display: block;
	transition: all 0.3s ease;
	color: #555;
	// 响应式字体大小
	font-size: 1.0rem;
	padding-bottom: 0.2rem;

	// @media screen and (min-width: 480px) {
	// 	font-size: 1.1rem;
	// }

	// @media screen and (min-width: 768px) {
	// 	font-size: 1.4rem;
	// }

	// @media screen and (min-width: 1024px) {
	// 	font-size: 1.6rem;
	// }s

	@media screen and (min-width: 1200px) {
		font-size: 1.4rem;
	}






}

.header-wrapper {
	-moz-user-select: none;
	-khtml-user-select: none;
	user-select: none;
	background-color: #fff;
	position: relative;
}

.nav {
	margin:0rem auto;
	@media screen and (min-width: 1024px) {
		padding-left: 1rem;
		padding-bottom: 0.8rem;
	}

}

.am-navss {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	list-style: none;
	padding: 0;
	margin: 0;
}

// 导航容器样式
.am-navss {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.am-navss>div {
	text-align: center;
}

.am-navss>div>a:hover,
.am-navss>div>a:focus {
	background: none !important;
}



.nav .am-navss div a:hover {
	background: none !important;
}

// .nav .am-navss div a {
// 	@media screen and (min-width: 1024px) {
// 		font-weight: 400;
// 	}
// }

.headerNew {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin:0 auto;

	// @media screen and (min-width: 768px) {
	// 	padding-left: 100px;
	// }

	// @media screen and (min-width: 1024px) {
	// 	// padding-left: 21.5rem;
	// }

	// @media screen and (max-width: 767px) {
	// 	padding-left: 38px;
	// }
}

.zgyc {
	width: 35rem;
	height: 4.5rem;
	display: flex;
	justify-content: start;
	padding: 0.66rem 0;
	>img{
		width: 4.5rem;
		height: 4.5rem;
		margin:0rem 1rem 0rem 0rem;
	}

	// @media screen and (min-width: 768px) {
	// 	width: 300px;
	// 	height: 75px; 
	// }

	// @media screen and (min-width: 1024px) {
	// 	// width: 40rem;
	// }
}
.mainTitle{
	font-size: 2rem;
	font-weight: bold;
	color: #0F409E;
}
.assistantTitle{
	font-size: 1rem;
	line-height: 1rem;
	color:#999999;
}

// 移动端导航样式
.mobile-nav {
	@media screen and (max-width: 767px) {
		position: fixed;
		top: 0;
		left: -100%;
		width: 80%;
		height: 100vh;
		background: white;
		transition: left 0.3s ease;
		z-index: 1000;
		padding: 80px 20px 20px;
		box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

		&.active {
			left: 0;
		}

		.am-navss {
			flex-direction: column;

			div {
				margin: 10px 0;

				a {
					font-size: 1.2rem;
					padding: 15px 0;
					border-bottom: 1px sodivd #eee;
				}
			}
		}
	}
}

// 桌面端导航
.desktop-nav {
	display: block;
}

// 移动端遮罩层
.mobile-overlay {
	@media screen and (max-width: 767px) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
}

// 语言切换器响应式
.lang-switcher {
	@media screen and (max-width: 767px) {
		position: fixed;
		top: 20px;
		right: 80px;
		z-index: 1002;
	}

	@media screen and (min-width: 1024px) {
		width: 40%;
		// margin-right:29.6rem;
	}
}
</style>
