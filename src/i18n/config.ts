import { InitOptions } from 'i18next';

import { LanguageShortName, LocalStorageKey } from '@/constants';
import { getLocalStorageItem } from '@/utils/storage';

import { commonEN, commonPL, notificationsEN, notificationsPL } from './locales';

const resources = {
  en: {
    common: commonEN,
    notifications: notificationsEN
  },
  pl: {
    common: commonPL,
    notifications: notificationsPL
  }
};

export const ns = ['common'];

export const initOptions: InitOptions = {
  resources,
  fallbackLng: LanguageShortName.ENGLISH,
  lng: getLocalStorageItem(LocalStorageKey.LANGUAGE_KEY) || LanguageShortName.ENGLISH,
  debug: true,
  load: 'languageOnly',
  ns,
  defaultNS: 'common',
  interpolation: {
    escapeValue: true,
    formatSeparator: ','
  }
};
