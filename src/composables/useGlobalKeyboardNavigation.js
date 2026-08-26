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
    '[data-skip-target="true"]',
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
    
    return elements.sort((a, b) => {
      const aIsSkipLink = a.classList.contains('skip-content-link');
      const bIsSkipLink = b.classList.contains('skip-content-link');
      if (aIsSkipLink !== bIsSkipLink) return aIsSkipLink ? -1 : 1;
      return 0;
    });
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
    if (el.dataset.skipTarget === 'true') {
      return '[data-skip-target="true"]';
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

  // 判断某个元素是否属于 header 区域(即导航/语言/标志/logo)
  const isHeaderElement = (el) => {
    if (!el) return false;
    if (el.classList.contains('skip-content-link')) return true;
    const inHeader = el.closest('.headerContainer, .header-top, .changeLL, .changeL, .nav, .navigation, .logo-wrap, .site-header, [class*="header"], .myNavigation, .myNav');
    return Boolean(inHeader);
  };

  const findNextElementAfterSkipTarget = (elements, skipTarget, shiftKey = false) => {
    if (!skipTarget) return null;

    // Step 1: 先找 skip target 自己内部的 focusable 子元素(优先)
    if (!shiftKey) {
      const innerCandidates = Array.from(skipTarget.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [data-nav-item], [tabindex]:not([tabindex="-1"]), .changeItem, .guide-btn, .guide-link, .font-a-btn, .search-icon-btn, img[alt]:not([alt=""]), .swiper-slide-item[role="img"], .joinContentItem, .news-item, .back, .quickBtn, [data-nav-item]'
      )).filter(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      });
      if (innerCandidates.length > 0) {
        return innerCandidates[0];
      }
    }

    // Step 2: 按文档位置(不在 header 区)来找 skip target **之后/之前**的第一个非 header 元素
    // 不依赖 elements 数组的顺序，直接走 DOM 比较位置。这样即使 elements 数组里 header 在前也不会被误选。
    const skipLink = document.querySelector('.skip-content-link');
    const header = document.querySelector('.headerContainer');

    const directionFlag = shiftKey
      ? Node.DOCUMENT_POSITION_PRECEDING
      : Node.DOCUMENT_POSITION_FOLLOWING;

    // 构建候选集：所有文档中可聚焦可见元素（不用 elements 数组，直接重新收集全量，保证位置比较真实）
    const allFocusable = Array.from(document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [data-nav-item], [tabindex]:not([tabindex="-1"]), .changeItem, .guide-btn, .guide-link, .font-a-btn, .search-icon-btn, img[alt]:not([alt=""]), .swiper-slide-item[role="img"], .joinContentItem, .news-item, .back, .quickBtn, [data-skip-target="true"]'
    )).filter(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    });

    // 排序：按文档流顺序（skip-link 仍排在最前用于全局顺序，但此处不用）
    allFocusable.sort((a, b) => {
      const pos = a.compareDocumentPosition(b);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });

    // 找 skip target 在全量里的索引
    const skipIdx = allFocusable.indexOf(skipTarget);

    if (!shiftKey) {
      // 正向：从 skipIdx+1 开始找第一个不在 header 区 && 不在 skip-link 附近 的元素
      // 并且必须是在 skipTarget 的 FOLLOWING 方向（文档后）
      for (let i = skipIdx + 1; i < allFocusable.length; i++) {
        const candidate = allFocusable[i];
        if (candidate === skipTarget) continue;
        if (candidate === skipLink) continue;
        // 如果 candidate 文档位置还在 header 内（比 header 容器还早），跳过
        if (header && header.contains(candidate)) continue;
        if (isHeaderElement(candidate)) continue;
        // 必须在 skipTarget 文档之后
        const pos = skipTarget.compareDocumentPosition(candidate);
        if (!(pos & Node.DOCUMENT_POSITION_FOLLOWING) && !(skipTarget.contains(candidate))) {
          // candidate 不是后代也不在后面，跳过（可能出现 target 在 DOM 末尾、candidate 是前面 header 元素残留的情况）
          continue;
        }
        return candidate;
      }
    } else {
      // 反向：Shift+Tab 从 skip target 往回走
      for (let i = skipIdx - 1; i >= 0; i--) {
        const candidate = allFocusable[i];
        if (candidate === skipTarget) continue;
        if (candidate === skipLink) continue;
        if (header && header.contains(candidate)) continue;
        if (isHeaderElement(candidate)) continue;
        const pos = skipTarget.compareDocumentPosition(candidate);
        if (!(pos & Node.DOCUMENT_POSITION_PRECEDING)) continue;
        return candidate;
      }
    }

    // Step 3: 如果上面按"非header区"的严格规则没找到，退而求其次：按文档位置找 skipTarget 之后的第一个元素（不排除 header，但 skip-link 除外）
    const ordered = shiftKey ? [...allFocusable].reverse() : allFocusable;
    const fallback = ordered.find(el => {
      if (el === skipTarget) return false;
      if (el.classList.contains('skip-content-link')) return false;
      const position = skipTarget.compareDocumentPosition(el);
      return Boolean(position & directionFlag);
    });

    return fallback || null;
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
      const activeSkipTarget = document.activeElement?.dataset?.skipTarget === 'true'
        ? document.activeElement
        : focusedElement.value?.dataset?.skipTarget === 'true'
          ? focusedElement.value
          : null;

      if (activeSkipTarget) {
        const nextElement = findNextElementAfterSkipTarget(elements, activeSkipTarget, e.shiftKey);
        if (nextElement) {
          setFocus(nextElement);
          return;
        }
      }

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
      // Skip to Content 按钮:由组件内 @keydown.enter.prevent 专门处理，全局不再重复 click，
      // 避免同步 click 事件把 focusedElement 重新设成按钮，覆盖 skipToMainContent 中的异步焦点转移
      if (focusedElement.value.classList && focusedElement.value.classList.contains('skip-content-link')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
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

  const handleSkipContentFocused = (e) => {
    const target = e.detail?.target;
    if (!target) return;

    document.querySelectorAll('.keyboard-focus').forEach(el => {
      el.classList.remove('keyboard-focus');
    });

    target.classList.add('keyboard-focus');
    focusedElement.value = target;
    lastFocusedElement.value = target;
    lastFocusedSelector.value = '[data-skip-target="true"]';
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
    window.addEventListener('skipContentFocused', handleSkipContentFocused);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClick);
    window.removeEventListener('skipContentFocused', handleSkipContentFocused);
  });

  return {
    focusedElement,
    setFocus,
    getFocusableElements,
    restoreFocus
  };
}

export default useGlobalKeyboardNavigation;
