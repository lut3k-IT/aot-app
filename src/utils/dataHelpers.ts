import React from 'react';

import { SortDirection } from '@/constants/enums';
import { FavoriteType, HeroSortOption, HeroType, TextAbbreviation, TranslateFunction } from '@/constants/types';
import allegiances from '@/data/allegiances';
import mbti from '@/data/mbti';
import mbtiGroup from '@/data/mbtiGroup';
import residences from '@/data/residences';
import species from '@/data/species';
import statuses from '@/data/statuses';
import { sortOptions } from '@/features/Heroes/components/HeroesGallery/components/Filter/helpers';

export const toggleStateDataById = <T extends { id: number }>(
  data: T,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) => {
  setState((prev) => (prev.some((x) => x.id === data.id) ? prev.filter((x) => x.id !== data.id) : [...prev, data]));
};

export const toggleStatePropertyArrayById = <T extends { id: number }>(data: T, prev: T[]) => {
  const isFound = prev.some((s) => s.id === data.id);
  if (isFound) {
    return prev.filter((s) => s.id !== data.id);
  }
  return [...prev, data];
};

export const getResidenceName = (id: number | null, t: TranslateFunction) => {
  const keyName = residences.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:residence.${keyName}`) : null;
};

export const getResidenceByKeyName = (keyName: string) => {
  return residences.find((data) => data.keyName === keyName);
};

export const getSpeciesName = (id: number, t: TranslateFunction) => {
  const keyName = species.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:species.${keyName}`) : null;
};

export const getStatusName = (id: number, t: TranslateFunction, abbreviation: TextAbbreviation = 'short') => {
  const keyName = statuses.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:status.${keyName}.${abbreviation}`) : null;
};

export const getStatusByKeyName = (keyName: string) => {
  return statuses.find((data) => data.keyName === keyName);
};

export const getAllegianceNames = (ids: number[], t: TranslateFunction) => {
  const namesArray = ids.map((id) => {
    const keyName = allegiances.find((data) => data.id === id)?.keyName;
    return keyName ? t(`data:allegiance.${keyName}`) : null;
  });
  return namesArray;
};

export const getMbtiShortName = (id: number | null) => mbti.find((data) => data.id === id)?.shortName;

export const getMbtiLongName = (id: number, t: TranslateFunction) => {
  const keyName = mbti.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:mbti.${keyName}`) : null;
};

export const getMbtiGroupName = (id: number | null, t: TranslateFunction) => {
  const keyName = mbtiGroup.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:mbtiGroup.${keyName}`) : null;
};

export const getMbtiByShortName = (shortName: string) => {
  return mbti.find((data) => data.shortName === shortName);
};

export const getHeroName = (id: number | null, heroes: HeroType[]) => {
  const hero = heroes.find((hero) => hero.id === id);
  return `${hero?.firstName || ''} ${hero?.lastName || ''}`;
};

export const getSpeciesByKeyName = (keyName: string) => {
  return species.find((data) => data.keyName === keyName);
};

export const isInFavorites = (currId: number, favIdsArray: FavoriteType[]) =>
  !!favIdsArray.find((fav) => fav === currId);

export const findHeroSortBy = (option: string | null) =>
  sortOptions.includes(option as HeroSortOption) ? (option as HeroSortOption) : null;

export const findSortDirection = (direction: string | null) => {
  const values = Object.values(SortDirection);
  return values.includes(direction as SortDirection) ? (direction as SortDirection) : null;
};
