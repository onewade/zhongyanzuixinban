<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Layout from '../components/common/Layout.vue';

const { t } = useI18n();
const route = useRoute();
const object = ref({});
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
const companyId = ref(''); // 默认公司ID为1
onMounted(() => {
    // 从路由参数获取公司ID
    console.log('当前路由参数:', route.params);
    companyId.value = route.params.id || route.query.id;
    console.log('接收到的路由参数 ID:', companyId.value);

    // 根据ID获取对应的公司信息
    const company = companyData[companyId.value];
    const dataKey = company ? company.key : 'zyxg'; // 默认使用中烟国际(香港)
    object.value = {
        title: t(`message.${dataKey}.title`),
        content: t(`message.${dataKey}.content`),
        phone: t(`message.${dataKey}.phone`),
        website: t(`message.${dataKey}.website`)
    };
});
</script>
<template>
    <div>
        <Layout>
            <div class="subGroupBox">
                <div class="subGroupContainer">
                    <div class="page-header-sub">
                        <img src="../assets/images/jtgk.jpg" alt="">
                    </div>
                    <div class="back" @click="goBack">
                        <img src="../assets/images/back.png" alt="">
                    </div>
                    <div class="groupContent">
                        <div class="side">
                            <div>{{ $t('message.jt') }}</div>
                            <div>{{ $t('message.ssqy') }}</div>
                        </div>
                        <div class="contentItem">
                            <div class="title">{{ object.title }}</div>
                            <div class="content">{{ object.content }}</div>
                            <div class="phone">联系方式：{{ object.phone }}</div>
                            <div class="website" v-if="companyId == 1">企业网站：{{ object.website }}</div>
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
    min-width: 14%;
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