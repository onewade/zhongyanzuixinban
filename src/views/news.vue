<script setup>
import { ref, onMounted } from 'vue'
import Layout from '@/components/common/Layout.vue'
import { useRouter } from 'vue-router'

// 模拟新闻数据（后期可替换为接口调用）
const list = ref([
    {
        id: 1,
        date: '2025-06-27',
        title: '国际集团组织员工参观沙头角禁区及香港回归纪念塔活动',
        desc: '2025年6月27日，为庆祝香港回归祖国暨香港特别行政区成立二十八周年，国际集团组织全体员工赴新界沙头角禁区开展专题参观学习。队伍依次参观“沙头角之角”石碑，远眺中英街界碑及“一街两制”警戒线，随后考察沙头角口岸旅检大楼旧址，系统了解边境管理沿革与深港合作历程；',
    },
    {
        id: 2,
        date: '2025-04-15',
        title: '国际集团召开2025年一季度经济运行分析会',
        desc: '4月15日，中烟国际集团有限公司召开一季度经济运行分析会，传达国家局、总公司经济运行分析会精神，分析研究国际集团一季度经济运行情况，安排部署下一步重点工作',
    },
    {
        id: 3,
        date: '2025-03-29',
        title: '国际集团参加香港中企协保龄球邀请赛',
        desc: '为进一步加强与驻港中资企业交流，丰富员工文体生活，国际集团积极响应香港中企协的号召，组队参与3月29日在香港启德体育园举办的“‘龄’动精彩，球艺飞扬”中企保龄球邀请赛。国际集团代表队队员们全程投入，奋力拼搏，经过近半天的激烈比赛，最终在79支参赛队伍中取得第34',
    },
    {
        id: 4,
        date: '2025-02-16',
        title: '国际集团举办《哪吒2》主题观影活动',
        desc: '2025年2月26日，国际集团组织员工及家属集体观看国产动画《哪吒2》。影片以传统神话为根基，通过前沿数字技术与东方美学叙事的深度融合，以哪吒“逆天改命”的成长史诗，生动诠释了中华文明“自强不息”的精神内核。',
    },
    {
        id: 5,
        date: '2025-02-13',
        title: '凝心聚力迎新春 砥砺奋进启新程——国际集团举行2025年春茗暨开工仪式',
        desc: '新岁伊始，万象更新。根据上级有关文件精神指引，为传承中华传统文化，凝聚团队力量，国际集团于2月13日举行春茗暨开工仪式。',
    },
    {
        id: 6,
        date: '2025-01-21',
        title: '国际集团开展“春节送温暖”义工活动',
        desc: '1月21日，国际集团在香港中国企业协会的大力支持下，与荃湾各界协会、荃湾义工团和中国太平义工队联合开展“中企关爱进社区 春节送温暖”义工活动。',
    },
    {
        id: 7,
        date: '2025-01-20',
        title: '中烟国际集团有限公司召开2025年度工作会议传达学习2025年全国烟草工作会议精神',
        desc: '1月20日，中烟国际集团有限公司在香港召开2025年度工作会议，认真学习贯彻2025年全国烟草工作会议精神，总结2024年工作，分析当前国际形势和内部调整，部署2025年工作任务。中烟国际集团有限公司党组书记、董事长、总经理邵岩作工作报告',
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
                    <img src="../assets/images/news.png" alt="news banner" class="responsive-img" />
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

    .news-item {
        display: flex;
        gap: 1.5rem;
        border-bottom: 1px solid #e9e9e9;
        padding: 1rem 0rem;

        @media screen and (max-width: 767px) {
            flex-direction: column;
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