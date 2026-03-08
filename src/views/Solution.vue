<script setup>
import Layout from '@/components/common/Layout.vue';
import { ref, onBeforeUnmount } from 'vue';
import { onLanguageChange, getCurrentLanguage } from '@/utils/language.js';
const currentLanguage = ref(getCurrentLanguage());
const offLanguageListener = ref(null);
	// 订阅全局语言变更事件（使用 utils 封装）
	offLanguageListener.value = onLanguageChange((lang) => {
		currentLanguage.value = lang;
	});
    onBeforeUnmount(() => {
	// 取消语言变更监听
	if (offLanguageListener.value) {
		offLanguageListener.value();
		offLanguageListener.value = null;
	}
})

// removed unused refs to satisfy linter; keep the component minimal

</script>
<template>
  <Layout>
    <div class="index-page" style="width: 100%">
      <div class="page-header-sub">
        <!-- <img src="../assets/images/gaikuang.png" alt=""> -->
         <img src="../assets/images/banner.png" alt="集团概况页面横幅图片" srcset="">
      </div>
    </div>

    <div class="contentContainer">
      <div class="groupTitle">{{ $t('message.t2') }}</div>
      <!--  animate__animated animate__backInDown -->
      <div class="companyContent">
        <div>
          <div class="title">{{ $t('message.zygjjt') }}</div>
          <div>{{ $t('message.zygjjtContent') }}</div>
          <div v-if="currentLanguage == 'en'">{{  $t('message.zygjjtContent3')}}</div>
          <div>{{ $t('message.zygjjtContent1') }}</div>
        </div>
        <div class="content2">
          <div class="title">{{ $t('message.zygjjt1') }}</div>
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
   @media screen and (max-width: 767px) {
        width: 80%;
        padding:1rem;
    }
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
  @media screen and (max-width: 767px) {
        display: none;
    }
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
  @media screen and (max-width: 767px) {
        width: 100%;
        margin-top:2rem;
        margin-left: 0;
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
