<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const title = ref('员工关系岗 专员及以上');
const list = ref([
    {
        title: '岗位职责:',
        content: [
            '1.协助建立、运行、维护、改进国际集团人力资源子管理体系；',
            '2.参与编制岗级体系；',
            '3.协助开展人员招聘，办理员工试用、入职、转正、调动、离职等手续；',
            '4.协助建立和维护人员信息档案，管理雇佣合同；',
            '5.受理劳动争议和员工投诉，协助处理劳动纠纷；',
            '6.分析研究下属企业用工合规性，提出风险防控措施；',
            '7.建立维护国际业务知识库、内部培训师资库；',
            '8.负责组织实施培训和日常管理。'
        ]
    },
    {
        title: '岗位要求:',
        content: [
            '1.大学本科及以上学历；人力资源管理、行政管理等管理类专业背景；',
            '2.具有3年以上香港地区企业人力资源相关工作经验；',
            '3.熟悉香港雇佣条例，了解香港劳动用工相关政策；',
            '4.具有较强的沟通能力、逻辑分析能力、较好的英语听说读写水平；',
            '5.熟练掌握office办公软件，具有管理体系文件编制经验优先。'
        ]
    }
])
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
        <div class="joinDetailTitle">【社会招聘】中烟国际集团有限公司集团员工关系岗招聘</div>
        <div class="date">
            <div>社会招聘</div>
            <div>2025-06-07 08:30:00</div>
        </div>
        <div class="joinContent">
            <div class="joinTitle">{{ title }}</div>
            <div v-for="(item, index) in list" :key="index" class="joinContentItem">
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
    font-size: 1.6rem;
    font-weight: 550;
    margin: 3rem 0px 0.7rem;
    text-align: center;
    @media screen and (max-width: 767px) {
        margin: 4rem 0px 0.7rem;
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
    top: 0.7rem;
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