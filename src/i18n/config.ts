import { InitOptions } from 'i18next';

import { LanguageShortName, LocalStorageKey } from '@/constants/enums';
import { getLocalStorageItem } from '@/utils/storageHelpers';

import {
  commonEN,
  commonPL,
  dataEN,
  dataPL,
  howToUseEN,
  howToUsePL,
  notificationsEN,
  notificationsPL
} from './locales';

const resources = {
  en: {
    common: commonEN,
    notifications: notificationsEN,
    data: dataEN,
    howToUse: howToUseEN
  },
  pl: {
    common: commonPL,
    notifications: notificationsPL,
    data: dataPL,
    howToUse: howToUsePL
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
