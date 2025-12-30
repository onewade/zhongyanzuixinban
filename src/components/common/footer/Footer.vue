<script setup>
import { getCompanyInfoAPI } from '@/apis/aboutourAPi.js'
import { getTabListAPI } from '@/apis/productAPI.js'
import { onMounted, ref } from 'vue'
const CompanyInfo1 = ref({})
const tabList = ref([])
const tabList1 = ref([])
const tabList2 = ref([])
const tabList3 = ref([])
const getCompanyInfo1 = async () => {
	const { data: res } = await getCompanyInfoAPI()
	CompanyInfo1.value = res.Data
	// console.log(CompanyInfo1.value);
}
const getExempleTablist = async () => {
	const { data: res } = await getTabListAPI()
	// console.log(res.Data);
	if (res.Data.length >= 1) {
		tabList1.value = res.Data[0].TypeName
		if (res.Data.length >= 2) {
			tabList2.value = res.Data[1].TypeName
			if (res.Data.length >= 3) {
				tabList3.value = res.Data[2].TypeName
			}
		}
	}
	console.log(res.Data[0].TypeName);
	const tablist = []
	for (let i = 0; i < res.Data.length; i++) {
		tablist.push(res.Data[i].TypeName)
		tabList.value = tablist

	}
	// console.log(tabList.value);
}
// 数字翻牌器
import { useTransition } from '@vueuse/core'
const source = ref(0)
const outputValue = useTransition(source, {
	duration: 1500,
})
source.value = 23.250;
const formatter = (value) => {
	// 使用toFixed保留小数点后两位
	return `${value.toFixed(3)}`;
}
onMounted(() => {
	// getCompanyInfo1();
	// getExempleTablist();
})
</script>
<template>
	<div class="footer">
		<div style="background-color:rgb(28 77 127)" class="footer--bg"></div>
		<div class="footer--inner">
			<div class="footer_main--column_box">
				<div>{{ $t('message.mianze') }}</div>|
				<div>{{ $t('message.siyin') }}</div>|
				<div>{{ $t('message.lianxi') }}</div>
			</div>
			<div>{{ $t('message.xiyan') }}</div>
			<div>{{ $t('message.banquan') }} {{ $t('message.banquan1') }}</div>
		</div>
		<div class="am-u-md-3 ">
			<div class="footer_main--column">
				<div>
					<div class="messageNumber animate__bounceIn">
						<div class="ic"></div>
						<el-statistic title="" :value="outputValue" :formatter="formatter" />
						<!-- {{ $t("message.number") }} -->
					</div>
					<div>{{ $t("message.zuixin") }}</div>
					<div>{{ $t('message.gupiao') }}{{ $t("message.daimanumber") }}</div>
					<div>{{ $t('message.jiezhi') }}{{ $t('message.date') }}{{ $t('message.xianggangshijian') }}</div>
					<div>{{ $t('message.yanchi') }}</div>
				</div>
				<!-- <strong class="footer_main--column_title">联系详情</strong>
						<ul class="footer_contact_info">
							<li class="footer_contact_info--item" v-if="CompanyInfo1.Phone"><i class="am-icon-phone"></i><span>服务专线：{{ CompanyInfo1.Phone }}</span></li>
							<li class="footer_contact_info--item" v-if="CompanyInfo1.Address"><i class="am-icon-map-marker"></i><span>{{CompanyInfo1.Address.replace(/ /,'').replace(/ /,'')}}</span></li>
							<li class="footer_contact_info--item"><i class="am-icon-clock-o"></i><span>{{CompanyInfo1.WorkTime}} </span></li>
							<li class="footer_contact_info--item"><i class="am-icon-clipboard"></i><a href="https://beian.miit.gov.cn/" style="color: aliceblue;"><span>豫ICP备19022569号-2</span> </a></li>
						</ul> -->
			</div>
		</div>
	</div>
	<!-- </div>
	</div> -->
</template>



<style lang="scss" scoped>
.texthidden {
	height: 155px;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 7;
	line-clamp: 7;
	-webkit-box-orient: vertical;

	p {
		margin: 0 !important;
	}
}

.footer {
	// -moz-user-select: none;
	// -khtml-user-select: none; 
	// user-select: none;
	
	.footer--inner {
		padding: 20px;
		text-align: center;
		color: white;
		font-size: 0.9rem;
		
		@media screen and (min-width: 768px) {
			padding: 30px;
			font-size: 1rem;
		}
		
		@media screen and (min-width: 1024px) {
			padding: 50px;
			font-size: 1.1rem;
		}
		
		.footer_main--column_box {
			display: flex;
			justify-content: center;
			gap: 1rem;
			margin-bottom: 1rem;
			flex-wrap: wrap;
			
			@media screen and (max-width: 767px) {
				flex-direction: column;
				gap: 0.5rem;
			}
		}
	}
	
	.am-u-md-3 {
		padding: 20px;
		
		@media screen and (min-width: 768px) {
			padding: 30px;
		}
		
		@media screen and (min-width: 1024px) {
			padding: 50px;
		}
		
		.footer_main--column {
			text-align: center;
			color: white;
			
			.messageNumber {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #25a668 !important;
				font-size: 1.5rem;
				margin-bottom: 1rem;
				
				@media screen and (min-width: 768px) {
					font-size: 2rem;
				}
				
				@media screen and (min-width: 1024px) {
					font-size: 2.5rem;
				}
				
				.ic {
					display: inline-block;
					width: 12px;
					height: 12px;
					background: url(../../../assets/images/newIndex/icon.png) no-repeat 0 0;
					transform: translateY(10px);
					margin-right: 5px;
					
					@media screen and (min-width: 768px) {
						width: 16px;
						height: 16px;
					}
					
					@media screen and (min-width: 1024px) {
						width: 20px;
						height: 20px;
					}
				}
			}
			
			> div {
				margin-bottom: 0.5rem;
				font-size: 0.8rem;
				
				@media screen and (min-width: 768px) {
					font-size: 0.9rem;
				}
				
				@media screen and (min-width: 1024px) {
					font-size: 1rem;
				}
			}
		}
	}
}

// 响应式隐藏/显示
@media screen and (max-width: 767px) {
	.footer .am-u-md-3 {
		width: 100%;
	}
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
	.footer .am-u-md-3 {
		width: 50%;
	}
}

@media screen and (min-width: 1024px) {
	.footer .am-u-md-3 {
		width: 25%;
	}
}
</style>
