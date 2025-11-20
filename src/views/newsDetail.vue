<script setup>
import { onMounted, ref } from 'vue';
import Layout from '../components/common/Layout.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const goBack = () => {
    // 返回到上一页
    if (window.history.length > 1) {
        router.go(-1); // 使用浏览器历史记录返回上一页
    } else {
        router.push({ path: '/news' }); // 如果没有历史记录，跳转到新闻列表页
    }
};
const id = ref('');

// 字体大小切换
const fontSizeLevel = ref(0); // 0-小 1-中 2-大
const fontSizeMap = ['1.2rem', '1.56rem', '2.04rem'];
const lineHeightMap = ['2.1rem', '2.7rem', '3.5rem'];
const setFontSize = (level) => {
    fontSizeLevel.value = level;
};
onMounted(() => {
    // 从路由参数获取公司ID
    console.log('当前路由参数:', route.params);
    id.value = route.params.id || route.query.id;
    console.log('接收到的路由参数 ID:', id.value);
})
function openLowRes(src, maxWidth = 1200) {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        const ratio = Math.min(1, maxWidth / img.width);
        const w = Math.max(1, Math.round(img.width * ratio));
        const h = Math.max(1, Math.round(img.height * ratio));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        // 输出为 jpeg，质量 0.85，可根据需要调低以进一步减小文件大小
        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            // 延迟 revoke，确保新窗口加载完成
            setTimeout(() => URL.revokeObjectURL(url), 10000);
        }, 'image/jpeg', 0.85);
    };
    img.onerror = () => {
        // 失败时直接打开原图（备用）
        window.open(src, '_blank');
    };
    img.src = src;
}
</script>
<template>
    <div>
        <Layout>
            <div class="detailBox">
                <div class="back">
                    <img src="../assets/images/back.png" alt="" @click="goBack">
                    <div class="font-size-control">
                        <span class="font-size-label">字体大小：</span>
                        <div class="font-size-switch">
                            <button
class="font-a-btn" :class="{ active: fontSizeLevel === 0 }"
                                @click="setFontSize(0)">A</button>
                            <button
class="font-a-btn font-a-middle" :class="{ active: fontSizeLevel === 1 }"
                                @click="setFontSize(1)">A</button>
                            <button
class="font-a-btn font-a-large" :class="{ active: fontSizeLevel === 2 }"
                                @click="setFontSize(2)">A</button>
                        </div>
                    </div>
                </div>
                <div class="detailContainer">
                    <div class="detailTitle">
                        <slot name="title">
                            <span>
                                <template v-if="id == 1">
                                    {{ $t('message.newsTitle') }}
                                    <br />{{ $t('message.newsTitle1') }}
                                </template>
                                <template v-else-if="id == 2">
                                    {{ $t('message.newsTitle2') }}
                                </template>
                                <template v-else-if="id == 3">
                                    {{ $t('message.newsTitle3') }}
                                </template>
                                <!-- <template v-else-if="id == 4">
                                    国际集团举办《哪吒2》主题观影活动
                                </template> -->
                                <template v-else-if="id == 9">
                                    {{ $t('message.newsTitle4') }}
                                </template>
                                <template v-else-if="id == 10">
                                    {{ $t('message.newsTitle5') }}
                                </template>
                                <template v-else-if="id == 6">
                                    {{ $t('message.newsTitle6') }}
                                </template>
                                <template v-else-if="id == 7">
                                    {{ $t('message.newsTitle7') }}
                                    <br />
                                    {{ $t('message.newsTitle8') }}
                                    <br />
                                    {{ $t('message.newsTitle9') }}
                                </template>
                                <template v-else-if="id == 11">
                                    {{ $t('message.newsTitle10') }}
                                </template>
                                <template v-else-if="id == 12">
                                    {{ $t('message.newsTitle11') }}
                                </template>
                                <template v-else-if="id == 13">
                                    {{ $t('message.newsTitle12') }}
                                </template>

                            </span>
                        </slot>
                    </div>
                    <div class="detailDate">
                        <template v-if="id == 1">2025-06-27</template>
                        <template v-else-if="id == 2">2025-08-27</template>
                        <template v-else-if="id == 3">2025-04-01</template>
                        <template v-else-if="id == 4">2025-03-10</template>
                        <template v-else-if="id == 5">2025-02-13</template>
                        <template v-else-if="id == 6">2025-01-23</template>
                        <template v-else-if="id == 7">2025-01-20</template>
                        <template v-else-if="id == 9">2025-08-18</template>
                        <template v-else-if="id == 10">2025-07-18</template>
                        <template v-else-if="id == 11">2025-07-10</template>
                        <template v-else-if="id == 12">2025-06-05</template>
                        <template v-else-if="id == 13">2025-01-07</template>
                    </div>
                    <div v-if="id == 1">
                        <div class="newspic">
                            <img
src="../assets/images/newsPic/jnt.png" alt=""
                                oncontextmenu="return false" @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent') }}

                            </div>
                        </div>
                    </div>
                    <div v-if="id == 2">
                        <div class="newspic">
                            <img
src="../assets/images/newIndex/80zhounian.jpg" oncontextmenu="return false" alt=""
                                style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent1') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent2') }}
                            </div>

                            <div>
                                {{ $t('message.newsContent3') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent4') }}

                            </div>
                        </div>
                    </div>
                    <div v-if="id == 3">
                        <div class="newspic">
                            <img
src="../assets/images/newsPic/ball1.png" alt="" oncontextmenu="return false"
                                style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                            <img
src="../assets/images/newsPic/ball2.png" alt="" oncontextmenu="return false"
                                style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent5') }}

                            </div>
                        </div>
                    </div>
                    <!-- <div v-if="id == 4">
                        <div class="detailImg">
                            <img src="../assets/images/newsPic/ez.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                            <img src="../assets/images/newsPic/ez1.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                2025年2月26日，国际集团组织员工及家属集体观看国产动画《哪吒2》。影片以传统神话为根基，通过前沿数字技术与东方美学叙事的深度融合，以哪吒"逆天改命"的成长史诗，生动诠释了中华文明"自强不息"的精神内核。
                            </div>
                            <div>
                                多名员工表示，这场视听盛宴不仅让传统文化"活起来"，更让文化自信"强起来"——既为中华文明"守正创新"的基因所震撼，也为身为文化传承者深感自豪。
                            </div>
                            <div>
                                此次活动是国际集团深化企业文化建设的重要实践。通过将传统文化精髓与企业精神相融合，让员工在文化浸润中形成共鸣与价值共识，并转化为推动企业发展的精神动能，为企业高质量发展注入可持续动能。
                            </div>
                        </div>
                    </div> -->
                    <div v-if="id == 5">
                        <div class="newspic">
                            <img
src="../assets/images/newsPic/kaigong.png" alt="" oncontextmenu="return false"
                                style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent6') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent7') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent8') }}

                            </div>
                        </div>
                    </div>
                    <div v-if="id == 6">
                        <div class="newspic">
                            <img
src="../assets/images/newsPic/yigong.png" alt="" oncontextmenu="return false"
                                style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent9') }}

                            </div>
                        </div>
                        <div class="newspic1">
                            <img
src="../assets/images/newsPic/yigong1.png" alt="" oncontextmenu="return false"
                                style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent10') }}

                            </div>
                        </div>
                    </div>
                    <div v-if="id == 7">
                        <div class="newspic">
                            <img
src="../assets/images/newsPic/jingshen.png" alt="" oncontextmenu="return false"
                                style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent11') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent12') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent13') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent14') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent15') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent16') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent17') }}

                            </div>
                        </div>
                    </div>
                    <div v-if="id == 9">
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent18') }}

                            </div>
                            <div class="newspic">
                                <img
src="../assets/images/newsPic/guanaishequ.png" alt="" oncontextmenu="return false"
                                    style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                            </div>
                            <div
class="detailContent"
                                :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                                <div>
                                    {{ $t('message.newsContent19') }}

                                </div>
                            </div>
                            <div class="newspic1">
                                <img
src="../assets/images/newsPic/guanaishequ1.png" alt="" oncontextmenu="return false"
                                    style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                            </div>
                            <div
class="detailContent"
                                :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                                <div>
                                    {{ $t('message.newsContent20') }}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 10">
                        <div class="newspic">
                            <img
src="../assets/images/newsPic/lifa.png" alt="" oncontextmenu="return false"
                                style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div
class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                {{ $t('message.newsContent21') }}

                            </div>
                            <div>
                                {{ $t('message.newsContent22') }}

                            </div>
                        </div>
                    </div>
                     <div v-if="id == 11">
                    <div class="newspic" style="margin-bottom: 0.5rem;">
                        <img
src="../assets/images/newsPic/jiang.png" alt="" oncontextmenu="return false"
                            style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                    </div>
                    <div style="font-size: 0.9rem; text-align: center; ">
                        {{ $t('message.newsContent23') }}

                    </div>
                    <div class="newspic">
                        <img
src="../assets/images/newsPic/jiang1.png" alt="" oncontextmenu="return false"
                            style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                    </div>
                    <div
class="detailContent"
                        :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                        <div>
                            {{ $t('message.newsContent24') }}

                        </div>
                        <div>
                            {{ $t('message.newsContent25') }}

                        </div>
                    </div>
                </div>
                <div v-if="id == 12">
                    <div class="newspic">
                        <img
src="../assets/images/newsPic/fadian.png" alt="" oncontextmenu="return false"
                            style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                    </div>
                    <div
class="detailContent"
                        :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                        <div>
                            {{ $t('message.newsContent26') }}

                        </div>
                        <div>
                            {{ $t('message.newsContent27') }}

                        </div>
                        <div>
                            {{ $t('message.newsContent28') }}

                        </div>
                    </div>
                </div>
                <div v-if="id == 13">

                    <div
class="detailContent"
                        :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                        <div>
                            {{ $t('message.newsContent29') }}

                        </div>
                        <div>
                            {{ $t('message.newsContent30') }}

                        </div>
                    </div>
                    <div class="newspic">
                        <img
src="../assets/images/newsPic/yundonghui.png" alt="" oncontextmenu="return false"
                            style="cursor:pointer;" @dblclick="openLowRes($event.target.src, 900)">
                    </div>
                </div>
                </div>

               
            </div>
        </Layout>
    </div>
</template>

<style scoped>
.detailBox {
    width: 100%;
    /* border-top: 2px solid #E5E5E5; */
    margin-top: 10rem;
}

.detailTitle {
    margin: 0 auto;
    font-size: 1.8rem;
    font-weight: 550;
    margin-top: 2rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
}

.font-size-control {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.font-size-label {
    font-size: 1rem;
    color: #333;
    white-space: nowrap;
}

.font-size-switch {
    display: flex;
    gap: 0.3rem;
}

.font-a-btn {
    width: 2.2rem;
    height: 2.2rem;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-radius: 2px;
    font-size: 1rem;
}

.font-a-btn.font-a-middle {
    font-size: 1.1rem;
}

.font-a-btn.font-a-large {
    font-size: 1.25rem;
}

.font-a-btn.active {
    background: #409eff;
    border-color: #409eff;
    color: white;
}

.font-a-btn:hover:not(.active) {
    border-color: #409eff;
    color: #409eff;
}

.detailDate {
    position: relative;
    font-size: 1.2rem;
    color: #888;
    text-align: center;
    margin: 1rem auto 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.detailContainer {
    width: 65%;
    margin: 0 auto;
    margin-top: 7rem;
}

.detailImg {
    width: 80%;
    height: 25rem;
    margin: 2rem auto;
    display: flex;
    justify-content: center;


    >img {
        height: 100%;
        width: 65%;
    }

    @media screen and (max-width: 767px) {
        width: 80%;
        height: 12rem;
    }

    >img:nth-child(1) {
        width: 23%;
    }
}

.newspic {
    width: 80%;
    margin: 2rem auto;

    >img {
        width: 100%;
        height: 100%;
        margin-top: 1rem;
    }
}

.newspic1 {
    width: 50%;
    margin: 1rem auto;

    >img {
        width: 100%;
        height: 100%;
        margin-top: 1rem;
    }
}

.detailContent {
    /* 字体大小由内联style控制 */
    line-height: 2.1rem;
    color: #333;
    margin-top: 2rem;

    >div {
        text-indent: 2em;
    }
}

.back {
    position: fixed;
    left: 16.5%;
    top: 9.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    /* margin: 1rem auto 1rem; */
    font-size: 1.5rem;
    width: 65%;
    height: 2rem;
    z-index: 9999;
    padding: 1rem 2rem;
    background-color: #f8f9fa;
    border-radius: 4px;

    >img {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        top: 8.3rem;
    }

    @media screen and (max-width: 767px) {
        top: 8rem;
    }
}
</style>