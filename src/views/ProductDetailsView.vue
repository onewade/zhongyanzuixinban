<script setup>
		import { computed, onMounted, ref } from 'vue';
	import Layout from '../components/common/Layout.vue';
	import {getProductByIdAPI} from '@/apis/productAPI.js'
	import { sanitizeHtml } from '@/utils/sanitizeHtml.js';

  const title = ref();
  const introduction = ref();
  const activePhoto = ref(0);//当前展示图片 的序号
  // const photos = reactive({
	// 	data:[]
	// })
		const photos = ref([])
		const detailData = ref([])
		const safeSpec = computed(() => sanitizeHtml(detailData.value.Spec));
		const safeParam = computed(() => sanitizeHtml(detailData.value.Param));

  
		// 通过id获取产品详细信息
    const getProductById = async(typeDetailsId)=>{
	    // 调用接口获取产品详情信息
				const {data:res} = await getProductByIdAPI(typeDetailsId)
				const temp = res.Data
				detailData.value = res.Data
				title.value = temp.Title
				introduction.value = temp.Introduction
    // 将获取到的照片数据以数组形式存放 photos.value = res.Data.照片数组
      const photoslist = [];
			photoslist.length = 0
					for (let i = 1; i < 6; i++) {
						// 判断是否为空
						if (temp['ImageUrl'+ i] != null){
							// 判断是否有重复
							if (!photoslist.includes(temp['ImageUrl'+ i])){
								photoslist.push(temp['ImageUrl'+ i])
							}
						}
					}
						// console.log(title !== ' ' && photos.length > 0);
						photos.value = photoslist//这里把整理好的数组存到photos里
						// return photos
    };
		
		// 右切换图片
    const nextPhoto = ()=>{
      activePhoto.value = ( activePhoto.value+1 < photos.value.length ? activePhoto.value+1 : 0 )};
		// 左切换图片
    const previousPhoto = ()=>{
      activePhoto.value = ( activePhoto.value-1 >= 0 ? activePhoto.value-1 : photos.value.length-1 )
    };
		const showImagePreview = (eurl)=>{
			const image = new Image();
      image.src = eurl;
      image.onload = () => {
        // 创建弹出层
        const previewContainer = document.createElement('div');
        previewContainer.style.position = 'fixed';
        previewContainer.style.top = 0;
        previewContainer.style.bottom = 0;
        previewContainer.style.left = 0;
        previewContainer.style.right = 0;
        previewContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
        previewContainer.style.display = 'flex';
        previewContainer.style.justifyContent = 'center';
        previewContainer.style.alignItems = 'center';
        document.body.appendChild(previewContainer);
        // 在弹出层中添加图片
        const previewImage = document.createElement('img');
        previewImage.src = eurl;
        previewImage.style.maxWidth = '80%';
        previewImage.style.maxHeight = '80%';
        // previewImage.style.zIndex = '9999';
        previewContainer.appendChild(previewImage);
        // 点击弹出层，关闭预览
        previewContainer.addEventListener('click', () => {
          document.body.removeChild(previewContainer);
        });
			}
		}

    onMounted(()=>{
			getProductById(window.localStorage.getItem('productId'));
		// console.log(photosarr.value);
		// if(photoss.value[0] === photos.value[activePhoto.value]){
		// console.log('66666');
		// }
		})

</script>
<template>
	<Layout>
		<div class="gallery-box" >
			
			<div class="layout-container" style="width: 100%">
				<div class="solution-page">
					<div class="container">
						<h2>{{title}}</h2>
						<p>{{introduction}}</p>
					</div>
				</div>
			</div>
			
			<div class="gallery">
				<!-- <img src="http://192.168.21.33:6088/UpLoad/BackupData/45880d5f79004f0caeb30183d223d23e.jpg"/> -->
				<!-- <p>{{ photos.photo[0] }}</p> -->
				<div class="active-photo" :style="'background-image: url('+photos[activePhoto]+');'" @click="showImagePreview(photos[activePhoto])">
					<button
type="button"
						aria-label="Previous Photo"
						class="previous"
						@click="previousPhoto()" > 
						<!-- ◀ -->
					</button>
					<button
type="button"
						aria-label="Next Photo"
						class="next"
						@click="nextPhoto()">
						<!-- ▶ -->
					</button>
				</div>
				<div class="thumbnails">
					<div
v-for="(photo, index) in photos"
						:key="index"
						:src="photo"
						:class="{'active': activePhoto === index}"
						:style="'background-image: url('+photo+')'"
						@click="activePhoto = index">
					</div>
				</div>
			</div>
			<el-tabs type="border-card" class="tabCard">
    <el-tab-pane class="panelstyle">
			<template #label>
        <span class="custom-tabs-label">
          <i class="fa fa-lightbulb-o" style="font-size:35px;vertical-align:-3px;"></i>&nbsp;
          <span>产品特点</span>
        </span>
      </template>
			<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="safeSpec"></div>
			<!-- •  支持云服务器平台部署管理，支持局域网平台部署管理。<br/>

•  支持私有化部署。<br/>

•  数据直接上传，无需经过供应商平台，数据安全、可靠。<br/>

•  费浦提供二维码禁硬件产品解决方案，专为具有智慧社区平台、智能安防平台、智慧楼宇平台、智能物业平台、联合办公平台等公司提供完善的二维码产品解决方案以及快速高效的对接服务。<br/> -->
		</el-tab-pane>
    <el-tab-pane class="panelstyle">
			<template #label>
        <span class="custom-tabs-label">
          <i class="fa fa-cog" style="font-size:35px;vertical-align:-3px;"></i>&nbsp;
          <span>产品参数</span>
        </span>
      </template>
			<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="safeParam"></div>
			<!-- 识读码制： 

1D: EAN,UPC,Code 39,Code 93,Code 128,UCC/EAN 128, Code 11,Codabar, Interleaved 2 of 5, Standard 25，MSI-Plessey，GS1 Databar, Industrial 25, Matrix 2 of 5 2D: QR Code, Data Matrix, PDF417,maxicode,Aztec,hanxin <br/>

扫描角度：转角 360°，仰角 ± 55°，偏角 ± 55° <br/>

视场角：水平 60°，垂直 46° <br/>

识读景深：支付宝30-130mm （以镜头前端面为基准， 手机屏幕尺寸5.2寸） 公交码50-100mm （以镜头前端面为基准， 手机屏幕尺寸5.2寸） <br/>

环境光照：0~100000LUX <br/>

支持卡类：125KHZ 低频卡：13.56MHZ 高频卡： <br/>

供电电压：DC12V <br/>

显示屏：2.2英寸LCD显示 <br/>

分辨率：320*240像素 <br/>

容量：离线支持5万用户，10万条离线事件存储 <br/>

通讯：支持TCPIP网络通讯，支持扩展4G通讯、WIFI通讯 <br/>

外观尺寸：132*89*22 mm <br/>

防水等级：IP64 <br/>

防刮等级：4H <br/>

工作环境： -20℃~+50℃ <br/>

外观颜色：黑色、支持定制其他颜色 <br/>

其他：支持RS485通讯，接入19系列控制器 <br/>

其他：支持WG数据上传，接入18系列控制器，搭配费浦开门码小程序使用<br/> -->
		</el-tab-pane>
    
  </el-tabs>
		</div>
		
	</Layout>
</template>


<style scoped lang="scss">
.solution-page {
     background: url('@/assets/images/product/bg.jpg'); 
      color: #fff;
     padding: 110px 0 160px; 
 }
* {
	outline: none;
	box-sizing: border-box;
}

.gallery-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	/*background-color: #5c4084;*/
	/*background-color: rgba(16 18 27 / 10%);*/
	text-align: center;
	width: 100%;
	
}

.gallery-box .gallery {
	width: 80%;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	padding: 4px 4px 6px;
	border-radius: 8px;
	margin-bottom: 30px;
}
.gallery-box .gallery .active-photo {
	width: 600px;
	/* margin-bottom: 5px; */
	margin: 0 auto 5px;
	padding-bottom: 600px;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	border: 2px solid #fff;
	position: relative;
}

.gallery-box .gallery .active-photo button {
	border: none;
	background-color: transparent;
	font-size: 40px;
	/*color: #fff;*/
	color: #03c3fd;
	opacity: 0.5;
	position: absolute;
	outline: none;
	height: 100%;
}

.gallery-box .gallery .active-photo:hover {
	opacity: 1;
}


.gallery-box .gallery .thumbnails {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
	grid-gap: 4px;
}
.thumbnails div {
	border: 2px solid #fff;
	outline: 2px solid #fff;
	cursor: pointer;
	padding-bottom: 65%;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	opacity: 1;
}
    
.thumbnails .active {
	outline-color: #59bcdb;
	opacity: 0.6;
 }
 .tabCard{
 width: 100%;
 margin-bottom: 80px;
 border: none;
 }
 :deep(.el-tabs__nav){
 display: flex;
 flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
		float: none;
		height: 80px;
		z-index: 0;
 }
 :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item){
 display: flex !important;
 /* color: red !important; */
 font-size:26px;
		height: 80px;
 /* padding: 0 80px; */
 }
 :deep(.el-tabs--border-card>.el-tabs__header){
	border: none;
	/* background: #03aadd; */
}
 :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active){
background: rgb(39 104 169);
color: #fcfafa;
}
:deep(.el-tabs--border-card>.el-tabs__content){
	background: rgb(39 104 169);
    color: white;
}
:deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:hover){
/* background: #03aadd; */
color: #fcfafa;
}
    
 .el-tabs__item:hover {
  color: red;
}
.panelstyle{
	text-align: left;
	margin: 0 200px;
    padding: 10px 20px;
		min-height: 600px;
		
}

</style>
