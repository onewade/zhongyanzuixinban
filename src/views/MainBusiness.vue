<script setup>
import { nextTick, onMounted, ref } from 'vue';
import Layout from '../components/common/Layout.vue';
</script>
<template>
    <div>
        <Layout>
            <div class="contact">
                <div class="index-page" style="width: 100%">
                    <div class="page-header-sub">
                        <img src="../assets/images/business.png" alt="">
                    </div>
                </div>
                <div class="contactContainer1">
                    <div class="contactContent">
                        <div>{{ $t("message.ywjs") }}</div>
                        <div class="fw">{{ $t('message.ywjs1') }}</div>
                    </div>
                    <div class="contactContent">
                        <div>{{ $t('message.ywzx') }}</div>

                        <div class="cardContent">
                            <div>
                                <img src="../assets/images/call.png" alt="">
                                <div>
                                    +86 10 8888 7777
                                </div>
                                <div>
                                    <div>{{ $t('message.ywzx2') }}</div>
                                </div>
                            </div>
                            <div>
                                <img src="../assets/images/call.png" alt="">
                                <div>
                                    +86 10 8888 7777
                                </div>
                                <div>
                                    <div>{{ $t('message.ywzx1') }}</div>
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
    padding-top:3rem;

    >div:nth-child(1) {
        font-size: 1.5rem;
        color: #F7B334;
        font-weight: bold;
        margin-bottom: 1.7rem;
    }

}

.cardContent {
    display: flex;

    >div {
        width: 45%;
        // height: 15rem;
        background: #fff;
        padding: 1.3rem;
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
        >div:nth-child(3) {
            font-size: 1rem;
            color: #333;
        }
    }

    >div:nth-child(1) {
        margin-right: 5rem;
    }
    @media screen and (max-width: 767px) {
        width: 100%;
        display: block;
        >div {
            padding:0rem;
            width: 100%;
            margin-bottom: 2rem;
            padding-bottom:2rem;
            padding-top:1rem;
        }
        
    }
}
</style>
