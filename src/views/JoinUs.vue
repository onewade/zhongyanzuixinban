<script setup>
import Layout from '@/components/common/Layout.vue';
import JoinDetail from './JoinDetail.vue';
import { onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n'
const { t, locale, messages } = useI18n();
const list = computed(() => messages.value[locale.value].message.list)
const isShowDetail = ref(false); // 控制招聘详情的显示
const handleClick = (n) => {
    // 处理点击事件，显示招聘详情
    console.log('招聘信息被点击');
    if (n == 1) {
        isShowDetail.value = true;
    } else {
        return
    }

};
const handleGoBack = (val) => {
    console.log('返回招聘列表');
    isShowDetail.value = val;
};
</script>

<template>
    <div>
        <Layout>
            <div class="joinContainer">
                <div class="index-page">
                    <div class="page-header-sub">
                        <!-- <img src="../assets/images/zp.png" alt=""> -->
                        <img src="../assets/images/banner.png" alt="" srcset="">
                    </div>
                </div>
                <div class="join-content" v-if="!isShowDetail">
                    <div class="joinTitle">{{ $t("message.t7") }}</div>
                    <div v-for="(item, index) in list" :key="item.number" class="joinContentItem" :style="{ cursor: item.number == 1 ? 'pointer' : 'default' }"
                        @click="handleClick(item.number)">
                        <div>{{ item.title }}</div>
                        <div>{{ item.date }}</div>
                    </div>
                </div>
                <JoinDetail @goBack="handleGoBack" v-else />

            </div>
        </Layout>
    </div>

</template>
<style scoped>
.joinContainer {
    width: 100%;
    height: 100%;
}

.join-content {
    width: 66%;
    padding: 0 17% 2rem;
    border-bottom: 1px solid #ddd;

    @media screen and (max-width: 767px) {
        width: 90%;
        padding: 2rem;
    }
}

.joinBox {
    >img {
        width: 100%;
        height: 100%;
    }
}

.joinTitle {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 4rem 0px 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #F7B334;

    @media screen and (max-width: 767px) {
        margin-top: 1rem;
    }
}

.joinContentItem {
    height: 3rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #555;
    font-size: 1.2rem;
}
</style>