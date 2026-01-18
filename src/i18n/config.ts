import { InitOptions } from 'i18next';

import { LanguageShortName, LocalStorageKey } from '@/constants/enums';
import { getLocalStorageItem } from '@/utils/storageHelpers';

import {
  chartsEN,
  chartsPL,
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
    quotations: quotationsEN,
    charts: chartsEN
  },
  pl: {
    common: commonPL,
    notifications: notificationsPL,
    data: dataPL,
    howToUse: howToUsePL,
    quiz: quizPL,
    quotations: quotationsPL,
    charts: chartsPL
  }
};

export const ns = ['common', 'quiz', 'quotations', 'charts'];

export const initOptions: InitOptions = {
  resources,
  fallbackLng: LanguageShortName.POLISH,
  lng: LanguageShortName.POLISH,
  debug: true,
  load: 'languageOnly',
  ns,
  defaultNS: 'common',
  interpolation: {
    escapeValue: true,
    formatSeparator: ','
  }
};
