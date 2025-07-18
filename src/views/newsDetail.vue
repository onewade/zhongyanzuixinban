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
onMounted(() => {
    // 从路由参数获取公司ID
    console.log('当前路由参数:', route.params);
    id.value = route.params.id || route.query.id;
    console.log('接收到的路由参数 ID:', id.value);
})
</script>
<template>
    <div>
        <Layout>
            <div class="detailBox">
                <div class="detailContainer">
                    <div class="back" @click="goBack">
                        <img src="../assets/images/back.png" alt="">
                    </div>
                    <div v-if="id == 1">
                        <div class="detailTitle">
                            <div>
                                国际集团组织员工参观沙头角禁区及香港回归
                            </div>
                            <div>
                                纪念塔活动
                            </div>
                        </div>
                        <div class="detailDate">2025-06-27</div>
                        <div class="newspic">
                            <img src="../assets/images/newsPic/jnt.png" alt="">
                        </div>
                        <div class="detailContent">
                            <div>
                                2025年6月27日，为庆祝香港回归祖国暨香港特别行政区成立二十八周年，国际集团组织全体员工赴新界沙头角禁区开展专题参观学习。队伍依次参观“沙头角之角”石碑，远眺中英街界碑及“一街两制”警戒线，随后考察沙头角口岸旅检大楼旧址，系统了解边境管理沿革与深港合作历程；其后登上高32.4米的香港回归纪念塔，重温1997年回归盛典，深刻领会“一国两制”伟大实践的历史意义和时代价值。此次活动显著增强了员工的爱国爱港情怀。大家一致表示，将立足本职，以实干担当为香港长治久安与国际集团高质量发展贡献力量。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 2">
                        <div class="detailTitle">国际集团召开2025年一季度经济运行分析会</div>
                        <div class="detailDate">2025-04-15</div>
                        <div class="detailContent">
                            <div>
                                4月15日，中烟国际集团有限公司召开一季度经济运行分析会，传达国家局、总公司经济运行分析会精神，分析研究国际集团一季度经济运行情况，安排部署下一步重点工作。
                            </div>
                            <div>
                                国际集团党组书记、总经理邵岩同志指出，一季度国际集团经济运行总体平稳，但也要清醒认识当前存在的问题和面临的严峻形势，各单位要全力以赴抓好二季度以及2025年的各项工作，“提档位、出真招、见实效”，聚焦关键目标，狠抓重点任务，确保圆满完成全年主要经济目标和重点工作任务。
                            </div>
                            <div>
                                国际集团内设机构各部室、各所属企业主要负责人，中国烟草国际有限公司有关部室负责人参加会议。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 3">
                        <div class="detailTitle">国际集团参加香港中企协保龄球邀请赛</div>
                        <div class="detailDate">2025-03-29</div>
                        <div class="newspic">
                            <img src="../assets/images/newsPic/ball1.png" alt="">
                            <img src="../assets/images/newsPic/ball2.png" alt="">
                        </div>
                        <div class="detailContent">
                            <div>
                                为进一步加强与驻港中资企业交流，丰富员工文体生活，国际集团积极响应香港中企协的号召，组队参与3月29日在香港启德体育园举办的“‘龄’动精彩，球艺飞扬”中企保龄球邀请赛。国际集团代表队队员们全程投入，奋力拼搏，经过近半天的激烈比赛，最终在79支参赛队伍中取得第34名的佳绩，充分展现了国际集团员工团结奋斗、积极向上的精神面貌。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 4">
                        <div class="detailTitle">国际集团举办《哪吒2》主题观影活动</div>
                        <div class="detailDate">2025-02-16</div>
                        <div class="detailImg">
                            <img src="../assets/images/newsPic/ez.png" alt="">
                            <img src="../assets/images/newsPic/ez1.png" alt="">
                        </div>
                        <div class="detailContent">
                            <div>
                                2025年2月26日，国际集团组织员工及家属集体观看国产动画《哪吒2》。影片以传统神话为根基，通过前沿数字技术与东方美学叙事的深度融合，以哪吒“逆天改命”的成长史诗，生动诠释了中华文明“自强不息”的精神内核。
                            </div>
                            <div>
                                多名员工表示，这场视听盛宴不仅让传统文化“活起来”，更让文化自信“强起来”——既为中华文明“守正创新”的基因所震撼，也为身为文化传承者深感自豪。
                            </div>
                            <div>
                                此次活动是国际集团深化企业文化建设的重要实践。通过将传统文化精髓与企业精神相融合，让员工在文化浸润中形成共鸣与价值共识，并转化为推动企业发展的精神动能，为企业高质量发展注入可持续动能。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 5">
                        <div class="detailTitle">
                            <div>
                                凝心聚力迎新春 砥砺奋进启新程
                            </div>
                            <div>——国际集团举行2025年春茗暨开工仪式</div>
                        </div>
                        <div class="detailDate">2025-02-13</div>
                        <div class="newspic">
                            <img src="../assets/images/newsPic/kaigong.png" alt="">
                        </div>
                        <div class="detailContent">
                            <div>
                                新岁伊始，万象更新。根据上级有关文件精神指引，为传承中华传统文化，凝聚团队力量，国际集团于2月13日举行春茗暨开工仪式。
                            </div>
                            <div>
                                春茗作为香港及粤港澳地区的重要节庆活动，不仅寓意“纳福迎新，展望新年”，亦是企业凝聚共识、统筹布局的重要契机。2025年恰逢“十四五”规划收官之年，亦是总部外移香港的第四年。为承续本地传统，国际集团特别举行切烧猪仪式，寓意“开年见喜，行稳致远”，共启新程。
                            </div>
                            <div>
                                公司董事长、总经理邵岩在致辞中肯定了全体员工的辛勤付出，并强调“十四五”规划收官之年是公司发展的关键阶段，全员应凝心聚力，攻坚克难，全力冲刺年度目标。此次春茗暨开工仪式既承载新春祝福，也吹响奋进新征程的号角。公司将坚定信心，抢抓机遇，推动高质量发展迈上新台阶，确保“十四五”圆满收官。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 7">
                        <div class="detailTitle">
                            <div>
                                中烟国际集团有限公司召开
                            </div>
                            <div>
                                2025年度工作会议
                            </div>
                            <div>
                                传达学习2025年全国烟草工作会议精神
                            </div>
                        </div>
                        <div class="detailDate">2025-01-20</div>
                        <div class="newspic">
                            <img src="../assets/images/newsPic/jingshen.png" alt="">
                        </div>
                        <div class="detailContent">
                            <div>
                                1月20日，中烟国际集团有限公司在香港召开2025年度工作会议，认真学习贯彻2025年全国烟草工作会议精神，总结2024年工作，分析当前国际形势和内部调整，部署2025年工作任务。中烟国际集团有限公司党组书记、董事长、总经理邵岩作工作报告。
                            </div>
                            <div>
                                会议认为，2025年全国烟草工作会议是行业在“十四五”规划收官、“十五五”谋篇布局关键节点召开的重要会议。张建民局长代表党组作的工作报告高屋建瓴、思想深邃，为做好全年工作、推动行业高质量发展和现代化建设提供了遵循。
                            </div>
                            <div>
                                会议要求，国际集团要深入学习贯彻落实2025年全国烟草工作会议精神，切实把思想和行动统一到国家局党组决策部署上来。各所属企业负责人要将会议精神传导到本企业外派员工。
                            </div>
                            <div>
                                会议指出，2024年，国际集团认真贯彻落实国家局党组战略部署和建民同志来港调研时的重要讲话精神，坚持稳中求进的工作总基调，深入贯彻新发展理念，努力锻造国际业务新质生产力，加快构建国际集团新发展格局，坚定不移推动国际业务高质量发展，各项工作取得了新进步新成效，营业收入和利润总额均创历史新高。
                            </div>
                            <div>
                                会议强调，要更加辩证地看待当前和未来的发展形势，准确识别国际环境变化带来的风险和机遇，正确应对三大重点工作面临的压力和挑战。
                            </div>
                            <div>
                                会议要求，2025年要重点抓好六个方面的工作。一是坚定不移提升境外党建水平；二是高水平完成境外资产联合重组工作；三是加大业务拓展力度，提升价值创造水平；四是深化国际集团体制机制改革，推进政企分开；五是坚持不懈推进高水平国际化人才队伍建设；六是坚持不懈提升基础管理水平，统筹好安全与发展的关系。
                            </div>
                            <div>
                                国际集团领导班子成员、境外所属企业主要责任人、财务负责人、驻港全体外派人员参加会议。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 6">
                        <div class="detailTitle">国际集团开展“春节送温暖”义工活动</div>
                        <div class="detailDate">2025-01-21</div>
                        <div class="newspic">
                            <img src="../assets/images/newsPic/yigong.png" alt="">
                        </div>
                        <div class="detailContent">
                            <div>
                                1月21日，国际集团在香港中国企业协会的大力支持下，与荃湾各界协会、荃湾义工团和中国太平义工队联合开展“中企关爱进社区 春节送温暖”义工活动。
                            </div>
                        </div>
                        <div class="newspic1">
                            <img src="../assets/images/newsPic/yigong1.png" alt="">
                        </div>
                        <div class="detailContent">
                            <div>
                                国际集团董事长、总经理邵岩及其他领导班子成员，荃湾区议员陈晓津、华美玲，香港中国企业协会本地事务部总监许伟等嘉宾出席活动，国际集团、荃湾各界协会、荃湾义工团、中国太平义工队代表近50人参加活动，向荃湾地区困难基层家庭入户派送冷暖风扇和空气净化一体机和送上春节的美好祝愿，以实际行动履行中资企业的社会责任，传递国际集团对香港基层市民的亲切关怀。
                            </div>
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
    border-top: 2px solid #E5E5E5;
    margin-top: 10rem;
}

.detailTitle {
    margin: 0 auto;
    font-size: 1.8rem;
    font-weight: 550;
    margin-top: 2rem;
    text-align: center;
}

.detailDate {
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
        height: 100%;
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
    font-size: 1.2rem;
    line-height: 2.1rem;
    color: #333;
    margin-top: 2rem;

    >div {
        text-indent: 2em;
    }
}

.back {
    position: absolute;
    left: 17.5%;
    top: 12rem;
    cursor: pointer;
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;

    >img {
        width: 100%;
        height: 100%;
    }
}
</style>