/**
 * Kontrola spojnosci plikow tlumaczen wzgledem wersji angielskiej.
 *
 * Sprawdza:
 *  - komplet plikow przestrzeni nazw dla kazdego jezyka,
 *  - identyczny zbior sciezek kluczy,
 *  - strukture quizu: liczbe pytan, identyfikatory, indeksy poprawnych odpowiedzi i liczbe wariantow,
 *  - wartosci nieprzetlumaczone, czyli identyczne z angielskimi (ostrzezenie, nie blad).
 *
 * Uruchomienie: npm run check:i18n
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const LOCALES_DIR = join(process.cwd(), 'src', 'i18n', 'locales');
const REFERENCE_LANGUAGE = 'en';

/** Przestrzenie nazw z trescia tlumaczona. */
const TRANSLATED_NAMESPACES = ['common', 'comparison', 'notifications', 'data', 'howToUse', 'quiz', 'charts', 'landing'];
/** Cytaty pozostaja w oryginale — sprawdzamy wylacznie obecnosc pliku i zgodnosc identyfikatorow. */
const COPIED_NAMESPACES = ['quotations'];

const readJson = (language, namespace) => {
  const path = join(LOCALES_DIR, language, `${namespace}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
};

const collectKeyPaths = (value, prefix = '') => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectKeyPaths(item, `${prefix}[${index}]`));
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, nested]) => collectKeyPaths(nested, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
};

const errors = [];
const warnings = [];

const languages = readdirSync(LOCALES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((language) => language !== REFERENCE_LANGUAGE);

for (const namespace of [...TRANSLATED_NAMESPACES, ...COPIED_NAMESPACES]) {
  const reference = readJson(REFERENCE_LANGUAGE, namespace);
  if (!reference) {
    errors.push(`Brak pliku wzorcowego: ${REFERENCE_LANGUAGE}/${namespace}.json`);
    continue;
  }

  const referenceKeys = collectKeyPaths(reference);

  for (const language of languages) {
    const target = readJson(language, namespace);

    if (!target) {
      errors.push(`${language}/${namespace}.json — brak pliku`);
      continue;
    }

    const targetKeys = collectKeyPaths(target);
    const referenceKeySet = new Set(referenceKeys);
    const targetKeySet = new Set(targetKeys);
    const missing = referenceKeys.filter((key) => !targetKeySet.has(key));
    const extra = targetKeys.filter((key) => !referenceKeySet.has(key));

    missing.forEach((key) => errors.push(`${language}/${namespace}.json — brakujacy klucz: ${key}`));
    extra.forEach((key) => errors.push(`${language}/${namespace}.json — nadmiarowy klucz: ${key}`));

    if (namespace === 'quiz' && Array.isArray(reference.questions) && Array.isArray(target.questions)) {
      if (reference.questions.length !== target.questions.length) {
        errors.push(
          `${language}/quiz.json — liczba pytan ${target.questions.length}, oczekiwano ${reference.questions.length}`
        );
      }

      reference.questions.forEach((referenceQuestion, index) => {
        const targetQuestion = target.questions[index];
        if (!targetQuestion) return;

        if (targetQuestion.id !== referenceQuestion.id) {
          errors.push(
            `${language}/quiz.json — pytanie ${index}: identyfikator ${targetQuestion.id}, oczekiwano ${referenceQuestion.id}`
          );
        }
        if (targetQuestion.correctAnswer !== referenceQuestion.correctAnswer) {
          errors.push(
            `${language}/quiz.json — pytanie ${index}: indeks poprawnej odpowiedzi ${targetQuestion.correctAnswer}, oczekiwano ${referenceQuestion.correctAnswer}`
          );
        }
        if (targetQuestion.options?.length !== referenceQuestion.options?.length) {
          errors.push(`${language}/quiz.json — pytanie ${index}: niezgodna liczba wariantow odpowiedzi`);
        }
      });
    }

    if (TRANSLATED_NAMESPACES.includes(namespace)) {
      const identical = referenceKeys.filter((key) => {
        const read = (source) =>
          key
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .reduce((accumulator, part) => (accumulator === undefined ? undefined : accumulator[part]), source);
        const referenceValue = read(reference);
        return typeof referenceValue === 'string' && referenceValue.length > 3 && read(target) === referenceValue;
      });

      if (identical.length > 0) {
        warnings.push(`${language}/${namespace}.json — ${identical.length} wartosci identycznych z angielskimi`);
      }
    }
  }
}

warnings.forEach((warning) => console.warn(`OSTRZEZENIE: ${warning}`));

if (errors.length > 0) {
  errors.forEach((error) => console.error(`BLAD: ${error}`));
  console.error(`\nNiepowodzenie: ${errors.length} problemow.`);
  process.exit(1);
}

console.log(`Kontrola tlumaczen zakonczona bez bledow. Sprawdzone jezyki: ${languages.join(', ') || 'brak'}.`);
