<script setup>
import { onMounted, ref } from 'vue';
import Layout from '../components/common/Layout.vue';
import { getCompanyInfoAPI, getDesignersAPI, getourfaithAPI } from '@/apis/aboutourAPi.js'
const companyInfo = ref({});
const designers = ref([]);
const CompanyflagList = ref([
	{ Id: 1, Cover: new URL('../assets/images/about/f02.jpg', import.meta.url).href, Title: '品质', desc: '全球领先的HTML5解决方案供应商，安全高效解决企业移动化', List: ['快捷的移动适配开发', '统一的办公通讯门户', '完善的安全管理平台'] },
	{ Id: 2, Cover: new URL('../assets/images/about/f03.jpg', import.meta.url).href, Title: '责任', desc: '国产最流行的开源HTML5前端框架，组件丰富，为HTML5开发加速', List: ['持续改进', '追求卓越品质', '为顾客创造价值'] },
	{ Id: 3, Cover: new URL('../assets/images/about/f04.jpg', import.meta.url).href, Title: '诚信', desc: '全球领先的HTML5解决方案供应商，安全高效解决企业移动化', List: ['平等包容', '互利共赢', '与事业伙伴同成长'] },
	{ Id: 4, Cover: new URL('../assets/images/about/f01.jpg', import.meta.url).href, Title: '责任', desc: '全球领先的HTML5解决方案供应商，安全高效解决企业移动化', List: ['快捷的移动适配开发', '统一的办公通讯门户', '完善的安全管理平台'] },
])
import c1 from '@/assets/images/contact/c1.jpg';
import c2 from "@/assets/images/contact/c2.jpg";
import c3 from "@/assets/images/contact/c3.jpg";
const contactList = ref([
	{
		title: '业务咨询',
		name: '杨女士',
		mail: 'info@ctihk.com.hk',
		img: c1
	},
	{
		title: '投资者联络',
		name: '李先生',
		mail: 'ir@ctihk.com.hk',
		img: c2
	},
	{
		title: '合规举报',
		name: '梁先生',
		mail: 'jb@ctihk.com.hk',
		img: c3
	}
])
// 获取公司信息数据
const getCompanyInfo = async () => {
	const { data: res } = await getCompanyInfoAPI()
	companyInfo.value = res.Data
	// this.getRequest("/findCompanyInfo").then(resp =>{
	// 			if (resp){
	// 				companyInfo.value = resp.data.data
	// 			}
	// 		})
}
const getourfaith = async () => {
	const { data: res } = await getourfaithAPI()
	console.log(res.Data);
	CompanyflagList.value = res.Data
}
// 获取企业人员信息
const getDesigners = async () => {
	const { data: res } = await getDesignersAPI()
	console.log(res.Data);
	designers.value = res.Data
	// this.getRequest("/findDesigners").then(resp =>{
	// 			if (resp){
	// 				designers.value = resp.data.data
	// 			}
	// 		})
}

onMounted(() => {
	// getCompanyInfo();
	// getDesigners();
	// getourfaith()
})
</script>

<template>
	<Layout>
		<div class="layout-container" style="width: 100%">
			<div class="page-header">
				<div class="am-container">
					<h1 class="page-header-title">联系我们</h1>
				</div>
			</div>

			<div class="breadcrumb-box">
				<div class="am-container">
					<ol class="am-breadcrumb">
						<li><router-link to="/">首页</router-link></li>
						<li class="am-active">联系我们</li>
					</ol>
				</div>
			</div>

		</div>
		<div class="contactContainer ">
			<div
v-for="(item, index) in contactList" :key="index" :style="{ backgroundImage: 'url(' + item.img + ')' }"
				class="contact">
				<div>
					<div>{{ item.title }}</div>
					<div>{{ item.name }}</div>
					<div>{{ item.mail }}</div>
				</div>
			</div>
		</div>

		<!-- 
		<div class="section">
			<div class="container" style="max-width: 1160px">
				<div class="section--header">
					<h2 class="section--title">{{ companyInfo.Name }}</h2>
					<p class="section--description-notextcenter" v-html="companyInfo.Introduction"></p>
				</div>

				<div class="about-container">
					<div class="am-g" style="display: none;">
						<div class="am-u-md-6">
							<div class="our-company-text">
								<h3>{{ companyInfo.SkillTitle }}</h3>
								<p style="height: 325px;overflow: auto;">
									{{ companyInfo.Skill }}
								</p>
							</div>
						</div>

						<div class="am-u-md-6">
							<div class="our-company-quote">
								<div class="am-g">
									<div class="am-u-md-6">
										<div class="our-company-img">
											<img :src="companyInfo.Image2" alt="" />
										</div>
									</div>

									<div class="am-u-md-6">
										<p class="our-company-brief" style="height: 200px;overflow: auto;">
											{{ companyInfo.PeopleHonor }}
										</p>
										<div class="our-company-quote_author">
											<strong>{{ companyInfo.PeopleName }}</strong><span>{{ companyInfo.Design
												}}</span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->

		<!-- <hr class="section_divider -narrow"> -->

		<!-- <div class="section">
			<div class="container" style="max-width: 1160px">
				<div class="section--header">
					<h2 class="section--title">企业资质</h2>
					<p class="section--description">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司的追求是在行业领域实现顾客的梦想，并依靠点点滴滴、锲而不舍的艰苦追求，使我们成为世界级领先企业。
					</p>
				</div> -->

		<!-- <div class="about-container">
					<div class="our-mission">
						<div class="am-g" style="display: flex; flex-direction:row; flex-wrap: wrap;">
							<div class="am-u-md-3" v-for="item in CompanyflagList" :key="item.Id">
								<div class="our_mission--item">
									<div class="figure our_mission--item_media"><img :src="item.Cover" alt=""></div>
									<h3 class="our_mission--item_title" style="text-align:center;">{{ item.Title }}</h3>
									<div class="our_mission--item_body">
										
									</div>
								</div>
							</div>

						
						</div>
					</div>
				</div> -->
		<!-- </div>
		</div> -->

		<!-- <hr class="section_divider -narrow"> -->


		<!-- <div class="section">
			<div class="container" style="max-width: 1160px">
				<div class="section--header">
					<h2 class="section--title">公司文化</h2>
					<p class="section--description">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成为全球受尊敬的优良企业，造福员工 、发展企业 、贡献社会、创造价值 、合作共赢
						、持续发展。是我们事业可持续发展的内在要求。
					</p>
				</div>

				<div class="about-container">
					<div class="our-team">
						<div class="am-g">
							<div class="am-u-md-3 am-u-end" v-for="(designer, index) in designers" :key="index">
								<div class="team-box">
									<div class="our-team-img" style="height: 304px;overflow: hidden">
										<img :src="designer.Avatar" style="height: auto" alt="" />
									</div>
									<div class="team_member--body">
										<h3 class="team_member--name">{{ designer.Name }}</h3>
										<span class="team_member--position">{{ designer.Content }}</span>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div> -->

	</Layout>
</template>


<style scoped>
.contactContainer {
	display: flex;
	align-items: baseline;

	padding: 20px 0px;
}

.contact {
	position: relative;
	width: 400px;
	height: 300px;
	margin:0px 10px;
	>div {
		position: absolute;
		bottom: 5px;
		left: 10%;
		color: #fff;
		>div:nth-child(1) {
			font-size: 20px;
			font-weight: bold;
		}
	}
}
</style>
