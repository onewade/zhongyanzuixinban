import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

/**
 * 键盘导航组合式函数
 * 支持 Tab 键、方向键（上下左右）导航，Enter 键进入详情
 */
export function useKeyboardNavigation(options = {}) {
  const {
    containerRef = null,
    itemSelector = '[data-nav-item]',
    activeClass = 'keyboard-focus',
    onSelect = null,
    onEnter = null,
    enableTab = true,
    enableArrow = true,
  } = options;

  const router = useRouter();
  const focusedIndex = ref(-1);
  const navItems = ref([]);
  const isKeyboardMode = ref(false);

  // 获取所有导航项
  const updateNavItems = () => {
    if (!containerRef?.value) return;
    navItems.value = Array.from(containerRef.value.querySelectorAll(itemSelector));
  };

  // 设置焦点
  const setFocus = (index) => {
    if (navItems.value.length === 0) return;
    
    // 移除之前的焦点
    navItems.value.forEach((item, i) => {
      item.classList.remove(activeClass);
      item.setAttribute('tabindex', i === index ? '0' : '-1');
    });

    // 设置新的焦点
    if (index >= 0 && index < navItems.value.length) {
      focusedIndex.value = index;
      const item = navItems.value[index];
      item.classList.add(activeClass);
      item.focus();
      
      // 滚动到可视区域
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      if (onSelect) {
        onSelect(item, index);
      }
    }
  };

  // 移动到下一个
  const focusNext = () => {
    const nextIndex = (focusedIndex.value + 1) % navItems.value.length;
    setFocus(nextIndex);
  };

  // 移动到上一个
  const focusPrev = () => {
    const prevIndex = focusedIndex.value <= 0 
      ? navItems.value.length - 1 
      : focusedIndex.value - 1;
    setFocus(prevIndex);
  };

  // 处理键盘事件
  const handleKeydown = (e) => {
    // 如果正在输入框中，不处理导航
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      return;
    }

    const key = e.key;

    // Tab 键导航
    if (enableTab && key === 'Tab') {
      isKeyboardMode.value = true;
      updateNavItems();
      
      if (navItems.value.length === 0) return;

      e.preventDefault();
      
      if (e.shiftKey) {
        focusPrev();
      } else {
        focusNext();
      }
      return;
    }

    // 方向键导航
    if (enableArrow && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      isKeyboardMode.value = true;
      updateNavItems();
      
      if (navItems.value.length === 0) return;

      e.preventDefault();

      // 如果还没有焦点，从第一个开始
      if (focusedIndex.value === -1) {
        setFocus(0);
        return;
      }

      switch (key) {
        case 'ArrowDown':
          focusNext();
          break;
        case 'ArrowUp':
          focusPrev();
          break;
        case 'ArrowRight':
          // 在网格布局中，可以尝试找到同一行的下一个
          focusNext();
          break;
        case 'ArrowLeft':
          // 在网格布局中，可以尝试找到同一行的上一个
          focusPrev();
          break;
      }
      return;
    }

    // Enter 键进入详情
    if (key === 'Enter' && focusedIndex.value >= 0) {
      const currentItem = navItems.value[focusedIndex.value];
      if (currentItem) {
        e.preventDefault();
        
        // 触发自定义的 enter 事件
        if (onEnter) {
          onEnter(currentItem, focusedIndex.value);
        } else {
          // 默认行为：触发点击事件
          currentItem.click();
        }
      }
      return;
    }

    // ESC 键退出键盘导航模式
    if (key === 'Escape') {
      isKeyboardMode.value = false;
      focusedIndex.value = -1;
      navItems.value.forEach(item => {
        item.classList.remove(activeClass);
        item.blur();
      });
    }
  };

  // 处理鼠标点击，更新焦点索引
  const handleClick = (e) => {
    const clickedItem = e.target.closest(itemSelector);
    if (clickedItem) {
      const index = navItems.value.indexOf(clickedItem);
      if (index !== -1) {
        focusedIndex.value = index;
      }
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClick);
    updateNavItems();
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClick);
  });

  return {
    focusedIndex,
    navItems,
    isKeyboardMode,
    setFocus,
    focusNext,
    focusPrev,
    updateNavItems,
  };
}

export default useKeyboardNavigation;
