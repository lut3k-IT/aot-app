import { InitOptions } from 'i18next';

import { LanguageShortName, LocalStorageKey } from '@/constants';
import { getLocalStorageItem } from '@/utils/storage';

import { commonEN, commonPL, dataEN, dataPL, notificationsEN, notificationsPL } from './locales';

const resources = {
  en: {
    common: commonEN,
    notifications: notificationsEN,
    data: dataEN
  },
  pl: {
    common: commonPL,
    notifications: notificationsPL,
    data: dataPL
  }
};

export const ns = ['common'];

export const initOptions: InitOptions = {
  resources,
  fallbackLng: LanguageShortName.ENGLISH,
  lng: getLocalStorageItem(LocalStorageKey.LANGUAGE) || LanguageShortName.ENGLISH,
  debug: true,
  load: 'languageOnly',
  ns,
  defaultNS: 'common',
  interpolation: {
    escapeValue: true,
    formatSeparator: ','
  }
};
