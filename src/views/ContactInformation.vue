<script setup>
import Layout from '../components/common/Layout.vue';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const contactAddress = ref([
    { number: 1, address: '' }
]);

onMounted(() => {
    // 在组件挂载后设置国际化文本
    contactAddress.value = [
        { number: '+86 10 8888 7777', address: t('message.ywzx2') },
        { number: '+86 10 8888 7777', address: t('message.ywzx1') },
        { number: '+86 10 8888 7777', address: t('message.tousu') }
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
                     <img src="../assets/images/lxfs.png" alt="" srcset="">
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
                        <div v-for="(item, key) in contactAddress" :key="key">
                            <img src="../assets/images/call.png" alt="" srcset="">
                            <div>{{ item.number }}</div>
                            <div>{{ item.address }}</div>
                        </div>
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
        width: 60%;
        margin: 0 auto;
        text-align: center;
        >img{
            width: 4rem;
            height: 4rem;
            margin-top:5rem
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
    margin-top:4rem!important;
    >div {
        width: 27%;
        background-color: #eeeeee;
        padding:3rem 1.6rem;
        >img {
            width: 2.5rem;
            height: 2.5rem;
            margin-bottom: 0.5rem;
        }
        >div:nth-child(2) {
            font-weight: bold;
            color: #F7B334;
            font-size: 1.9rem;
            margin-left:1%;
        }
        >div:nth-child(3) {
            font-size: 1rem;
            color: #333;
            margin-top:0.5rem;
        }
    }
    @media screen and (max-width: 767px) {
        flex-direction: column;
        align-items: center;
        >div {
            width: 80%;
            margin-bottom: 2rem;
            padding:2rem 2rem;
        }
    }
}
</style>