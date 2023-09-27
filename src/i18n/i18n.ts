import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { initOptions } from './config';

if (process.env.NODE_ENV !== 'test') {
  i18n.use(LanguageDetector).use(initReactI18next).init(initOptions);
}

export default i18n;
