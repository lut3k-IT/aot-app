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
  notificationsPL,
  quizEN,
  quizPL,
  quotationsEN,
  quotationsPL
} from './locales';

const resources = {
  en: {
    common: commonEN,
    notifications: notificationsEN,
    data: dataEN,
    howToUse: howToUseEN,
    quiz: quizEN,
    quotations: quotationsEN
  },
  pl: {
    common: commonPL,
    notifications: notificationsPL,
    data: dataPL,
    howToUse: howToUsePL,
    quiz: quizPL,
    quotations: quotationsPL
  }
};

export const ns = ['common', 'quiz', 'quotations'];

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
