<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Layout from '../components/common/Layout.vue';

const { t } = useI18n();
// 获取当前语言并订阅变化（使页面可随语言切换实时响应）
import { getCurrentLanguage, onLanguageChange } from '@/utils/language.js';
const route = useRoute();
// 使用 computed 动态获取基于当前语言的字段，避免语言切换后不更新的问题
const router = useRouter();
const goBack = () => {
    router.push({ path: '/index' });
    
};
// 定义公司信息映射
const companyData = {
    1: {
        key: 'zyxg', // 中烟国际(香港)
    },
    2: {
        key: 'tzyc', // 天泽烟草
    },
    3: {
        key: 'zybx', // 中烟国际巴西
    },
    4: {
        key: 'zybn', // 中烟国际北美
    },
    5: {
        key: 'zyag'
    },
    6: {
        key: 'zyzd',
    },
    7: {
        key: 'zyyb', // 
    },
    8: {
        key: 'zyfm',
    },
    9: {
        key: 'zyhk'
    },
    10: {
        key: 'zymo'
    },
    11: {
        key: 'zyls'
    },
    12: {
        key: 'zyjm'
    },
    13: {
        key: 'zylm'
    },
    14: {
        key: 'zysw'
    },
    15: {
        key: 'zyou'
    }
};
const companyId = ref(''); // 默认公司ID为空，mounted 时填充

// 当前语言（可在模板中直接使用）
const currentLanguage = ref(getCurrentLanguage());
let offLanguage = null;

// dataKey 动态计算，基于 companyId
const dataKey = computed(() => {
    const company = companyData[companyId.value];
    return company ? company.key : 'zyxg';
});

// 使用 computed 让 t(...) 在语言切换时重新计算，实时更新
const title = computed(() => t(`message.${dataKey.value}.title`));
const content = computed(() => t(`message.${dataKey.value}.content`));
const phone = computed(() => t(`message.${dataKey.value}.phone`));
const website = computed(() => t(`message.${dataKey.value}.website`));
const isEnglish = computed(() => currentLanguage.value === 'en');
console.log('isEnglish:', isEnglish.value);

onMounted(() => {
    // 从路由参数获取公司ID
    console.log('当前路由参数:', route.params);
    companyId.value = route.params.id || route.query.id;
    console.log('接收到的路由参数 ID:', companyId.value);
    // 订阅语言变化以便 currentLanguage 实时更新
    offLanguage = onLanguageChange((lang) => {
        currentLanguage.value = lang;
    });
});

onBeforeUnmount(() => {
    if (offLanguage) offLanguage();
});
</script>
<template>
    <div>
        <Layout>
            <div class="subGroupBox">
                <div class="subGroupContainer">
                    <div class="page-header-sub">
                        <img src="../assets/images/banner.png" alt="">
                    </div>
                    <div class="back" @click="goBack">
                        <img src="../assets/images/back.png" alt="">
                    </div>
                    <div class="groupContent">
                        <!-- 根据语言切换字体大小；注意这里要设置 fontSize，而不是把 fontSize 字符串赋给 display -->
                        <div class="side" :style="{ fontSize: isEnglish ? '1.3rem' : '2rem' }">
                            <div>{{ $t('message.jt') }}</div>
                            <div>{{ $t('message.ssqy') }}</div>
                        </div>
                        <div class="contentItem">
                            <div class="title">{{ title }}</div>
                            <div class="content">{{ content }}</div>
                            <div class="phone">{{$t('message.t6') }} : {{ phone }}</div>
                            <div class="website" v-if="companyId == 1">{{$t("message.t8")}}：{{ website }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
</template>
<style scoped>
.subGroupBox {
    width: 100%;

}
.subGroupContainer{
    margin-top:10rem;
}
.subGroupContent {
    width: 100%;
    height: 44.7rem;
    /* display: flex;  */
    margin-top: 10rem;

}

.groupContent {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 65%;
    margin: 4rem auto 2rem;
}

.contentItem {
    width: 78%;
    /* 盒子加阴影 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    /* 阴影右侧设置 */
    border-radius: 5px;
    border-right: 3px solid #F7B334;
      @media screen and (max-width: 767px) {
        width: 100%;
        
    }

    >div:nth-child(1) {
        font-size: 1.6rem;
        font-weight: 550;
        margin-bottom: 1rem;
    }

    >div:nth-child(2) {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        padding-bottom: 3rem;
    }

    >div:nth-child(3) {
        padding-top: 2rem;
        border-top: 1px solid #F7B334;
    }

}

.side {
    width: 16%;
    height: 19rem;
    font-size: 2rem;
    font-weight: 550;
    padding: 1.3rem;
    background: url('../assets/images/ppic.png') no-repeat center;
    margin-right: 3rem;

    >div:nth-child(1) {
        margin-top: 4rem;
    }
    @media screen and (max-width: 767px) {
        display: none;
        
    }
}

.website {
    margin-top: 1rem;
}

.back {
    cursor: pointer;
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
    margin:2rem 2rem 2rem 15rem;

    >img {
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width: 767px) {
      margin:2rem 2rem 2rem 8rem;
        
    }
}
</style>