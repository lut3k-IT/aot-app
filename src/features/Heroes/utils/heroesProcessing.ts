import { SortDirection } from '@/constants/enums';
import { FavoriteType, HeroFilters, HeroType } from '@/constants/types';
import {
  DEFAULT_AGE,
  DEFAULT_HEIGHT,
  DEFAULT_WEIGHT
} from '@/features/Heroes/components/HeroesGallery/components/Filter/utils';

type SortType = number | string | string[] | null;

const sortWithNullsLast = (a: SortType, b: SortType) => {
  if (a === null) return 1;
  if (b === null) return -1;
  return a < b ? -1 : a > b ? 1 : 0;
};

const sortWithNullsLastDesc = (a: SortType, b: SortType) => {
  if (a === null) return 1;
  if (b === null) return -1;
  return a < b ? 1 : a > b ? -1 : 0;
};

function matchesRangeFilter(heroValue: number | null, filterRange: number[]): boolean {
  if (heroValue === null) return false;
  const [min, max] = filterRange;
  return heroValue >= min && heroValue <= max;
}

export const filterHeroes = (data: HeroType[], filters: HeroFilters, favoriteHeroesIds?: FavoriteType[]) => {
  const lowerCaseSearch = filters.search?.toLowerCase() ?? '';
  const favoriteIdsSet = new Set(favoriteHeroesIds);
  const statusIds = new Set(filters.filters.status.map((s) => s.id));
  const mbtiIds = new Set(filters.filters.mbti.map((m) => m.id));
  const speciesIds = new Set(filters.filters.species.map((s) => s.id));
  const residenceIds = new Set(filters.filters.residences.map((r) => r.id));

  const isAgeFilterSameAsDefault =
    filters.filters.age[0] === DEFAULT_AGE[0] && filters.filters.age[1] === DEFAULT_AGE[1];
  const isHeightFilterSameAsDefault =
    filters.filters.height[0] === DEFAULT_HEIGHT[0] && filters.filters.height[1] === DEFAULT_HEIGHT[1];
  const isWeightFilterSameAsDefault =
    filters.filters.weight[0] === DEFAULT_WEIGHT[0] && filters.filters.weight[1] === DEFAULT_WEIGHT[1];

  const filteredData = data.filter((hero) => {
    if (filters.filters.hasOnlyFavorites && !favoriteIdsSet.has(hero.id)) return false;

    if (lowerCaseSearch) {
      const fullHeroName = `${hero.firstName} ${hero.lastName ?? ''}`.toLowerCase();
      if (!fullHeroName.includes(lowerCaseSearch)) return false;
    }

    if (!isAgeFilterSameAsDefault && !matchesRangeFilter(hero.age, filters.filters.age)) return false;

    if (!isHeightFilterSameAsDefault && !matchesRangeFilter(hero.height, filters.filters.height)) return false;

    if (!isWeightFilterSameAsDefault && !matchesRangeFilter(hero.weight, filters.filters.weight)) return false;

    if (statusIds.size > 0 && (hero.status === null || !statusIds.has(hero.status))) return false;
    if (mbtiIds.size > 0 && (hero.mbti === null || !mbtiIds.has(hero.mbti))) return false;
    if (speciesIds.size > 0 && (hero.species === null || !speciesIds.has(hero.species))) return false;
    if (residenceIds.size > 0 && (hero.residence === null || !residenceIds.has(hero.residence))) return false;

    if (filters.filters.hasAge && hero.age === null) return false;
    if (filters.filters.hasHeight && hero.height === null) return false;
    if (filters.filters.hasWeight && hero.weight === null) return false;

    return true;
  });

  /* ---------------------------------- Sort ---------------------------------- */
  const sort = filters.sort;
  const sortDirection = filters.sortDirection;

  const shouldSkipDefaultSort = sort === 'id' && (sortDirection as SortDirection) === SortDirection.ASC;

  const sortedData = shouldSkipDefaultSort
    ? filteredData
    : filteredData.sort((a, b) =>
        sortDirection === SortDirection.ASC
          ? sortWithNullsLast(a[sort], b[sort])
          : sortWithNullsLastDesc(a[sort], b[sort])
      );

  return sortedData;
};

export const paginateHeroes = (data: HeroType[], page: number, pageSize: number) => {
  if (typeof page !== 'number' || page < 1) {
    throw new Error('Invalid page number');
  }
  if (typeof pageSize !== 'number' || pageSize < 1) {
    throw new Error('Invalid page size');
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedHeroes = data.slice(start, end);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return { paginatedHeroes, totalPages };
};
