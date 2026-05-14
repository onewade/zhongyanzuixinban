<script setup>
import Layout from '@/components/common/Layout.vue';
import JoinDetail from './JoinDetail.vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale, messages } = useI18n();
const list = computed(() => messages.value[locale.value].message.list)
const isShowDetail = ref(false); // 控制招聘详情的显示
// 展示第几条招聘详情
    //   {
    //     "number": 1,
    //     "title": "【社会招聘】财务管理岗",
    //     "date": "",
    //     "joinTitle": "【社会招聘】财务管理岗",
    //     "joinType": "社会招聘",
    //     "joinPost": "财务管理岗 经理及以上（请通过Jobsdb投递）",
    //     "joinContentlist": [
    //       {
    //         "title": "岗位职责:",
    //         "content": [
    //           "1.协助分管副总监开展工作;",
    //           "2.开展对相关投资企业的财务管理;",
    //           "3.负责集团合并预算编制、执行、分析、调整、总结;",
    //           "4.负责合并预算的滚动分析预测，提出合理化建议;",
    //           "5.开展对财税中介机构的采购和选聘审核工作;",
    //           "6.协助开展财务分析工作;",
    //           "7.协助开展财会监督工作;",
    //           "8.完成上级交办的其他工作。"
    //         ]
    //       },
    //       {
    //         "title": "岗位要求:",
    //         "content": [
    //           "1.财会类相关专业，本科或以上学历;",
    //           "2.具有8年以上财务工作经验，具有对投资企业管理经验;",
    //           "3.具有HKICPA/CPA/ACCA资格优先;",
    //           "4.具有在大型企业信息化管理、下属企业财务管理等经验优先;",
    //           "5.熟悉合并报表编制、预算管理等工作;",
    //           "6.具有较强的文字写作能力和沟通表达能力;熟练掌握会计核算软件、office办公软件;熟练阅读英文材料;具备较强的岗位责任意识和团队精神。"
    //         ]
    //       }
    //     ]
    //   },
  // {
      //   "number": 1,
      //   "title": "【社会招聘】员工关系岗招聘",
      //   "date": "2025-06-07",
      //   "joinTitle": "【社会招聘】员工关系岗招聘",
      //   "joinType": "社会招聘",
      //   "joinPost": "员工关系岗 专员及以上（请通过Jobsdb投递）",
      //   "joinContentlist": [
      //     {
      //       "title": "岗位职责:",
      //       "content": [
      //         "1.协助建立、运行、维护、改进国际集团人力资源子管理体系；",
      //         "2.参与编制岗级体系；",
      //         "3.协助开展人员招聘，办理员工试用、入职、转正、调动、离职等手续；",
      //         "4.协助建立和维护人员信息档案，管理雇佣合同；",
      //         "5.受理劳动争议和员工投诉，协助处理劳动纠纷；",
      //         "6.分析研究下属企业用工合规性，提出风险防控措施；",
      //         "7.建立维护国际业务知识库、内部培训师资库；",
      //         "8.负责组织实施培训和日常管理。"
      //       ]
      //     },
      //     {
      //       "title": "岗位要求:",
      //       "content": [
      //         "1.大学本科及以上学历；人力资源管理、行政管理等管理类专业背景；",
      //         "2.具有3年以上香港地区企业人力资源相关工作经验；",
      //         "3.熟悉香港雇佣条例，了解香港劳动用工相关政策；",
      //         "4.具有较强的沟通能力、逻辑分析能力、较好的英语听说读写水平；",
      //         "5.熟练掌握office办公软件，具有管理体系文件编制经验优先。"
      //       ]
      //     }
      //   ]
      // },
    //    {
    //     "number": 1,
    //     "title": "【社會招聘】員工關係崗招聘",
    //     "date": "2025-06-07",
    //     "joinTitle": "【社會招聘】員工關係崗招聘",
    //     "joinType": "社會招聘",
    //     "joinPost": "員工關係崗 專員及以上（請透過 Jobsdb 投遞）",
    //     "joinContentlist": [
    //       {
    //         "title": "崗位職責:",
    //         "content": [
    //           "1. 協助建立、運行、維護、改進國際集團人力資源子管理體系；",
    //           "2. 參與編制崗級體系；",
    //           "3. 協助開展人員招聘，辦理員工試用、入職、轉正、調動、離職等手續；",
    //           "4. 協助建立和維護人員信息檔案，管理僱傭合同；",
    //           "5. 受理勞動爭議和員工投訴，協助處理勞動糾紛；",
    //           "6. 分析研究下屬企業用工合規性，提出風險防控措施；",
    //           "7. 建立維護國際業務知識庫、內部培訓師資庫；",
    //           "8. 負責組織實施培訓和日常管理。"
    //         ]
    //       },
    //       {
    //         "title": "崗位要求:",
    //         "content": [
    //           "1. 大學本科及以上學歷；人力資源管理、行政管理等管理類專業背景；",
    //           "2. 具有3年以上香港地區企業人力資源相關工作經驗；",
    //           "3. 熟悉香港僱傭條例，了解香港勞動用工相關政策；",
    //           "4. 具有較強的溝通能力、邏輯分析能力、較好的英語聽說讀寫水平；",
    //           "5. 熟練掌握 Office 辦公軟體，具有管理體系文件編制經驗者優先。"
    //         ]
    //       }
    //     ]
    //   },
    //  {
    //       "number": 1,
    //       "title": "【Open Positions】Employee Relations Position",
    //       "date": "2025-06-07",
    //       "joinTitle": "【Open Positions】Employee Relations Position",
    //       "joinType": "Social Recruitment",
    //       "joinPost": "Employee Relations Position: Specialist and above (Please apply via Jobsdb)",
    //       "joinContentlist": [
    //         {
    //           "title": "Job Responsibilities:",
    //           "content": [
    //             "1. Assist in establishing, operating, maintaining, and improving the human resources management subsystem for the CTIG.",
    //             "2. Participate in developing the job grade and classification system.",
    //             "3. Support the recruitment process and manage employee lifecycle procedures, including those for probation, onboarding, regularization, transfer, resignation, and termination.",
    //             "4. Assist in establishing and maintaining personnel records and managing employment contracts.",
    //             "5. Receive and manage labor disputes and employee complaints, and support their resolution.",
    //             "6. Analyze and research the labor compliance of subsidiary companies, proposing risk prevention and control measures.",
    //             "7. Establish and maintain a knowledge base for international operations and an internal trainer pool.",
    //             "8. Organize and execute training programs and daily management activities."
    //           ]
    //         },
    //         {
    //           "title": "Job Requirements:",
    //           "content": [
    //             "1. Bachelor's degree or higher in Human Resources Management, Administrative Management, or related fields.",
    //             "2. Minimum of 3 years of relevant HR experience in Hong Kong-based enterprises.",
    //             "3. Proficient knowledge of the Hong Kong Employment Ordinance and understanding of relevant labor policies in Hong Kong.",
    //             "4. Strong communication and logical analysis skills; proficient in English across all four areas: listening, speaking, reading, and writing.",
    //             "5. Proficient in MS Office applications; prior experience in developing management system documentation is preferred."
    //           ]
    //         }
    //       ]
    //     },
     // {
      //   "number": 2,
      //   "title": "【社会招聘】法务专员岗招聘",
      //   "date": "2025-11-03",
      //   "joinTitle": "【社会招聘】法务专员岗招聘",
      //   "joinType": "",
      //   "joinPost": "一、法务专员（请通过Jobsdb投递）",
      //   "joinContentlist": [
      //     {
      //       "title": "资质要求:",
      //       "content": [
      //         "1.中国内地法学本科或香港法学硕士学历;",
      //         "2.熟悉香港法律法规，具有优秀的中英文法律写作及听说表达能力;",
      //         "3.具有良好的学习和研究分析能力，组织协调能力和团队精神，可承受较高强度工作压力;",
      //         "4.能够保密处理敏感信息;",
      //         "5.计算机技能优秀;",
      //         "6.至少2年法律事务工作经验;",
      //         "7.具有在港央企法律事务工作经验、通过中国内地法律资格考试者优先。"
      //       ]
      //     },
      //     {
      //       "title": "岗位职责:",
      //       "content": [
      //         " 1.合同管理：参与起草、审查公司各类法律档，对各类合同提出法律意见;",
      //         "2.风险管理：协助开展公司及公司所属企业的风险事项管理，制订风险防范措施;",
      //         "3.法律调研：开展重点市场法律环境信息调研，建立法律信息国别库，定期更新信息库内容;",
      //         "4.法律培训：协助开展普法宣传和专项法律培训，协调联络培训律师，草拟培训方案;",
      //         "5.日常法律事务：配合业务部门和其它职能部门处理公司日常法律事务。"
      //       ]
      //     }
      //   ]
      // },
       // {
        //   "number": 2,
        //   "title": "【Open Positions】Legal Specialist Position",
        //   "date": "2025-11-03",
        //   "joinTitle": "【Open Positions】Legal Specialist Position",
        //   "joinType": "",
        //   "joinPost": "Legal officer（Please submit through Jobsdb）",
        //   "joinContentlist": [
        //     {
        //       "title": "Qualifications :",
        //       "content": [
        //         "1. Bachelor of Laws in China or Master of Laws in Hong Kong;",
        //         "2. Familiar with Hong Kong laws and regulations, with excellent Chinese and English legal writing and listening and speaking skills;",
        //         "3. Good learning, research and analysis ability, organization and coordination ability and team spirit, and can withstand high-intensity work pressure;",
        //         "4. Ability to confidentially handle sensitive information;",
        //         "5. Excellent computer skills;",
        //         "6. Minimum two years of experience dealing legal affairs;",
        //         "7. Experience in the legal affairs of state-owned enterprises in Hong Kong and have passed the National Legal Qualification Examination are preferred."
        //       ]
        //     },
        //     {
        //       "title": "Job Responsibilities:",
        //       "content": [
        //         "1. Contract management: Assist in drafting and review of legal agreements and provide legal opinions;",
        //         "2. Legal research: Assist in legal research in key markets, establish database of legal information, and regularly update the content of the database; ",
        //         "3. Legal training: Assist in internal legal training, coordinate and liaise with training lawyers, and draft training programs;",
        //         "4. Daily legal affairs: Draft or proofread emails, legal opinion letters, and other binding documents; Oversee and maintain company agreements, legal materials, case files, and other documentation;",
        //         "5. Provide administrative support as requested by legal director."
        //       ]
        //     }
        //   ]
        // },
    //      {
    //     "number": 2,
    //     "title": "【社會招聘】法務專員崗招聘",
    //     "date": "2025-11-03",
    //     "joinTitle": "【社會招聘】法務專員崗招聘",
    //     "joinType": "",
    //     "joinPost": "一、法務專員（請透過 Jobsdb 投遞）",
    //     "joinContentlist": [
    //       {
    //         "title": "資質要求:",
    //         "content": [
    //           "1.中國內地法學本科或香港法學碩士學歷;",
    //           "2.熟悉香港法律法規，具有優秀的中英文法律寫作及聽說表達能力;",
    //           "3.具有良好的學習和研究分析能力，組織協調能力和團隊精神，可承受較高強度工作壓力;",
    //           "4.能夠保密處理敏感資訊;",
    //           "5.電腦技能優秀;",
    //           "6.至少2年法律事務工作經驗;",
    //           "7.具有在港央企法律事務工作經驗、通過中國內地法律資格考試者優先。"
    //         ]
    //       },
    //       {
    //         "title": "崗位職責:",
    //         "content": [
    //           "1.合同管理：參與起草、審查公司各類法律檔，對各類合同提出法律意見;",
    //           "2.風險管理：協助開展公司及公司所屬企業的風險事項管理，制訂風險防範措施;",
    //           "3.法律調研：開展重點市場法律環境信息調研，建立法律信息國別庫，定期更新信息庫內容;",
    //           "4.法律培訓：協助開展普法宣傳和專項法律培訓，協調聯絡培訓律師，草擬培訓方案;",
    //           "5.日常法律事務：配合業務部門和其它職能部門處理公司日常法律事務。"
    //         ]
    //       }
    //     ]
    //   },
const selectedIndex = ref(0);
const handleClick = (n) => {
    // 处理点击事件，显示招聘详情
    console.log('招聘信息被点击',n);
    if (n == 1 || n == 2) {
        selectedIndex.value = n;
        isShowDetail.value = true;

    } else {
        return
    }

};
const handleGoBack = (val) => {
    isShowDetail.value = val;
};
</script>

<template>
    <div>
        <Layout>
            <div class="joinContainer">
                <div class="index-page">
                    <div class="page-header-sub">
                        <!-- <img src="../assets/images/zp.png" alt=""> -->
                        <img src="../assets/images/banner.png" alt="人才招聘页面横幅图片" srcset="">
                    </div>
                </div>
                <div v-if="!isShowDetail" class="join-content">
                    <div class="joinTitle">{{ $t("message.t7") }}</div>
                    <div v-for="(item) in list" :key="item.number" class="joinContentItem"
                        :style="{ cursor: item.number == 1 || item.number == 2 ? 'pointer' : 'default' }"
                        @click="handleClick(item.number)"
                        tabindex="0"
                        role="button"
                        :aria-label="item.title"
                        @keydown.enter="handleClick(item.number)">
                        <div v-if="item.title">{{ item.title }}</div>
                        <div v-if="item.date">{{ item.date }}</div>
                        <div v-else>{{ $t("message.nothing") }}</div>
                    </div>
                </div>
                <JoinDetail v-else :number="selectedIndex" @go-back="handleGoBack" />

            </div>
        </Layout>
    </div>

</template>
<style scoped>
.joinContainer {
    width: 100%;
    height: 100%;
}

.join-content {
    width: 66%;
    padding: 0 17% 2rem;
    border-bottom: 1px solid #ddd;

    @media screen and (max-width: 767px) {
        width: 90%;
        padding: 2rem;
    }
}

.joinBox {
    >img {
        width: 100%;
        height: 100%;
    }
}

.joinTitle {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 4rem 0px 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #F7B334;

    @media screen and (max-width: 767px) {
        margin-top: 1rem;
    }
}

.joinContentItem {
    height: 3rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #555;
    font-size: 1.2rem;
}
</style>