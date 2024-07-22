<script setup>
import {getCompanyInfoAPI} from '@/apis/aboutourAPi.js'
import {getTabListAPI} from '@/apis/productAPI.js'
import { onMounted, ref } from 'vue'
	const CompanyInfo1 = ref({})
	const tabList = ref([])
	const tabList1 = ref([])
	const tabList2 = ref([])
	const tabList3 = ref([])
	const getCompanyInfo1 = async()=>{
		const {data:res} = await getCompanyInfoAPI()
		CompanyInfo1.value = res.Data
		// console.log(CompanyInfo1.value);
	}
	const getExempleTablist = async ()=>{
	const {data:res} = await getTabListAPI()
	// console.log(res.Data);
	if(res.Data.length>=1){
	tabList1.value = res.Data[0].TypeName
	if(res.Data.length>=2){
	tabList2.value = res.Data[1].TypeName
	if(res.Data.length>=3){
	tabList3.value = res.Data[2].TypeName}
}
}
	console.log(res.Data[0].TypeName);
	const tablist = []
		for(let i=0; i<res.Data.length; i++){
			tablist.push(res.Data[i].TypeName)
			tabList.value = tablist
			
		}
// console.log(tabList.value);
	}
	onMounted(()=>{
		getCompanyInfo1();
		getExempleTablist();
	})
</script>
<template>
	<div class="footer">
		<div style="background-color:rgb(28 77 127)" class="footer--bg"></div>
		<div class="footer--inner">
			<div class="am-g">
				<div class="am-u-md-3 ">
					<div class="footer_main--column">
						<strong class="footer_main--column_title">产品中心</strong>
						<ul class="footer_navigation">
							<!-- 展示获取所有产品 -->
							<!-- <li class="footer_navigation--item"
							v-for="(item,index) in tabList" :key="index"
							><router-link to="/product" class="footer_navigation--link">{{ item }}</router-link></li> -->
							<li class="footer_navigation--item"><router-link to="/product" class="footer_navigation--link">{{ tabList[0] }}</router-link></li>
							<li class="footer_navigation--item"><router-link to="/product" class="footer_navigation--link">{{ tabList[1] }}</router-link></li>
							<li class="footer_navigation--item"><router-link to="/product" class="footer_navigation--link">{{ tabList[2] }}...</router-link></li>
							
						</ul>
					</div>
				</div>
				<div class="am-u-md-6 ">
					<div class="footer_main--column">
						<strong class="footer_main--column_title">关于我们</strong>
						<div class="footer_about">
							<p class="footer_about--text texthidden" v-html="CompanyInfo1.Introduction">
								
							</p>
						</div>
					</div>
				</div>
				<div class="am-u-md-3 ">
					<div class="footer_main--column">
						<strong class="footer_main--column_title">联系详情</strong>
						<ul class="footer_contact_info">
							<li class="footer_contact_info--item" v-if="CompanyInfo1.Phone"><i class="am-icon-phone"></i><span>服务专线：{{ CompanyInfo1.Phone }}</span></li>
							<li class="footer_contact_info--item" v-if="CompanyInfo1.Address"><i class="am-icon-map-marker"></i><span>{{CompanyInfo1.Address.replace(/ /,'').replace(/ /,'')}}</span></li>
							<li class="footer_contact_info--item"><i class="am-icon-clock-o"></i><span>{{CompanyInfo1.WorkTime}} </span></li>
							<li class="footer_contact_info--item"><i class="am-icon-clipboard"></i><a href="https://beian.miit.gov.cn/" style="color: aliceblue;"><span>豫ICP备19022569号-2</span> </a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>



<style lang="scss" scoped>
.texthidden{
	/* -webkit-line-clamp: 7;
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis; */
height: 155px;
 text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  line-clamp: 7;
  -webkit-box-orient: vertical;
p{
margin: 0 !important;
}
}
.footer{
	// -moz-user-select: none;
  // -khtml-user-select: none; 
  // user-select: none;
}
</style>
