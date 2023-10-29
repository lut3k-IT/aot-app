export type ErrorType = string | undefined;

export type ImageSourceType = string | undefined;

export interface HeroType {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly species: number;
  readonly age: number;
  readonly height: number;
  readonly weight: number;
  readonly residence: number;
  readonly status: number;
  readonly alias: string[];
  readonly mbti: number;
}

export interface AppHeroType extends HeroType {
  image?: ImageSourceType;
}

export interface TitanType {
  readonly id: number;
  readonly name: string;
  readonly otherNames: string[];
  readonly abilities: string[];
  readonly currentInheritor: number;
  readonly formerInheritors: number[];
  readonly allegiance: number[];
  readonly height: number;
  readonly mbti: number;
}

export interface AppTitanType extends TitanType {
  image?: ImageSourceType;
}

export interface QuotationType {
  readonly id: number;
  readonly text: string;
}

export type FavoriteType = number;
