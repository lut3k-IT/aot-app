import dayjs from 'dayjs';
import i18n from 'i18next';

import { LanguageShortName } from '@/constants/enums';

/** Przestrzenie nazw doladowywane razem z jezykiem. */
const LAZY_NAMESPACES = [
  'common',
  'comparison',
  'notifications',
  'data',
  'howToUse',
  'quiz',
  'quotations',
  'charts',
  'landing'
] as const;

/** Jezyki obecne w glownej paczce — nigdy nie sa doladowywane. */
const BUNDLED_LANGUAGES: string[] = [LanguageShortName.POLISH, LanguageShortName.ENGLISH];

const loadedLanguages = new Set<string>(BUNDLED_LANGUAGES);

/**
 * Lokalizacje dayjs jako jawna mapa importow — po jednym na obslugiwany jezyk.
 * Sciezka budowana ze zmiennej (`dayjs/locale/${x}.js`) kazalaby webpackowi zbudowac
 * kontekst nad wszystkimi ~140 plikami lokalizacji dayjs. W trybie dev tak rozdmuchana
 * kompilacja potrafi przekroczyc limit czasu ladowania chunka i wywalic ChunkLoadError.
 * Statyczne specyfikatory daja dokladnie tyle malych chunkow, ile mamy jezykow.
 */
const DAYJS_LOCALE_LOADERS: Record<string, () => Promise<unknown>> = {
  [LanguageShortName.SPANISH]: () => import('dayjs/locale/es'),
  [LanguageShortName.PORTUGUESE]: () => import('dayjs/locale/pt-br'),
  [LanguageShortName.GERMAN]: () => import('dayjs/locale/de'),
  [LanguageShortName.FRENCH]: () => import('dayjs/locale/fr'),
  [LanguageShortName.ITALIAN]: () => import('dayjs/locale/it'),
  [LanguageShortName.RUSSIAN]: () => import('dayjs/locale/ru'),
  [LanguageShortName.JAPANESE]: () => import('dayjs/locale/ja'),
  [LanguageShortName.CHINESE]: () => import('dayjs/locale/zh-cn'),
  [LanguageShortName.KOREAN]: () => import('dayjs/locale/ko'),
  [LanguageShortName.TURKISH]: () => import('dayjs/locale/tr')
};

/** Kody lokalizacji dayjs rozniace sie od kodow jezykow aplikacji. */
const DAYJS_LOCALES: Record<string, string> = {
  [LanguageShortName.PORTUGUESE]: 'pt-br',
  [LanguageShortName.CHINESE]: 'zh-cn'
};

export const isLazyLanguage = (language: string) => !BUNDLED_LANGUAGES.includes(language);

const loadDayjsLocale = async (language: string) => {
  const loadLocale = DAYJS_LOCALE_LOADERS[language];

  if (!loadLocale) {
    dayjs.locale('en');
    return;
  }

  try {
    await loadLocale();
    dayjs.locale(DAYJS_LOCALES[language] || language);
  } catch {
    // Brak lokalizacji dayjs nie moze blokowac zmiany jezyka interfejsu.
    dayjs.locale('en');
  }
};

/**
 * Doladowuje komplet zasobow jezyka i rejestruje je w i18next.
 * Wywolanie dla jezyka juz wczytanego jest bezkosztowe.
 */
export const loadLanguageResources = async (language: string) => {
  await loadDayjsLocale(language);

  if (loadedLanguages.has(language)) return;

  const bundles = await Promise.all(
    LAZY_NAMESPACES.map(async (namespace) => {
      const resource = await import(`./locales/${language}/${namespace}.json`);
      return [namespace, resource.default] as const;
    })
  );

  bundles.forEach(([namespace, resource]) => {
    i18n.addResourceBundle(language, namespace, resource, true, true);
  });

  loadedLanguages.add(language);
};
