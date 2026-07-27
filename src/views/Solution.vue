<script setup>
import Layout from '@/components/common/Layout.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { onLanguageChange, getCurrentLanguage } from '@/utils/language.js';

const currentLanguage = ref(getCurrentLanguage());
const offLanguageListener = ref(null);

const overviewContent = {
  zhCN: {
      title: "中烟国际集团有限公司",
      paragraphs: [
          "中烟国际集团有限公司位于中国香港，是中国烟草总公司在境外的实体化公司。其内设机构包括公共事务部、战略发展部、市场营销部、供应链部、生产运营部、财务部、人力资源部、信息数字化部、合规风控部、监察部等10个部门。负责管理中国烟草国际有限公司、中烟（深圳）进出口有限公司等2家境内企业，以及中烟国际（香港）有限公司、天泽烟草有限公司等10多家境外企业。",
          "集团投资企业聚焦卷烟（含新型烟草制品）销售、烟叶种植加工、卷烟生产制造等核心业务，主要分布在中国香港、中国澳门、美国、巴西、阿根廷、津巴布韦、瑞士、罗马尼亚、阿联酋、老挝、柬埔寨等全球10多个国家（地区）。"
      ],
      structureTitle: "组织架构",
      institutionTitle: "内设机构",
      domesticTitle: "境内企业",
      overseasTitle: "境外企业",
      departments: [
          "公共事务部",
          "战略发展部",
          "市场营销部",
          "供应链部",
          "生产运营部",
          "财务部",
          "人力资源部",
          "信息数字化部",
          "合规风控部",
          "监察部"
      ],
      domesticCompanies: [
          "中国烟草国际有限公司",
          "中烟（深圳）进出口有限公司"
      ],
      overseasGroups: [
          {
              title: "上市企业",
              companies: [
                  "中烟国际（香港）有限公司"
              ]
          },
          {
              title: "烟叶企业",
              companies: [
                  "天泽烟草有限责任公司",
                  "中烟国际（北美）股份有限公司",
                  "中烟国际阿根廷有限公司",
                  "中烟国际巴西有限公司"
              ]
          },
          {
              title: "生产企业",
              companies: [
                  "金叶卷烟厂（澳门）有限公司",
                  "中烟国际老挝制造有限公司",
                  "威尼顿集团有限公司",
                  "中烟国际欧洲有限公司"
              ]
          },
          {
              title: "商业企业",
              companies: [
                  "中烟国际（中东）有限公司",
                  "中烟国际（亚太）有限公司",
                  "中烟国际（欧洲）有限公司",
                  "中烟国际（瑞士）有限公司"
              ]
          },
          {
              title: "其他企业",
              companies: [
                  "中烟菲莫国际有限公司",
                  "中烟英美烟草国际有限公司",
                  "地平线国际合资有限公司",
                  "TULLEY国际有限公司"
              ]
          }
      ]
  },
  zhTW: {
    title: '中煙國際集團有限公司',
    paragraphs: [
      '中煙國際集團有限公司位於中國香港，是中國煙草總公司在境外的實體化公司。其內設機構包括公共事務部、戰略發展部、市場營銷部、供應鏈部、生產運營部、財務部、人力資源部、信息數字化部、合規風控部、監察部等10個部門。負責管理中國煙草國際有限公司、中煙（深圳）進出口有限公司等2家境內企業，以及中煙國際（香港）有限公司、天澤煙草有限公司等10多家境外企業。',
      '集團投資企業聚焦卷煙（含新型煙草製品）銷售、煙葉種植加工、卷煙生產製造等核心業務，主要分布在中國香港、中國澳門、美國、巴西、阿根廷、津巴布韋、瑞士、羅馬尼亞、阿聯酋、老撾、柬埔寨等全球10多個國家（地區）。'
    ],
    structureTitle: '組織架構',
    institutionTitle: '內設機構',
    domesticTitle: '境內企業',
    overseasTitle: '境外企業',
    departments: [
      '公共事務部',
      '戰略發展部',
      '市場營銷部',
      '供應鏈部',
      '生產運營部',
      '財務部',
      '人力資源部',
      '信息數字化部',
      '合規風控部',
      '監察部'
    ],
    domesticCompanies: ['中國煙草國際有限公司', '中煙（深圳）進出口有限公司'],
    overseasGroups: [
      { title: '上市企業', companies: ['中煙國際（香港）有限公司'] },
      {
        title: '煙葉企業',
        companies: [
          '天澤煙草有限責任公司',
          '中煙國際阿根廷有限公司',
          '中煙國際（北美）股份有限公司',
          '中煙國際巴西有限公司'
        ]
      },
      {
        title: '生產企業',
        companies: [
          '金葉卷煙廠（澳門）有限公司',
          '中煙國際老撾製造有限公司',
          '中煙國際歐洲有限公司',
          '威尼頓集團有限公司'
        ]
      },
      {
        title: '商業企業',
        companies: [
          '中煙國際（中東）有限公司',
          '中煙國際（亞太）有限公司',
          '中煙國際（瑞士）有限公司',
          '中煙國際（歐洲）有限公司'
        ]
      },
      {
        title: '其他企業',
        companies: [
          '中煙菲莫國際有限公司',
          '中煙英美煙草國際有限公司',
          '地平線國際合資有限公司',
          'TULLEY國際有限公司'
        ]
      }
    ]
  },
  en: {
      title: "China Tobacco International Group Limited",
      paragraphs: [
          "China Tobacco International Group Limited (CTIG) is headquartered in Hong Kong, China, and serves as the operational entity of China National Tobacco Corporation (CNTC) outside . Its internal structure comprises the Public Affairs Department, Strategy & Development Department, Marketing Department, Supply Chain Department, Production & Operations Department, Finance Department, Human Resources Department, Information & Digitalization Department, Compliance & Risk Control Department, and Supervision Department. CTIG is responsible for the administration of two domestic enterprises, namely China Tobacco International Inc. and China Tobacco (Shenzhen) Import & Export Co., Ltd., as well as more than 10 overseas enterprises, represented by China Tobacco International (HK) Company Limited and Tian Ze Tobacco Company (Private) Limited.",
          "CTIG's subsidiaries focus on core businesses such as the sale of tobacco products (including cigarettes, cigars, and new tobacco products), tobacco leaf cultivation and processing, and cigarette manufacturing. These subsidiaries are located in over 10 countries and regions worldwide, such as Hong Kong SAR (China), Macau SAR (China), the United States, Brazil, Argentina, Zimbabwe, Switzerland, Romania, the United Arab Emirates, Laos, and Cambodia."
      ],
      structureTitle: "Corporate Structure",
      institutionTitle: "Internal Functional Institutions",
      domesticTitle: "Domestic Enterprises",
      overseasTitle: "Overseas Enterprises",
      departments: [
          "Public Affairs Dept.",
          "Strategy & Development Dept.",
          "Marketing Dept.",
          "Supply Chain Dept.",
          "Production & Operations Dept.",
          "Finance Dept.",
          "Human Resources Dept.",
          "Information & Digitalization Dept.",
          "Compliance & Risk Control Dept.",
          "Supervision Dept."
      ],
      domesticCompanies: [
          "China Tobacco International Inc.",
          "China Tobacco (Shenzhen) Import & Export Co., Ltd."
      ],
      overseasGroups: [
          {
              title: "Listed Enterprises",
              companies: [
                  "China Tobacco International (HK) Company Limited"
              ]
          },
          {
              title: "Tobacco Leaf Enterprises",
              companies: [
                  "Tian Ze Tobacco Company (Private) Limited",
                  "China Tobacco International (North America) Inc.",
                  "China Tabaco Internacional Argentina S.A.",
                  "China Tabaco Internacional Do Brasil Ltda."
              ]
          },
          {
              title: "Manufacturing Enterprises",
              companies: [
                  "Golden Leaf (Macau) Tobacco's Manufacturing Limited",
                  "China Tobacco International Lao Manufacturing Co., Ltd.",
                  "Viniton Group Co., Ltd",
                  "China Tobacco International Europe Company S.R.L."
              ]
          },
          {
              title: "Commercial Enterprises",
              companies: [
                  "China Tobacco International Middle East General Trading FZE",
                  "China Tobacco International Asia Pacific Co., Limited",
                  "CTI EUROPE S. R. L.",
                  "CTI (SCHWEIZ) A.G."
              ]
          },
          {
              title: "Other Enterprises",
              companies: [
                  "CTPM International S.A.",
                  "CTBAT International Co. Limited",
                  "Global Horizon Ventures Limited",
                  "Tulley International Limited"
              ]
          }
      ]
  }
};

const currentContent = computed(() => overviewContent[currentLanguage.value] || overviewContent.zhCN);

onMounted(() => {
  offLanguageListener.value = onLanguageChange((lang) => {
    currentLanguage.value = lang;
  });
});

onBeforeUnmount(() => {
  if (offLanguageListener.value) {
    offLanguageListener.value();
    offLanguageListener.value = null;
  }
});
</script>

<template>
  <Layout>
    <div class="overview-page" :class="`overview-page-${currentLanguage}`">
      <div class="index-page">
        <div class="page-header-sub">
          <img src="../assets/images/banner.png" alt="集团概况页面横幅图片" srcset="" />
        </div>
      </div>

      <main class="overview-wrap">
        <section class="intro-card">
          <div class="intro-title">{{ currentContent.title }}</div>
          <p v-for="paragraph in currentContent.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </section>

        <h2 class="section-title">{{ currentContent.structureTitle }}</h2>

        <section class="org-panel">
          <div class="root-node">{{ currentContent.title }}</div>

          <div class="org-summary">
            <div class="org-card">
              <h3>{{ currentContent.institutionTitle }}</h3>
              <div class="dept-list">
                <div v-for="department in currentContent.departments" :key="department">
                  {{ department }}
                </div>
              </div>
            </div>

            <div class="org-card">
              <h3>{{ currentContent.domesticTitle }}</h3>
              <div
                v-for="company in currentContent.domesticCompanies"
                :key="company"
                class="company-chip"
              >
                {{ company }}
              </div>
            </div>

            <div class="org-card org-card-wide">
              <h3>{{ currentContent.overseasTitle }}</h3>
              <div
                v-for="group in currentContent.overseasGroups"
                :key="group.title"
                class="enterprise-group"
              >
                <div class="enterprise-title">{{ group.title }}</div>
                <ul class="enterprise-list">
                  <li v-for="company in group.companies" :key="company">{{ company }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.overview-page {
  width: 100%;
  color: #333;
  background: #fff;
}

.overview-wrap {
  width: min(1200px, calc(100% - 48px));
  margin: 62px auto 80px;
}

.intro-card {
  margin-bottom: 56px;
  padding: 42px 46px;
  color: #333;
  border-top: 5px solid #F7B334;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);

  .intro-title {
    margin: 0 0 20px;
    color: #222;
    font-size: 31px;
    font-weight: 700;
    line-height: 1.35;
  }

  p {
    margin: 0 0 18px;
    color: #555;
    font-size: 17px;
    line-height: 2.05;
    text-indent: 2em;
  }

  p:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 30px;
  color: #222;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;

  &::before {
    content: '';
    width: 5px;
    height: 28px;
    background: #F7B334;
  }
}

.org-panel {
  padding: 46px 46px 52px;
  border: 1px solid #e8ddc7;
  background: #fff;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
}

.root-node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  min-height: 64px;
  margin: 0 auto;
  color: #222;
  font-size: 19px;
  font-weight: 700;
  text-align: center;
  background: #F7B334;
}

.org-summary {
  display: grid;
  grid-template-columns: 0.92fr 0.98fr 1.55fr;
  gap: 18px;
  margin-top: 46px;
}

.org-card {
  min-height: 356px;
  padding: 26px 28px 28px;
  border: 1px solid #e8ddc7;
  background: rgba(255, 255, 255, 0.76);

  h3 {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 22px;
    color: #222;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;

    &::before {
      content: '';
      width: 4px;
      height: 20px;
      background: #F7B334;
    }
  }
}

.dept-list {
  color: #8a6721;
  font-size: 15px;
  font-weight: 700;
  line-height: 48px;
}

.company-chip {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 48px;
  margin-bottom: 14px;
  color: #8a6721;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }
}

.enterprise-group {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 16px;
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
}

.enterprise-title {
  padding-top: 6px;
  color: #8a6721;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.45;
  border-right: 3px solid #F7B334;
}

.overview-page-en {
  .enterprise-group {
    grid-template-columns: 180px 1fr;
    gap: 18px;
  }

  .enterprise-title {
    font-size: 15px;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .enterprise-list li {
    overflow-wrap: anywhere;
  }
}

.enterprise-list {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 6px 0;
    color: #555;
    font-size: 14px;
    line-height: 1.35;
    border-bottom: 1px solid #eee4d0;
  }
}

@media screen and (max-width: 900px) {
  .overview-wrap {
    width: min(100% - 32px, 1200px);
    margin: 34px auto 60px;
  }

  .intro-card {
    margin-bottom: 34px;
    padding: 28px 22px;

    .intro-title {
      font-size: 24px;
    }

    p {
      font-size: 15px;
      line-height: 1.9;
    }
  }

  .section-title {
    margin-bottom: 22px;
    font-size: 24px;
  }

  .org-panel {
    padding: 28px 20px 32px;
  }

  .root-node {
    width: 100%;
    min-height: 54px;
    padding: 0 14px;
    font-size: 16px;
  }

  .org-summary {
    display: block;
    margin-top: 26px;
  }

  .org-card {
    min-height: 0;
    margin-bottom: 18px;
    padding: 22px 20px;

    h3 {
      margin-bottom: 16px;
      font-size: 20px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .dept-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 14px;
    line-height: 1.45;

    div {
      padding: 8px 0;
      border-bottom: 1px solid #eee4d0;
    }
  }

  .company-chip {
    min-height: 0;
    margin-bottom: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #eee4d0;
  }

  .enterprise-group {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .enterprise-title {
    padding: 0 0 6px;
    border-right: 0;
    border-bottom: 3px solid #F7B334;
  }
}

@media screen and (max-width: 640px) {
  .overview-wrap {
    width: calc(100% - 28px);
    margin-top: 26px;
  }

  .intro-card {
    padding: 22px 18px;
    box-shadow: none;

    .intro-title {
      font-size: 20px;
    }
  }

  .section-title {
    font-size: 20px;
  }

  .org-panel {
    padding: 22px 16px 26px;
    box-shadow: none;
  }

  .org-card {
    padding: 18px 16px;

    h3 {
      font-size: 18px;
    }
  }

  .dept-list {
    grid-template-columns: 1fr;
    font-size: 14px;
  }

  .company-chip,
  .enterprise-title,
  .enterprise-list li {
    font-size: 14px;
  }
}
</style>
