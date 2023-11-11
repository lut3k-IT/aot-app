import { MbtiType } from '@/data/mbti';
import { ResidenceType } from '@/data/residences';
import { SpeciesType } from '@/data/species';
import { StatusType } from '@/data/statuses';

import { HeroFilterNames, SortDirection } from './enums';

export type ErrorType = string | undefined;

export type ImageSourceType = string | undefined;

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
  readonly alias: string[] | null;
  readonly mbti: number | null;
}

export interface TitanType {
  readonly id: number;
  readonly name: string;
  readonly otherNames: string[];
  readonly abilities: string[];
  readonly currentInheritor: number | null;
  readonly formerInheritors: number[] | null;
  readonly allegiance: number[];
  readonly height: number | null;
  readonly mbti: number | null;
}

export interface QuotationType {
  readonly id: number;
  readonly text: string;
}

export type FavoriteType = number;

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
}

export interface HeroFilters {
  search?: string;
  sort?: HeroFilterNames;
  sortDirection?: SortDirection;
  filters: HeroFilterCriteria;
}

export interface SortCriteria {
  name?: SortDirection;
  age?: SortDirection;
  height?: SortDirection;
  weight?: SortDirection;
}
