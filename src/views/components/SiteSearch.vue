<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getCurrentLanguage, onLanguageChange } from '@/utils/language.js';

const router = useRouter();
const { locale, messages } = useI18n();

const searchVisible = ref(false);
const searchQuery = ref('');
const searchInputRef = ref(null);
const searchModalRef = ref(null);
const currentLanguage = ref(getCurrentLanguage());
const currentFocusIndex = ref(-1); // 当前焦点索引

const searchModules = computed(() => {
  const modules = [
    { 
      id: 'index', 
      name: messages.value[locale.value]?.message?.t1 || '首页', 
      path: '/index',
      keywords: ['首页', 'home', '主页', '中烟国际', '中烟香港']
    },
    { 
      id: 'overview', 
      name: messages.value[locale.value]?.message?.t2 || '公司概况', 
      path: '/overview',
      keywords: ['公司概况', '集团概况', 'about', '关于我们', '中烟国际集团', '公司介绍']
    },
    { 
      id: 'news', 
      name: messages.value[locale.value]?.message?.t3 || '新闻资讯', 
      path: '/news',
      keywords: ['新闻', '资讯', 'news', '动态', '公告']
    },
    { 
      id: 'MainBusiness', 
      name: messages.value[locale.value]?.message?.t4 || '主营业务', 
      path: '/MainBusiness',
      keywords: ['主营业务', '业务', 'business', '烟叶', '卷烟', '新型烟草']
    },
    { 
      id: 'JoinUs', 
      name: messages.value[locale.value]?.message?.t5 || '人才招聘', 
      path: '/JoinUs',
      keywords: ['招聘', '人才', 'join', 'jobs', 'career', '职位']
    },
    { 
      id: 'ContactInformation', 
      name: messages.value[locale.value]?.message?.t6 || '联系我们', 
      path: '/ContactInformation',
      keywords: ['联系', 'contact', '地址', '电话', '邮箱']
    }
  ];
  
  if (locale.value === 'en') {
    return modules.filter(m => m.id !== 'news');
  }
  return modules;
});

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return [];
  
  const query = searchQuery.value.toLowerCase();
  return searchModules.value.filter(module => {
    const nameMatch = module.name.toLowerCase().includes(query);
    const keywordMatch = module.keywords.some(keyword => 
      keyword.toLowerCase().includes(query)
    );
    return nameMatch || keywordMatch;
  });
});

// 获取所有可聚焦的导航项
const getFocusableItems = () => {
  if (!searchModalRef.value) return [];
  return Array.from(searchModalRef.value.querySelectorAll('.search-result-item, .suggestion-item'));
};

// 设置焦点
const setFocus = (index) => {
  const items = getFocusableItems();
  if (items.length === 0) return;
  
  // 移除所有焦点样式
  items.forEach(item => item.classList.remove('keyboard-focus'));
  
  if (index >= 0 && index < items.length) {
    currentFocusIndex.value = index;
    items[index].classList.add('keyboard-focus');
    items[index].focus();
  }
};

const openSearch = () => {
  searchVisible.value = true;
  currentFocusIndex.value = -1;
  nextTick(() => {
    searchInputRef.value?.focus();
    document.addEventListener('keydown', handleSearchKeydown);
  });
};

const closeSearch = () => {
  searchVisible.value = false;
  searchQuery.value = '';
  currentFocusIndex.value = -1;
  document.removeEventListener('keydown', handleSearchKeydown);
};

const navigateTo = (path) => {
  router.push(path);
  closeSearch();
};

// 搜索弹窗键盘事件处理
const handleSearchKeydown = (e) => {
  if (!searchVisible.value) return;
  
  // ESC 关闭
  if (e.key === 'Escape') {
    closeSearch();
    return;
  }
  
  const items = getFocusableItems();
  if (items.length === 0) return;
  
  // Tab 和方向键导航
  if (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
    
    let nextIndex;
    if (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = currentFocusIndex.value === -1 ? 0 : (currentFocusIndex.value + 1) % items.length;
    } else {
      nextIndex = currentFocusIndex.value <= 0 ? items.length - 1 : currentFocusIndex.value - 1;
    }
    
    setFocus(nextIndex);
    return;
  }
  
  // Enter 键触发点击
  if (e.key === 'Enter') {
    e.preventDefault();
    const items = getFocusableItems();
    if (currentFocusIndex.value >= 0 && currentFocusIndex.value < items.length) {
      items[currentFocusIndex.value].click();
    }
    return;
  }
};

let offLanguageListener = null;

onMounted(() => {
  offLanguageListener = onLanguageChange((lang) => {
    currentLanguage.value = lang;
  });
});

onBeforeUnmount(() => {
  if (offLanguageListener) {
    offLanguageListener();
  }
  document.removeEventListener('keydown', handleSearchKeydown);
});

defineExpose({
  openSearch
});
</script>

<template>
  <Teleport to="body">
    <Transition name="search-fade">
      <div v-if="searchVisible" class="search-overlay" @click.self="closeSearch">
        <div ref="searchModalRef" class="search-modal">
          <div class="search-header">
            <div class="search-input-wrapper">
              <i class="fa fa-search search-icon"></i>
              <input
                ref="searchInputRef"
                v-model="searchQuery"
                type="text"
                class="search-input"
                :placeholder="currentLanguage === 'en' ? 'Search site...' : '搜索站点...'"
                @click.stop
              />
              <button class="search-close" @click="closeSearch" tabindex="0">
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>
          
          <div class="search-content">
            <div v-if="searchQuery && searchResults.length > 0" class="search-results">
              <div 
                v-for="result in searchResults" 
                :key="result.id"
                class="search-result-item"
                tabindex="0"
                @click="navigateTo(result.path)"
              >
                <i class="fa fa-link result-icon"></i>
                <span class="result-name">{{ result.name }}</span>
                <i class="fa fa-arrow-right result-arrow"></i>
              </div>
            </div>
            
            <div v-else-if="searchQuery && searchResults.length === 0" class="search-empty">
              <i class="fa fa-search"></i>
              <p>{{ currentLanguage === 'en' ? 'No results found' : '未找到相关结果' }}</p>
            </div>
            
            <div v-else class="search-suggestions">
              <div class="suggestion-title">
                {{ currentLanguage === 'en' ? 'Quick Navigation' : '快速导航' }}
              </div>
              <div class="suggestion-list">
                <div 
                  v-for="module in searchModules" 
                  :key="module.id"
                  class="suggestion-item"
                  tabindex="0"
                  @click="navigateTo(module.path)"
                >
                  <i class="fa fa-link"></i>
                  <span>{{ module.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  z-index: 99999;
}

.search-modal {
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.search-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
}

.search-icon {
  color: #999;
  font-size: 1.2rem;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  outline: none;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.search-close {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  transition: color 0.2s;
}

.search-close:hover {
  color: #F7B334;
}

.search-content {
  max-height: 400px;
  overflow-y: auto;
}

.search-results {
  padding: 0.5rem 0;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.search-result-item:hover,
.search-result-item.keyboard-focus {
  background: #f9f9f9;
}

.search-result-item.keyboard-focus {
  outline: 2px solid #F7B334;
  outline-offset: -2px;
}

.result-icon {
  color: #F7B334;
  font-size: 0.9rem;
}

.result-name {
  flex: 1;
  font-size: 1rem;
  color: #333;
}

.result-arrow {
  color: #ccc;
  font-size: 0.8rem;
}

.search-empty {
  padding: 3rem;
  text-align: center;
  color: #999;
}

.search-empty i {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.search-suggestions {
  padding: 1.5rem;
}

.suggestion-title {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.suggestion-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  color: #333;
}

.suggestion-item:hover,
.suggestion-item.keyboard-focus {
  background: #F7B334;
  color: white;
}

.suggestion-item.keyboard-focus {
  outline: 2px solid #d99a2a;
  outline-offset: -2px;
}

.suggestion-item i {
  font-size: 0.85rem;
  color: #F7B334;
}

.suggestion-item:hover i,
.suggestion-item.keyboard-focus i {
  color: white;
}

@media screen and (max-width: 767px) {
  .search-modal {
    width: 95%;
    margin: 0 1rem;
  }
  
  .suggestion-list {
    grid-template-columns: 1fr;
  }
}

.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.3s ease;
}

.search-fade-enter-active .search-modal,
.search-fade-leave-active .search-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
}

.search-fade-enter-from .search-modal,
.search-fade-leave-to .search-modal {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
