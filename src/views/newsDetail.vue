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
                            <button class="font-a-btn" :class="{ active: fontSizeLevel === 0 }"
                                @click="setFontSize(0)">A</button>
                            <button class="font-a-btn font-a-middle" :class="{ active: fontSizeLevel === 1 }"
                                @click="setFontSize(1)">A</button>
                            <button class="font-a-btn font-a-large" :class="{ active: fontSizeLevel === 2 }"
                                @click="setFontSize(2)">A</button>
                        </div>
                    </div>
                </div>
                <div class="detailContainer">
                    <div class="detailTitle">
                        <slot name="title">
                            <span>
                                <template v-if="id == 1">
                                    国际集团组织员工参观沙头角禁区及香港回归
                                    <br />纪念塔活动
                                </template>
                                <template v-else-if="id == 2">
                                    国际集团组织参观纪念抗战胜利80周年展览
                                </template>
                                <template v-else-if="id == 3">
                                    国际集团参加香港中企协保龄球邀请赛
                                </template>
                                <template v-else-if="id == 4">
                                    国际集团举办《哪吒2》主题观影活动
                                </template>
                                <template v-else-if="id == 9">
                                    国际集团开展“中企关爱进社区”义工活动
                                </template>
                                 <template v-else-if="id == 10">
                                    国际集团组织员工参观香港立法会活动
                                </template>
                                <template v-else-if="id == 6">
                                    国际集团开展"春节送温暖"义工活动
                                </template>
                                <template v-else-if="id == 7">
                                    中烟国际集团有限公司召开<br />2025年度工作会议<br />传达学习2025年全国烟草工作会议精神
                                </template>
                                <template v-else-if="id == 11">
                                    国际集团获得香港个人资料私隐专员公署颁发的2025私隐之友嘉许金奖
                                </template>
                                <template v-else-if="id == 12">
                                    国际集团组织开展《民法典》不动产专题法律培训
                                </template>
                                <template v-else-if="id == 13">
                                    国际集团参加香港中企协第九届运动会勇夺佳绩
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
                            <img src="../assets/images/newsPic/jnt.png" alt="" @dblclick="openLowRes($event.target.src, 900)" oncontextmenu="return false" >
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                2025年6月27日，为庆祝香港回归祖国暨香港特别行政区成立二十八周年，国际集团组织全体员工赴新界沙头角禁区开展专题参观学习。队伍依次参观"沙头角之角"石碑，远眺中英街界碑及"一街两制"警戒线，随后考察沙头角口岸旅检大楼旧址，系统了解边境管理沿革与深港合作历程；其后登上高32.4米的香港回归纪念塔，重温1997年回归盛典，深刻领会"一国两制"伟大实践的历史意义和时代价值。此次活动显著增强了员工的爱国爱港情怀。大家一致表示，将立足本职，以实干担当为香港长治久安与国际集团高质量发展贡献力量。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 2">
                         <div class="newspic">
                             <img src="../assets/images/newIndex/80zhounian.jpg" oncontextmenu="return false"   alt="" style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                2025年8月26日下午，中烟国际集团有限公司组织全体员工前往香港会展中心，参观由香港大公文汇传媒集团主办的“为了中华民族伟大复兴——纪念中国人民抗日战争暨世界反法西斯战争胜利80周年大型巡回展览”。
                            </div>
                            <div>
                                展览以丰富的图片、文字、影像及展品为载体，生动呈现中国人民艰苦卓绝的抗战历程，旨在引导香港市民铭记历史、缅怀先烈、珍爱和平。通过历史资料与实物的展示，观众能够深刻感受到中华民族在民族危亡时刻不屈不挠的精神力量。
                            </div>
                            <div>
                                在参观过程中，我司员工认真聆听讲解、驻足观看展板与影像，深受教育与启发。大家一致表示，此次参观不仅加深了对抗战历史的认识，也进一步激发了爱国情怀与使命担当。
                            </div>
                            <div>
                                我司将以此次活动为契机，弘扬伟大抗战精神，激励全体员工在本职岗位上砥砺奋进，为推动公司高质量发展与中华民族伟大复兴贡献力量。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 3">
                        <div class="newspic">
                            <img src="../assets/images/newsPic/ball1.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                            <img src="../assets/images/newsPic/ball2.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                为进一步加强与驻港中资企业交流，丰富员工文体生活，国际集团积极响应香港中企协的号召，组队参与3月29日在香港启德体育园举办的"'龄'动精彩，球艺飞扬"中企保龄球邀请赛。国际集团代表队队员们全程投入，奋力拼搏，经过近半天的激烈比赛，最终在79支参赛队伍中取得第34名的佳绩，充分展现了国际集团员工团结奋斗、积极向上的精神面貌。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 4">
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
                    </div>
                    <div v-if="id == 5">
                        <div class="newspic">
                            <img src="../assets/images/newsPic/kaigong.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                新岁伊始，万象更新。根据上级有关文件精神指引，为传承中华传统文化，凝聚团队力量，国际集团于2月13日举行春茗暨开工仪式。
                            </div>
                            <div>
                                春茗作为香港及粤港澳地区的重要节庆活动，不仅寓意"纳福迎新，展望新年"，亦是企业凝聚共识、统筹布局的重要契机。2025年恰逢"十四五"规划收官之年，亦是总部外移香港的第四年。为承续本地传统，国际集团特别举行切烧猪仪式，寓意"开年见喜，行稳致远"，共启新程。
                            </div>
                            <div>
                                公司董事长、总经理邵岩在致辞中肯定了全体员工的辛勤付出，并强调"十四五"规划收官之年是公司发展的关键阶段，全员应凝心聚力，攻坚克难，全力冲刺年度目标。此次春茗暨开工仪式既承载新春祝福，也吹响奋进新征程的号角。公司将坚定信心，抢抓机遇，推动高质量发展迈上新台阶，确保"十四五"圆满收官。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 6">
                        <div class="newspic">
                            <img src="../assets/images/newsPic/yigong.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                1月21日，国际集团在香港中国企业协会的大力支持下，与荃湾各界协会、荃湾义工团和中国太平义工队联合开展"中企关爱进社区 春节送温暖"义工活动。
                            </div>
                        </div>
                        <div class="newspic1">
                            <img src="../assets/images/newsPic/yigong1.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                国际集团董事长、总经理邵岩及其他领导班子成员，荃湾区议员陈晓津、华美玲，香港中国企业协会本地事务部总监许伟等嘉宾出席活动，国际集团、荃湾各界协会、荃湾义工团、中国太平义工队代表近50人参加活动，向荃湾地区困难基层家庭入户派送冷暖风扇和空气净化一体机和送上春节的美好祝愿，以实际行动履行中资企业的社会责任，传递国际集团对香港基层市民的亲切关怀。
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 7">
                        <div class="newspic">
                            <img src="../assets/images/newsPic/jingshen.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                1月20日，中烟国际集团有限公司在香港召开2025年度工作会议，认真学习贯彻2025年全国烟草工作会议精神，总结2024年工作，分析当前国际形势和内部调整，部署2025年工作任务。中烟国际集团有限公司党组书记、董事长、总经理邵岩作工作报告。
                            </div>
                            <div>
                                会议认为，2025年全国烟草工作会议是行业在"十四五"规划收官、"十五五"谋篇布局关键节点召开的重要会议。张建民局长代表党组作的工作报告高屋建瓴、思想深邃，为做好全年工作、推动行业高质量发展和现代化建设提供了遵循。
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
                     <div v-if="id == 9">
                         <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                               近日，国际集团与香港荃湾各界协会联合开展“中企关爱进社区”义工活动，向荃湾地区困难基层家庭进行探访慰问并送上冷暖风扇和空气净化一体机。 
                            </div>
                        </div>
                        <div class="newspic">
                            <img src="../assets/images/newsPic/guanaishequ.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                                在荃湾各界协会工作人员的配合下，国际集团义工成员完成物资搬运及送递上门服务，并与基层社区居民亲切交流，了解生活困难和实际需求。荃湾各界协会负责人对国际集团长期以来对基层社区的关心支持表示衷心感谢，希望未来能与国际集团保持紧密合作，共同为香港基层居民办实事、解难题。
                            </div>
                        </div>
                        <div class="newspic1">
                            <img src="../assets/images/newsPic/guanaishequ1.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                               近年来，国际集团积极履行驻港中资企业社会责任，始终坚持深耕香港、建设香港、服务香港。下一步，将继续深化与荃湾各界协会的交流合作，以社区关爱活动为纽带，凝聚各方力量，深入社区一线，聚焦基层需求，传递中企温度，为香港基层居民办实事、做好事，以实际行动助力香港经济发展、民生改善。
                            </div>
                        </div>
                    </div>
                     <div v-if="id == 10">
                        <div class="newspic">
                            <img src="../assets/images/newsPic/lifa.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                               2025年7月15日，国际集团组织员工赴香港立法会综合大楼参观，开展“爱国爱港主题教育”活动。本次活动得到了全国人大代表、香港立法会议员陈勇先生及工作人员的大力支持。
                            </div>
                            <div>
                                通过专业人员讲解，大家系统了解立法会的宪制职责、议事程序及“一国两制”框架下维护国家主权、服务香港民生的运作机制，加深了对香港法治建设与民主进程的认识，进一步增强了爱国爱港情怀。大家一致表示，将以此次学习为契机，把奉献精神和工匠精神融入日常工作，积极投身社会服务，为香港的繁荣稳定贡献力量。 
                            </div>
                        </div>
                    </div>
                    <div v-if="id == 11">
                        <div class="newspic" style="margin-bottom: 0.5rem;">
                            <img src="../assets/images/newsPic/jiang.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div style="font-size: 0.9rem; text-align: center; ">
                            香港个人资料私隐专员公署专员钟丽玲（左一）、香港物业管理业监管局主席黄江天（右一）为中烟国际集团有限公司颁奖
                        </div>
                        <div class="newspic">
                            <img src="../assets/images/newsPic/jiang1.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                               2025年7月10日，在香港个人资料私隐专员公署举办的“2025私隐之友嘉许奖”颁奖典礼上，国际集团获得“2025私隐之友嘉许金奖”。
                            </div>
                            <div>
                                香港个人资料私隐专员公署是由香港政制及内地事务局下辖的独立法定机构，负责监管香港地区网络数据安全和个人信息保护相关法律执行。其每两年举办一次“私隐之友嘉许奖”评选活动，旨在表彰在网络数据安全和个人信息保护方面工作成绩突出的在港机构。 
                            </div>
                        </div>
                    </div>
                     <div v-if="id == 12">
                        <div class="newspic">
                            <img src="../assets/images/newsPic/fadian.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
                        </div>
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                               为深入贯彻落实中央“八五”普法规划要求，扎实推进《民法典》学习宣传工作，国际集团于2025年6月5日下午组织开展了《民法典》不动产法律法规专题培训。本次培训采用线上线下相结合的方式，系统讲解民法典中与不动产相关的核心法律规定。 
                            </div>
                            <div>
                                本次培训立足法治烟草建设要求，以提升员工法治素养为核心目标，围绕2025年民法典宣传月“美好生活·民法典相伴”的主题，将民法典物权编、合同编、婚姻家庭编等核心内容与不动产交易实践深度融合。通过“以案释法”的普法方式，系统阐释不动产物权登记、居住权等法律制度，重点解析交易结构设计、违约救济等实务难点，使参训人员既掌握法律条文要义，又提升实务操作能力。 
                            </div>
                            <div>
                                参训员工表示通过此次培训，既加深了对《民法典》相关规定的理解，又提升了运用法律知识防范风险的实际能力，将以此次培训为契机，持续深化对《民法典》的理解运用，将法治思维贯穿业务操作全过程，为企业法治建设贡献力量。
                            </div>
                        </div>
                    </div>
                     <div v-if="id == 13">
                        
                        <div class="detailContent"
                            :style="{ fontSize: fontSizeMap[fontSizeLevel], lineHeight: lineHeightMap[fontSizeLevel] }">
                            <div>
                               近日，国际集团参加了由香港中国企业协会举办的第九届运动会，勇夺男子高管组400米季军、十人十一足项目季军和拔河项目的第五名，在60支参赛队伍中名列前茅，创历史最佳成绩。
                            </div>
                            <div>
                                在两天的激烈比拼中，国际集团运动员们勇于拼搏、奋力争先，在竞技和趣味项目均展现更快、更高、更强、更团结的体育精神；场下啦啦队员们挥舞着彩旗和加油棒，全情投入为运动健儿加油鼓劲，呐喊助威声此起彼落，不绝于耳，充分展现国际集团员工良好的精神面貌，增加了员工之间的凝聚力和向心力。
                            </div>
                        </div>
                         <div class="newspic">
                            <img src="../assets/images/newsPic/yundonghui.png" alt="" oncontextmenu="return false"  style="cursor:pointer;"
                              @dblclick="openLowRes($event.target.src, 900)">
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
    @media screen and (min-width: 768px) and (max-width: 1024px){
		 top: 8.3rem;
	}
    @media screen and (max-width: 767px) {
		top: 8rem;
	}
}
</style>