<script setup>
import Layout from '@/components/common/Layout.vue';
import JoinDetail from './JoinDetail.vue';
import { onMounted, ref } from 'vue';
const list = ref([
    { number: 1, title: '【社会招聘】中烟国际集团有限公司集团员工关系岗招聘', date: '2025-06-07' },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
    { number: 9 }
]);
const isShowDetail = ref(false); // 控制招聘详情的显示
const handleClick = () => {
    // 处理点击事件，显示招聘详情
    console.log('招聘信息被点击');
    isShowDetail.value = true;
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
                        <img src="../assets/images/zp.png" alt="">
                    </div>
                </div>
                <div class="join-content" v-if="!isShowDetail">
                    <div class="joinTitle">招聘信息</div>
                    <div v-for="(item, index) in list" :key="item.number" class="joinContentItem" @click="handleClick">
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
       margin-top:1rem; 
    }
}

.joinContentItem {
    height: 3rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #555;
    font-size: 1.2rem;
    cursor: pointer;
}
</style>