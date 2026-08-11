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

/** Kody lokalizacji dayjs rozniace sie od kodow jezykow aplikacji. */
const DAYJS_LOCALES: Record<string, string> = {
  [LanguageShortName.PORTUGUESE]: 'pt-br',
  [LanguageShortName.CHINESE]: 'zh-cn'
};

export const isLazyLanguage = (language: string) => !BUNDLED_LANGUAGES.includes(language);

const loadDayjsLocale = async (language: string) => {
  const locale = DAYJS_LOCALES[language] || language;

  try {
    await import(`dayjs/locale/${locale}.js`);
    dayjs.locale(locale);
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
