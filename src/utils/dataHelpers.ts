import React from 'react';

import { SortDirection } from '@/constants/enums';
import { FavoriteType, HeroSortOption, HeroType, TextAbbreviation, TranslateFunction } from '@/constants/types';
import allegiances from '@/data/allegiances';
import mbti from '@/data/mbti';
import mbtiGroup from '@/data/mbtiGroup';
import residences from '@/data/residences';
import species from '@/data/species';
import statuses from '@/data/statuses';
import { sortOptions } from '@/features/Heroes/components/HeroesGallery/components/Filter/utils';

const allegianceMap = new Map(allegiances.map((item) => [item.id, item]));
const residenceMap = new Map(residences.map((item) => [item.id, item]));
const residenceKeyMap = new Map(residences.map((item) => [item.keyName, item]));
const speciesMap = new Map(species.map((item) => [item.id, item]));
const speciesKeyMap = new Map(species.map((item) => [item.keyName, item]));
const statusMap = new Map(statuses.map((item) => [item.id, item]));
const statusKeyMap = new Map(statuses.map((item) => [item.keyName, item]));
const mbtiMap = new Map(mbti.map((item) => [item.id, item]));
const mbtiShortNameMap = new Map(mbti.map((item) => [item.shortName, item]));
const mbtiGroupMap = new Map(mbtiGroup.map((item) => [item.id, item]));

const favSetCache = new WeakMap<FavoriteType[], Set<number>>();

export const toggleStateDataById = <T extends { id: number }>(
  data: T,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) => {
  setState((prev) => (prev.some((x) => x.id === data.id) ? prev.filter((x) => x.id !== data.id) : [...prev, data]));
};

export const toggleDataById = <T extends { id: number }>(data: T, prev: T[]): T[] => {
  return prev.some((x) => x.id === data.id) ? prev.filter((x) => x.id !== data.id) : [...prev, data];
};

export const toggleStatePropertyArrayById = <T extends { id: number }>(data: T, prev: T[]) => {
  const isFound = prev.some((s) => s.id === data.id);
  if (isFound) {
    return prev.filter((s) => s.id !== data.id);
  }
  return [...prev, data];
};

export const getResidenceName = (id: number | null, t: TranslateFunction) => {
  const keyName = id !== null ? residenceMap.get(id)?.keyName : undefined;
  return keyName ? t(`data:residence.${keyName}`) : null;
};

export const getResidenceByKeyName = (keyName: string) => {
  return residenceKeyMap.get(keyName);
};

export const getSpeciesName = (id: number, t: TranslateFunction) => {
  const keyName = speciesMap.get(id)?.keyName;
  return keyName ? t(`data:species.${keyName}`) : null;
};

export const getStatusName = (id: number, t: TranslateFunction, abbreviation: TextAbbreviation = 'short') => {
  const keyName = statusMap.get(id)?.keyName;
  return keyName ? t(`data:status.${keyName}.${abbreviation}`) : null;
};

export const getStatusByKeyName = (keyName: string) => {
  return statusKeyMap.get(keyName);
};

export const getAllegianceNames = (ids: number[], t: TranslateFunction) => {
  const namesArray = ids.map((id) => {
    const keyName = allegianceMap.get(id)?.keyName;
    return keyName ? t(`data:allegiance.${keyName}`) : null;
  });
  return namesArray;
};

export const getMbtiShortName = (id: number | null) => (id !== null ? mbtiMap.get(id)?.shortName : undefined);

export const getMbtiLongName = (id: number, t: TranslateFunction) => {
  const keyName = mbtiMap.get(id)?.keyName;
  return keyName ? t(`data:mbti.${keyName}`) : null;
};

export const getMbtiGroupName = (id: number | null, t: TranslateFunction) => {
  const keyName = id !== null ? mbtiGroupMap.get(id)?.keyName : undefined;
  return keyName ? t(`data:mbtiGroup.${keyName}`) : null;
};

export const getMbtiByShortName = (shortName: string) => {
  return mbtiShortNameMap.get(shortName);
};

export const getHeroName = (id: number | null, heroes: HeroType[]) => {
  const hero = heroes.find((hero) => hero.id === id);
  return `${hero?.firstName || ''} ${hero?.lastName || ''}`;
};

export const getSpeciesByKeyName = (keyName: string) => {
  return speciesKeyMap.get(keyName);
};

export const isInFavorites = (currId: number, favIdsArray: FavoriteType[]) => {
  let set = favSetCache.get(favIdsArray);
  if (!set) {
    set = new Set(favIdsArray);
    favSetCache.set(favIdsArray, set);
  }
  return set.has(currId);
};

export const findHeroSortBy = (option: string | null) =>
  sortOptions.includes(option as HeroSortOption) ? (option as HeroSortOption) : null;

export const findSortDirection = (direction: string | null) => {
  const values = Object.values(SortDirection);
  return values.includes(direction as SortDirection) ? (direction as SortDirection) : null;
};

const MISSING_IMAGES = ['rods-wife', 'ms-springer'];

export const getHeroImageSource = (slug: string): string | undefined => {
  if (MISSING_IMAGES.includes(slug)) {
    return undefined;
  }
  return `/assets/img/heroes/${slug}.jpg`;
};
