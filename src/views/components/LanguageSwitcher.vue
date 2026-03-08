<template>
  <div>
    <div class="changeLL">
      <div class="changeItem" :class="{ active: currentLang === 'zhCN' }" @click="changeLanguage('zhCN')">
        <span v-if="currentLang === 'zhCN'" class="triangle">▶</span>
        <span class="text">简体版</span>
      </div>
      <div class="changeItem" :class="{ active: currentLang === 'zhTW' }" @click="changeLanguage('zhTW')">
        <span v-if="currentLang === 'zhTW'" class="triangle">▶</span>
        <span class="text">繁體版</span>
      </div>
      <div class="changeItem" :class="{ active: currentLang === 'en' }" @click="changeLanguage('en')">
        <span v-if="currentLang === 'en'" class="triangle">▶</span>
        <span class="text">English</span>
      </div>
      <myNavigation></myNavigation>
    </div>
    <div ref="changeL" class="changeL">
      <el-dropdown
trigger="click" placement="bottom-end" :hide-on-click="true" :max-height="200"
        popper-class="lang-dropdown-popper" @command="handleCommand">
        <img src="../../assets/images/net.png" alt="语言切换按钮" style="width: 100%;height: 100%; cursor: pointer;">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="en" :class="{ active: currentLang === 'en' }">EN</el-dropdown-item>
            <el-dropdown-item command="zhCN" :class="{ active: currentLang === 'zhCN' }">简体中文</el-dropdown-item>
            <el-dropdown-item command="zhTW" :class="{ active: currentLang === 'zhTW' }">繁体中文</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import myNavigation from "./myNavigation.vue";
const { locale } = useI18n();
import { useRouter } from 'vue-router';
const router = useRouter();

// 当前选中的语言 
const currentLang = ref('zhCN');

const changeLanguage = (lang) => {
  currentLang.value = lang;
  locale.value = lang;
  // 把当前语言存储到localStorage
  localStorage.setItem('language', lang);
  // 触发自定义事件，通知其他组件语言已更改
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  // 如果当前的语言是英语，把.nav字体改成Helvetica, Arial, sans-serif
  if (lang === 'en') {
    const path = router.currentRoute.value.path; // 或 fullPath
    if (path.startsWith('/newsDetail') || path.startsWith('/news')) {
      router.replace({ path: '/index', query: {} });
    } else {
      router.replace({ path: router.currentRoute.value.fullPath, query: {} });

    }
  } else {
    router.replace({ path: router.currentRoute.value.fullPath, query: {} });
  }
  const navElement = document.querySelector('.nav');
  if (navElement) {
    if (lang === 'en') {
      navElement.style.fontFamily = 'Helvetica, Arial, sans-serif';

    } else {
      navElement.style.fontFamily = "'Source Han Sans CN', 'Source Han Sans SC', 'Noto Sans CJK SC', 'Noto Sans SC', 'SimHei', 'Microsoft YaHei', 'Heiti SC', 'PingFang SC', 'WenQuanYi Micro Hei', 'Helvetica Neue', Helvetica, Arial, sans-serif";
    }
  }
};
const changeL = ref(null);

// 监听页面宽度
const screenWidth = ref(window.innerWidth);  // 初始化屏幕宽度

// 响应式处理函数
const handleResize = () => {
  screenWidth.value = window.innerWidth;

  // 当页面宽度小于768时，隐藏类名是changeItem的div
  if (screenWidth.value < 769) {
    // 获取类名是changeItem的全部div
    document.querySelectorAll('.changeItem').forEach(item => {
      item.style.display = 'none'
    });
    document.querySelector('.changeLL').style.display = 'none';

    // 安全检查changeL.value是否存在
    if (changeL.value) {
      changeL.value.style.display = 'block'
    } else {
      console.warn('changeL元素未找到');
    }
  } else {
    // 安全检查changeL.value是否存在
    if (changeL.value) {
      changeL.value.style.display = 'none';
    }
    document.querySelectorAll('.changeItem').forEach(item => {
      item.style.display = 'block'
    });
  }
};

// 使用addEventListener而不是直接赋值
const resizeListener = () => {
  handleResize();
};

const handleCommand = (command) => {
  changeLanguage(command);
}
onMounted(() => {
  // 从 localStorage 读取保存的语言设置
  const savedLanguage = localStorage.getItem('language') || 'zhCN';
  currentLang.value = savedLanguage;
  locale.value = savedLanguage;
  // 如果当前的语言是英语，把.nav字体改成Helvetica, Arial, sans-serif
  const navElement = document.querySelector('.nav');
  if (navElement) {
    if (savedLanguage === 'en') {
      navElement.style.fontFamily = 'Helvetica, Arial, sans-serif';
    } else {
      navElement.style.fontFamily = "'Source Han Sans CN', 'Source Han Sans SC', 'Noto Sans CJK SC', 'Noto Sans SC', 'SimHei', 'Microsoft YaHei', 'Heiti SC', 'PingFang SC', 'WenQuanYi Micro Hei', 'Helvetica Neue', Helvetica, Arial, sans-serif";
    }
  }
  // 延迟执行响应式处理，避免与dropdown初始化冲突
  // setTimeout(() => {
  // 添加resize监听器
  window.addEventListener('resize', resizeListener);

  // 初始化响应式处理
  handleResize();
  // }, 100);
});

// 组件卸载时清理事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeListener);
});

</script>
<style scoped>
.changeL {
  width: 4rem;
  height: 4rem;
}

/* dropdown菜单样式 */
:deep(.el-dropdown-menu) {
  min-width: 120px !important;

  .el-dropdown-menu__item {
    padding: 8px 16px;

    &.active {
      color: #F7B334;
      background-color: #fff7e6;
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

/* Ensure the dropdown popper sits above any fixed-position elements on the page */
:deep(.lang-dropdown-popper) {
  z-index: 99999 !important;
}

.changeItem {
  cursor: pointer;
  color: #999;
  font-size: 1.2rem;
  line-height: 2.8rem;
}

.changeItem.active {
  color: #F7B334;
}

/* 橘色三角形样式 */
.triangle {
  color: #F7B334;
  font-size: 0.9rem;
  display: inline-block;
  /* animation: slideIn 0.3s ease-in-out; */
  margin-right: 5px
}

/* 三角形出现动画 */
/* @keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
} */

/* 文字部分 */
.text {
  display: inline-block;
  text-align: center;
  /* transition: all 0.3s ease; */
}

.changeLL {
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>

<!-- Global style for popper (must be non-scoped so it affects elements appended to <body>) -->
<style>
.lang-dropdown-popper {
  z-index: 99999 !important;
}
</style>