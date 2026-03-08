<script setup>
import { ref, onBeforeUnmount } from 'vue';
import Layout from '../components/common/Layout.vue';
// yangyEmail intentionally not used here; keep contact config centralized
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
</script>
<template>
    <div>
        <Layout>
            <div class="contact">
                <div class="index-page" style="width: 100%">
                    <div class="page-header-sub">
                        <!-- <img src="../assets/images/business.png" alt=""> -->
                        <img src="../assets/images/banner.png" alt="主营业务页面横幅图片">
                    </div>
                </div>
                <div class="contactContainer1">
                    <div class="contactContent">
                        <div>{{ $t("message.ywjs") }}</div>
                        <div v-if="currentLanguage == 'zhTW' || currentLanguage == 'zhCN'" class="fw" style="	text-indent: 2em;">{{
                            $t('message.ywjs1') }}</div>
                        <div v-if="currentLanguage == 'en'" class="fw" >{{ $t('message.ywjs2') }}</div>
                        <div v-if="currentLanguage == 'en'" class="fw">{{ $t('message.ywjs3') }}</div>
                        <div v-if="currentLanguage == 'en'" class="fw">{{ $t('message.ywjs4') }}</div>
                    </div>
                    <div class="contactContent">
                        <div>{{ $t('message.ywzx') }}</div>

                        <div class="cardContent">
                            <div>
                                <img src="../assets/images/call.png" alt="联系电话图标">
                                <div>
                                    +852-26206011
                                </div>
                                <div>
                                    marketing@cti-group.com.hk
                                </div>
                                <div>
                                    <div>{{ $t('message.ywzx2') }}</div>
                                </div>
                            </div>
                            <div>
                                <img src="../assets/images/call.png" alt="联系电话图标">
                                <div>
                                    +852-26206308
                                </div>
                                <div>
                                    supplychain@cti-group.com.hk
                                </div>
                                <div>
                                    <div>{{ $t('message.ywzx1') }}</div>
                                </div>
                            </div>
                            <div>
                                <img src="../assets/images/call.png" alt="联系电话图标">
                                <div>
                                    +852-26206055
                                </div>
                                <div>
                                    <!-- {{ yangyEmail }} -->
                                    production@cti-group.com.hk
                                </div>
                                <div>
                                    <div>{{ $t('message.ywzx3') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
</template>
<style scoped lang="scss">
.contactContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #333;
}

.contactContainer1 {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    padding-bottom: 5rem;
}

.contact {
    width: 100%;

}

.fw {
    // font-weight: 550;
    color: #444;
}

.bgImg {
    width: 100%;

    >img {
        width: 100%;
        height: 100%;
    }
}

.contactContent {
    width: 65%;
    margin: 0px auto 20px;
    font-size: 1.3rem;
    padding-top: 3rem;

    >div:nth-child(1) {
        font-size: 1.5rem;
        color: #F7B334;
        font-weight: bold;
        margin-bottom: 1.7rem;
    }

}

.cardContent {
    display: flex;
    justify-content: space-between;

    >div {
        width: 30%;
        // height: 15rem;
        background: #fff;
        padding: 1rem;
        text-align: center;
        font-size: 1.6rem;
        font-weight: 550;
        color: #444;

        >img {
            width: 3rem;
            height: 3rem;
            margin: 2rem 0rem 0rem 0rem
        }

        >div:nth-child(2) {
            font-size: 2.2rem;
            color: #F7B334;
        }

        >div:nth-child(3),
        >div:nth-child(4) {
            font-size: 0.9rem;
            color: #333;
            margin-top: 0.5rem;
        }
    }

    @media screen and (max-width: 767px) {
        width: 100%;
        display: block;

        >div {
            padding: 0rem;
            width: 100%;
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            padding-top: 1rem;
        }

    }
}
</style>
