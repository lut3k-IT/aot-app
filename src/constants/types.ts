export interface HeroType {
  id: number;
  firstName: string;
  lastName: string;
  species: number;
  age: number;
  height: number;
  weight: number;
  residence: number;
  status: number;
  alias: string[];
  mbti: number;
}

export interface TitanType {
  id: number;
  name: string;
  otherNames: string[];
  abilities: string[];
  currentInheritor: number;
  formerInheritors: number[];
  allegiance: number[];
  height: number;
}

export interface QuotationType {
  id: number;
  text: string;
}

export type FavoriteType = number;

export type ErrorType = string | undefined;
