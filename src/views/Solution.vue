<script setup>
import Layout from '@/components/common/Layout.vue'
import { onMounted, onUpdated, ref } from 'vue'

const projectTitleref = ref()
const projectBox = ref()
const lineRef = ref()
const paneList = ref([])//获取的解决方案列表
const paneData = ref([])//获取的解决方案内容
const activeName = ref(0)//选中的tab
onMounted(() => {
})
onUpdated(() => {
})

</script>
<template>
  <Layout>
    <div class="index-page" style="width: 100%">
      <div class="page-header-sub">
        <img src="../assets/images/gaikuang.png" alt="">
      </div>
    </div>

    <div class="contentContainer">
      <div class="groupTitle">{{ $t('message.t2') }}</div>
      <!--  animate__animated animate__backInDown -->
      <div class="companyContent">
        <div>
          <div class="title">{{ $t('message.zygjjt') }}</div>
          <div>{{ $t('message.zygjjtContent') }}</div>
          <div>{{ $t('message.zygjjtContent1') }}</div>
        </div>
        <div class="content2">
          <div class="title">{{ $t('message.zygjjt') }}</div>
          <div>{{ $t('message.zygjjtContent2') }}</div>
        </div>
      </div>


    </div>
  </Layout>
</template>


<style lang='scss' scoped>
.layout-container {
  margin-top: 150px
}

.contentContainer {
  display: flex;
  width: 60%;
  margin: 0 auto ;
  padding:4rem 17% 3.5rem;
  border-bottom: 1px solid #eee;
}

.groupTitle {
  height: 19rem;
  font-size: 2rem;
  font-weight: bold;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../assets/images/ppic.png') no-repeat center;
  padding: 0rem 1.5rem;
}

.title {
  font-size: 1.6rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #F7B334;
  padding-bottom: 0.9rem;
  text-indent: 0em !important;
}
.content2{
  margin-top: 4rem;
}

.companyContent {
  font-size: 1.2rem;
  color:#555;
  // 行间距
  line-height: 2rem;

  width: 78%;
  margin-left: 5%;

  >div {
    text-indent: 2em;
  }
}


.demo-tabs {

  // float: left;
  .projectTitle {
    font-size: 40px;
    font-weight: bold;
    // display: inline;
    text-align: right;
    white-space: nowrap;
    // margin-left: 50px;
    // width: 123px;
  }

  .line {
    // width:var(linewidth);
    border-top: 1px solid #666666;
    position: relative;
    top: 36px;
    opacity: 0.15;
    // display: none;
  }

  .textstyle {
    // overflow: hidden;
    word-wrap: break-word;
    // word-break: break-all;

  }

  :deep(.el-tabs__item) {
    color: rgb(142, 143, 145);
    width: 150px;
  }

  :deep(.el-tabs__item.is-active) {
    color: black;
    font-size: 18px;
  }

  :deep(.el-tabs--left .el-tabs__item.is-left) {
    font-size: 16px;
  }
}
</style>
