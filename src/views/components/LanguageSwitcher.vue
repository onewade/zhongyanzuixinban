<template>
  <div>
    <div class="changeLL">
      <div class="changeItem" :class="{ active: currentLang === 'zhCN' }" @click="changeLanguage('zhCN')">
        <span class="triangle" v-if="currentLang === 'zhCN'">▶</span>
        <span class="text">简体版</span>
      </div>
      <div class="changeItem" :class="{ active: currentLang === 'zhTW' }" @click="changeLanguage('zhTW')">
        <span class="triangle" v-if="currentLang === 'zhTW'">▶</span>
        <span class="text">繁體版</span>
      </div>
      <div class="changeItem" :class="{ active: currentLang === 'en' }" @click="changeLanguage('en')">
        <span class="triangle" v-if="currentLang === 'en'">▶</span>
        <span class="text">English</span>
      </div>
    </div>
    <div class="changeL" ref="changeL">
      <el-dropdown @command="handleCommand">
        <img src="../../assets/images/newIndex/changeL.png" alt="" style="width: 100%;height: 100%;">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="en">EN</el-dropdown-item>
            <el-dropdown-item command="zhCN">简体中文</el-dropdown-item>
            <el-dropdown-item command="zhTW">繁体中文</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
const { locale } = useI18n();

// 当前选中的语言
const currentLang = ref('zhCN');

const changeLanguage = (lang) => {
  currentLang.value = lang;
  locale.value = lang;
  // 把当前语言存储到localStorage
  localStorage.setItem('language', lang);
  // 触发自定义事件，通知其他组件语言已更改
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  
  console.log(`语言已切换为: ${lang}`);
  // 如果当前的语言是英语，把.nav字体改成Helvetica, Arial, sans-serif
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
window.onresize = () => {
  screenWidth.value = window.innerWidth;
  console.log(screenWidth.value);

  // 当页面宽度小于768时，隐藏类名是changeItem的div
  if (screenWidth.value < 768) {
    // 获取类名是changeItem的全部div
    document.querySelectorAll('.changeItem').forEach(item => {
      item.style.display = 'none'
    });
    changeL.value.style.display = 'block'
  } else {
    changeL.value.style.display = 'none';
    document.querySelectorAll('.changeItem').forEach(item => {
      item.style.display = 'block'
    });
    // document.querySelector('.el-button').style.display = 'block';
  }
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
  console.log(`初始化语言: ${savedLanguage}`);

  // 响应式处理
  if (screenWidth.value < 768) {
    document.querySelectorAll('.changeItem').forEach(item => {
      item.style.display = 'none';
    });
    changeL.value.style.display = 'block';
  } else {
    changeL.value.style.display = 'none';
    document.querySelectorAll('.changeItem').forEach(item => {
      item.style.display = 'block';
    });
  }
});

</script>
<style scoped>
.changeL {
  width: 30px;
  height: 30px;
  position: fixed;
  right: 2px;
  top: 50%;
}

.changeItem {
  cursor: pointer;
  color:#999;
  font-size:1.2rem;
}

.changeItem.active {
  color: #F7B334;
}

/* 橘色三角形样式 */
.triangle {
  color: #F7B334;
  font-size: 12px;
  display: inline-block;
  /* animation: slideIn 0.3s ease-in-out; */
  margin-right:5px
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