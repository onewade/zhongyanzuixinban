<script setup>
import { ref, onMounted } from 'vue'
import Layout from '@/components/common/Layout.vue'
import { useRouter } from 'vue-router'

// 模拟新闻数据（后期可替换为接口调用）
const list = ref([
    {
        id: 2,
        date: '2025-08-27',
        title: '国际集团组织参观纪念抗战胜利80周年展览',
        desc: '2025年8月26日下午，中烟国际集团有限公司组织全体员工前往香港会展中心，参观由香港大公文汇传媒集团主办的“为了中华民族伟大复兴——纪念中国人民抗日战争暨世界反法西斯战争胜利80周年大型巡回展览”，展览以丰富的图片、文字、影像及展品为载体，生动呈现中国人民艰苦卓绝的抗战历程，旨在引导香港市民铭记历史、缅怀先烈、珍爱和平。通过历史资料与实物的展示，观众能够深刻感受到中华民族在民族危亡时刻不屈不挠的精神力量。',
    },
    {
        id: 9,
        date: '2025-08-18',
        title: '国际集团开展“中企关爱进社区”义工活动',
        desc: '近日，国际集团与香港荃湾各界协会联合开展“中企关爱进社区”义工活动，向荃湾地区困难基层家庭进行探访慰问并送上冷暖风扇和空气净化一体机。在荃湾各界协会工作人员的配合下，国际集团义工成员完成物资搬运及送递上门服务，并与基层社区居民亲切交流，了解生活困难和实际需求。荃湾各界协会负责人对国际集团长期以来对基层社区的关心支持表示衷心感谢，希望未来能与国际集团保持紧密合作，共同为香港基层居民办实事、解难题。',
    },
    {
        id: 10,
        date: '2025-07-18',
        title: '国际集团组织员工参观香港立法会活动',
        desc: '2025年7月15日，国际集团组织员工赴香港立法会综合大楼参观，开展“爱国爱港主题教育”活动。本次活动得到了全国人大代表、香港立法会议员陈勇先生及工作人员的大力支持。通过专业人员讲解，大家系统了解立法会的宪制职责、议事程序及“一国两制”框架下维护国家主权、服务香港民生的运作机制，加深了对香港法治建设与民主进程的认识，进一步增强了爱国爱港情怀。大家一致表示，将以此次学习为契机，把奉献精神和工匠精神融入日常工作，积极投身社会服务，为香港的繁荣稳定贡献力量。 ',
    },
    {
        id: 11,
        date: '2025-07-10',
        title: '国际集团获得香港个人资料私隐专员公署颁发的2025私隐之友嘉许金奖',
        desc: '2025年7月10日，在香港个人资料私隐专员公署举办的“2025私隐之友嘉许奖”颁奖典礼上，国际集团获得“2025私隐之友嘉许金奖”。香港个人资料私隐专员公署是由香港政制及内地事务局下辖的独立法定机构，负责监管香港地区网络数据安全和个人信息保护相关法律执行。其每两年举办一次“私隐之友嘉许奖”评选活动，旨在表彰在网络数据安全和个人信息保护方面工作成绩突出的在港机构。',
    },
    {
        id: 1,
        date: '2025-06-27',
        title: '国际集团组织员工参观沙头角禁区及香港回归纪念塔活动',
        desc: '2025年6月27日，为庆祝香港回归祖国暨香港特别行政区成立二十八周年，国际集团组织全体员工赴新界沙头角禁区开展专题参观学习。队伍依次参观“沙头角之角”石碑，远眺中英街界碑及“一街两制”警戒线，随后考察沙头角口岸旅检大楼旧址，系统了解边境管理沿革与深港合作历程；其后登上高32.4米的香港回归纪念塔，重温1997年回归盛典，深刻领会“一国两制”伟大实践的历史意义和时代价值。',
    },
    {
        id: 12,
        date: '2025-06-05',
        title: '国际集团组织开展《民法典》不动产专题法律培训',
        desc: '为深入贯彻落实中央“八五”普法规划要求，扎实推进《民法典》学习宣传工作，国际集团于2025年6月5日下午组织开展了《民法典》不动产法律法规专题培训。本次培训采用线上线下相结合的方式，系统讲解民法典中与不动产相关的核心法律规定。本次培训立足法治烟草建设要求，以提升员工法治素养为核心目标，围绕2025年民法典宣传月“美好生活·民法典相伴”的主题，将民法典物权编、合同编、婚姻家庭编等核心内容与不动产交易实践深度融合。通过“以案释法”的普法方式，系统阐释不动产物权登记、居住权等法律制度，重点解析交易结构设计、违约救济等实务难点，使参训人员既掌握法律条文要义，又提升实务操作能力。  ',
    },
    {
        id: 3,
        date: '2025-04-01',
        title: '国际集团参加香港中企协保龄球邀请赛',
        desc: '为进一步加强与驻港中资企业交流，丰富员工文体生活，国际集团积极响应香港中企协的号召，组队参与3月29日在香港启德体育园举办的“‘龄’动精彩，球艺飞扬”中企保龄球邀请赛。国际集团代表队队员们全程投入，奋力拼搏，经过近半天的激烈',
    },
    {
        id: 4,
        date: '2025-03-10',
        title: '国际集团举办《哪吒2》主题观影活动',
        desc: '2025年2月26日，国际集团组织员工及家属集体观看国产动画《哪吒2》。影片以传统神话为根基，通过前沿数字技术与东方美学叙事的深度融合，以哪吒“逆天改命”的成长史诗，生动诠释了中华文明“自强不息”的精神内核。多名员工表示，这场视听盛宴不仅让传统文化“活起来”，更让文化自信“强起来”——既为中华文明“守正创新”的基因所震撼，也为身为文化传承者深感自豪。',
    },
    // {
    //     id: 5,
    //     date: '2025-02-13',
    //     title: '凝心聚力迎新春 砥砺奋进启新程——国际集团举行2025年春茗暨开工仪式',
    //     desc: '新岁伊始，万象更新。根据上级有关文件精神指引，为传承中华传统文化，凝聚团队力量，国际集团于2月13日举行春茗暨开工仪式。',
    // },
    {
        id: 6,
        date: '2025-01-23',
        title: '国际集团开展“春节送温暖”义工活动',
        desc: '1月21日，国际集团在香港中国企业协会的大力支持下，与荃湾各界协会、荃湾义工团和中国太平义工队联合开展“中企关爱进社区 春节送温暖”义工活动。国际集团董事长、总经理邵岩及其他领导班子成员，荃湾区议员陈晓津、华美玲，香港中国企业协会本地事务部总监许伟等嘉宾出席活动，国际集团、荃湾各界协会、荃湾义工团、中国太平义工队代表近50人参加活动，向荃湾地区困难基层家庭入户派送冷暖风扇和空气净化一体机和送上春节的美好祝愿，以实际行动履行中资企业的社会责任，传递国际集团对香港基层市民的亲切关怀。',
    },
    {
        id: 13,
        date: '2025-01-07',
        title: '国际集团参加香港中企协第九届运动会勇夺佳绩',
        desc: '近日，国际集团参加了由香港中国企业协会举办的第九届运动会，勇夺男子高管组400米季军、十人十一足项目季军和拔河项目的第五名，在60支参赛队伍中名列前茅，创历史最佳成绩。在两天的激烈比拼中，国际集团运动员们勇于拼搏、奋力争先，在竞技和趣味项目均展现更快、更高、更强、更团结的体育精神；场下啦啦队员们挥舞着彩旗和加油棒，全情投入为运动健儿加油鼓劲，呐喊助威声此起彼落，不绝于耳，充分展现国际集团员工良好的精神面貌，增加了员工之间的凝聚力和向心力。',
    },


])
const router = useRouter()

// 解析日期，便于模板使用
const formatList = ref([])
const parseDate = (d) => {
    const [year, month, day] = d.split('-')
    return { year, month, day }
}
const handleClick = (item) => {
    console.log('点击新闻项:', item)
    // 这里可以添加跳转到新闻详情页的逻辑
    router.push(`/newsDetail/${item.id}`);
}

onMounted(() => {
    formatList.value = list.value.map((item) => {
        const { year, month, day } = parseDate(item.date)
        return { ...item, year, month, day }
    })
})
</script>

<template>
    <Layout>
        <div class="news-container">
            <!-- 顶部横幅图 -->
            <div class="index-page">
                <div class="page-header-sub">
                    <!-- <img src="../assets/images/news.png" alt="news banner" class="responsive-img" /> -->
                     <img src="../assets/images/jtgk.jpg" alt="" srcset="">
                </div>
            </div>

            <!-- 主体区域 -->
            <div class="news-wrapper container">
                <!-- 左侧标题栏 -->
                <aside class="news-sidebar">
                    <div class="sidebar-box">
                        <div class="sidebar-title">{{ $t('message.t3') }}</div>
                    </div>
                </aside>

                <!-- 右侧新闻列表 -->
                <section class="news-list">
                    <article v-for="item in formatList" :key="item.id" class="news-item" @click=handleClick(item)>
                        <div class="news-date">
                            <div>
                                <span class="news-month"><span>{{ item.month }}</span><span>月</span></span>
                                <span class="news-day"><span>{{ item.day }}</span><span>日</span></span>
                            </div>
                            <div class="news-year">{{ item.year }}</div>
                        </div>
                        <div class="news-content">
                            <div class="news-title">{{ item.title }}</div>
                            <p class="news-desc">{{ item.desc }}</p>
                        </div>
                    </article>

                    <!-- <div class="load-more">
                        <div>查看更多</div>
                    </div> -->
                </section>
            </div>
        </div>
    </Layout>
</template>

<style lang="scss" scoped>
.news-container {
    width: 100%;
    overflow: hidden;
}

/* 顶部横幅 */
.news-banner {
    img {
        width: 100%;
        height: 100%;
    }

    @media screen and (max-width: 1023px) {
        height: 30rem;
    }

    @media screen and (max-width: 767px) {
        height: 20rem;
        margin-top: 4rem;
    }
}

/* 主体布局 */
.news-wrapper {
    display: flex;
    gap: 3rem;
    padding: 4rem 0;
    width: 65%;

    @media screen and (max-width: 767px) {
        width: 80%;
    }

}

/* 侧边栏 */
.news-sidebar {
    height: 19rem;

    width: 14%;

    .sidebar-box {
        width: 100%;
        height: 100%;
        background: url('../assets/images/pic.png') no-repeat;
        background-size: 100% 100%;
        // padding: 4rem 2rem;
        padding: 0rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .sidebar-title {
            color: #000;
            font-size: 2rem;
            font-weight: bold;
        }
    }

    @media screen and (max-width: 767px) {
        display: none;
    }
}

/* 新闻列表 */
.news-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 6%;

    >article:nth-child(1) {
        padding-top: 0;
    }

    @media screen and (max-width: 767px) {
        margin-left: 0;
    }

    .news-item {
        display: flex;
        gap: 1.5rem;
        border-bottom: 1px solid #e9e9e9;
        padding: 1rem 0rem;

        @media screen and (max-width: 767px) {
            padding-bottom: 1.5rem;
        }

        .news-date {
            width: 5rem;
            height: 4.6rem;
            background: #f2f2f2;
            padding: 0.5rem 0.5rem;
            text-align: center;
            border-radius: 5px;

            >div {
                >span {
                    font-size: 1rem;

                    >span:nth-child(2) {
                        font-size: 0.7rem !important;
                        color: #777;
                    }
                }
            }
        }

        .news-content {
            flex: 1;

            .news-title {
                font-size: 1.3rem;
                // font-weight: 600;
                // margin-bottom: 0.5rem;
                margin: 0rem;
                color: #333;
            }

            .news-desc {
                font-size: 0.9rem;
                color: #666;
                line-height: 1.6;
                // 超过两行用省略号
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .news-year {
        margin-top: 0.5rem;
        font-size: 1rem !important;
        color: #777;
    }

    .load-more {
        display: flex;
        justify-content: center;
        width: 15%;
        margin-top: 1rem;
        margin-bottom: 2rem;
        padding: 1rem 2rem;
        background-color: #F7B334;
        color: #fff;
    }
}
</style>