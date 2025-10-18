<script setup>
import Layout from '../components/common/Layout.vue';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const contactAddress = ref([
    { number: 1, address: '' }
]);
const moreVisible = ref(false);
onMounted(() => {
    // 在组件挂载后设置国际化文本
    contactAddress.value = [
        { number: '+852-XXXXXXXX', address: t('message.ywzx2'), email: 'xxxxx@xxxx.com' },
        { number: '+852-XXXXXXXX', address: t('message.ywzx1'), email: 'xxxxx@xxxx.com' },
        { number: '+852-26206055', address: t('message.ywzx3'), email: 'yangy@cti-group.com.hk' },
        { number: '+852-26207376', address: t('message.tousu'), email: 'whistleb@cti-group.com.hk' }
    ];
});
</script>
<template>
    <div>
        <Layout>
            <div style="width: 100%;">
                <div class="index-page">
                    <div class="page-header-sub">
                        <!-- <img src="../assets/images/contact.png" alt=""> -->
                        <img src="../assets/images/banner.png" alt="" srcset="">
                    </div>
                </div>
                <div class="contact-content">
                    <div>{{ $t('message.lianxi') }}</div>
                    <div>
                        <img src="../assets/images/address.png" alt="" srcset="">
                    </div>
                    <div>{{ $t('message.contactAddress') }}</div>
                    <div>{{ $t('message.contactAddress1') }}</div>
                    <div class="contactAddress">
                        <template v-for="(item, key) in contactAddress" :key="key">
                            <div :style="key === 3 ? 'position:relative;' : ''">
                                <img src="../assets/images/call.png" alt="" srcset="">
                                <div>{{ item.number }}</div>
                                <div>{{ item.email }}</div>
                                <div>{{ item.address }}</div>
                                <div v-if="key === 3" class="more" @click="moreVisible = !moreVisible">查看更多>></div>
                                <!-- 只在第四个盒子上方覆盖显示更多内容 -->
                                <div v-if="key === 3 && moreVisible" class="more-box">
                                    <span class="close-btn" @click="moreVisible = false">×</span>
                                    <div class="detail">
                                        <div>
                                            {{ $t("message.laixinlaifangdizhi") }}：{{ $t("message.contactAddress2") }}{{
                                            $t("message.lianxidianhua") }}：{{
                                                $t("message.complaintsPhone") }}</div>
                                        <div>{{ $t("message.tousudianhua") }}：852-26207376</div>
                                        <div>{{ $t("message.tousuyouxiang") }}：whistleb@cti-group.com.hk</div>
                                        <div>{{ $t("message.laifangjitousudianhuashoulishijian") }}{{
                                            $t("message.complaintsTime") }}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
</template>
<style scoped>
.contactBox {
    >img {
        width: 100%;
        height: 100%;
    }
}

.contact-content {
    width: 100%;

    >div {
        width: 80%;
        margin: 0 auto;
        text-align: center;

        >img {
            width: 4rem;
            height: 4rem;
            margin-top: 5rem
        }
    }

    >div:nth-child(1) {
        font-size: 2rem;
        padding: 1.5rem;
        color: #F7B334;
        font-weight: bold;
        border-bottom: 1px solid #F7B334;
    }

    >div:nth-child(3) {
        font-size: 1.4rem;
        color: #333;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 0.5rem;
    }
}

.contactAddress {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #333;
    margin-top: 4rem !important;

    >div {
        width: 20%;
        background-color: #eeeeee;
        padding: 1.2rem 1rem;

        >img {
            width: 2.5rem;
            height: 2.5rem;
            margin-bottom: 0.5rem;
        }

        >div:nth-child(2) {
            font-weight: bold;
            color: #F7B334;
            font-size: 1.6rem;
            margin-left: 1%;
        }

        >div:nth-child(3) {
            font-weight: bold;
            color: #F7B334;
            font-size: 1.1rem;
            margin-left: 1%;
        }

        >div:nth-child(4) {
            font-size: 1rem;
            color: #333;
            margin-top: 0.5rem;
        }
    }

    @media screen and (max-width: 767px) {
        flex-direction: column;
        align-items: center;

        >div {
            width: 80%;
            margin-bottom: 2rem;
            padding: 2rem 2rem;
        }
    }
}

.more-box {
    width: 100%;
    background: #eeeeee;
    padding: 1.5rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(247, 179, 52, 0.18);
    color: #333;
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    animation: moreFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes moreFadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
.close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.4rem;
    color: #888;
    cursor: pointer;
    z-index: 20;
    transition: color 0.2s;
}

@media screen and (max-width: 767px) {
    .more-box {
        width: 90%;
        margin-bottom: 2rem;
        padding: 0.5rem 2rem;
    }
    .close-btn {
        top: 1rem;
        right: 1rem;
        font-size: 1.2rem;
    }
}

.more {
    color: #F7B334;
    cursor: pointer;
    font-size: 0.8rem;
    margin-top: 1rem;
    text-align: right;

    &:hover {
        color: #333;
    }
}



.close-btn:hover {
    color: #F7B334;
}

.detail {
    text-align: left;
    font-size: 1rem;

    div {
        margin-top: 0.7rem;
    }
}
</style>