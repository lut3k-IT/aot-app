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
  const filteredData = data.filter((hero) => {
    const matchFavorite = filters.filters.hasOnlyFavorites ? (favoriteHeroesIds ?? []).includes(hero.id) : true;

    const fullHeroName = `${hero.firstName} ${hero.lastName ?? ''}`;
    const matchSearch = filters.search
      ? fullHeroName.toLowerCase().includes(filters.search?.toLowerCase() ?? '')
      : true;

    const isAgeFilterSameAsDefault =
      filters.filters.age[0] === DEFAULT_AGE[0] && filters.filters.age[1] === DEFAULT_AGE[1];
    const isHeightFilterSameAsDefault =
      filters.filters.height[0] === DEFAULT_HEIGHT[0] && filters.filters.height[1] === DEFAULT_HEIGHT[1];
    const isWeightFilterSameAsDefault =
      filters.filters.weight[0] === DEFAULT_WEIGHT[0] && filters.filters.weight[1] === DEFAULT_WEIGHT[1];

    // important: if the filter is set to default, it will match all values
    const matchAge = !isAgeFilterSameAsDefault ? matchesRangeFilter(hero.age, filters.filters.age) : true;
    const matchHeight = !isHeightFilterSameAsDefault ? matchesRangeFilter(hero.height, filters.filters.height) : true;
    const matchWeight = !isWeightFilterSameAsDefault ? matchesRangeFilter(hero.weight, filters.filters.weight) : true;

    const matchStatus =
      filters.filters.status.length > 0 ? !!filters.filters.status.find((status) => status.id === hero.status) : true;
    const matchMbti =
      filters.filters.mbti.length > 0 ? !!filters.filters.mbti.find((mbti) => mbti.id === hero.mbti) : true;
    const matchSpecies =
      filters.filters.species.length > 0
        ? !!filters.filters.species.find((species) => species.id === hero.species)
        : true;
    const matchResidences =
      filters.filters.residences.length > 0
        ? !!filters.filters.residences.find((residences) => residences.id === hero.residence)
        : true;

    const matchHasAge = !(filters.filters.hasAge && !hero.age);
    const matchHasHeight = !(filters.filters.hasHeight && !hero.height);
    const matchHasWeight = !(filters.filters.hasWeight && !hero.weight);

    return (
      matchFavorite &&
      matchSearch &&
      matchAge &&
      matchHeight &&
      matchWeight &&
      matchStatus &&
      matchMbti &&
      matchSpecies &&
      matchResidences &&
      matchHasAge &&
      matchHasHeight &&
      matchHasWeight
    );
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
