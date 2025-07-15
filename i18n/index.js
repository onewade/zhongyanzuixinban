import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import en from './locales/en.json';

const messages = {
  en,
  zhCN,
  zhTW
};

// 从 localStorage 获取保存的语言，如果没有则使用默认语言
const getStoredLanguage = () => {
  const stored = localStorage.getItem('language');
  // 验证语言是否有效                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  return stored && messages[stored] ? stored : 'zhCN';
};

const i18n = createI18n({
  legacy: false, // 使用组合 API 模式
  locale: getStoredLanguage(), // 从 localStorage 读取语言
  fallbackLocale: 'zhCN', // 回退语言
  messages,
});

export default i18n;