<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const title = ref('信息技术管理岗 专员及以上');
const list = ref([
    {
        title: '岗位职责:',
        content: [
            '1.负责机房、网络、服务器、数据库、信息系统等信息化运维和数据备份工作。',
            '2.负责网络信息安全防护、网络安全应急演练和应急处置、网站运营和安全防护、音视频会议系统保障等工作。',
            '3.负责信息化项目预算、采购、建设、验收等管理工作。',
            '4.完成其他临时交办的工作。'
        ]
    },
    {
        title: '岗位要求:',
        content: [
            '1.计算机、软件工程、网络通信、信息安全、数字化转型、大数据管理等相关专业本科学历，硕士及以上学历优先。',
            '2.具有信息技术相关工作或实习经验，具备网络、服务器、数据库、信息系统等网络安全和运维管理工作经验者优先。',
            '3.熟悉网络通信、信息安全相关技术，具有较好的主流网络通信设备、信息安全产品的配置操作和日常维护能力。',
            '4.熟悉服务器、操作系统、数据库相关技术，具有较好的主流服务器、操作系统、数据库的配置操作和日常维护能力。',
            '5.中英文书写及口语表达流畅，具有较强的文字表达和公文写作能力，熟悉香港及国外信息化领域情况者优先。',
            '6.具有主流的网络设备、信息安全产品、服务器、数据库等厂商的技术资格认证者优先。',
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
        <div class="joinDetailTitle">中烟国际集团有限公司集团总部内部招聘：岗位信息技术管理岗</div>
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
}
</style>