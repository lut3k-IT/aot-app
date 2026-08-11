import { InitOptions } from 'i18next';

import { LanguageName, LanguageShortName, LocalStorageKey } from '@/constants/enums';
import { getLocalStorageItem } from '@/utils/storageHelpers';

import {
  chartsEN,
  chartsPL,
  commonEN,
  commonPL,
  comparisonEN,
  comparisonPL,
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
    comparison: comparisonEN,
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
    comparison: comparisonPL,
    notifications: notificationsPL,
    data: dataPL,
    howToUse: howToUsePL,
    quiz: quizPL,
    quotations: quotationsPL,
    charts: chartsPL,
    landing: landingPL
  }
};

/** Kolejnosc pozycji na liscie wyboru jezyka. Polski i angielski sa w glownej paczce, reszta doladowywana. */
export const LANGUAGE_OPTIONS: { id: LanguageShortName; label: LanguageName }[] = [
  { id: LanguageShortName.POLISH, label: LanguageName.POLISH },
  { id: LanguageShortName.ENGLISH, label: LanguageName.ENGLISH },
  { id: LanguageShortName.SPANISH, label: LanguageName.SPANISH },
  { id: LanguageShortName.PORTUGUESE, label: LanguageName.PORTUGUESE },
  { id: LanguageShortName.GERMAN, label: LanguageName.GERMAN },
  { id: LanguageShortName.FRENCH, label: LanguageName.FRENCH },
  { id: LanguageShortName.ITALIAN, label: LanguageName.ITALIAN },
  { id: LanguageShortName.RUSSIAN, label: LanguageName.RUSSIAN },
  { id: LanguageShortName.TURKISH, label: LanguageName.TURKISH },
  { id: LanguageShortName.JAPANESE, label: LanguageName.JAPANESE },
  { id: LanguageShortName.CHINESE, label: LanguageName.CHINESE },
  { id: LanguageShortName.KOREAN, label: LanguageName.KOREAN }
];

export const ns = ['common', 'comparison', 'quiz', 'quotations', 'charts', 'landing'];

export const initOptions: InitOptions = {
  resources,
  fallbackLng: LanguageShortName.POLISH,

  debug: process.env.NODE_ENV === 'development',
  load: 'languageOnly',
  ns,
  defaultNS: 'common',
  interpolation: {
    escapeValue: true,
    formatSeparator: ','
  }
};
