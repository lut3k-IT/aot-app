export enum Param {}

export enum RoutePath {
  LANDING = '/',
  HEROES = '/heroes',
  HEROES_GALLERY = '/heroes/gallery',
  HEROES_CHARTS = '/heroes/charts',
  HEROES_COMPARISON = '/heroes/comparison',
  TITANS = '/titans',
  FAVORITES = '/favorites',
  FAVORITES_HEROES = '/favorites/heroes',
  FAVORITES_TITANS = '/favorites/titans',
  FAVORITES_QUOTATIONS = '/favorites/quotations',
  QUIZ = '/quiz',
  QUOTATIONS = '/quotations',
  HERO_DETAILS = '/hero',
  TITAN_DETAILS = '/titan',
  QUOTATION_DETAILS = '/quotation',
  ABOUT = '/about',
  CHANGELOG = '/changelog',
  PRIVACY_POLICY = '/privacy-policy',
  TERMS_OF_SERVICE = '/terms-of-service'
}

export enum ExternalUrl {
  PORTFOLIO = 'https://lut3k.com/'
}

export enum LanguageName {
  ENGLISH = 'English',
  POLISH = 'Polski'
}

export enum LanguageShortName {
  ENGLISH = 'en',
  POLISH = 'pl'
}

export enum LocalStorageKey {
  LANGUAGE = 'i18nextLng',
  SPOILER_MODE = 'spoilerMode',
  FAV_HEROES = 'favHeroes',
  FAV_TITANS = 'favTitans',
  FAV_QUOTATIONS = 'favQuotations'
}

export enum CharacterType {
  HERO,
  TITAN
}

export enum PromiseStatus {
  IDLE = 'idle', // before operation has started
  LOADING = 'loading', // operation in progress
  SUCCEDED = 'succeeded', // promise fullfilled
  FAILED = 'failed' // promise rejected
}