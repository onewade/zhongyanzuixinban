<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale, messages } = useI18n();
// const joinContentList = computed(()=> messages.value[locale.value].message.joinContentlist)
const props = defineProps({
    number: {
        type: Number,
        required: true
    }
});
// 取出当前列表项的標題（兼容不同 locale 中 list 項的字段名）
const joinTitle = computed(() => {
    const idx = props.number-1;
    const list = messages.value?.[locale.value]?.message?.list;
    if (!list || !Number.isInteger(idx)) return '';
    const item = list[idx];
    console.log(list);
    
    console.log(list[idx]);
    
    if (!item) return '';
    console.log(item);
    
    // 支持不同命名：优先使用 joinTitle，再回退到 title
    return item.joinTitle ?? item.title ?? '';
});
const joinType = computed(() => {
    const idx = props.number-1;
    const list = messages.value?.[locale.value]?.message?.list;
    if (!list || !Number.isInteger(idx)) return '';
    const item = list[idx];
    if (!item) return '';
    // 支持不同命名：优先使用 joinType，再回退到 date
    return item.joinType ?? item.date ?? '';
});
const date = computed(() => {
    const idx = props.number-1;
    const list = messages.value?.[locale.value]?.message?.list;
    if (!list || !Number.isInteger(idx)) return '';
    const item = list[idx];
    if (!item) return '';
    // 支持不同命名：优先使用 date，再回退到 date
    return item.date ?? item.date ?? '';
});
const joinPost = computed(() => {
    const idx = props.number-1;
    const list = messages.value?.[locale.value]?.message?.list;
    if (!list || !Number.isInteger(idx)) return '';
    const item = list[idx];
    if (!item) return '';
    // 支持不同命名：优先使用 joinPost，再回退到 joinPost
    return item.joinPost ?? item.joinPost ?? '';
});
const joinContentList = computed(() => {
    const idx = props.number-1;
    const list = messages.value?.[locale.value]?.message?.list;
    if (!list || !Number.isInteger(idx)) return [];
    const item = list[idx];
    if (!item) return [];
    // 支持不同命名：优先使用 joinContentList，再回退到 joinContentlist
    return item.joinContentList ?? item.joinContentlist ?? [];
});



const emit = defineEmits(['goBack']);

const goBack = () => {
    console.log('返回招聘列表');
    emit('goBack',false);
    // router.push({ path: '/JoinUs' });
    
};
</script>
<template>
    <div class="joinDetailContainer">
        <div class="back" @click="goBack" tabindex="0" role="button" aria-label="返回列表" @keydown.enter="goBack"> 
           <img src="../assets/images/back.png" alt="返回按钮">
        </div>
        <div class="joinDetailTitle">{{ joinTitle }}</div>
        <div class="date">
            <div>{{ joinType }}</div>
            <div>{{ date }}</div>
        </div>
        <div class="joinContent">
            <div class="joinTitle">{{ joinPost}}</div>
            <div v-for="(item, index) in joinContentList" :key="index" class="joinContentItem">
                <div class="joinContentTitle">{{ item.title }}</div>
                <div>
                    <div v-for="(content, cIndex) in item.content" :key="cIndex">{{ content }}</div>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
.joinDetailContainer {
    position: relative;
     font-size: 1.4rem;
    padding-bottom:20rem;
    margin: 0 auto;
    margin-top: 0.6rem;
    padding-bottom:2rem;
    border-bottom:1px solid #eeeeee;
}

.joinDetailTitle {
    width: 65%;
    font-size: 1.6rem;
    font-weight: 550;
    margin: 3rem auto 0.7rem;
    text-align: center;
    @media screen and (max-width: 767px) {
         width: 65%;
        margin: 4rem auto 0.7rem;
    }

}

.date {
    width: 65%;
    display: flex;
    padding-bottom: 1rem;
    justify-content: center;
    font-size:1.1rem;
    border-bottom: 2px solid #F7B334;
    margin: auto;
    line-height: 2.5rem;
    >div:nth-child(2) {
        margin-left: 1.5rem;
        color: #777;
        font-size:1rem;
    }
}
.joinContent{
    width: 65%;
    margin: 0 auto;
    font-size:1.2rem;
    line-height: 2rem;
     @media screen and (max-width: 767px) {
        width: 80%;
    }
}

.joinTitle {
    margin: 2rem 0 1.3rem;
    font-weight: 550;
}

.joinContentTitle {
    color: #000;
    margin-bottom: 1rem;
}

.joinContentItem {
    margin-bottom: 0.9rem;
    color: #555555;
}
.back{
    position: absolute;
    left: 17.5%;
    top: 1.3rem;
    cursor: pointer;
    font-size: 1.5rem;
    width: 1.4rem;
    height: 1.4rem;
    >img{
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width: 767px) {
        left: 8%;
        top: -3rem;
    }
}
</style>