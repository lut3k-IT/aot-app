export enum Bool {
  TRUE = 'true',
  FALSE = 'false'
}

export enum ElementsIds {
  ROOT = 'root',
  PAGE_HEADING_OPTIONS = 'page-heading-options'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export enum Device {
  MOBILE = 'mobile',
  DESKTOP = 'desktop'
}

/* ------------------------------- URL related ------------------------------ */

export enum Param {
  STATUS = 'status',
  AGE_MIN = 'min_age',
  AGE_MAX = 'max_age',
  HEIGHT_MIN = 'min_height',
  HEIGHT_MAX = 'max_height',
  WEIGHT_MIN = 'min_weight',
  WEIGHT_MAX = 'max_weight',
  MBTI = 'mbti',
  SPECIES = 'species',
  RESIDENCE = 'residence',
  HAS_AGE = 'has_age',
  HAS_HEIGHT = 'has_height',
  HAS_WEIGHT = 'has_weight',
  SORT = 'sort',
  SORT_DIRECTION = 'order',
  PAGE = 'page',
  PAGE_SIZE = 'page_size',
  FAVORITES = 'favorites',
  SEARCH = 'search'
}

export enum RoutePath {
  LANDING = '/',
  HEROES = '/app/heroes',
  HERO_DETAILS = '/app/hero',
  HEROES_GALLERY = '/app/heroes/gallery',
  HEROES_CHARTS = '/app/heroes/charts',
  HEROES_COMPARISON = '/app/heroes/comparison',
  TITANS = '/app/titans',
  TITAN_DETAILS = '/app/titan',
  QUOTATIONS = '/app/quotations',
  QUOTATION_DETAILS = '/app/quotation',
  QUIZ = '/app/quiz',
  ABOUT = '/app/about',
  CHANGELOG = '/app/changelog',
  PRIVACY_POLICY = '/app/privacy-policy',
  TERMS_OF_SERVICE = '/app/terms-and-conditions'
}

export enum ExternalUrl {
  PORTFOLIO = 'https://lut3k.com/',
  PERSONALITY_DATABASE = 'https://www.personality-database.com'
}

/* ---------------------------- Language related ---------------------------- */

export enum LanguageName {
  ENGLISH = 'English',
  POLISH = 'Polski'
}

export enum LanguageShortName {
  ENGLISH = 'en',
  POLISH = 'pl'
}

/* ------------------------------ LocalStorage ------------------------------ */

export enum LocalStorageKey {
  LANGUAGE = 'i18nextLng',
  SPOILER_MODE = 'spoilerMode',
  FAV_HEROES = 'favHeroes',
  FAV_TITANS = 'favTitans',
  FAV_QUOTATIONS = 'favQuotations',
  THEME = 'vite-ui-theme',
  BEST_SCORE = 'bestScore'
}

/* ------------------------------ Data related ------------------------------ */

export enum PromiseStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum HeroFilterNames {
  STATUS = 'status',
  AGE = 'age',
  HEIGHT = 'height',
  WEIGHT = 'weight',
  MBTI = 'mbti',
  SPECIES = 'species',
  RESIDENCE = 'residence',
  HAS_AGE = 'hasAge',
  HAS_HEIGHT = 'hasHeight',
  HAS_WEIGHT = 'hasWeight'
}
