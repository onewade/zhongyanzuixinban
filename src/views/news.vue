<script setup>
import { onMounted, computed, ref } from 'vue'
import Layout from '@/components/common/Layout.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

// 模拟新闻数据（后期可替换为接口调用）
const { locale, messages } = useI18n()
const containerRef = ref(null);
const router = useRouter()

// 从 i18n messages 中按当前 locale 读取 newsList（可能不存在时返回空数组）
const list = computed(() => (messages.value[locale.value] && messages.value[locale.value].message && messages.value[locale.value].message.newsList) ? messages.value[locale.value].message.newsList : [])

// 解析日期，便于模板使用
// formatList 随 list（即 locale）变化自动更新
const formatList = computed(() => list.value.map((item) => {
    const { year, month, day } = parseDate(item.date)
    return { ...item, year, month, day }
}))
const parseDate = (d) => {
    const [year, month, day] = d.split('-')
    return { year, month, day }
}
const handleClick = (item) => {
    // 这里可以添加跳转到新闻详情页的逻辑
    router.push(`/newsDetail/${item.id}`);
}

// 仅用于调试输出，实际列表和格式化由 computed 管理
onMounted(() => {

})

// 根据当前语言返回字体类，绑定到根元素以改变整页字体样式
const fontClass = computed(() => {
    if (locale.value === 'zh-TW') return 'font-zh-tw'
    if (locale.value === 'en') return 'font-en'
    return 'font-zh-cn'
})
</script>

<template>
    <Layout>
    <div class="news-container" :class="fontClass">
            <!-- 顶部横幅图 -->
            <div class="index-page">
                <div class="page-header-sub">
                    <!-- <img src="../assets/images/news.png" alt="news banner" class="responsive-img" /> -->
                     <img src="../assets/images/banner.png" alt="新闻动态页面横幅图片" srcset="">
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
                    <article v-for="item in formatList" :key="item.id" class="news-item" @click=handleClick(item)
                        :data-nav-item="true" :data-nav-id="item.id">
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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .news-desc {
                font-size: 0.9rem;
                color: #666;
                line-height: 1.6;
                // 超过两行用省略号
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
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

/* per-locale font classes */
.font-zh-cn { font-family: 'Noto Sans SC', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif; }
.font-zh-tw { font-family: 'Noto Sans TC', 'PingFang TC', 'Helvetica Neue', Arial, sans-serif; }
.font-en { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; }
</style>
