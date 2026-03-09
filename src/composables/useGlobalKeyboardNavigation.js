import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 * 全局键盘导航组合式函数
 * 支持整个页面的键盘导航，包括菜单、链接、按钮等
 * 上下键：垂直导航
 * 左右键：水平导航
 */
export function useGlobalKeyboardNavigation() {
  const router = useRouter();
  const route = useRoute();
  const focusedElement = ref(null);
  const lastFocusedElement = ref(null);
  const lastFocusedSelector = ref('');
  
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[data-nav-item]',
    '[tabindex]:not([tabindex="-1"])',
    '.router-link-active',
    '.changeItem',
    '.guide-btn',
    '.guide-link',
    '.font-a-btn',
    '.search-icon-btn',
    '.footerContainer > div:nth-child(odd)',
    'img[alt]:not([alt=""])',
    '.swiper-slide-item[role="img"]',
    '.joinContentItem',
    '.news-item',
    '.back',
    '.quickBtn'
  ].join(', ');

  // 获取所有可聚焦元素
  const getFocusableElements = () => {
    const elements = Array.from(document.querySelectorAll(focusableSelectors))
      .filter(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.display !== 'none' && 
               style.visibility !== 'hidden' &&
               rect.width > 0 && 
               rect.height > 0;
      });
    
    return elements;
  };

  // 设置焦点
  const setFocus = (element, saveSelector = true) => {
    if (!element) return;
    
    document.querySelectorAll('.keyboard-focus').forEach(el => {
      el.classList.remove('keyboard-focus');
    });

    // 确保元素有 tabindex
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }

    element.classList.add('keyboard-focus');
    
    // 强制设置焦点
    try {
      element.focus({ preventScroll: true });
    } catch (e) {
      // 某些元素可能不支持 focus
    }
    
    focusedElement.value = element;
    lastFocusedElement.value = element;
    
    if (saveSelector) {
      lastFocusedSelector.value = getElementSelector(element);
    }
    
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  // 获取元素的选择器
  const getElementSelector = (el) => {
    if (!el) return '';
    
    if (el.dataset.navItem !== undefined) {
      return `[data-nav-item]`;
    }
    
    if (el.classList.contains('changeItem')) {
      return '.changeItem';
    }
    if (el.classList.contains('guide-link')) {
      return '.guide-link';
    }
    if (el.classList.contains('news-item')) {
      return '.news-item';
    }
    if (el.classList.contains('joinContentItem')) {
      return '.joinContentItem';
    }
    
    if (el.classList.contains('router-link-active') || el.tagName === 'A') {
      const href = el.getAttribute('href');
      if (href) {
        return `a[href="${href}"]`;
      }
    }
    
    return '';
  };

  // 根据选择器恢复焦点
  const restoreFocus = () => {
    if (!lastFocusedSelector.value) return;
    
    const elements = document.querySelectorAll(lastFocusedSelector.value);
    if (elements.length > 0) {
      for (const el of elements) {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (style.display !== 'none' && 
            style.visibility !== 'hidden' &&
            rect.width > 0 && 
            rect.height > 0) {
          setFocus(el, false);
          return;
        }
      }
    }
  };

  // 找到当前焦点在元素列表中的位置
  const findCurrentIndex = (elements) => {
    if (!focusedElement.value) return -1;
    
    let index = elements.indexOf(focusedElement.value);
    if (index !== -1) return index;
    
    if (lastFocusedElement.value) {
      index = elements.indexOf(lastFocusedElement.value);
      if (index !== -1) return index;
    }
    
    const activeElement = document.activeElement;
    if (activeElement && activeElement !== document.body) {
      index = elements.indexOf(activeElement);
      if (index !== -1) return index;
    }
    
    return -1;
  };

  // 根据方向找到下一个元素
  const findNextElementByDirection = (elements, direction) => {
    if (!focusedElement.value) {
      // 如果没有当前焦点，返回视口内第一个可见元素
      const viewportHeight = window.innerHeight;
      for (let i = 0; i < elements.length; i++) {
        const rect = elements[i].getBoundingClientRect();
        if (rect.top >= 0 && rect.top < viewportHeight) {
          return elements[i];
        }
      }
      return elements[0] || null;
    }

    const currentRect = focusedElement.value.getBoundingClientRect();
    const currentCenterX = currentRect.left + currentRect.width / 2;
    const currentCenterY = currentRect.top + currentRect.height / 2;
    
    let bestCandidate = null;
    let bestDistance = Infinity;
    
    for (const el of elements) {
      if (el === focusedElement.value) continue;
      
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      let isValidDirection = false;
      let distance = Infinity;
      
      switch (direction) {
        case 'down':
          // 元素在当前元素下方
          if (centerY > currentCenterY + 10) {
            isValidDirection = true;
            // 优先考虑水平距离近的，然后考虑垂直距离
            distance = Math.abs(centerX - currentCenterX) * 0.5 + (centerY - currentCenterY);
          }
          break;
        case 'up':
          // 元素在当前元素上方
          if (centerY < currentCenterY - 10) {
            isValidDirection = true;
            distance = Math.abs(centerX - currentCenterX) * 0.5 + (currentCenterY - centerY);
          }
          break;
        case 'right':
          // 元素在当前元素右侧
          if (centerX > currentCenterX + 10) {
            isValidDirection = true;
            distance = Math.abs(centerY - currentCenterY) * 0.5 + (centerX - currentCenterX);
          }
          break;
        case 'left':
          // 元素在当前元素左侧
          if (centerX < currentCenterX - 10) {
            isValidDirection = true;
            distance = Math.abs(centerY - currentCenterY) * 0.5 + (currentCenterX - centerX);
          }
          break;
      }
      
      if (isValidDirection && distance < bestDistance) {
        bestDistance = distance;
        bestCandidate = el;
      }
    }
    
    // 如果在指定方向没找到，尝试回退到简单的顺序导航
    if (!bestCandidate) {
      const currentIndex = elements.indexOf(focusedElement.value);
      if (currentIndex !== -1) {
        if (direction === 'down' || direction === 'right') {
          bestCandidate = elements[(currentIndex + 1) % elements.length];
        } else {
          bestCandidate = elements[currentIndex <= 0 ? elements.length - 1 : currentIndex - 1];
        }
      }
    }
    
    return bestCandidate;
  };

  // 处理键盘事件
  const handleKeydown = (e) => {
    // 如果年龄声明弹窗打开，不处理全局导航
    const ageModal = document.querySelector('.age-modal');
    if (ageModal) return;
    
    // 如果搜索弹窗打开，不处理全局导航
    const searchOverlay = document.querySelector('.search-overlay');
    if (searchOverlay) return;
    
    // 如果用户指南弹窗打开，不处理全局导航
    const guidePopup = document.querySelector('.quick-nav-popup');
    if (guidePopup) return;
    
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
      if (e.key !== 'Escape') return;
    }

    const key = e.key;
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    // Tab 键导航
    if (key === 'Tab') {
      e.preventDefault();
      const currentIndex = findCurrentIndex(elements);
      let nextIndex;
      
      if (currentIndex === -1) {
        // 找视口内第一个元素
        const viewportHeight = window.innerHeight;
        nextIndex = 0;
        for (let i = 0; i < elements.length; i++) {
          const rect = elements[i].getBoundingClientRect();
          if (rect.top >= 0 && rect.top < viewportHeight) {
            nextIndex = i;
            break;
          }
        }
      } else {
        nextIndex = e.shiftKey 
          ? (currentIndex <= 0 ? elements.length - 1 : currentIndex - 1)
          : (currentIndex + 1) % elements.length;
      }
      
      setFocus(elements[nextIndex]);
      return;
    }

    // 方向键导航
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(key)) {
      e.preventDefault();

      let direction;
      switch (key) {
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
      }

      const nextElement = findNextElementByDirection(elements, direction);
      if (nextElement) {
        setFocus(nextElement);
      }
      return;
    }

    // Enter 键触发点击
    if (key === 'Enter' && focusedElement.value) {
      e.preventDefault();
      focusedElement.value.click();
      return;
    }

    // ESC 键清除焦点
    if (key === 'Escape') {
      document.querySelectorAll('.keyboard-focus').forEach(el => {
        el.classList.remove('keyboard-focus');
      });
      focusedElement.value = null;
      document.activeElement.blur();
    }
  };

  // 处理鼠标点击
  const handleClick = (e) => {
    const clickedElement = e.target.closest(focusableSelectors);
    if (clickedElement) {
      document.querySelectorAll('.keyboard-focus').forEach(el => {
        el.classList.remove('keyboard-focus');
      });
      clickedElement.classList.add('keyboard-focus');
      focusedElement.value = clickedElement;
      lastFocusedElement.value = clickedElement;
      lastFocusedSelector.value = getElementSelector(clickedElement);
    }
  };

  // 监听路由变化，恢复焦点
  watch(() => route.path, (newPath, oldPath) => {
    setTimeout(() => {
      restoreFocus();
    }, 100);
  });

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClick);
  });

  return {
    focusedElement,
    setFocus,
    getFocusableElements,
    restoreFocus
  };
}

export default useGlobalKeyboardNavigation;
