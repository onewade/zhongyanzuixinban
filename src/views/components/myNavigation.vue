<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const showNav = ref(false);
const router = useRouter();
const navBtnRef = ref(null);
const navPopupRef = ref(null);

// 分组导航项
const consumerNav = [
  { label: '集团概况', path: '/solution' },
  { label: '联系方式', path: '/ContactInformation' },
];
const partnerNav = [
  { label: '主营业务', path: '/MainBusiness' },
  { label: '人才招聘', path: '/JoinUs' },
];

const toggleNav = () => {
  showNav.value = !showNav.value;
  if (showNav.value) {
    nextTick(() => {
      document.addEventListener('click', handleClickOutside);
    });
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
};

const handleNav = (path) => {
  router.push(path);
  showNav.value = false;
  document.removeEventListener('click', handleClickOutside);
};
// 导航到指定页面
const navigateTo = (path) => {
  router.push(path);
};

const handleClickOutside = (e) => {
  if (
    navBtnRef.value && navBtnRef.value.contains(e.target)
    || (navPopupRef.value && navPopupRef.value.contains(e.target))
  ) {
    return;
  }
  showNav.value = false;
  document.removeEventListener('click', handleClickOutside);
};
</script>

<template>
  <div class="quick-nav-btn" ref="navBtnRef">
    <div class="quickBtn" size="" @click="toggleNav">
      <div class="guide-btn" @click="showGuide">
          使用指南
        </div>
    </div>
    <transition name="fade">
      <div v-if="showNav" class="quick-nav-popup" ref="navPopupRef">
         <div class="guide-body">
            <div class="guide-section">
              <h4>消费者</h4>
              <div class="guide-links">
                <div class="guide-link" @click="navigateTo('/solution')">集团概况</div>
                <div class="guide-link" @click="navigateTo('/ContactInformation')">联系方式</div>
              </div>
            </div>
            <div class="guide-section">
              <h4>合作者</h4>
              <div class="guide-links">
                <div class="guide-link" @click="navigateTo('/MainBusiness')">主营业务</div>
                <div class="guide-link" @click="navigateTo('/JoinUs')">人才招聘</div>
              </div>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.quick-nav-btn {
  position: relative;
  display: inline-block;
  z-index: 2000;
  cursor: pointer;
}

.quick-nav-popup {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  min-width: 22rem;
  background: #fff;
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.12);
  border-radius: 0.6rem;
  padding: 1.5rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  /* animation: popupIn 0.18s; */
  margin-top: 0.7rem;
}

@keyframes popupIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.quick-nav-group {
  padding: 0 2rem 0 2rem;
  margin-bottom: 1.5rem;
}

.quick-nav-group-title {
  font-weight: bold;
  font-size: 1.08rem;
  color: #F7B334;
  margin: 1.5rem 0 0.7rem 0;
  letter-spacing: 1px;
}

.quick-nav-items-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1.8rem;
  margin-bottom: 0.4rem;
}

.quick-nav-item {
  font-size: 1.02rem;
  color: #888;
  cursor: pointer;
  padding: 0.3rem 0;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;
}

.quick-nav-item:hover {
  color: #F7B334;
  border-radius: 4px;
}

.quick-nav-group:not(:last-child) {
  border-bottom: 1px solid #ececec;
  padding-bottom: 0.7rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.quickBtn {
  /* display: flex;
  font-size: 1rem;
  color: #777777;
  border: 1px solid #F7B334;
  padding: 0.2rem 0.7rem;
  border-radius: 0.4rem;
  line-height: 2rem;
  >img{
    width: 2rem;
    height: 2rem;
  } */
}
/* 使用指南按钮样式 */
.guide-btn {
  cursor: pointer;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1.6rem;
  background: linear-gradient(135deg, #F7B334 0%, #E6A429 100%);
  border: none;
  border-radius: 25px;
  box-shadow: 0 3px 12px rgba(247, 179, 52, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10001;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.5px;
}

.guide-btn::before {
  content: '📖';
  font-size: 1rem;
}

.guide-btn:hover {
  background: linear-gradient(135deg, #E6A429 0%, #D4941F 100%);
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1.6rem rgba(247, 179, 52, 0.4);
}

.guide-btn:active {
  transform: translateY(0);
  box-shadow: 0 0.15rem 0.5rem rgba(247, 179, 52, 0.3);
}
.guide-body {
  padding: 1.5rem;
  background: linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%);
}

.guide-section {
  margin-bottom: 1.5rem;
}

.guide-section:last-child {
  margin-bottom: 0;
}

.guide-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.1rem solid #F7B334;
}

.guide-section:first-child h4::before {
  content: '👤';
  font-size: 1.1rem;
}

.guide-section:last-child h4::before {
  content: '🤝';
  font-size: 1.1rem;
}

.guide-links {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.guide-link {
  cursor: pointer;
  color: #495057;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.8rem 1.1rem;
  border: 2px solid #e9ecef;
  border-radius: 1rem;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.guide-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(247, 179, 52, 0.1), transparent);
  transition: left 0.5s;
}

.guide-link:hover {
  background: linear-gradient(135deg, #F7B334 0%, #E6A429 100%);
  color: white;
  border-color: #F7B334;
  transform: translateY(-2px);
  box-shadow: 0 0.3rem 0.8rem rgba(247, 179, 52, 0.3);
}

.guide-link:hover::before {
  left: 100%;
}

.guide-link:active {
  transform: translateY(0);
}

</style>