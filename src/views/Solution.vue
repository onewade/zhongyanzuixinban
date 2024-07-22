<script setup>
import Layout from '@/components/common/Layout.vue'
import { nextTick, onMounted, onUpdated, ref,computed } from 'vue'
import {findExampleAPI,getExempleTablistAPI} from '@/apis/exempleAPI.js'
import {getSolutionListAPI,getDetailListPI} from '@/apis/solutionAPI.js'
  
  const projectTitleref = ref()
  const projectBox = ref()
  const lineRef = ref()
  const paneList =ref()//获取的解决方案列表
  const paneData =ref()//获取的解决方案内容
  const activeName = ref(0)//选中的tab

	const getSolutionList = async()=>{
    const {data:res} = await getSolutionListAPI()
    paneList.value = res.Data

// for(var i=0;i<paneList.value.length;i++){
// 	for(var j=i+1;j<paneList.value.length;j++){
// 		//如果第一个比第二个大，就交换他们两个位置
// 		if(paneList.value[i].Sort>paneList.value[j].Sort){
// 			var temp = paneList.value[i];
// 			paneList.value[i] = paneList.value[j];
// 			paneList.value[j] = temp;
// 		}
// 	}
// }

    activeName.value = res.Data[0].Id
    console.log(paneList.value);
  }
const getDetailList = async (e)=>{
  console.log('触发',e);
  const {data:res} = await getDetailListPI(e)
  paneData.value = res.Data
  console.log(res);
}
	
  const linewidth=computed(()=>{
    return  projectBox.value.clientWidth -projectTitleref.value.clientWidth-30+'px'
  })
	onMounted(()=>{
    getSolutionList();
    
    nextTick(()=>{
    //   getDetailList();
    // console.log(projectTitleref.value.clientWidth);
    // console.log(projectBox.value.clientWidth);
    
    // lineRef.value.style.width = linewidth.value
    // console.log(linewidth.value);
    })
    
	})
  onUpdated(()=>{
    console.log(linewidth.value);
  
  })

</script>
<template>
	<Layout>
		<div class="layout-container" style="width: 100%">
			<div class="page-header">
				<div class="am-container">
					<h1 class="page-header-title">解决方案</h1>
				</div>
			</div>
			<div class="breadcrumb-box">
				<div class="am-container">
					<ol class="am-breadcrumb">
						<li><router-link to="/">首页</router-link></li>
						<li class="am-active">解决方案</li>
					</ol>
				</div>
			</div>
		</div>
		
		<div style="min-height:800px;width: 90%; min-width: 1100px;margin-bottom:50px">
      <el-tabs tab-position="left" v-model="activeName" class="demo-tabs" @tab-change="getDetailList">
    <el-tab-pane  v-for="(itemPane,index) in paneList" :key="index" :name="itemPane.Id" >
      <template #label>
        <span class="custom-tabs-label">
          <span style="font-size:16px;">{{itemPane.Name}}</span>
        </span>
      </template>
      <div v-for="(item,index) in paneData" :key="index">
      <div style="display:flex;" ref="projectBox">
      <div class="projectTitle" ref="projectTitleref">{{item.Title}}</div>&nbsp;<div class="line" ref="lineRef" ></div>
    </div>
    <div v-if="item.Picture"><img :src="item.Picture" style="width:100%"/></div>
      <div class="textstyle" v-html="item.Content"></div>
      
      
    </div>
    
    
    </el-tab-pane>
    
  </el-tabs>
    </div>
	</Layout>
</template>


<style lang='scss' >
.demo-tabs{
  // float: left;
  .projectTitle{
    font-size: 40px;
    font-weight: bold;
    // display: inline;
    text-align: right;
		white-space: nowrap;
    // margin-left: 50px;
    // width: 123px;
  }
  .line{
    // width:var(linewidth);
    border-top: 1px solid #666666;
    position: relative;
    top: 36px;
    opacity: 0.15;
		// display: none;
  }
  .textstyle{
    // overflow: hidden;
word-wrap: break-word;
// word-break: break-all;

  }
  :deep(.el-tabs__item){
    color: rgb(142, 143, 145);
    width: 150px;
  }
  :deep(.el-tabs__item.is-active){
    color: black;
  font-size: 18px;
  }
  :deep(.el-tabs--left .el-tabs__item.is-left){
  font-size: 16px;
  }
}
</style>
