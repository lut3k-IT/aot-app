import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: {
        'tab.gallery': 'Gallery',
        'tab.comparison': 'Comparison',
        'tab.charts': 'Charts',
        'time.year.singular': 'Year',
      },
    },
  },
});