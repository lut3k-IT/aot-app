export enum Bool {
  TRUE = 'true',
  FALSE = 'false'
}

export enum ElementsIds {
  ROOT = 'root',
  PAGE_HEADING_OPTIONS = 'page-heading-options'
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
  HEROES = '/heroes',
  HERO_DETAILS = '/hero',
  HEROES_GALLERY = '/heroes/gallery',
  HEROES_CHARTS = '/heroes/charts',
  HEROES_COMPARISON = '/heroes/comparison',
  TITANS = '/titans',
  TITAN_DETAILS = '/titan',
  QUOTATIONS = '/quotations',
  QUOTATION_DETAILS = '/quotation',
  QUIZ = '/quiz',
  ABOUT = '/about',
  CHANGELOG = '/changelog',
  PRIVACY_POLICY = '/privacy-policy',
  TERMS_OF_SERVICE = '/terms-and-conditions'
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
  THEME = 'vite-ui-theme'
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
