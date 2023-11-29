import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import { initOptions } from './config';

i18n.use(initReactI18next).init({
  ...initOptions,
  lng: 'en',
  debug: false
});

export default i18n;
