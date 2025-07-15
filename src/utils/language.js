// 语言管理工具
import i18n from '../../i18n/index.js';

// 获取当前语言
export const getCurrentLanguage = () => {
  return localStorage.getItem('language') || 'zhCN';
};

// 设置语言
export const setLanguage = (lang) => {
  localStorage.setItem('language', lang);
  i18n.global.locale.value = lang;
  
  // 触发自定义事件通知语言变更
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  
  console.log(`语言已设置为: ${lang}`);
};

// 初始化语言（在应用启动时调用）
export const initLanguage = () => {
  const savedLanguage = getCurrentLanguage();
  i18n.global.locale.value = savedLanguage;
  console.log(`语言已初始化为: ${savedLanguage}`);
  return savedLanguage;
};

// 语言变更监听器
export const onLanguageChange = (callback) => {
  const handler = (event) => {
    callback(event.detail);
  };
  
  window.addEventListener('languageChanged', handler);
  
  // 返回取消监听的函数
  return () => {
    window.removeEventListener('languageChanged', handler);
  };
};
