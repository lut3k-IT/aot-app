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
  landingEN,
  landingPL,
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
    charts: chartsEN,
    landing: landingEN
  },
  pl: {
    common: commonPL,
    notifications: notificationsPL,
    data: dataPL,
    howToUse: howToUsePL,
    quiz: quizPL,
    quotations: quotationsPL,
    charts: chartsPL,
    landing: landingPL
  }
};

export const ns = ['common', 'quiz', 'quotations', 'charts', 'landing'];

export const initOptions: InitOptions = {
  resources,
  fallbackLng: LanguageShortName.POLISH,

  debug: true,
  load: 'languageOnly',
  ns,
  defaultNS: 'common',
  interpolation: {
    escapeValue: true,
    formatSeparator: ','
  }
};
