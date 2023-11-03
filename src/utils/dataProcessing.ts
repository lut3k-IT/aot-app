import React from 'react';
import { useTranslation } from 'react-i18next';

import { FavoriteType, HeroType } from '@/constants/types';
import allegiances from '@/data/allegiances';
import mbti from '@/data/mbti';
import mbtiGroup from '@/data/mbtiGroup';
import residences from '@/data/residences';
import statuses from '@/data/statuses';

export const toggleStateDataById = <T extends { id: number }>(
  data: T,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) => {
  setState((latest) =>
    latest.some((x) => x.id === data.id) ? latest.filter((x) => x.id !== data.id) : [...latest, data]
  );
};

export const getResidenceName = (id: number) => {
  const { t } = useTranslation();
  const keyName = residences.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:residence.${keyName}`) : null;
};

export const getStatusName = (id: number) => {
  const { t } = useTranslation();
  const keyName = statuses.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:status.${keyName}.short`) : null;
};

export const getAllegianceNames = (ids: number[]) => {
  const { t } = useTranslation();
  const namesArray = ids.map((id) => {
    const keyName = allegiances.find((data) => data.id === id)?.keyName;
    return keyName ? t(`data:allegiance.${keyName}`) : null;
  });
  return namesArray;
};

export const getMbtiShortName = (id: number) => mbti.find((data) => data.id === id)?.shortName;

export const getMbtiLongName = (id: number) => {
  const { t } = useTranslation();
  const keyName = mbti.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:mbti.${keyName}`) : null;
};

export const getMbtiGroupName = (id: number) => {
  const { t } = useTranslation();
  const keyName = mbtiGroup.find((data) => data.id === id)?.keyName;
  return keyName ? t(`data:mbtiGroup.${keyName}`) : null;
};

export const getHeroName = (id: number, heroes: HeroType[]) => {
  const hero = heroes.find((hero) => hero.id === id);
  return `${hero?.firstName || ''} ${hero?.lastName || ''}`;
};

export const isInFavorites = (currentId: number, favoritesIdsArray: FavoriteType[]) =>
  !!favoritesIdsArray.find((fav) => fav === currentId);
