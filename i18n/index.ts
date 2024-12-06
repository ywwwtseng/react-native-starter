import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './locales/en.json';
import zh from './locales/zh.json';

const i18n = new I18n({
  en,
  zh,
});

i18n.defaultLocale = 'en';

const getDeviceLanguage = (): 'en' | 'zh' => {
  const languageCode = Localization.getLocales()[0].languageCode;

  if (!languageCode) {
    return 'en';
  }
  if (languageCode.startsWith('zh')) {
    return 'zh';
  }

  return 'en';
};

const changeLanguage = (languageCode: 'en' | 'zh'): void => {
  i18n.locale = languageCode;
};

changeLanguage(getDeviceLanguage());

export {
  getDeviceLanguage,
  changeLanguage
};
export default i18n;
