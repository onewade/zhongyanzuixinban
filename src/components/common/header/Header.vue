<script setup>
import AppFunctions from "@/utils/AppFunctions";
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { onLanguageChange, getCurrentLanguage } from '@/utils/language.js';
import { getCompanyInfoAPI } from '@/apis/aboutourAPi.js';
import { h } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import LanguageSwitcher from '../../../views/components/LanguageSwitcher.vue';
import SiteSearch from '../../../views/components/SiteSearch.vue';
// import myNavigation from "../../../views/components/myNavigation.vue";

const router = useRouter()
const CompanyInfo = ref({})//后台数据获取

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 移动端判断
const isMobile = ref(false)

// 检查是否为移动端
const checkMobile = () => {
	isMobile.value = window.innerWidth <= 768
}

const getCompanyInfo = async () => {
	const { data: res } = await getCompanyInfoAPI()
		CompanyInfo.value = res.Data
		window.sessionStorage.setItem('companyinfo', JSON.stringify(res.Data))

}



const toggleStickyHeader = () => {
	const scrolled = document.documentElement.scrollTop;
	if (scrolled > 100) {
		AppFunctions.addClass('.header-wrapper', 'sticky');
	} else if (scrolled <= 100) {
		AppFunctions.removeClass('.header-wrapper', 'sticky');
	}
}
// eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
const toggleMobileMenu = () => {
	if (isMobile.value) {
		isMobileMenuOpen.value = !isMobileMenuOpen.value
	}
}

// 关闭移动端菜单
const closeMobileMenu = () => {
	isMobileMenuOpen.value = false
}
// 移动端菜单方向
const direction = ref('ttb');
const drawer = ref(false);
const showMenu = () => {
	drawer.value = true;
}

// 当前语言
const currentLanguage = ref(getCurrentLanguage());
const offLangListener = ref(null);

// 处理drawer关闭
const handleClose = (done) => {
	drawer.value = false;
	done();
}
// 如果当前语言是英语的话 就不显示新闻资讯
const isNews = computed(() => {
	return currentLanguage.value !== 'en'
})
// 返回到首页
const goHome = () => {
	router.push('/index');
}

onMounted(() => {
	// 初始化检查移动端
	checkMobile()
	// 监听窗口大小变化
	window.addEventListener('resize', checkMobile)

	// 订阅语言变更
		offLangListener.value = onLanguageChange((lang) => {
			currentLanguage.value = lang;
		});

	// 获取公司信息并监听滚动以切换固定 header
	// getCompanyInfo()
	window.addEventListener('scroll', toggleStickyHeader)
})

onBeforeUnmount(() => {
	// window.removeEventdivstener('scroll', toggleStickyHeader);
	// 移除监听器
	window.removeEventListener('resize', checkMobile)
	window.removeEventListener('scroll', toggleStickyHeader)

	// 取消语言监听
	if (offLangListener.value) {
		offLangListener.value();
		offLangListener.value = null;
	}
})
</script>
<template>
	<div class="header-wrapper">
		<div v-if="isMobile" class="header-mobile">
			<img src="../../../assets/images/menu.png" alt="菜单按钮" srcset="" @click="showMenu">
			<div class="header-mobile-title">
				<!-- <div> -->
				<img src="../../../assets/images/logo.png" alt="中烟国际集团有限公司标志" @click="goHome" >
				<!-- </div> -->

			</div>
			<SiteSearch class="mobile-search" />
			<LanguageSwitcher class="lang-switcher" />
		</div>

		<div v-else class="nav-wrapper header-default headerNew ">
			<div class="zgyc">
				<!-- #0F409E -->
				<div>
					<!-- <div class="mainTitle">中烟国际集团有限公司</div> -->
					<img src="../../../assets/images/logo.png" alt="中烟国际集团有限公司标志" class="logoImg" @click="goHome">
				</div>

			</div>
			<div class="header-right">
				<div class="award">
					<img src="../../../assets/images/newIndex/award.jpg" alt="企业荣誉奖项" srcset="" />
					<img src="../../../assets/images/newIndex/award1.png" alt="企业认证标志" srcset="" />
				</div>

				<LanguageSwitcher class="lang-switcher" />
			</div>
			<!-- <myNavigation></myNavigation> -->
		</div>

		<!-- 桌面端导航 -->
		<div v-if="!isMobile" class="nav desktop-nav">
			<div class="am-navss am-navss-pills">
				<div><router-link class="router" to="/index" @click="closeMobileMenu" tabindex="0" role="link" aria-label="首页">{{ $t('message.t1')
						}}</router-link></div>
				<div><router-link class="router" to="/overview" @click="closeMobileMenu" tabindex="0" role="link" aria-label="公司概况">{{ $t('message.t2')
						}}</router-link></div>
				<div v-if="isNews"><router-link class="router" to="/news" @click="closeMobileMenu" tabindex="0" role="link" aria-label="新闻资讯">{{ $t('message.t3')
						}}</router-link></div>
				<!-- <div><router-link class="router" to="/example">客户案例</router-link></div> -->
				<div><router-link class="router" to="/MainBusiness" @click="closeMobileMenu" tabindex="0" role="link" aria-label="主营业务">{{ $t('message.t4')
				}}</router-link>
				</div>
				<div><router-link class="router" to="/JoinUs" @click="closeMobileMenu" tabindex="0" role="link" aria-label="人才招聘">{{ $t('message.t5')
						}}</router-link></div>
				<div><router-link class="router" to="/ContactInformation" @click="closeMobileMenu" tabindex="0" role="link" aria-label="联系我们">{{ $t('message.t6')
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
		<el-drawer v-model="drawer" :direction="direction" :before-close="handleClose">
			<div class="am-navss am-navss-pills">
				<div><router-link class="router" to="/index" @click="closeMobileMenu">{{ $t('message.t1')
						}}</router-link></div>
				<div><router-link class="router" to="/overview" @click="closeMobileMenu">{{ $t('message.t2')
						}}</router-link></div>
				<div v-if="isNews"><router-link class="router" to="/news" @click="closeMobileMenu">{{ $t('message.t3')
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
		</el-drawer>
	</div>
</template>



<style lang="scss" scoped>
.header-right {
	display: flex;
	width: 70%;
	justify-content: flex-end;
}

.award {
	height: 4.5rem;
	display: none;
	/* >=1025 调整为桌面布局 */
	@media screen and (min-width: 1024px) {
		    width: 30%;
			justify-content: flex-end;
			display: flex;
			>img:nth-child(2) {
				margin-left: 1rem;
			}	
	
	}
}

.logoImg {
	width: 25rem;
	height: auto;
	// margin-left:-1rem;
}

// .el-drawer .el-drawer__body .am-navss div .router
// Vue 3 深度渗透选择器示例
:deep(.el-drawer) {
	// height: 36% !important;
	// 高度自适应怎么写
	height: auto !important;


	.el-drawer__header {
		padding: 1rem;
		border-bottom: 1px solid #eee;
		margin-bottom: 0rem !important;
	}

	.el-drawer__body {
		padding: 0rem 2rem;

		.am-navss {
			flex-direction: column;

			div {
				width: 100%;
				text-align: left;

				.router {
					padding: 1rem 0;
					border-bottom: 1px solid #f0f0f0;
					font-size: 1.2rem;

					&:hover {
						color: #333;
					}
				}
			}
		}
	}

}

.header-mobile {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 5rem;
	background-color: #fff;
	position: relative;
	z-index: 1000;

	img {
		width: 4rem;
		height: 4rem;
	}

	.header-mobile-title {
		width: 20rem;

		img {
			width: 100%;
			height: auto;
			margin-top: 1rem;
		}

	}

	.header-mobile-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	>div:nth-child(3) {
		width: 4rem;
		height: 4rem;
	}


}

// 当前路由高亮样式
.router.router-link-active {
	cursor: default;
	font-weight: 600 !important;
	color: #333 !important;
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
	margin: 0rem auto;

	@media screen and (min-width: 1024px) {
		padding-left: 1rem;
		padding-bottom: 0.8rem;
	}

}

.am-navss {
	width: 99%;
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
	// width: 100%;
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
	margin: 0 auto;

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

	>img {
		width: 4.5rem;
		height: 4.5rem;
		margin: 0rem 1rem 0rem 0rem;
	}

	// @media screen and (min-width: 768px) {
	// 	width: 300px;
	// 	height: 75px; 
	// }

	// @media screen and (min-width: 1024px) {
	// 	// width: 40rem;
	// }
}

.mainTitle {
	font-size: 2rem;
	font-weight: bold;
	color: #0F409E;
}

.assistantTitle {
	font-size: 1rem;
	line-height: 1rem;
	color: #999999;
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
		// position: fixed;
		// top: 20px;
		// right: 80px;
		// z-index: 1002;
	}

	@media screen and (min-width: 1024px) {
		width: 27rem;
		height: 4.5rem;
		// margin-right:29.6rem;
	}
}
</style>
