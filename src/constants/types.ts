import { TOptions } from 'i18next';

import { MbtiType } from '@/data/mbti';
import { ResidenceType } from '@/data/residences';
import { SpeciesType } from '@/data/species';
import { StatusType } from '@/data/statuses';

import { SortDirection } from './enums';

export type ErrorType = string | undefined;

export type ImageSourceType = string | undefined;

export type TranslateFunction = (key: string, options?: TOptions) => string;

export type TextAbbreviation = 'short' | 'long';

export type DeviceType = 'mobile' | 'desktop';

/* ---------------------------------- Data ---------------------------------- */

export interface HeroType {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string | null;
  readonly species: number;
  readonly age: number | null;
  readonly height: number | null;
  readonly weight: number | null;
  readonly residence: number | null;
  readonly status: number;
  readonly alias: string[];
  readonly mbti: number | null;
}

export interface TitanType {
  readonly id: number;
  readonly name: string;
  readonly otherNames: string[];
  readonly abilities: string[];
  readonly currentInheritor: number | null;
  readonly formerInheritors: number[];
  readonly allegiance: number[];
  readonly height: number | null;
  readonly mbti: number | null;
}

export interface QuotationType {
  readonly id: number;
  readonly text: string;
}

export type FavoriteType = number;

export type MbtiGroups = 'default' | 'analysts' | 'diplomats' | 'sentinels' | 'explorers';

/* --------------------------------- Filters -------------------------------- */

export interface FilterNumeralRange {
  min?: number;
  max?: number;
}

export interface HeroFilterCriteria {
  status: StatusType[];
  age: number[];
  height: number[];
  weight: number[];
  mbti: MbtiType[];
  species: SpeciesType[];
  residences: ResidenceType[];
  hasAge: boolean;
  hasHeight: boolean;
  hasWeight: boolean;
  hasOnlyFavorites: boolean;
}

export type HeroSortOption = keyof HeroType;

export interface HeroFilters {
  search?: string | null;
  sort: HeroSortOption;
  sortDirection: SortDirection;
  filters: HeroFilterCriteria;
}
