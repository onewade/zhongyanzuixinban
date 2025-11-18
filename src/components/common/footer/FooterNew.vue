<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import { complaintsEmail, accessibilityEmail } from '@/config/contact.js';
const dialogVisible = ref(false);
const dialogType = ref(1);
import { onLanguageChange, getCurrentLanguage } from '@/utils/language.js';
// 当前语言（可在模板或逻辑中使用）
const currentLanguage = ref(getCurrentLanguage());

// 直接注册语言变更监听，保存取消监听的函数以便在卸载时移除
const _unregisterLanguageChange = onLanguageChange((lang) => {
    currentLanguage.value = lang;
});
const openDialog = (type) => {
    dialogType.value = type;
    dialogVisible.value = true;
};
const closeDialog = () => {
    dialogVisible.value = false;
};
// 防止弹窗打开时背景页面滚动：通过给 body 添加/移除类来控制 overflow
const toggleBodyNoScroll = (enable) => {
    try {
        if (enable) document.body.classList.add('no-scroll');
        else document.body.classList.remove('no-scroll');
    } catch (e) {
        // 在某些 SSR 环境或测试环境中 document 可能未定义，忽略错误
        // console.warn('toggleBodyNoScroll error', e);
    }
};

watch(dialogVisible, (val) => {
    toggleBodyNoScroll(val);
});

onBeforeUnmount(() => {
    // 确保组件卸载时移除类
    toggleBodyNoScroll(false);
    // 取消语言变更监听
    try {
        if (typeof _unregisterLanguageChange === 'function') _unregisterLanguageChange();
    } catch (e) {
        console.warn('Error unregistering language change listener', e);
    }
});
</script>
<template>
    <div class="footerBox">
        <div></div>
        <div>
            <div class="footerContainer">
                <div @click="openDialog(1)">{{ $t('message.mianze') }}</div>
                <div>|</div>
                <div @click="openDialog(3)">{{ $t('message.wzasm') }}</div>
                <div>|</div>
                <div @click="openDialog(5)">{{ $t('message.siyin') }}</div>
                <div>|</div>
                <div>{{ $t('message.banquansuoyou') }}</div>
            </div>
            <div class="footerFooter">{{ $t('message.tishi') }}</div>
            <div class="awardContainer">
                <img src="../../../assets/images/newIndex/award.jpg" alt="">
                <img src="../../../assets/images/newIndex/award1.png" alt="">
            </div>
        </div>
    </div>

    <!-- 弹窗 -->
    <div v-if="dialogVisible" class="footer-dialog-mask">
        <div class="footer-dialog">
            <span class="footer-dialog-close" @click="closeDialog">×</span>
            <div class="footer-dialog-content">
                <template v-if="dialogType === 1">
                    <!-- 这里填写第1个弹窗内容 -->
                    <div>
                        <div>{{ $t("message.mianzeshengming") }}</div>
                        <div v-if="currentLanguage !== 'en'">{{ $t("message.mianzeshengmingE") }}</div>
                        <p>{{ $t("message.mianzeContent1") }}</p>
                        <p>{{ $t("message.mianzeContent2") }}</p>
                        <p>{{ $t("message.mianzeContent3") }}</p>
                        <p>{{ $t("message.mianzeContent4") }}</p>
                    </div>
                </template>
                <template v-else-if="dialogType === 3">
                    <!-- 这里填写第3个弹窗内容 -->
                    <div>{{ $t("message.wzasm") }}</div>
                    <p v-if="currentLanguage !== 'en'">Accessibility</p>
                    <p>{{ $t('message.wzasmContent1', { email: accessibilityEmail }) }}</p>
                </template>
                <template v-else-if="dialogType === 5">
                    <!-- 这里填写第5个弹窗内容 -->
                    <div>{{ $t("message.yinsizhengce") }}</div>
                    <p v-if="currentLanguage !== 'en'">{{ $t("message.yinsizhengceE") }}</p>
                    <p v-for="i in 34" :key="i">{{ $t(`message.yinsizhengceContent${i}`) }}</p>
                </template>
            </div>
        </div>
    </div>
</template>
<style>
/* 当弹窗打开时禁止背景滚动 */
body.no-scroll {
    overflow: hidden !important;
    touch-action: none;
}
.awardContainer{
    margin-top:2rem;
    display: flex;
    justify-content: center;
    >img{
        width: 25%;
        margin-right: 1.5rem;
    }
    @media screen and (min-width: 767px) {      
        display: none;
    }
}

.footerBox {
    display: flex;
    justify-content: center;
    font-weight: 700;
    color: #666;
    padding: 2rem;

    >div:nth-child(1) {
        height: 3.4rem;
        border-left: 0.4rem solid #F7B334;
        margin-right: 5.3rem;
        margin-top: 2px;
    }

    @media screen and (max-width: 767px) {
        >div:nth-child(1) {
            display: none;
            height: 2rem;
            border-left: 0.4rem solid #F7B334;
            margin-right: 1.3rem;
            margin-top: 2px;
        }

        >div:nth-child(2) {
            width: 90%;
        }
    }
}

.footerContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;

    >div:nth-child(1),
    >div:nth-child(5),
    >div:nth-child(3) {
        cursor: pointer;

    }

    >div:nth-child(2) {
        margin: 0px 1rem;
    }

    >div:nth-child(4) {
        margin: 0px 1rem;
    }

    >div:nth-child(6) {
        margin: 0px 1rem;
    }

    @media screen and (min-width: 1024px) {
        >div:nth-child(2) {
            margin: 0px 1rem;
        }

        >div:nth-child(4) {
            margin: 0px 1rem;
        }

        >div:nth-child(6) {
            margin: 0px 1rem;
        }
    }

    @media screen and (max-width: 767px) {
        display: block;
        align-items: left;
        justify-content: left;

        >div:nth-child(even) {
            display: none;
        }

        /* 每行前面都加一个小竖线 */
        >div:nth-child(odd)::before {
            content: '';
            display: inline-block;
            width: 0.2rem;
            height: 1.2rem;
            background-color: #F7B334;
            margin-right: 1rem;
            vertical-align: middle;
        }

        >div {
            margin-top: 1rem;
        }

    }
}

.footerFooter {
    width: 100%;
    font-size: 1rem;
    margin-top: 1rem;
}

.footerFooter::before {
    @media screen and (max-width: 767px) {
        content: '';
        display: inline-block;
        width: 0.2rem;
        height: 1.2rem;
        background-color: #F7B334;
        margin-right: 1rem;
        vertical-align: middle;

    }
}

/* 弹窗样式 */
.footer-dialog-mask {
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-dialog {
    background: #fff;
    border-radius: 12px;
    width: 50vw;
    max-width: 900px;
    max-height: 60vh;
    position: relative;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
    padding: 3rem 1.5rem 2.5rem;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 767px) {
       width: 80vw;
    }

}

.footer-dialog-close {
    position: absolute;
    right: 1.2rem;
    top: 1.2rem;
    font-size: 1.5rem;
    color: #888;
    cursor: pointer;
    z-index: 2;
    font-weight: bold;
    transition: color 0.2s;
}

.footer-dialog-close:hover {
    color: #c9082c;
}

.footer-dialog-content {
    flex: 1;
    overflow-y: auto;
    margin-top: 1rem;
    font-size: 1.1rem;
    color: #333;

    >div {
        font-size: 1.3rem;

        >p {
            font-size: 1rem;
        }
    }

}
</style>
