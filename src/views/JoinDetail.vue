<script setup>
import { onMounted, ref ,computed} from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
const { t, locale, messages } = useI18n();
const joinContentList = computed(()=> messages.value[locale.value].message.joinContentlist)
const router = useRouter();
const emit = defineEmits(['goBack']);
const goBack = () => {
    console.log('返回招聘列表');
    emit('goBack',false);
    // router.push({ path: '/JoinUs' });
    
};
</script>
<template>
    <div class="joinDetailContainer">
        <div class="back" @click="goBack"> 
           <img src="../assets/images/back.png" alt="">
        </div>
        <div class="joinDetailTitle">{{ $t("message.joinTitle") }}</div>
        <div class="date">
            <div>{{ $t("message.joinType") }}</div>
            <div>2025-06-07 08:30:00</div>
        </div>
        <div class="joinContent">
            <div class="joinTitle">{{ $t("message.joinPost")}}</div>
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
    top: 0.3rem;
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